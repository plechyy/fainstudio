// Test kontrastu napříč odstíny + generátor sRGB fallbacku pro prohlížeče bez oklch.
// Spuštění: npm test  (Node ≥ 22.18 umí importovat .ts nativně)
// Hodnoty MUSÍ odpovídat app/globals.css.
import { writeFileSync } from 'node:fs';
import { contrast, css, toHex } from '../lib/color.ts';

const BRAND_L = { dark: 0.78 };

// c: číslo = pevné chroma, 'b' = --brand-c.
const THEMES = {
  dark: {
    bg: { l: 0.145, c: 0.006 },
    'bg-deep': { l: 0.11, c: 0.006 },
    surface: { l: 0.185, c: 0.008 },
    sunk: { l: 0.125, c: 0.006 },
    ink: { l: 0.97, c: 0.006 },
    'ink-2': { l: 0.73, c: 0.012 },
    'ink-3': { l: 0.56, c: 0.012 },
    'accent-text': { l: 0.82, c: 'b' },
    tick: { l: 0.74, c: 'b' },
  },
};

const tok = (theme, name, h, bc) => {
  const t = THEMES[theme][name];
  return { l: t.l, c: t.c === 'b' ? bc : t.c, h };
};

// on-brand text: tmavý ink oklch(0.2 0.02 h) na akcentu dané světlosti.
const onBrand = (theme, h, c) => {
  const bg = { l: BRAND_L[theme], c, h };
  const dark = { l: 0.2, c: 0.02, h };
  const light = { l: 0.99, c: 0.005, h };
  const dr = contrast(bg, dark);
  const lr = contrast(bg, light);
  return dr >= lr ? { col: dark, ratio: dr, dark: true } : { col: light, ratio: lr, dark: false };
};

const PAIRS = [
  ['ink', 'bg', 4.5],
  ['ink', 'surface', 4.5],
  ['ink', 'sunk', 4.5],
  ['ink', 'bg-deep', 4.5],
  ['ink-2', 'bg', 4.5],
  ['ink-2', 'surface', 4.5],
  ['ink-3', 'bg', 3],
  ['accent-text', 'bg', 4.5],
  ['accent-text', 'surface', 4.5],
];

const HUES = [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330];
const CHROMAS = [0, 0.06, 0.1, 0.15, 0.17, 0.2];

let fails = 0;
let worst = { ratio: Infinity };

for (const h of HUES) {
  for (const c of CHROMAS) {
    for (const theme of ['dark']) {
      const ob = onBrand(theme, h, c);
      if (ob.ratio < 4.5) {
        fails++;
        console.log(`✗ ${theme} text na akcentu h=${h} c=${c}: ${ob.ratio.toFixed(2)}`);
      }
      if (ob.ratio < worst.ratio) worst = { ratio: ob.ratio, what: `on-brand ${theme} h=${h} c=${c}` };
      for (const [fg, bg, min] of PAIRS) {
        const r = contrast(tok(theme, fg, h, c), tok(theme, bg, h, c));
        if (r < min) {
          fails++;
          console.log(`✗ ${theme} ${fg} na ${bg} h=${h} c=${c}: ${r.toFixed(2)} < ${min}`);
        }
      }
    }
  }
}

console.log('\nOdstíny ze zadání (c = 0.15):');
console.log('  h     akcent        akcentní text na pozadí   text na akcentu');
for (const h of [0, 60, 120, 180, 240, 300]) {
  const ad = contrast(tok('dark', 'accent-text', h, 0.15), tok('dark', 'bg', h, 0.15));
  const ob = onBrand('dark', h, 0.15);
  console.log(
    `  ${String(h).padEnd(5)} ${toHex({ l: 0.78, c: 0.15, h })}       ${ad.toFixed(2)}:1                    ${ob.ratio.toFixed(2)}:1 (${ob.dark ? 'tmavý' : 'světlý'})`,
  );
}

// sRGB fallback pro výchozí odstín (prohlížeče bez oklch).
const H = 239;
const C = 0.135;
const v = (o) => toHex(o);
const block = (theme) =>
  Object.keys(THEMES[theme])
    .map((n) => `  --${n}: ${v(tok(theme, n, H, C))};`)
    .join('\n');
const ob = onBrand('dark', H, C);
const fallback = `/* Vygenerováno: npm test (scripts/contrast-test.mjs). Neupravovat ručně.
   sRGB hodnoty pro výchozí odstín ${H} / chroma ${C} pro prohlížeče bez oklch(). */
@supports not (color: oklch(0 0 0)) {
  :root {
  --brand: ${v({ l: 0.78, c: C, h: H })};
  --brand-strong: ${v({ l: 0.7, c: C, h: H })};
  --brand-ink: ${v({ l: 0.28, c: C / 2, h: H })};
  --brand-wash: ${v({ l: 0.78, c: C, h: H })}1f;
  --on-brand: ${v(ob.col)};
  --plate-ink: #d6d3cf;
  --plate-line: #ffffff24;
${block('dark')}
  }
}
`;
writeFileSync(new URL('../app/fallback.css', import.meta.url), fallback);

console.log(`\nNejhorší text na akcentu: ${worst.ratio.toFixed(2)}:1 (${worst.what})`);
console.log(fails ? `\n${fails} kombinací neprošlo.` : `\nVše prošlo (${HUES.length} odstínů × ${CHROMAS.length} chromat, tmavé téma).`);
process.exit(fails ? 1 : 0);
