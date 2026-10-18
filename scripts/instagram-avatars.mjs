/*
 * Profilovky pro Instagram (a jiné sítě), 1080×1080 px, vykreslené stejným kouřem
 * jako hero a loader na webu (doménově warpovaný fbm šum).
 *
 *   node scripts/instagram-avatars.mjs [složka-pro-náhledy]
 *
 * Výstup: brand/instagram/*.png. Instagram ořízne čtverec do kruhu, takže všechno důležité
 * je uvnitř kruhu o průměru ~80 % šířky. Se složkou jako argumentem vyrobí i náhledový list
 * s kruhovým ořezem ve velikostech 360 / 110 / 64 / 32 px.
 */
import { createRequire } from 'node:module';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const sharp = require('sharp');
const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const wm = JSON.parse(readFileSync(join(root, 'scripts/brand/wordmark.json'), 'utf8'));
const W = 1080;

/* ── kouř: stejné funkce jako ve fragment shaderu hero/loaderu ──── */
const fract = (x) => x - Math.floor(x);
const hash = (x, y) => {
  let px = fract(x * 123.34);
  let py = fract(y * 456.21);
  const d = px * (px + 45.32) + py * (py + 45.32);
  px += d;
  py += d;
  return fract(px * py);
};
const noise = (x, y) => {
  const ix = Math.floor(x), iy = Math.floor(y);
  const fx = x - ix, fy = y - iy;
  const a = hash(ix, iy), b = hash(ix + 1, iy), c = hash(ix, iy + 1), d = hash(ix + 1, iy + 1);
  const ux = fx * fx * (3 - 2 * fx), uy = fy * fy * (3 - 2 * fy);
  return a + (b - a) * ux + (c - a) * uy + (a - b - c + d) * ux * uy;
};
const fbm = (x, y) => {
  let v = 0, a = 0.5;
  for (let i = 0; i < 4; i++) {
    v += a * noise(x, y);
    const nx = 1.6 * x - 1.2 * y;
    y = 1.2 * x + 1.6 * y;
    x = nx;
    a *= 0.5;
  }
  return v;
};
const smooth = (e0, e1, x) => {
  const t = Math.min(1, Math.max(0, (x - e0) / (e1 - e0)));
  return t * t * (3 - 2 * t);
};
/** pole kouře f (0..1) pro W×W px; `o` posouvá vzorek, ať mají vrstvy jiný tvar */
function smokeField(scale, o) {
  const f = new Float32Array(W * W);
  for (let j = 0; j < W; j++) {
    for (let i = 0; i < W; i++) {
      const px = (i / W - 0.5) * scale, py = (j / W - 0.5) * scale;
      const wx = fbm(px * 2.2 + o, py * 2.2 + o * 0.7);
      const wy = fbm(px * 2.2 + 3.3 + o * 0.4, py * 2.2 - o);
      const n = fbm(px * 2.6 + 2.1 * (wx - 0.5) + o * 0.3, py * 2.6 + 2.1 * (wy - 0.5) - o * 0.2);
      f[j * W + i] = smooth(0.25, 0.75, n);
    }
  }
  return f;
}
const mix = (a, b, t) => a + (b - a) * t;
const hex = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
const BASE = hex('#0f0a13');
const DEEP = hex('#6a2f7a');
const PINK = hex('#fea6fd');
const HOT = hex('#ff8af2');

const rgba = (px) => sharp(Buffer.from(px.buffer), { raw: { width: W, height: W, channels: 4 } }).png().toBuffer();

/** pozadí: tmavý střed, kouř se sbírá k okrajům (jako po stranách hero) */
async function backdrop(f, strength = 1) {
  const px = new Uint8ClampedArray(W * W * 4);
  for (let j = 0; j < W; j++) {
    for (let i = 0; i < W; i++) {
      const r = Math.hypot(i - W / 2, j - W / 2) / (W / 2);
      const edge = smooth(0.42, 1.0, r);
      const v = f[j * W + i] * edge * 0.95 * strength;
      const k1 = smooth(0.08, 0.62, v), k2 = smooth(0.7, 1.0, v);
      const o = (j * W + i) * 4;
      for (let c = 0; c < 3; c++) px[o + c] = mix(mix(BASE[c], DEEP[c], k1), PINK[c], k2 * 0.6);
      px[o + 3] = 255;
    }
  }
  return rgba(px);
}
/** výplň písmen: kouř v primární barvě, na světlinách do bílé, nahoře o něco světlejší */
async function smokeFill(f) {
  const px = new Uint8ClampedArray(W * W * 4);
  for (let j = 0; j < W; j++) {
    for (let i = 0; i < W; i++) {
      const v = f[j * W + i];
      const o = (j * W + i) * 4;
      const lift = 0.07 * (1 - j / W);
      for (let c = 0; c < 3; c++) {
        const base = mix(HOT[c] * 0.72, HOT[c], smooth(0.1, 0.85, v));
        const white = mix(base, 255, 0.34 * smooth(0.62, 1, v) + lift);
        px[o + c] = white;
      }
      px[o + 3] = 255;
    }
  }
  return rgba(px);
}

/* ── tvary ──────────────────────────────────────────────────────── */
function glyphs(text, size, cx, cy, fill) {
  const k = size / wm.unitsPerEm;
  const ls = 0.01 * size;
  const total = [...text].reduce((s, ch) => s + wm.glyphs[ch].adv * k + ls, -ls);
  let x = cx - total / 2;
  const base = cy + (wm.capHeight * k) / 2;
  let out = '';
  for (const ch of text) {
    out += `<path transform="translate(${x.toFixed(1)} ${base.toFixed(1)}) scale(${k})" d="${wm.glyphs[ch].d}"/>`;
    x += wm.glyphs[ch].adv * k + ls;
  }
  // syntetický bold jako u loga na webu
  return `<g fill="${fill}" stroke="${fill}" stroke-width="${(size / 46 / k).toFixed(1)}" stroke-linejoin="round">${out}</g>`;
}
const svg = (inner, defs = '') =>
  Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${W}" width="${W}" height="${W}"><defs>${defs}</defs>${inner}</svg>`);
/** filtr přes celou plochu v jednotkách elementu, ať rozostření neořízne obdélník kolem tvaru */
const blur = (id, s, box = [0, 0, W, W]) =>
  `<filter id="${id}" filterUnits="userSpaceOnUse" x="${box[0]}" y="${box[1]}" width="${box[2]}" height="${box[3]}"><feGaussianBlur stdDeviation="${s}"/></filter>`;

const fBg = smokeField(0.95, 0.0);
const fInk = smokeField(1.7, 7.3);
/** jemné filmové zrno, ať plochy nevypadají digitálně hladce */
const grain = (() => {
  const px = new Uint8ClampedArray(W * W * 4);
  let seed = 7;
  for (let i = 0; i < W * W; i++) {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    const v = (seed >>> 24) & 255;
    px[i * 4] = px[i * 4 + 1] = px[i * 4 + 2] = v;
    px[i * 4 + 3] = 46;
  }
  return rgba(px);
})();
const bgRaw = await backdrop(fBg);
const bg = await sharp(await sharp(bgRaw).blur(16).png().toBuffer())
  .composite([{ input: await grain, blend: 'soft-light' }])
  .png()
  .toBuffer();
const ink = await sharp(await smokeFill(fInk)).blur(5).png().toBuffer();

/** monogram nebo slovo: záře, výplň kouřem, tenký světlý okraj nahoře */
async function lettering(text, size) {
  const shape = glyphs(text, size, W / 2, W / 2 + 6, '#fff');
  const halo = svg(
    `<g filter="url(#b1)" opacity=".8">${glyphs(text, size, W / 2, W / 2 + 6, '#ff5fe9')}</g><g filter="url(#b2)" opacity=".5">${glyphs(text, size, W / 2, W / 2 + 6, '#ff9bf2')}</g>`,
    blur('b1', size * 0.07) + blur('b2', size * 0.2),
  );
  const mask = await sharp(svg(shape)).png().toBuffer();
  const letters = await sharp(ink).composite([{ input: mask, blend: 'dest-in' }]).png().toBuffer();
  const rim = svg(`<g fill="none" stroke="#fff" stroke-opacity=".5" stroke-width="2">${glyphs(text, size, W / 2, W / 2 + 6, 'none').replace(/stroke="none"/, 'stroke="#fff"')}</g>`);
  return sharp(bg).composite([{ input: halo }, { input: letters }]).png().toBuffer();
}

const BODY = 'M26 26 44 38Q60 33 76 38L94 26Q100 44 100 64C100 92 84 106 60 106 36 106 20 92 20 64Q20 44 26 26Z';
/** sova jako silueta vynořená z kouře, jen oči svítí (měsíc a slunce) */
async function owlInTheDark() {
  const t = 'translate(540 548) scale(6.6) translate(-60 -66)';
  const defs =
    blur('g1', 4, [-60, -60, 240, 240]) + blur('g2', 1.4, [-60, -60, 240, 240]) +
    `<linearGradient id="bd" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3a2b44"/><stop offset="1" stop-color="#1a1320"/></linearGradient>
     <linearGradient id="rim" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffd2fb"/><stop offset=".5" stop-color="#ff9bf2" stop-opacity=".25"/><stop offset="1" stop-color="#ff9bf2" stop-opacity="0"/></linearGradient>
     <radialGradient id="eg"><stop offset="0" stop-color="#ff7ff0" stop-opacity=".9"/><stop offset="1" stop-color="#ff7ff0" stop-opacity="0"/></radialGradient>
     <mask id="cres" maskUnits="userSpaceOnUse" x="20" y="40" width="44" height="40"><rect x="20" y="40" width="44" height="40" fill="#fff"/><circle cx="46.6" cy="56.4" r="10.2" fill="#000"/></mask>`;
  const inner = `
    <g transform="${t}">
      <path d="${BODY}" fill="#ff5fe9" opacity=".5" filter="url(#g1)" stroke="#ff5fe9" stroke-width="6"/>
      <path d="${BODY}" fill="url(#bd)" stroke="url(#rim)" stroke-width="2.4" stroke-linejoin="round"/>
      <path d="M60 42C48 32 28 39 28 60 28 77 43 85 60 82 77 85 92 77 92 60 92 39 72 32 60 42Z" fill="#7d4d8c" fill-opacity=".34"/>
      <path d="M55 74Q60 72 65 74L60 83Z" fill="#b07ac0" fill-opacity=".75" stroke="#b07ac0" stroke-opacity=".75" stroke-width="2.4" stroke-linejoin="round"/>
      <circle cx="78" cy="60" r="28" fill="url(#eg)"/>
      <circle cx="42" cy="60" r="28" fill="url(#eg)" opacity=".75"/>
      <g filter="url(#g2)" opacity=".85">
        <circle cx="42" cy="60" r="11" fill="#ffe9fb" mask="url(#cres)"/>
        <circle cx="78" cy="60" r="11" fill="#ffe9fb"/>
      </g>
      <circle cx="42" cy="60" r="11" fill="#fff6fe" mask="url(#cres)"/>
      <circle cx="78" cy="60" r="11" fill="#fff6fe"/>
    </g>`;
  return sharp(bg).composite([{ input: svg(inner, defs) }]).png().toBuffer();
}

const out = join(root, 'brand/instagram');
mkdirSync(out, { recursive: true });
const sets = [
  ['a-fs-kour', await lettering('FS', 560)],
  ['b-oci-ve-tme', await owlInTheDark()],
  ['c-fain-kour', await lettering('FaiN', 340)],
];
for (const [name, buf] of sets) writeFileSync(join(out, `${name}.png`), buf);

/* ── náhled s kruhovým ořezem (jako to uvidí Instagram) ─────────── */
const dir = process.argv[2];
if (dir) {
  const circle = (n) => Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${n}" height="${n}"><circle cx="${n / 2}" cy="${n / 2}" r="${n / 2}"/></svg>`);
  const crop = async (buf, n) =>
    sharp(buf).resize(n, n).composite([{ input: circle(n), blend: 'dest-in' }]).png().toBuffer();
  const sizes = [320, 110, 64, 32];
  const sheetW = 4 * 340 + 60, sheetH = 3 * 380 + 40;
  const layers = [];
  for (const [r, [, buf]] of sets.entries()) {
    let x = 20;
    for (const n of sizes) {
      layers.push({ input: await crop(buf, n), left: x, top: 20 + r * 380 + (320 - n) / 2 });
      x += n + 30 + (n === 320 ? 20 : 0);
    }
  }
  const sheet = await sharp({ create: { width: sheetW, height: sheetH, channels: 4, background: '#0d0a10' } })
    .composite(layers)
    .png()
    .toBuffer();
  writeFileSync(join(dir, 'avatars-sheet.png'), sheet);
}
console.log('hotovo: brand/instagram/');
