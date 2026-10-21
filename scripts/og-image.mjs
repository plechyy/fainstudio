/*
 * Náhledový obrázek pro sdílení (Open Graph / Twitter), 1200 × 630 px → public/og.png.
 *   node scripts/og-image.mjs
 * Logo je z křivek (scripts/brand/logo.json),
 * kouř jsou rozmazané zelené skvrny jako v hero. Texty používají systémové písmo.
 */
import { createRequire } from 'node:module';
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const sharp = require('sharp');
const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const { full } = JSON.parse(readFileSync(join(root, 'scripts/brand/logo.json'), 'utf8'));

const W = 1200;
const H = 630;
const BG = '#0b100e';
const GREEN = '#0fbf7a';
const WHITE = '#f4f8f5';

/* logo (čtyřlístek + „fain studio“) z křivek, vycentrované */
const [bx, by, bw, bh] = full.box;
const LOGO_W = 640;
const k = LOGO_W / bw;
const logoSvg = full.svg.replace(/class="lg-i"/g, `fill="${WHITE}"`).replace(/class="lg-p"/g, `fill="${GREEN}"`);
const markX = (W - LOGO_W) / 2 - bx * k;
const markY = 176 + (bh * k) / 2 - by * k;

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
<defs>
  <filter id="b1" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="70"/></filter>
  <filter id="b2" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="40"/></filter>
  <radialGradient id="v" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#c9f7e1" stop-opacity=".95"/><stop offset=".55" stop-color="${GREEN}" stop-opacity=".85"/><stop offset="1" stop-color="#087a4c" stop-opacity="0"/></radialGradient>
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
<text x="${W / 2}" y="170" text-anchor="middle" font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-size="25" font-weight="600" letter-spacing="5" fill="#c9d6d0">AI AGENTURA PRO AUTOMATIZACI FIREM</text>
<g transform="translate(${markX.toFixed(1)} ${markY.toFixed(1)}) scale(${k.toFixed(4)})">${logoSvg}</g>
<text x="${W / 2}" y="${250 + bh * k + 90}" text-anchor="middle" font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-size="50" font-weight="700" fill="${WHITE}">Umělá inteligence, která maká za vás.</text>
<text x="${W / 2}" y="${H - 58}" text-anchor="middle" font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-size="25" font-weight="500" fill="#b3c4bc">E-maily · faktury · poptávky · AI asistenti · CRM na míru</text>
<text x="${W - 48}" y="${H - 22}" text-anchor="end" font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-size="19" font-weight="600" fill="#87998f">fainstudio.com</text>
</svg>`;

const png = await sharp(Buffer.from(svg), { density: 144 }).resize(W, H).png({ compressionLevel: 9 }).toBuffer();
writeFileSync(join(root, 'public/og.png'), png);
console.log('hotovo: public/og.png', (png.length / 1024).toFixed(0) + ' KB');
