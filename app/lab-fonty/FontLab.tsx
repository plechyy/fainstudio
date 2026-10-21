'use client';

import { useEffect, useState } from 'react';

/* Dočasný přepínač písma nadpisů (a volitelně i textu) pro porovnání přímo na webu. */

const FONTS = [
  'Cal Sans (teď)',
  'Bricolage Grotesque',
  'Instrument Sans',
  'Geist',
  'Sora',
  'Space Grotesk',
  'Familjen Grotesk',
  'Unbounded',
  'Fraunces',
  'Syne',
  'Epilogue',
];

const stack = (name: string) => `'Lab ${name}', system-ui, sans-serif`;

export default function FontLab() {
  const [i, setI] = useState(0);
  const [same, setSame] = useState(false);

  useEffect(() => {
    const root = document.documentElement.style;
    if (i === 0) {
      root.removeProperty('--font-display');
      if (!same) root.removeProperty('--font-text');
    } else {
      root.setProperty('--font-display', stack(FONTS[i]));
    }
    if (i === 0 || !same) root.removeProperty('--font-text');
    else root.setProperty('--font-text', stack(FONTS[i]));
  }, [i, same]);

  useEffect(() => {
    const key = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') setI((v) => (v + 1) % FONTS.length);
      if (e.key === 'ArrowLeft') setI((v) => (v + FONTS.length - 1) % FONTS.length);
    };
    addEventListener('keydown', key);
    return () => removeEventListener('keydown', key);
  }, []);

  return (
    <div className="fontlab" role="group" aria-label="Porovnání písma">
      <p className="fontlab__now">
        <b>{i}/{FONTS.length - 1}</b> {FONTS[i]}
      </p>
      <div className="fontlab__list">
        {FONTS.map((f, n) => (
          <button key={f} type="button" className={n === i ? 'is-on' : ''} onClick={() => setI(n)}>
            {n}. {f}
          </button>
        ))}
      </div>
      <label className="fontlab__same">
        <input type="checkbox" checked={same} onChange={(e) => setSame(e.target.checked)} />
        stejné písmo i na text (jinak Inter)
      </label>
      <p className="fontlab__hint">šipky ← → přepínají</p>
    </div>
  );
}
