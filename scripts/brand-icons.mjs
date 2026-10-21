/*
 * Ikony webu z kreslené osmicípé hvězdičky (lib/star.ts):
 *   node scripts/brand-icons.mjs [#barva]
 * → app/icon.png (512), app/apple-icon.png (180), app/favicon.ico (16, 32, 48).
 * Výchozí barva je primární z globals.css (oklch 0.7126 0.1294 297 ≈ #ab90e9).
 */
import { createRequire } from 'node:module';
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const sharp = require('sharp');
const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const src = readFileSync(join(root, 'lib/star.ts'), 'utf8');
const D = src.match(/STAR_D =\s*'([^']+)'/)[1];

const BG = '#0f0e12';
const COLOR = process.argv[2] || '#ab90e9';

/* hvězdička na tmavé dlaždici; round = průhledné rohy (favicony), jinak celá plocha (iOS si rohy zaoblí sám) */
const tile = (size, round, stroke) => {
  const k = (size * 0.74) / 100;
  const off = (size - 100 * k) / 2;
  const rx = round ? size * 0.22 : 0;
  return Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}"><rect width="${size}" height="${size}" rx="${rx}" fill="${BG}"/><g transform="translate(${off} ${off}) scale(${k})"><path d="${D}" fill="${COLOR}" stroke="${COLOR}" stroke-width="${stroke}" stroke-linejoin="round"/></g></svg>`,
  );
};
const png = (size, round, stroke) => sharp(tile(size, round, stroke), { density: 384 }).resize(size, size).png({ compressionLevel: 9 }).toBuffer();

writeFileSync(join(root, 'app/icon.png'), await png(512, true, 4));
writeFileSync(join(root, 'app/apple-icon.png'), await png(180, false, 4));

/* ICO s PNG uvnitř (v malých velikostech tlustší tah) */
const sizes = [16, 32, 48];
const imgs = await Promise.all(sizes.map((s) => png(s, true, s < 32 ? 6 : 5)));
const head = Buffer.alloc(6 + 16 * sizes.length);
head.writeUInt16LE(0, 0);
head.writeUInt16LE(1, 2);
head.writeUInt16LE(sizes.length, 4);
let off = head.length;
sizes.forEach((s, i) => {
  const o = 6 + 16 * i;
  head.writeUInt8(s, o);
  head.writeUInt8(s, o + 1);
  head.writeUInt16LE(1, o + 4);
  head.writeUInt16LE(32, o + 6);
  head.writeUInt32LE(imgs[i].length, o + 8);
  head.writeUInt32LE(off, o + 12);
  off += imgs[i].length;
});
writeFileSync(join(root, 'app/favicon.ico'), Buffer.concat([head, ...imgs]));
console.log('hotovo: icon.png, apple-icon.png, favicon.ico', COLOR);
