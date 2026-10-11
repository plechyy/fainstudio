'use client';

import { useEffect, useRef, useState } from 'react';

const KEY = 'brand-v2';
const VKEY = 'cloud-vary';
const DEF = { h: 267, c: 0.17 };
const VARY_DEF = 0.5;
const HUE_TRACK = `linear-gradient(90deg, ${Array.from({ length: 13 }, (_, i) => `oklch(0.78 0.15 ${i * 30})`).join(', ')})`;

function load() {
  try {
    const v = JSON.parse(localStorage.getItem(KEY) || 'null');
    if (v && typeof v.h === 'number') return { h: v.h as number, c: v.c as number };
  } catch {}
  return { ...DEF };
}

/** Slider primární barvy v rohu webu — vždy viditelný. Mění --brand-h / --brand-c. */
export default function ColorSlider() {
  const [h, setH] = useState(DEF.h);
  const [c, setC] = useState(DEF.c);
  const [vary, setVary] = useState(VARY_DEF);
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const mounted = useRef(false);

  useEffect(() => {
    const v = load();
    setH(v.h);
    setC(v.c);
    try {
      const cv = parseFloat(localStorage.getItem(VKEY) || '');
      if (!Number.isNaN(cv)) setVary(cv);
    } catch {}
    mounted.current = true;
  }, []);

  useEffect(() => {
    if (!mounted.current) return;
    const d = document.documentElement;
    d.style.setProperty('--brand-h', String(h));
    d.style.setProperty('--brand-c', String(c));
    try {
      localStorage.setItem(KEY, JSON.stringify({ h, c }));
    } catch {}
  }, [h, c]);

  useEffect(() => {
    if (!mounted.current) return;
    document.documentElement.style.setProperty('--cloud-vary', String(vary));
    try {
      localStorage.setItem(VKEY, String(vary));
    } catch {}
  }, [vary]);

  const copy = async () => {
    const css = `--brand-h: ${h};\n--brand-c: ${c};\n--cloud-vary: ${vary};`;
    try {
      await navigator.clipboard.writeText(css);
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch {}
  };

  return (
    <aside className="cslider glass" data-open={open || undefined}>
      <div className="cslider__bar">
        <span className="cslider__swatch" aria-hidden="true" />
        <label className="cslider__hue">
          <span className="sr-only">Primární barva — odstín</span>
          <input
            type="range"
            min={0}
            max={360}
            step={1}
            value={h}
            onChange={(e) => setH(+e.target.value)}
            style={{ background: HUE_TRACK }}
          />
        </label>
        <button
          type="button"
          className="cslider__more"
          aria-expanded={open}
          aria-label={open ? 'Skrýt další volby barvy' : 'Další volby barvy'}
          onClick={() => setOpen((v) => !v)}
        >
          <svg viewBox="0 0 16 16" width="15" height="15" aria-hidden="true">
            <path d="M4 6l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {open && (
        <div className="cslider__panel">
          <label className="cslider__row">
            <span>Sytost</span>
            <input type="range" min={0} max={0.22} step={0.005} value={c} onChange={(e) => setC(+e.target.value)} />
          </label>
          <label className="cslider__row">
            <span>Tvar mraku</span>
            <input type="range" min={0} max={1} step={0.01} value={vary} onChange={(e) => setVary(+e.target.value)} />
          </label>
          <div className="cslider__actions">
            <output className="cslider__val num">h {h} · c {c.toFixed(3)} · tvar {vary.toFixed(2)}</output>
            <button type="button" className="cslider__btn" onClick={copy}>
              {copied ? 'Zkopírováno' : 'Kopírovat CSS'}
            </button>
            <button
              type="button"
              className="cslider__btn"
              onClick={() => {
                setH(DEF.h);
                setC(DEF.c);
                setVary(VARY_DEF);
              }}
            >
              Výchozí
            </button>
          </div>
        </div>
      )}
    </aside>
  );
}
