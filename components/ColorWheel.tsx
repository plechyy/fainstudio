'use client';

import { useEffect, useRef, useState } from 'react';

/*
 * Kolo barev: přebarví primární (akcentovou) barvu celého webu naživo. Mění jen --primary-h
 * a --primary-c na <html>; výchozí hodnoty zůstávají v globals.css, ten je jediný zdroj barev.
 * Volba se pamatuje v prohlížeči (layout.tsx ji vrací před prvním vykreslením).
 */
const KEY = 'accent';
const SIZE = 148;
const R = SIZE / 2;

const norm = (h: number) => ((h % 360) + 360) % 360;

export default function ColorWheel({ className = '', inline = false }: { className?: string; inline?: boolean }) {
  const [open, setOpen] = useState(inline);
  const [hue, setHue] = useState(327.3);
  const [chroma, setChroma] = useState(0.1654);
  const [def, setDef] = useState({ h: 327.3, c: 0.1654 });
  const [custom, setCustom] = useState(false);
  const wheel = useRef<HTMLDivElement>(null);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const s = getComputedStyle(document.documentElement);
    const dh = parseFloat(s.getPropertyValue('--primary-h')) || 327.3;
    const dc = parseFloat(s.getPropertyValue('--primary-c')) || 0.1654;
    // výchozí z CSS zjistíme bez inline přepisu
    const st = document.documentElement.style;
    const ih = st.getPropertyValue('--primary-h');
    const ic = st.getPropertyValue('--primary-c');
    st.removeProperty('--primary-h');
    st.removeProperty('--primary-c');
    const base = getComputedStyle(document.documentElement);
    const bh = parseFloat(base.getPropertyValue('--primary-h')) || dh;
    const bc = parseFloat(base.getPropertyValue('--primary-c')) || dc;
    if (ih) st.setProperty('--primary-h', ih);
    if (ic) st.setProperty('--primary-c', ic);
    setDef({ h: bh, c: bc });
    setHue(ih ? parseFloat(ih) : bh);
    setChroma(ic ? parseFloat(ic) : bc);
    setCustom(Boolean(ih || ic));
  }, []);

  useEffect(() => {
    if (inline || !open) return;
    const off = (e: PointerEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false);
    };
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('pointerdown', off);
    document.addEventListener('keydown', esc);
    return () => {
      document.removeEventListener('pointerdown', off);
      document.removeEventListener('keydown', esc);
    };
  }, [open, inline]);

  const apply = (h: number, c: number) => {
    const st = document.documentElement.style;
    st.setProperty('--primary-h', h.toFixed(1));
    st.setProperty('--primary-c', c.toFixed(4));
    try {
      localStorage.setItem(KEY, JSON.stringify({ h: +h.toFixed(1), c: +c.toFixed(4) }));
    } catch {}
    setHue(h);
    setChroma(c);
    setCustom(true);
  };

  const pick = (e: React.PointerEvent) => {
    const box = wheel.current?.getBoundingClientRect();
    if (!box) return;
    const x = e.clientX - (box.left + box.width / 2);
    const y = e.clientY - (box.top + box.height / 2);
    // 0° nahoře, po směru hodinových ručiček; shoduje se s conic-gradient níže
    const a = (Math.atan2(x, -y) * 180) / Math.PI;
    apply(norm(a), chroma);
  };

  const reset = () => {
    const st = document.documentElement.style;
    st.removeProperty('--primary-h');
    st.removeProperty('--primary-c');
    try {
      localStorage.removeItem(KEY);
    } catch {}
    setHue(def.h);
    setChroma(def.c);
    setCustom(false);
  };

  const rad = ((hue - 90) * Math.PI) / 180;
  const knob = { left: R + Math.cos(rad) * (R - 15), top: R + Math.sin(rad) * (R - 15) };

  const panel = (
    <div className={`cw__panel${inline ? ' cw__panel--inline' : ''}`} role="group" aria-label="Barva webu">
      <div
        ref={wheel}
        className="cw__wheel"
        style={{ width: SIZE, height: SIZE }}
        onPointerDown={(e) => {
          (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
          pick(e);
        }}
        onPointerMove={(e) => e.buttons === 1 && pick(e)}
      >
        <span className="cw__knob" style={{ ...knob, ['--k' as string]: `oklch(0.83 ${chroma} ${hue})` }} />
        <span className="cw__core" style={{ ['--k' as string]: `oklch(0.83 ${chroma} ${hue})` }} />
      </div>
      <label className="cw__row">
        <span>Sytost</span>
        <input
          type="range"
          min={0.02}
          max={0.2}
          step={0.002}
          value={chroma}
          onChange={(e) => apply(hue, parseFloat(e.target.value))}
          aria-label="Sytost barvy"
        />
      </label>
      <button type="button" className="cw__reset" onClick={reset} disabled={!custom}>
        Původní barva
      </button>
    </div>
  );

  if (inline) return <div className={`cw cw--inline ${className}`.trim()}>{panel}</div>;

  return (
    <div className={`cw ${className}`.trim()} ref={root}>
      <button
        type="button"
        className="cw__btn"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label="Změnit barvu webu"
        title="Barva webu"
      >
        <span className="cw__dot" aria-hidden="true" />
      </button>
      {open && panel}
    </div>
  );
}
