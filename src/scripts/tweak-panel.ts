/**
 * Ladicí panel barev — nástroj pro zadavatele, ne pro návštěvníky.
 * Načítá se dynamicky až po ?tweak=1 nebo klávese C, jinak se nestahuje.
 */
import { onBrand, css, toHex, brand } from '../lib/color';

const KEY = 'brand';
const DEFAULT = { h: 48, c: 0.14 };
let panel: HTMLElement | null = null;

function read() {
  try {
    const v = JSON.parse(localStorage.getItem(KEY) || 'null');
    if (v && typeof v.h === 'number') return { h: v.h as number, c: v.c as number };
  } catch {}
  return { ...DEFAULT };
}

function apply(h: number, c: number, save = true) {
  const root = document.documentElement;
  const ob = onBrand(h, c);
  root.style.setProperty('--brand-h', String(h));
  root.style.setProperty('--brand-c', String(c));
  root.style.setProperty('--on-brand', css(ob.col));
  if (save) {
    try {
      localStorage.setItem(KEY, JSON.stringify({ h, c, on: css(ob.col) }));
    } catch {}
  }
  return ob;
}

export function open() {
  if (panel) {
    panel.hidden = false;
    panel.querySelector<HTMLInputElement>('input')?.focus();
    return;
  }
  const s = read();
  panel = document.createElement('aside');
  panel.className = 'tweak';
  panel.setAttribute('aria-label', 'Ladění barev');
  panel.innerHTML = `
    <style>
      .tweak{position:fixed;right:16px;bottom:16px;z-index:200;width:min(340px,calc(100vw - 32px));
        padding:18px;background:var(--surface);color:var(--ink);border:1px solid var(--line-strong);
        border-radius:6px;box-shadow:var(--shadow);font:14px/1.4 var(--font-text)}
      .tweak h2{font:600 13px/1 var(--font-text);letter-spacing:.08em;text-transform:uppercase;margin:0 0 14px;display:flex;justify-content:space-between;align-items:center}
      .tweak button{cursor:pointer;border:1px solid var(--line-strong);background:none;border-radius:4px;padding:6px 10px;font:inherit;color:inherit}
      .tweak label{display:grid;grid-template-columns:1fr auto;gap:6px;margin-top:12px;font-weight:600}
      .tweak input[type=range]{grid-column:1/-1;width:100%;accent-color:var(--brand)}
      .tweak .hue{height:8px;border-radius:4px;grid-column:1/-1;margin-top:-2px;
        background:linear-gradient(90deg,${Array.from({ length: 13 }, (_, i) => `oklch(0.7 0.14 ${i * 30})`).join(',')})}
      .tweak .row{display:flex;gap:8px;margin-top:14px;flex-wrap:wrap}
      .tweak .sw{display:flex;align-items:center;gap:10px;margin-top:14px;padding:10px;border-radius:4px;background:var(--brand);color:var(--on-brand);font-weight:600}
      .tweak pre{margin:12px 0 0;padding:10px;background:var(--sunk);border-radius:4px;font:12px/1.5 ui-monospace,monospace;white-space:pre-wrap;user-select:all}
      .tweak small{color:var(--ink-2)}
    </style>
    <h2>Ladění barev <button type="button" data-close aria-label="Zavřít panel">✕</button></h2>
    <label>Odstín <output data-oh></output>
      <input type="range" min="0" max="360" step="1" data-h />
    </label>
    <div class="hue" aria-hidden="true"></div>
    <label>Chroma <output data-oc></output>
      <input type="range" min="0" max="0.22" step="0.005" data-c />
    </label>
    <div class="sw" data-sw>Text na akcentu <span data-ratio></span></div>
    <div class="row">
      <button type="button" data-theme>Přepnout téma</button>
      <button type="button" data-reset>Výchozí</button>
      <button type="button" data-copy>Kopírovat CSS</button>
    </div>
    <pre data-out></pre>
    <small>Uloženo jen v tomhle prohlížeči. Pro natvrdo vlož řádky výše do src/styles/tokens.css. Zavři klávesou Esc.</small>
  `;
  document.body.append(panel);

  const $ = <T extends HTMLElement>(sel: string) => panel!.querySelector<T>(sel)!;
  const h = $<HTMLInputElement>('[data-h]');
  const c = $<HTMLInputElement>('[data-c]');

  const update = (save = true) => {
    const hv = +h.value;
    const cv = +c.value;
    const ob = apply(hv, cv, save);
    $('[data-oh]').textContent = String(hv);
    $('[data-oc]').textContent = cv.toFixed(3);
    $('[data-ratio]').textContent = `${ob.ratio.toFixed(2)} : 1 ${ob.ratio >= 4.5 ? '✓' : '✗'}`;
    $('[data-out]').textContent =
      `--brand-h: ${hv};\n--brand-c: ${cv};\n/* akcent ≈ ${toHex(brand(hv, cv))}, text na akcentu: ${ob.dark ? 'tmavý' : 'světlý'} */`;
  };

  h.value = String(s.h);
  c.value = String(s.c);
  update(false);
  h.addEventListener('input', () => update());
  c.addEventListener('input', () => update());

  $('[data-reset]').addEventListener('click', () => {
    h.value = String(DEFAULT.h);
    c.value = String(DEFAULT.c);
    update();
    try {
      localStorage.removeItem(KEY);
    } catch {}
  });
  $('[data-theme]').addEventListener('click', () => document.querySelector<HTMLButtonElement>('[data-theme-toggle]')?.click());
  $('[data-copy]').addEventListener('click', async (e) => {
    const b = e.currentTarget as HTMLButtonElement;
    try {
      await navigator.clipboard.writeText($('[data-out]').textContent || '');
      b.textContent = 'Zkopírováno';
    } catch {
      b.textContent = 'Označ text níže';
    }
    setTimeout(() => (b.textContent = 'Kopírovat CSS'), 1500);
  });
  const close = () => {
    if (panel) panel.hidden = true;
  };
  $('[data-close]').addEventListener('click', close);
  addEventListener('keydown', (e) => e.key === 'Escape' && close());
  h.focus();
}
