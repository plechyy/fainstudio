'use client';

import { useEffect, useState } from 'react';

/*
 * Posuvník primární barvy: mění jen odstín (--primary-h), sytost a světlost zůstávají.
 * Odstín se pamatuje v tomhle prohlížeči (layout.tsx ho obnoví před prvním vykreslením).
 */
const KEY = 'primary-h';
const DEFAULT_H = 84;

export default function PrimarySlider() {
  const [h, setH] = useState(DEFAULT_H);

  useEffect(() => {
    try {
      const v = parseFloat(localStorage.getItem(KEY) || '');
      if (!Number.isNaN(v)) setH(v);
    } catch {}
  }, []);

  const apply = (v: number) => {
    setH(v);
    const d = document.documentElement;
    if (v === DEFAULT_H) d.style.removeProperty('--primary-h');
    else d.style.setProperty('--primary-h', String(v));
    try {
      if (v === DEFAULT_H) localStorage.removeItem(KEY);
      else localStorage.setItem(KEY, String(v));
    } catch {}
  };

  return (
    <div className="ps" role="group" aria-label="Primární barva">
      <span className="ps__dot" aria-hidden="true" />
      <input
        className="ps__range"
        type="range"
        min={0}
        max={360}
        step={0.5}
        value={h}
        aria-label="Odstín primární barvy"
        onChange={(e) => apply(parseFloat(e.target.value))}
        onDoubleClick={() => apply(DEFAULT_H)}
      />
    </div>
  );
}
