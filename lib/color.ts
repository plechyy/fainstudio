/**
 * Barevná matematika pro posuvník odstínu a test kontrastu.
 * Sdílí ji tweak panel v prohlížeči i `npm test` (Node spouští .ts nativně).
 */

export type Oklch = { l: number; c: number; h: number };
type Rgb = [number, number, number];

/** OKLCH → lineární sRGB (bez ořezu do gamutu). */
export function oklchToLinear({ l, c, h }: Oklch): Rgb {
  const hr = (h * Math.PI) / 180;
  const a = c * Math.cos(hr);
  const b = c * Math.sin(hr);
  const l_ = (l + 0.3963377774 * a + 0.2158037573 * b) ** 3;
  const m_ = (l - 0.1055613458 * a - 0.0638541728 * b) ** 3;
  const s_ = (l - 0.0894841775 * a - 1.291485548 * b) ** 3;
  return [
    4.0767416621 * l_ - 3.3077115913 * m_ + 0.2309699292 * s_,
    -1.2684380046 * l_ + 2.6097574011 * m_ - 0.3413193965 * s_,
    -0.0041960863 * l_ - 0.7034186147 * m_ + 1.707614701 * s_,
  ];
}

const inGamut = (rgb: Rgb) => rgb.every((v) => v >= -1e-4 && v <= 1 + 1e-4);

/**
 * Mapování do sRGB snížením chromatu (jak to popisuje CSS Color 4) —
 * odstín a světlost zůstanou, ubere se jen sytost.
 */
export function toLinearSrgb(col: Oklch): Rgb {
  if (inGamut(oklchToLinear(col))) return oklchToLinear(col);
  let lo = 0;
  let hi = col.c;
  for (let i = 0; i < 24; i++) {
    const mid = (lo + hi) / 2;
    if (inGamut(oklchToLinear({ ...col, c: mid }))) lo = mid;
    else hi = mid;
  }
  return oklchToLinear({ ...col, c: lo }).map((v) => Math.min(1, Math.max(0, v))) as Rgb;
}

export function luminance(col: Oklch): number {
  const [r, g, b] = toLinearSrgb(col);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function contrast(a: Oklch, b: Oklch): number {
  const la = luminance(a);
  const lb = luminance(b);
  return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
}

export function toHex(col: Oklch): string {
  const enc = (v: number) => (v <= 0.0031308 ? 12.92 * v : 1.055 * v ** (1 / 2.4) - 0.055);
  return (
    '#' +
    toLinearSrgb(col)
      .map((v) => Math.round(Math.min(1, Math.max(0, enc(v))) * 255).toString(16).padStart(2, '0'))
      .join('')
  );
}

/* ── tokeny, které na odstínu závisí ─────────────────────────────── */

export const BRAND_L = 0.7;

export const brand = (h: number, c: number): Oklch => ({ l: BRAND_L, c, h });
export const inkDark = (h: number): Oklch => ({ l: 0.2, c: 0.02, h });
export const inkLight = (h: number): Oklch => ({ l: 0.99, c: 0.005, h });

/**
 * Text na akcentní barvě: vybere tmavý nebo světlý podle toho,
 * který má se skutečnou (gamut-mapovanou) barvou vyšší kontrast.
 */
export function onBrand(h: number, c: number): { col: Oklch; ratio: number; dark: boolean } {
  const bg = brand(h, c);
  const d = contrast(bg, inkDark(h));
  const l = contrast(bg, inkLight(h));
  return d >= l ? { col: inkDark(h), ratio: d, dark: true } : { col: inkLight(h), ratio: l, dark: false };
}

export const css = ({ l, c, h }: Oklch) => `oklch(${+l.toFixed(3)} ${+c.toFixed(3)} ${+h.toFixed(1)})`;
