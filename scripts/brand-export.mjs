/*
 * Export loga FaiN Studio do PNG: všechna rozložení × barevné varianty × použití.
 *   node scripts/brand-export.mjs <výstupní složka>
 * Logo = původní malovaný nápis „FaiN Studio“ (scripts/brand/wordmark.json) a kreslená osmicípá hvězdička (lib/star.ts).
 * Výstup patří do administrace (Soubory), ne do repozitáře:
 *   node scripts/admin-upload.mjs loga/export <složka>/*
 */
import { createRequire } from 'node:module';
import { copyFileSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const sharp = require('sharp');
const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const out = process.argv[2];
if (!out) {
  console.error('Zadejte výstupní složku.');
  process.exit(1);
}
const wm = JSON.parse(readFileSync(join(root, 'scripts/brand/wordmark.json'), 'utf8'));
const STAR_D = readFileSync(join(root, 'lib/star.ts'), 'utf8').match(/STAR_D =\s*'([^']+)'/)[1];

/* ── barvy (podle globals.css) ── */
const C = {
  green: '#3cd454', // primární
  deep: '#1d9a35', // primární ztmavená na světlé pozadí (kontrast)
  dark: '#222222', // tmavé pozadí
  light: '#eaedea', // světlé pozadí
  white: '#f7f7f5',
  black: '#161616',
};

/* varianty: ink = „FaiN“, acc = „Studio“ a hvězdička, bg = pozadí, pro které je varianta určená */
const WAYS = {
  'barevne-na-tmave': { ink: C.white, acc: C.green, bg: C.dark, solid: true, trans: true },
  'barevne-na-svetle': { ink: C.black, acc: C.deep, bg: C.light, solid: true, trans: true },
  bile: { ink: C.white, acc: C.white, bg: C.dark, solid: false, trans: true },
  cerne: { ink: C.black, acc: C.black, bg: C.light, solid: false, trans: true },
  zelene: { ink: C.green, acc: C.green, bg: C.dark, solid: false, trans: true },
  'cerne-na-zelene': { ink: C.black, acc: C.black, bg: C.green, solid: true, trans: false },
};

/* ── nápis z křivek ── */
const EM = wm.unitsPerEm;
const LS = 0.01 * EM;
const GAP = 0.14 * EM;
const BOLD = EM / 32;
const FULL = [['FaiN', 'ink', true], ['Studio', 'acc', false]];
const SHORT = [['FaiN', 'ink', true]];
function word(parts, w) {
  let x = 0;
  let svg = '';
  parts.forEach(([text, role, bold], pi) => {
    if (pi > 0) x += GAP - LS;
    for (const ch of text) {
      const g = wm.glyphs[ch];
      const f = role === 'ink' ? w.ink : w.acc;
      const st = bold ? ` stroke="${f}" stroke-width="${BOLD.toFixed(1)}" stroke-linejoin="round"` : '';
      svg += `<path transform="translate(${x.toFixed(1)} 0)" d="${g.d}" fill="${f}"${st}/>`;
      x += g.adv + LS;
    }
  });
  return { svg, w: x - LS, box: [0, -880, x - LS, 40] };
}
const star = (size, x, y, color, sw = 4) => `<g transform="translate(${x.toFixed(1)} ${y.toFixed(1)}) scale(${(size / 100).toFixed(4)})"><path d="${STAR_D}" fill="${color}" stroke="${color}" stroke-width="${sw}" stroke-linejoin="round"/></g>`;

const S = 1130;
const beside = (parts) => (w) => {
  const a = word(parts, w);
  const sx = -S - 150;
  const sy = -400 - S / 2;
  return { svg: star(S, sx, sy, w.acc) + a.svg, box: [sx, Math.min(sy, a.box[1]), a.box[2], Math.max(sy + S, a.box[3])] };
};
const LAYOUTS = {
  napis: (w) => {
    const a = word(FULL, w);
    return { svg: a.svg, box: a.box };
  },
  vodorovne: beside(FULL),
  kratce: beside(SHORT),
  'pod-sebou': (w) => {
    const a = word(FULL, w);
    const size = 1000;
    const sx = (a.w - size) / 2;
    const sy = -880 - 140 - size;
    return { svg: star(size, sx, sy, w.acc) + a.svg, box: [0, sy, a.w, 40] };
  },
  hvezda: (w) => ({ svg: star(1000, 0, 0, w.acc), box: [80, 50, 920, 940] }),
};
const LAYOUT_NAMES = { napis: 'Nápis', vodorovne: 'Hvězdička vedle nápisu', kratce: 'Hvězdička a FaiN', 'pod-sebou': 'Hvězdička nad nápisem', hvezda: 'Jen hvězdička' };

/* ── vykreslení ── */
const files = [];
async function save(dir, name, svg, w, h) {
  mkdirSync(join(out, dir), { recursive: true });
  const buf = await sharp(Buffer.from(svg), { density: 300 }).resize(w, h).png({ compressionLevel: 9 }).toBuffer();
  writeFileSync(join(out, dir, name), buf);
  files.push(`${dir}/${name}`);
}
/* přesně oříznuté logo, šířka v px; bg = pozadí nebo null (průhledné) */
async function tight(dir, name, g, { width, bg = null, pad = 0.07 }) {
  const [x0, y0, x1, y1] = g.box;
  const bw = x1 - x0;
  const bh = y1 - y0;
  const p = pad * Math.max(bw, bh);
  const vw = bw + 2 * p;
  const vh = bh + 2 * p;
  const height = Math.round((width * vh) / vw);
  const rect = bg ? `<rect x="${x0 - p}" y="${y0 - p}" width="${vw}" height="${vh}" fill="${bg}"/>` : '';
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${x0 - p} ${y0 - p} ${vw} ${vh}" width="${width}" height="${height}">${rect}${g.svg}</svg>`;
  await save(dir, name, svg, width, height);
}
/* logo vycentrované na plátně W × H, do rámečku fw × fh podílu plátna */
async function fit(dir, name, g, W, H, { bg, fw = 0.5, fh = 0.5 }) {
  const [x0, y0, x1, y1] = g.box;
  const bw = x1 - x0;
  const bh = y1 - y0;
  const k = Math.min((fw * W) / bw, (fh * H) / bh);
  const tx = (W - bw * k) / 2 - x0 * k;
  const ty = (H - bh * k) / 2 - y0 * k;
  const rect = bg ? `<rect width="${W}" height="${H}" fill="${bg}"/>` : '';
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">${rect}<g transform="translate(${tx.toFixed(2)} ${ty.toFixed(2)}) scale(${k.toFixed(5)})">${g.svg}</g></svg>`;
  await save(dir, name, svg, W, H);
}

/* 1) hlavní soubory: rozložení × barevné varianty (průhledné i na pozadí) */
for (const [ln, mk] of Object.entries(LAYOUTS)) {
  for (const [wn, w] of Object.entries(WAYS)) {
    const g = mk(w);
    const width = ln === 'hvezda' ? 1400 : 2400;
    if (w.trans) await tight('01-hlavni', `${ln}-${wn}.png`, g, { width });
    if (w.solid) await tight('01-hlavni', `${ln}-${wn}-s-pozadim.png`, g, { width, bg: w.bg, pad: 0.12 });
  }
}

/* 2) favicony a ikony aplikací: hvězdička na dlaždici i samotná */
const SIZES = [16, 32, 48, 64, 96, 128, 180, 192, 256, 512];
const tile = (size, bg, fg, round) => {
  const k = (size * 0.74) / 100;
  const off = (size - 100 * k) / 2;
  const sw = size < 40 ? 8 : size < 100 ? 6 : 4;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}"><rect width="${size}" height="${size}" rx="${round ? size * 0.22 : 0}" fill="${bg}"/><g transform="translate(${off} ${off}) scale(${k})"><path d="${STAR_D}" fill="${fg}" stroke="${fg}" stroke-width="${sw}" stroke-linejoin="round"/></g></svg>`;
};
for (const s of SIZES) {
  await save('02-favicony', `dlazdice-tmava-${s}.png`, tile(s, C.dark, C.green, s !== 180), s, s);
  await save('02-favicony', `dlazdice-zelena-${s}.png`, tile(s, C.green, C.black, s !== 180), s, s);
  await save('02-favicony', `dlazdice-svetla-${s}.png`, tile(s, C.light, C.deep, s !== 180), s, s);
  await save('02-favicony', `hvezda-pruhledna-${s}.png`, `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="${s}" height="${s}">${star(100, 0, 0, C.green, s < 40 ? 8 : 4)}</svg>`, s, s);
}

/* 3) profilovky (1080 × 1080, logo uvnitř bezpečného kruhu) */
const AV = 1080;
const avatar = [
  ['hvezda-zelena-na-tmave', 'hvezda', 'barevne-na-tmave', C.dark, 0.58],
  ['hvezda-cerna-na-zelene', 'hvezda', 'cerne-na-zelene', C.green, 0.58],
  ['hvezda-zelena-na-svetle', 'hvezda', 'barevne-na-svetle', C.light, 0.58],
  ['hvezda-bila-na-tmave', 'hvezda', 'bile', C.dark, 0.58],
  ['napis-na-tmave', 'napis', 'barevne-na-tmave', C.dark, 0.7],
  ['napis-na-svetle', 'napis', 'barevne-na-svetle', C.light, 0.7],
  ['kratce-na-tmave', 'kratce', 'barevne-na-tmave', C.dark, 0.66],
  ['kratce-na-zelene', 'kratce', 'cerne-na-zelene', C.green, 0.66],
  ['pod-sebou-na-tmave', 'pod-sebou', 'barevne-na-tmave', C.dark, 0.6],
];
for (const [name, ln, wn, bg, f] of avatar) await fit('03-profilovky', `${name}.png`, LAYOUTS[ln](WAYS[wn]), AV, AV, { bg, fw: f, fh: f });

/* 4) hlavičky a bannery sociálních sítí */
const BANNERS = [
  ['linkedin-1584x396', 1584, 396],
  ['x-twitter-1500x500', 1500, 500],
  ['facebook-1640x624', 1640, 624],
  ['youtube-2560x1440', 2560, 1440],
];
const BG_WAYS = [['tmave', 'barevne-na-tmave'], ['svetle', 'barevne-na-svetle'], ['zelene', 'cerne-na-zelene']];
for (const [bn, W, H] of BANNERS) {
  for (const [label, wn] of BG_WAYS) {
    await fit('04-bannery', `${bn}-${label}.png`, LAYOUTS.vodorovne(WAYS[wn]), W, H, { bg: WAYS[wn].bg, fw: bn.startsWith('youtube') ? 0.34 : 0.4, fh: bn.startsWith('youtube') ? 0.3 : 0.46 });
  }
}

/* 5) sdílení a e-mail */
copyFileSync(join(root, 'public/og.png'), join(out, '05-sdileni-a-email-og-obrazek-1200x630.png'));
files.push('05-sdileni-a-email-og-obrazek-1200x630.png');
for (const [wn, label] of [['barevne-na-tmave', 'na-tmave'], ['barevne-na-svetle', 'na-svetle']]) {
  for (const width of [480, 960]) await tight('05-sdileni-a-email', `email-podpis-${label}-${width}px.png`, LAYOUTS.vodorovne(WAYS[wn]), { width, pad: 0.05 });
}

/* přehled souborů */
const md = [
  '# Logo FaiN Studio, export PNG',
  '',
  'Logo = původní malovaný nápis a kreslená osmicípá hvězdička. Barvy: primární zelená #3cd454, tmavé pozadí #222222, světlé #eaedea.',
  '',
  '## 01-hlavni (průhledné PNG, 2400 px na šířku; hvězdička 1400 px)',
  `Rozložení: ${Object.entries(LAYOUT_NAMES).map(([k, v]) => `**${k}** = ${v}`).join(', ')}.`,
  'Barvy: **barevne-na-tmave** (bílé FaiN, zelené Studio a hvězdička), **barevne-na-svetle** (černé FaiN, tmavě zelené Studio), **bile**, **cerne**, **zelene** (jen zelená) a **cerne-na-zelene** (jen s pozadím).',
  'Soubory s koncovkou `-s-pozadim` mají vyplněné pozadí.',
  '',
  '## 02-favicony',
  'Hvězdička na tmavé, zelené a světlé dlaždici a průhledná, ve velikostech ' + SIZES.join(', ') + ' px. 180 px je pro iPhone (bez zaoblení).',
  '',
  '## 03-profilovky',
  '1080 × 1080, logo uvnitř bezpečné zóny, aby ho nepřeřízlo kruhové ořezání.',
  '',
  '## 04-bannery',
  'LinkedIn 1584×396, X 1500×500, Facebook 1640×624, YouTube 2560×1440, každý na tmavém, světlém a zeleném pozadí.',
  '',
  '## 05-sdileni-a-email',
  'Obrázek pro sdílení (1200×630) a logo do e-mailového podpisu (480 a 960 px, průhledné).',
  '',
  `Celkem ${files.length} souborů.`,
].join('\n');
writeFileSync(join(out, '00-prehled.md'), md);
console.log(`hotovo: ${files.length} PNG v ${out}`);
