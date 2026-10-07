// Test kontrastu napříč odstíny + generátor sRGB fallbacku pro prohlížeče bez oklch.
// Spuštění: npm test   (Node ≥ 22.18 umí importovat .ts nativně)
import { writeFileSync } from 'node:fs';
import { contrast, onBrand, toHex, css } from '../src/lib/color.ts';

// Musí odpovídat src/styles/tokens.css. c: číslo = pevné chroma, 'b' = --brand-c.
const THEMES = {
  light: {
    bg: { l: 0.975, c: 0.006 },
    surface: { l: 0.995, c: 0.004 },
    sunk: { l: 0.948, c: 0.009 },
    ink: { l: 0.2, c: 0.012 },
    'ink-2': { l: 0.44, c: 0.012 },
    'ink-3': { l: 0.56, c: 0.01 },
    line: { l: 0.87, c: 0.01 },
    'line-strong': { l: 0.76, c: 0.012 },
    'accent-text': { l: 0.5, c: 'b' },
    tick: { l: 0.6, c: 'b' },
  },
  dark: {
    bg: { l: 0.17, c: 0.008 },
    surface: { l: 0.205, c: 0.009 },
    sunk: { l: 0.145, c: 0.008 },
    ink: { l: 0.95, c: 0.008 },
    'ink-2': { l: 0.76, c: 0.012 },
    'ink-3': { l: 0.64, c: 0.012 },
    line: { l: 0.29, c: 0.01 },
    'line-strong': { l: 0.38, c: 0.012 },
    'accent-text': { l: 0.8, c: 'b' },
    tick: { l: 0.72, c: 'b' },
  },
};

const tok = (theme, name, h, bc) => {
  const t = THEMES[theme][name];
  return { l: t.l, c: t.c === 'b' ? bc : t.c, h };
};

// Páry text/pozadí, které se na webu skutečně vyskytují. Minimum 4.5:1
// (ink-3 jen pro velké popisky a dekorativní čísla → 3:1).
const PAIRS = [
  ['ink', 'bg', 4.5],
  ['ink', 'surface', 4.5],
  ['ink', 'sunk', 4.5],
  ['ink-2', 'bg', 4.5],
  ['ink-2', 'surface', 4.5],
  ['ink-2', 'sunk', 4.5],
  ['ink-3', 'bg', 3],
  ['accent-text', 'bg', 4.5],
  ['accent-text', 'surface', 4.5],
];

const HUES = [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330];
const CHROMAS = [0, 0.06, 0.1, 0.14, 0.18, 0.22];

let fails = 0;
let worst = { ratio: Infinity };
const rows = [];

for (const h of HUES) {
  for (const c of CHROMAS) {
    const ob = onBrand(h, c);
    if (ob.ratio < 4.5) {
      fails++;
      console.log(`✗ text na akcentu h=${h} c=${c}: ${ob.ratio.toFixed(2)}`);
    }
    if (ob.ratio < worst.ratio) worst = { ratio: ob.ratio, what: `on-brand h=${h} c=${c}` };
    for (const theme of ['light', 'dark']) {
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

console.log('\nOdstíny ze zadání (c = 0.14):');
console.log('  h     akcent     text na akcentu   kontrast   accent-text světlé / tmavé');
for (const h of [0, 60, 120, 180, 240, 300]) {
  const ob = onBrand(h, 0.14);
  const al = contrast(tok('light', 'accent-text', h, 0.14), tok('light', 'bg', h, 0.14));
  const ad = contrast(tok('dark', 'accent-text', h, 0.14), tok('dark', 'bg', h, 0.14));
  const line = `  ${String(h).padEnd(5)} ${toHex({ l: 0.7, c: 0.14, h })}    ${ob.dark ? 'tmavý ' : 'světlý'}            ${ob.ratio.toFixed(2)}:1     ${al.toFixed(2)} / ${ad.toFixed(2)}`;
  console.log(line);
  rows.push(line);
}

// sRGB fallback pro výchozí odstín (prohlížeče bez oklch, tj. před 2023).
const H = 48;
const C = 0.14;
const v = (o) => toHex(o);
const block = (theme) =>
  Object.keys(THEMES[theme])
    .map((n) => `  --${n}: ${v(tok(theme, n, H, C))};`)
    .join('\n');
const fallback = `/* Vygenerováno: npm test (scripts/contrast-test.mjs). Neupravovat ručně.
   sRGB hodnoty pro výchozí odstín ${H} / chroma ${C} pro prohlížeče bez oklch(). */
@supports not (color: oklch(0 0 0)) {
  :root {
  --brand: ${v({ l: 0.7, c: C, h: H })};
  --brand-strong: ${v({ l: 0.6, c: C, h: H })};
  --brand-ink: ${v({ l: 0.25, c: C / 2, h: H })};
  --brand-wash: ${v({ l: 0.7, c: C, h: H })}1a;
  --on-brand: ${v(onBrand(H, C).col)};
  --plate-ink: #d6d3cf;
  --plate-line: #ffffff24;
${block('light')}
  }
  :root[data-theme='dark'] {
${block('dark')}
  }
  @media (prefers-color-scheme: dark) {
    :root:not([data-theme='light']) {
${block('dark')}
    }
  }
}
`;
writeFileSync(new URL('../src/styles/fallback.css', import.meta.url), fallback);

console.log(`\nNejhorší text na akcentu: ${worst.ratio.toFixed(2)}:1 (${worst.what})`);
console.log(`Ukázka: ${css({ l: 0.7, c: 0.14, h: 48 })} → ${toHex({ l: 0.7, c: 0.14, h: 48 })}`);
console.log(fails ? `\n${fails} kombinací neprošlo.` : `\nVše prošlo (${HUES.length} odstínů × ${CHROMAS.length} chromat × 2 témata).`);
process.exit(fails ? 1 : 0);
