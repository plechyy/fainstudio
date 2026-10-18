/*
 * Export loga FainStudio: sova (značka) a horizontální logo se slovem „FaiN Studio“.
 *
 *   node scripts/brand-export.mjs
 *
 * Vyrobí brand/logo-pack/ (SVG + průhledná PNG ve třech barvách: color, white, black), ikony
 * webu (app/icon.png, app/apple-icon.png, app/favicon.ico) a brand/logo-pack/fainstudio-brand-pack.zip.
 * Starší soubory v brand/ nechává být.
 * Písmena jsou z fontu loga převedená na křivky (scripts/brand/wordmark.json), takže export
 * nepotřebuje nainstalovaný font. Geometrie sovy je stejná jako v components/LogoOwl.tsx.
 */
import { createRequire } from 'node:module';
import { execFileSync } from 'node:child_process';
import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const sharp = require('sharp');
const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const wm = JSON.parse(readFileSync(join(root, 'scripts/brand/wordmark.json'), 'utf8'));

/* ── paleta ─────────────────────────────────────────────────────── */
const C = {
  eye: '#1d1424',
  cream: '#ffe8fa',
  wing: '#6b2a73',
  dark: {
    top: '#ffb9ff', bot: '#c16acf', word: '#ffffff', sub: '#ffa4fb',
  },
  light: {
    top: '#e888ec', bot: '#a948b3', word: '#1d1424', sub: '#a63dad',
  },
};

/* ── sova ───────────────────────────────────────────────────────── */
const BODY = 'M24 24 41 37Q60 30 79 37L96 24Q102 44 102 64C102 92 86 109 60 109 34 109 18 92 18 64Q18 44 24 24Z';
const WINGS = 'M20 68C20 90 33 103 47 107 38 96 33 84 33 70Z M100 68C100 90 87 103 73 107 82 96 87 84 87 70Z';
const FACE = 'M60 41C48 31 27 38 27 59 27 77 43 85 60 82 77 85 93 77 93 59 93 38 72 31 60 41Z';
const CHEST = 'M46 92l6 5 6-5M62 92l6 5 6-5';
const BEAK = 'M55 71Q60 68.5 65 71L60 81Z';

/** @param {string} id předpona id (v jednom dokumentu může být víc sov) */
function owl(id, mode, pal) {
  if (mode === 'color') {
    return `
<defs>
  <linearGradient id="${id}g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${pal.top}"/><stop offset="1" stop-color="${pal.bot}"/></linearGradient>
  <mask id="${id}m" maskUnits="userSpaceOnUse" x="20" y="35" width="44" height="48"><rect x="20" y="35" width="44" height="48" fill="#fff"/><circle cx="47" cy="56" r="9.4" fill="#000"/></mask>
</defs>
<path d="${BODY}" fill="url(#${id}g)" stroke="url(#${id}g)" stroke-width="5" stroke-linejoin="round"/>
<path d="${WINGS}" fill="${C.wing}" fill-opacity=".22"/>
<path d="${FACE}" fill="#fff" fill-opacity=".26"/>
<path d="${CHEST}" fill="none" stroke="${C.wing}" stroke-opacity=".35" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
<circle cx="42" cy="59" r="15.5" fill="${C.eye}"/><circle cx="78" cy="59" r="15.5" fill="${C.eye}"/>
<circle cx="42" cy="59" r="10.5" fill="${C.cream}" mask="url(#${id}m)"/><circle cx="78" cy="59" r="10.5" fill="${C.cream}"/>
<path d="${BEAK}" fill="${C.eye}" stroke="${C.eye}" stroke-width="2.6" stroke-linejoin="round"/>`;
  }
  // jednobarevná: oční důlky, zobák a peří na hrudi jsou vyříznuté (průhledné), měsíc a slunce plné
  return `
<defs>
  <mask id="${id}k" maskUnits="userSpaceOnUse" x="0" y="0" width="120" height="120">
    <rect width="120" height="120" fill="#fff"/>
    <circle cx="42" cy="59" r="15.5" fill="#000"/><circle cx="78" cy="59" r="15.5" fill="#000"/>
    <path d="${BEAK}" fill="#000" stroke="#000" stroke-width="2.6" stroke-linejoin="round"/>
    <path d="${CHEST}" fill="none" stroke="#000" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  </mask>
  <mask id="${id}m" maskUnits="userSpaceOnUse" x="20" y="35" width="44" height="48"><rect x="20" y="35" width="44" height="48" fill="#fff"/><circle cx="47" cy="56" r="9.4" fill="#000"/></mask>
</defs>
<path d="${BODY}" fill="${pal}" stroke="${pal}" stroke-width="5" stroke-linejoin="round" mask="url(#${id}k)"/>
<circle cx="42" cy="59" r="10.5" fill="${pal}" mask="url(#${id}m)"/><circle cx="78" cy="59" r="10.5" fill="${pal}"/>`;
}

/* ── slovo FaiN Studio z křivek ─────────────────────────────────── */
const SIZE = 64; // velikost písma v jednotkách loga
const k = SIZE / wm.unitsPerEm;
const LS = 0.01 * SIZE; // letter-spacing jako na webu
function word(text, x, base, fill, bold) {
  let out = '';
  let cx = x;
  for (const ch of text) {
    const g = wm.glyphs[ch];
    out += `<path transform="translate(${cx.toFixed(2)} ${base}) scale(${k})" d="${g.d}"/>`;
    cx += g.adv * k + LS;
  }
  const stroke = bold ? ` stroke="${fill}" stroke-width="${(SIZE / 32 / k).toFixed(1)}" stroke-linejoin="round"` : '';
  return { svg: `<g fill="${fill}"${stroke}>${out}</g>`, end: cx };
}

/** horizontální logo: sova + FaiN (tučně) + Studio */
function lockup(mode, pal) {
  const owlH = 84;
  const owlScale = owlH / 96;
  const pad = 6;
  const gap = 18;
  const capH = wm.capHeight * k;
  const cy = pad + owlH / 2; // svislý střed sovy
  const base = cy + capH / 2 + 3; // účaří: velká písmena vystředěná na sově
  const x0 = pad + owlH + gap;
  const fain = word('FaiN', x0, base, mode === 'color' ? pal.word : pal, true);
  const studio = word('Studio', fain.end + 0.14 * SIZE, base, mode === 'color' ? pal.sub : pal, false);
  const W = Math.ceil(studio.end + pad);
  const H = owlH + 2 * pad;
  const body = `<g transform="translate(${pad} ${pad}) scale(${owlScale}) translate(-12 -18)">${owl('l', mode, pal)}</g>${fain.svg}${studio.svg}`;
  return { svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">${body}</svg>`, W, H };
}

const markSvg = (mode, pal) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="8 14 104 104" width="104" height="104">${owl('o', mode, pal)}</svg>`;

/* ── výstup ─────────────────────────────────────────────────────── */
const out = join(root, 'brand/logo-pack');
rmSync(out, { recursive: true, force: true });
const png = (svg, w, h) =>
  sharp(Buffer.from(svg), { density: 600 }).resize(w, h ? h : undefined).png({ compressionLevel: 9 }).toBuffer();

const variants = [
  { dir: 'color', items: [
    { name: 'on-dark', mode: 'color', pal: C.dark },
    { name: 'on-light', mode: 'color', pal: C.light },
  ] },
  { dir: 'white', items: [{ name: '', mode: 'mono', pal: '#ffffff' }] },
  { dir: 'black', items: [{ name: '', mode: 'mono', pal: '#000000' }] },
];
const MARK_SIZES = [1024, 512, 256, 128, 64, 32];
const LOCKUP_WIDTHS = [2400, 1200, 600];

for (const v of variants) {
  mkdirSync(join(out, v.dir, 'svg'), { recursive: true });
  mkdirSync(join(out, v.dir, 'png'), { recursive: true });
  for (const it of v.items) {
    const suffix = it.name ? `-${it.name}` : '';
    const m = markSvg(it.mode, it.pal);
    writeFileSync(join(out, v.dir, 'svg', `mark${suffix}.svg`), m);
    for (const s of MARK_SIZES) writeFileSync(join(out, v.dir, 'png', `mark${suffix}-${s}.png`), await png(m, s, s));
    const l = lockup(it.mode, it.pal);
    writeFileSync(join(out, v.dir, 'svg', `logo${suffix}.svg`), l.svg);
    for (const w of LOCKUP_WIDTHS) writeFileSync(join(out, v.dir, 'png', `logo${suffix}-${w}w.png`), await png(l.svg, w));
  }
}

writeFileSync(
  join(out, 'README.txt'),
  `FainStudio – logo pack
=====================

mark = samotná sova (čtverec), logo = sova + nápis FaiN Studio (na šířku).
Všechna PNG mají průhledné pozadí.

color/  barevná verze. -on-dark pro tmavé pozadí (bílé FaiN), -on-light pro světlé (tmavé FaiN).
white/  celá bílá (na tmavé a barevné pozadí), oči, zobák a peří jsou vyříznuté.
black/  celá černá (na světlé pozadí).
*/svg/  vektorové zdroje (ideální pro tisk a web), */png/ rastr ve více velikostech.

Velikosti: mark 1024 / 512 / 256 / 128 / 64 / 32 px, logo 2400 / 1200 / 600 px na šířku.
`,
);

/* ── ikony webu: sova na tmavé dlaždici ─────────────────────────── */
const tile = (rx, scale) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
<defs>
<linearGradient id="t" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2b2232"/><stop offset="1" stop-color="#141217"/></linearGradient>
<radialGradient id="h" cx="50%" cy="58%" r="50%"><stop offset="0" stop-color="#e68ae6" stop-opacity=".34"/><stop offset="1" stop-color="#e68ae6" stop-opacity="0"/></radialGradient>
</defs>
<rect width="120" height="120" rx="${rx}" fill="url(#t)"/><rect width="120" height="120" rx="${rx}" fill="url(#h)"/>
<g transform="translate(60 60) scale(${scale}) translate(-60 -63)">${owl('i', 'color', C.dark)}</g></svg>`;
const icon = (s, n) => sharp(Buffer.from(s), { density: 384 }).resize(n, n).png({ compressionLevel: 9 }).toBuffer();
writeFileSync(join(root, 'app/icon.png'), await icon(tile(27, 0.78), 512));
writeFileSync(join(root, 'app/apple-icon.png'), await icon(tile(0, 0.74), 180));
const sizes = [16, 32, 48];
const bufs = await Promise.all(sizes.map((n) => icon(tile(n <= 16 ? 24 : 27, n <= 16 ? 0.92 : 0.84), n)));
const head = Buffer.alloc(6);
head.writeUInt16LE(1, 2);
head.writeUInt16LE(sizes.length, 4);
let offset = 6 + 16 * sizes.length;
const dirs = bufs.map((b, i) => {
  const d = Buffer.alloc(16);
  d.writeUInt8(sizes[i], 0);
  d.writeUInt8(sizes[i], 1);
  d.writeUInt16LE(1, 4);
  d.writeUInt16LE(32, 6);
  d.writeUInt32LE(b.length, 8);
  d.writeUInt32LE(offset, 12);
  offset += b.length;
  return d;
});
writeFileSync(join(root, 'app/favicon.ico'), Buffer.concat([head, ...dirs, ...bufs]));

/* ── zip ────────────────────────────────────────────────────────── */
execFileSync('zip', ['-qr', 'fainstudio-brand-pack.zip', 'color', 'white', 'black', 'README.txt'], { cwd: out });
console.log('hotovo: brand/logo-pack/ + ikony webu');
