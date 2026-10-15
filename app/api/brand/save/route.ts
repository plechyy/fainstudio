import { NextRequest, NextResponse } from 'next/server';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';

/*
 * Uložení barev z Color studia na web. JEN pro lokální vývoj (localhost):
 * přepíše výchozí barvu v CSS, vygeneruje znovu ikony a sadu log a udělá commit + push.
 * Na produkci tahle cesta vrací 404.
 */

const run = promisify(execFile);
const root = /*turbopackIgnore: true*/ process.cwd();
const abs = (p: string) => path.join(/*turbopackIgnore: true*/ root, p);

function ico(pngs: Buffer[], sizes: number[]) {
  const head = Buffer.alloc(6);
  head.writeUInt16LE(1, 2);
  head.writeUInt16LE(pngs.length, 4);
  let offset = 6 + 16 * pngs.length;
  const entries: Buffer[] = [];
  pngs.forEach((png, i) => {
    const e = Buffer.alloc(16);
    e[0] = sizes[i];
    e[1] = sizes[i];
    e.writeUInt16LE(1, 4);
    e.writeUInt16LE(32, 6);
    e.writeUInt32LE(png.length, 8);
    e.writeUInt32LE(offset, 12);
    offset += png.length;
    entries.push(e);
  });
  return Buffer.concat([head, ...entries, ...pngs]);
}

export async function POST(req: NextRequest) {
  const host = req.headers.get('host') ?? '';
  const local = /^(localhost|127\.0\.0\.1|\[::1\])(:\d+)?$/.test(host);
  if (process.env.NODE_ENV !== 'development' || !local) return new NextResponse(null, { status: 404 });
  const origin = req.headers.get('origin');
  if (origin && new URL(origin).host !== host) return NextResponse.json({ ok: false, error: 'Špatný původ.' }, { status: 403 });

  const form = await req.formData();
  const hexOf = (k: string) => {
    const v = String(form.get(k) ?? '');
    return /^#[0-9a-f]{6}$/.test(v) ? v : null;
  };
  const p = hexOf('p'); // primární (růžová)
  const sec = hexOf('s'); // sekundární (šedá)
  const bdHex = String(form.get('bgd') ?? '');
  const blHex = String(form.get('bgl') ?? '');
  const bgOk = (hex: string) => hex === '' || /^#[0-9a-f]{6}$/.test(hex);
  if (!p || !sec) return NextResponse.json({ ok: false, error: 'Neplatná barva.' }, { status: 400 });
  if (!bgOk(bdHex) || !bgOk(blHex)) return NextResponse.json({ ok: false, error: 'Neplatné pozadí.' }, { status: 400 });
  // spočítané hodnoty (odstín / sytost / posun světlosti, u pozadí světlost / sytost / odstín)
  const num = (name: string, lo: number, hi: number) => {
    const v = Number(form.get(name));
    if (!Number.isFinite(v) || v < lo || v > hi) throw new Error('Neplatná barva.');
    return String(v);
  };
  const bgNum = (key: string, name: 'l' | 'c' | 'h', hex: string, fallback: string) =>
    hex ? num(`${key}-${name}`, 0, 360) : fallback;

  try {
    // 1) soubory z formuláře — nejdřív zkontrolovat, teprve potom cokoli zapisovat
    const buf = new Map<string, Buffer>();
    for (const [name, v] of form.entries()) {
      if (typeof v !== 'string' && /^[\w.-]+\.png$/.test(name)) buf.set(name, Buffer.from(await v.arrayBuffer()));
    }
    const need = ['icon-512.png', 'apple-icon.png', 'favicon-16.png', 'favicon-32.png', 'favicon-48.png'];
    if (need.some((n) => !buf.has(n))) throw new Error('Chybí vygenerované ikony.');

    // 2) výchozí barva v CSS a v Color studiu
    const cssPath = abs('app/globals.css');
    let css = await readFile(cssPath, 'utf8');
    css = css
      .replace(/--primary-h:\s*[^;]+;/, `--primary-h: ${num('primary-h', 0, 360)};`)
      .replace(/--primary-c:\s*[^;]+;/, `--primary-c: ${num('primary-c', 0, 0.4)};`)
      .replace(/--primary-l-adj:\s*[^;]+;/, `--primary-l-adj: ${num('primary-l-adj', -0.4, 0.4)};`)
      .replace(/--secondary-h:\s*[^;]+;/, `--secondary-h: ${num('secondary-h', 0, 360)};`)
      .replace(/--secondary-c:\s*[^;]+;/, `--secondary-c: ${num('secondary-c', 0, 0.4)};`)
      .replace(/--secondary-l-adj:\s*[^;]+;/, `--secondary-l-adj: ${num('secondary-l-adj', -0.4, 0.4)};`)
      .replace(/--bgd-l:\s*[^;]+;/, `--bgd-l: ${bgNum('bgd', 'l', bdHex, '0.145')};`)
      .replace(/--bgd-c:\s*[^;]+;/, `--bgd-c: ${bgNum('bgd', 'c', bdHex, '0.006')};`)
      .replace(/--bgd-h:\s*[^;]+;/, `--bgd-h: ${bgNum('bgd', 'h', bdHex, 'var(--secondary-h)')};`)
      .replace(/--bgl-l:\s*[^;]+;/, `--bgl-l: ${bgNum('bgl', 'l', blHex, '0.985')};`)
      .replace(/--bgl-c:\s*[^;]+;/, `--bgl-c: ${bgNum('bgl', 'c', blHex, '0.005')};`)
      .replace(/--bgl-h:\s*[^;]+;/, `--bgl-h: ${bgNum('bgl', 'h', blHex, 'var(--secondary-h)')};`);
    await writeFile(cssPath, css);

    const csPath = abs('components/ColorStudio.tsx');
    let cs = await readFile(csPath, 'utf8');
    cs = cs.replace(/const DEF: Brand = \{[^}]*\};/, `const DEF: Brand = { p: '${p}', s: '${sec}', bd: '${bdHex}', bl: '${blHex}' };`);
    await writeFile(csPath, cs);

    // 3) ikony a sada log
    await mkdir(abs('brand'), { recursive: true });
    for (const [name, b] of buf) await writeFile(abs(`brand/${name}`), b);
    await writeFile(abs('app/icon.png'), buf.get('icon-512.png')!);
    await writeFile(abs('app/apple-icon.png'), buf.get('apple-icon.png')!);
    await writeFile(abs('app/favicon.ico'), ico([16, 32, 48].map((s) => buf.get(`favicon-${s}.png`)!), [16, 32, 48]));

    // 4) commit + push
    const git = (...a: string[]) => run('git', a, { cwd: root, timeout: 60000 });
    await git('add', 'app/globals.css', 'components/ColorStudio.tsx', 'app/icon.png', 'app/apple-icon.png', 'app/favicon.ico', 'brand');
    const msg = `Colours: primary ${p}, secondary ${sec} (Color studio)\n\nCo-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>`;
    await git('commit', '-m', msg);
    let pushed = true;
    try {
      await git('push');
    } catch {
      pushed = false;
    }
    return NextResponse.json({ ok: true, pushed });
  } catch (e) {
    const err = e as { stderr?: string; message?: string };
    return NextResponse.json({ ok: false, error: (err.stderr || err.message || 'Uložení selhalo.').slice(0, 300) }, { status: 500 });
  }
}
