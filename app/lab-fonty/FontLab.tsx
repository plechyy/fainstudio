'use client';

import { useEffect, useState } from 'react';

/* Dočasný přepínač dvojic písma (nadpisy + text) pro porovnání přímo na webu. */

type Combo = { d: string; t: string; w: number; ls: number };

// d = nadpisy, t = text, w = váha nadpisů, ls = prostrkání nadpisů (em); null = písmo, které web má teď
const COMBOS: Combo[] = [
  { d: 'Cal Sans', t: 'Inter', w: 640, ls: -0.025 },
  { d: 'Bricolage Grotesque', t: 'Manrope', w: 700, ls: -0.03 },
  { d: 'Unbounded', t: 'DM Sans', w: 600, ls: -0.03 },
  { d: 'Syne', t: 'Geist', w: 700, ls: -0.03 },
  { d: 'Sora', t: 'Instrument Sans', w: 600, ls: -0.03 },
  { d: 'Space Grotesk', t: 'Plus Jakarta Sans', w: 600, ls: -0.035 },
  { d: 'Outfit', t: 'Figtree', w: 600, ls: -0.025 },
  { d: 'Lexend', t: 'Onest', w: 600, ls: -0.035 },
  { d: 'Familjen Grotesk', t: 'Epilogue', w: 600, ls: -0.03 },
  { d: 'Geist', t: 'Hanken Grotesk', w: 650, ls: -0.035 },
  { d: 'Epilogue', t: 'Albert Sans', w: 700, ls: -0.035 },
  { d: 'Red Hat Display', t: 'Red Hat Text', w: 700, ls: -0.03 },
  { d: 'Schibsted Grotesk', t: 'Inter', w: 700, ls: -0.03 },
  { d: 'Cal Sans', t: 'DM Sans', w: 640, ls: -0.025 },
];

const stack = (name: string) => (name === 'Cal Sans' || name === 'Inter' ? null : `'Lab ${name}', system-ui, sans-serif`);

export default function FontLab() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const el = document.documentElement;
    const c = COMBOS[i];
    const d = stack(c.d);
    const t = stack(c.t);
    if (d) el.style.setProperty('--font-display', d);
    else el.style.removeProperty('--font-display');
    if (t) el.style.setProperty('--font-text', t);
    else el.style.removeProperty('--font-text');
    if (i === 0) {
      el.removeAttribute('data-lab');
    } else {
      el.setAttribute('data-lab', '');
      el.style.setProperty('--lab-dw', String(c.w));
      el.style.setProperty('--lab-ls', `${c.ls}em`);
    }
  }, [i]);

  useEffect(() => {
    const key = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') setI((v) => (v + 1) % COMBOS.length);
      if (e.key === 'ArrowLeft') setI((v) => (v + COMBOS.length - 1) % COMBOS.length);
    };
    addEventListener('keydown', key);
    return () => removeEventListener('keydown', key);
  }, []);

  const c = COMBOS[i];
  const prev = () => setI((v) => (v + COMBOS.length - 1) % COMBOS.length);
  const next = () => setI((v) => (v + 1) % COMBOS.length);

  return (
    <div className="fontlab" role="group" aria-label="Porovnání písma">
      <p className="fontlab__now">
        <b>
          {i + 1}/{COMBOS.length}
        </b>
        {c.d} + {c.t}
        {i === 0 && ' (teď)'}
      </p>
      <div className="fontlab__nav">
        <button type="button" onClick={prev}>
          ← předchozí
        </button>
        <button type="button" onClick={next}>
          další →
        </button>
      </div>
      <div className="fontlab__list">
        {COMBOS.map((x, n) => (
          <button key={n} type="button" className={n === i ? 'is-on' : ''} onClick={() => setI(n)}>
            {n + 1}. {x.d}
            {x.t !== x.d && <small>+ {x.t}</small>}
          </button>
        ))}
      </div>
      <p className="fontlab__hint">šipky ← → na klávesnici přepínají</p>
    </div>
  );
}
