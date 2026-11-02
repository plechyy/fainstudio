'use client';

import { useEffect, useRef, useState } from 'react';

/*
 * Výběr primární barvy (roh obrazovky).
 *  • řada připravených barev, které na světlém webu dobře fungují
 *  • vlastní barva: čtverec sytost × jas, pruh odstínu a pole pro hex
 *  • barva se přepočítá na OKLCH (--primary-h / -c / -l-adj), takže se změní všechno, co z primární vychází
 *  • pamatuje se v tomhle prohlížeči (layout.tsx ji obnoví před prvním vykreslením)
 *  • „Kopírovat CSS“ dá hodnoty pro app/globals.css
 */

const KEY = 'brand-primary';
const VARS_KEY = 'brand-primary-vars';
const DEFAULT = '#e7ad01';

const PRESETS: { name: string; hex: string }[] = [
  { name: 'Zlatá', hex: '#e7ad01' },
  { name: 'Med', hex: '#f0b544' },
  { name: 'Jantar', hex: '#f59e0b' },
  { name: 'Mandarinka', hex: '#fb7a24' },
  { name: 'Korál', hex: '#ff6b5b' },
  { name: 'Malina', hex: '#e5487a' },
  { name: 'Fuchsie', hex: '#d946ef' },
  { name: 'Levandule', hex: '#a78bfa' },
  { name: 'Ultramarín', hex: '#4f6bff' },
  { name: 'Azur', hex: '#1fa7e0' },
  { name: 'Tyrkys', hex: '#14b8a6' },
  { name: 'Smaragd', hex: '#22c55e' },
  { name: 'Limetka', hex: '#9ccf2e' },
  { name: 'Olivová', hex: '#a3a23a' },
];

const clamp = (n: number, a: number, b: number) => Math.min(b, Math.max(a, n));
const round = (n: number, d = 4) => +n.toFixed(d);

type Hsv = { h: number; s: number; v: number };
function hexToRgb(hex: string): [number, number, number] {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}
function rgbToHex(r: number, g: number, b: number) {
  return '#' + [r, g, b].map((v) => Math.round(clamp(v, 0, 255)).toString(16).padStart(2, '0')).join('');
}
function hexToHsv(hex: string): Hsv {
  const [r, g, b] = hexToRgb(hex).map((v) => v / 255);
  const max = Math.max(r, g, b);
  const d = max - Math.min(r, g, b);
  let h = 0;
  if (d) {
    if (max === r) h = ((g - b) / d) % 6;
    else if (max === g) h = (b - r) / d + 2;
    else h = (r - g) / d + 4;
    h *= 60;
    if (h < 0) h += 360;
  }
  return { h, s: max ? d / max : 0, v: max };
}
function hsvToHex({ h, s, v }: Hsv) {
  const f = (n: number) => {
    const k = (n + h / 60) % 6;
    return v - v * s * Math.max(0, Math.min(k, 4 - k, 1));
  };
  return rgbToHex(f(5) * 255, f(3) * 255, f(1) * 255);
}
function hexToOklch(hex: string) {
  const lin = (c: number) => ((c /= 255) <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
  const [r, g, b] = hexToRgb(hex).map(lin);
  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
  const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
  const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
  const L = 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s;
  const A = 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s;
  const B = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s;
  let h = (Math.atan2(B, A) * 180) / Math.PI;
  if (h < 0) h += 360;
  return { L, C: Math.hypot(A, B), h };
}
const isHex = (v: string) => /^#?([0-9a-f]{3}|[0-9a-f]{6})$/i.test(v.trim());
function normHex(v: string) {
  let x = v.trim().replace('#', '').toLowerCase();
  if (x.length === 3) x = x.split('').map((ch) => ch + ch).join('');
  return '#' + x;
}
function vars(hex: string): Record<string, string> {
  const { L, C, h } = hexToOklch(hex);
  return {
    '--primary-h': String(round(h, 1)),
    '--primary-c': String(round(C)),
    '--primary-l-adj': String(round(clamp(L - 0.78, -0.3, 0.2))),
  };
}

export default function ColorPicker() {
  const [hex, setHex] = useState(DEFAULT);
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const v = localStorage.getItem(KEY);
      if (v && isHex(v)) setHex(normHex(v));
    } catch {}
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    const d = document.documentElement;
    const v = vars(hex);
    try {
      if (hex === DEFAULT) {
        Object.keys(v).forEach((k) => d.style.removeProperty(k));
        localStorage.removeItem(KEY);
        localStorage.removeItem(VARS_KEY);
      } else {
        Object.entries(v).forEach(([k, x]) => d.style.setProperty(k, x));
        localStorage.setItem(KEY, hex);
        localStorage.setItem(VARS_KEY, JSON.stringify(v));
      }
    } catch {}
  }, [hex, loaded]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const copy = async () => {
    const css = Object.entries(vars(hex))
      .map(([k, v]) => `${k}: ${v};`)
      .join('\n');
    try {
      await navigator.clipboard.writeText(css);
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch {}
  };

  return (
    <aside className="cpk" data-open={open || undefined} aria-label="Primární barva">
      {open && (
        <div className="cpk__panel">
          <div className="cpk__presets" role="listbox" aria-label="Připravené barvy">
            {PRESETS.map((p) => (
              <button
                key={p.hex}
                type="button"
                role="option"
                aria-selected={hex === p.hex}
                className="cpk__sw"
                style={{ background: p.hex }}
                title={p.name}
                aria-label={p.name}
                onClick={() => setHex(p.hex)}
              />
            ))}
          </div>
          <Picker hex={hex} onChange={setHex} />
          <div className="cpk__actions">
            <button type="button" className="cpk__btn" onClick={copy}>
              {copied ? 'Zkopírováno' : 'Kopírovat CSS'}
            </button>
            <button type="button" className="cpk__btn" onClick={() => setHex(DEFAULT)}>
              Výchozí
            </button>
          </div>
        </div>
      )}
      <button
        type="button"
        className="cpk__toggle"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        title="Primární barva"
      >
        <span className="cpk__dot" style={{ background: hex }} aria-hidden="true" />
        Barva
      </button>
    </aside>
  );
}

function Picker({ hex, onChange }: { hex: string; onChange: (hex: string) => void }) {
  const [hsv, setHsv] = useState<Hsv>(() => hexToHsv(hex));
  const [text, setText] = useState(hex);
  const drag = useRef<'sv' | 'h' | null>(null);
  const sv = useRef<HTMLDivElement>(null);
  const hue = useRef<HTMLDivElement>(null);

  // změna zvenku (předvolba, výchozí) přepíše čtverec; u šedé si nechá odstín
  useEffect(() => {
    if (hsvToHex(hsv) !== hex) {
      const n = hexToHsv(hex);
      setHsv((o) => ({ h: n.s === 0 || n.v === 0 ? o.h : n.h, s: n.s, v: n.v }));
    }
    setText(hex);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hex]);

  const apply = (n: Hsv) => {
    setHsv(n);
    onChange(hsvToHex(n));
  };
  const pointSv = (e: React.PointerEvent) => {
    const r = sv.current!.getBoundingClientRect();
    apply({ ...hsv, s: clamp((e.clientX - r.left) / r.width, 0, 1), v: 1 - clamp((e.clientY - r.top) / r.height, 0, 1) });
  };
  const pointHue = (e: React.PointerEvent) => {
    const r = hue.current!.getBoundingClientRect();
    apply({ ...hsv, h: clamp((e.clientX - r.left) / r.width, 0, 1) * 360 });
  };

  return (
    <div className="cpk__pick">
      <div
        ref={sv}
        className="cpk__sv"
        style={{ ['--cp-h' as string]: hsv.h }}
        role="slider"
        tabIndex={0}
        aria-label="Sytost a jas"
        aria-valuetext={hex}
        onKeyDown={(e) => {
          const d = 0.02;
          const m: Record<string, Partial<Hsv>> = {
            ArrowLeft: { s: clamp(hsv.s - d, 0, 1) },
            ArrowRight: { s: clamp(hsv.s + d, 0, 1) },
            ArrowUp: { v: clamp(hsv.v + d, 0, 1) },
            ArrowDown: { v: clamp(hsv.v - d, 0, 1) },
          };
          if (m[e.key]) {
            e.preventDefault();
            apply({ ...hsv, ...m[e.key] });
          }
        }}
        onPointerDown={(e) => {
          drag.current = 'sv';
          e.currentTarget.setPointerCapture(e.pointerId);
          pointSv(e);
        }}
        onPointerMove={(e) => drag.current === 'sv' && pointSv(e)}
        onPointerUp={() => (drag.current = null)}
      >
        <span className="cpk__thumb" style={{ left: `${hsv.s * 100}%`, top: `${(1 - hsv.v) * 100}%`, background: hex }} />
      </div>
      <div
        ref={hue}
        className="cpk__hue"
        role="slider"
        tabIndex={0}
        aria-label="Odstín"
        aria-valuemin={0}
        aria-valuemax={360}
        aria-valuenow={Math.round(hsv.h)}
        onKeyDown={(e) => {
          const d = e.key === 'ArrowLeft' || e.key === 'ArrowDown' ? -3 : e.key === 'ArrowRight' || e.key === 'ArrowUp' ? 3 : 0;
          if (d) {
            e.preventDefault();
            apply({ ...hsv, h: (hsv.h + d + 360) % 360 });
          }
        }}
        onPointerDown={(e) => {
          drag.current = 'h';
          e.currentTarget.setPointerCapture(e.pointerId);
          pointHue(e);
        }}
        onPointerMove={(e) => drag.current === 'h' && pointHue(e)}
        onPointerUp={() => (drag.current = null)}
      >
        <span className="cpk__thumb cpk__thumb--h" style={{ left: `${(hsv.h / 360) * 100}%` }} />
      </div>
      <label className="cpk__hex">
        <span>Hex</span>
        <input
          type="text"
          spellCheck={false}
          autoComplete="off"
          maxLength={7}
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            if (isHex(e.target.value)) onChange(normHex(e.target.value));
          }}
          onBlur={() => setText(hex)}
        />
      </label>
    </div>
  );
}
