import { createRequire } from 'node:module';
import { readFileSync, writeFileSync } from 'node:fs';
const require = createRequire('/Users/macbook/ClaudeCode/FaiN3/package.json');
const sharp = require('sharp');
// node render.mjs in.svg out.png [width]
const [, , inp, out, width] = process.argv;
const svg = readFileSync(inp);
await sharp(svg, { density: 96 }).resize({ width: width ? +width : undefined }).png().toFile(out);
console.log('ok', out);
