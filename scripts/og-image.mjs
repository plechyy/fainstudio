/*
 * Náhledový obrázek pro sdílení (Open Graph / Twitter), 1200 × 630 px → public/og.png.
 *   node scripts/og-image.mjs
 * Nápis FaiN Studio je z písma loga převedeného na křivky (scripts/brand/wordmark.json),
 * kouř jsou rozmazané fialové skvrny jako v hero. Texty používají systémové písmo.
 */
import { createRequire } from 'node:module';
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const sharp = require('sharp');
const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const wm = JSON.parse(readFileSync(join(root, 'scripts/brand/wordmark.json'), 'utf8'));

const W = 1200;
const H = 630;
const BG = '#0f0e12';
const VIOLET = '#bb9e90';
const WHITE = '#f7f2f4';

/* nápis z křivek: FaiN (tučně) + Studio */
const EM = wm.unitsPerEm;
const SIZE = 150; // výška em v px
const k = SIZE / EM;
const LS = 0.01 * EM;
const GAP = 0.14 * EM;
let x = 0;
let paths = '';
const put = (text, fill, bold) => {
  for (const ch of text) {
    const g = wm.glyphs[ch];
    const stroke = bold ? ` stroke="${fill}" stroke-width="${(EM / 32).toFixed(1)}" stroke-linejoin="round"` : '';
    paths += `<path transform="translate(${x.toFixed(1)} 0)" d="${g.d}" fill="${fill}"${stroke}/>`;
    x += g.adv + LS;
  }
};
put('FaiN', WHITE, true);
x += GAP - LS;
put('Studio', VIOLET, false);
const markW = (x - LS) * k;
/* kreslená hvězdička před nápisem (lib/star.ts) */
const STAR_D = readFileSync(join(root, 'lib/star.ts'), 'utf8').match(/STAR_D =\s*'([^']+)'/)[1];
const STAR = 170;
const STAR_GAP = 24;
const totalW = STAR + STAR_GAP + markW;
const starX = (W - totalW) / 2;
const markX = starX + STAR + STAR_GAP;
const markY = 250;

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
<defs>
  <filter id="b1" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="70"/></filter>
  <filter id="b2" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="40"/></filter>
  <radialGradient id="v" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#f1e1d9" stop-opacity=".95"/><stop offset=".55" stop-color="${VIOLET}" stop-opacity=".85"/><stop offset="1" stop-color="#684f42" stop-opacity="0"/></radialGradient>
  <linearGradient id="fade" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${BG}" stop-opacity="0"/><stop offset="1" stop-color="${BG}" stop-opacity=".85"/></linearGradient>
</defs>
<rect width="${W}" height="${H}" fill="${BG}"/>
<g filter="url(#b1)">
  <ellipse cx="40" cy="260" rx="240" ry="300" fill="url(#v)"/>
  <ellipse cx="1180" cy="190" rx="230" ry="290" fill="url(#v)"/>
</g>
<g filter="url(#b2)" opacity=".55">
  <ellipse cx="120" cy="520" rx="160" ry="110" fill="url(#v)"/>
  <ellipse cx="1090" cy="560" rx="170" ry="110" fill="url(#v)"/>
</g>
<rect width="${W}" height="${H}" fill="url(#fade)" opacity=".6"/>
<text x="${W / 2}" y="170" text-anchor="middle" font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-size="25" font-weight="600" letter-spacing="5" fill="#d6cfca">AI AGENTURA PRO AUTOMATIZACI FIREM</text>
<g transform="translate(${starX.toFixed(1)} ${(322 - STAR / 2).toFixed(1)}) scale(${(STAR / 100).toFixed(3)})"><path d="${STAR_D}" fill="${VIOLET}" stroke="${VIOLET}" stroke-width="4" stroke-linejoin="round"/></g>
<g transform="translate(${markX.toFixed(1)} ${(markY + 0.82 * SIZE).toFixed(1)}) scale(${k})">${paths}</g>
<text x="${W / 2}" y="${markY + 0.82 * SIZE + 100}" text-anchor="middle" font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-size="50" font-weight="700" fill="${WHITE}">Umělá inteligence, která maká za vás.</text>
<text x="${W / 2}" y="${H - 58}" text-anchor="middle" font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-size="25" font-weight="500" fill="#bdb5af">E-maily · faktury · poptávky · AI asistenti · CRM na míru</text>
<text x="${W - 48}" y="${H - 22}" text-anchor="end" font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-size="19" font-weight="600" fill="#958d87">fainstudio.com</text>
</svg>`;

const png = await sharp(Buffer.from(svg), { density: 144 }).resize(W, H).png({ compressionLevel: 9 }).toBuffer();
writeFileSync(join(root, 'public/og.png'), png);
console.log('hotovo: public/og.png', (png.length / 1024).toFixed(0) + ' KB');
