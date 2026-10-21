'use client';

import { useCallback, useEffect, useState } from 'react';

export type Logo = { src: string; n: string; title: string; note: string; pal: string; font: string };

export default function LogoGallery({ items }: { items: Logo[] }) {
  const [cols, setCols] = useState(2);
  const [open, setOpen] = useState<number | null>(null);

  const go = useCallback((d: number) => setOpen((i) => (i === null ? i : (i + d + items.length) % items.length)), [items.length]);

  useEffect(() => {
    if (open === null) return;
    const key = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(null);
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft') go(-1);
    };
    addEventListener('keydown', key);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      removeEventListener('keydown', key);
      document.body.style.overflow = prev;
    };
  }, [open, go]);

  const cur = open === null ? null : items[open];

  return (
    <>
      <div className="lg__tools" role="group" aria-label="Velikost náhledů">
        <span>Sloupců:</span>
        {[1, 2, 3, 4].map((c) => (
          <button key={c} type="button" aria-pressed={cols === c} onClick={() => setCols(c)}>
            {c}
          </button>
        ))}
      </div>

      <ul className="lg__grid" style={{ ['--lg-cols' as string]: cols }}>
        {items.map((it, i) => (
          <li key={it.src}>
            <button type="button" className="lg__card" onClick={() => setOpen(i)} aria-label={`${it.n} ${it.title}, otevřít velký náhled`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={it.src} alt="" loading="lazy" decoding="async" width={640} height={420} />
              <span className="lg__cap">
                <b>{it.n}</b> {it.title}
              </span>
            </button>
          </li>
        ))}
      </ul>

      {cur && (
        <div className="lg__view" role="dialog" aria-modal="true" aria-label={`${cur.n} ${cur.title}`} onClick={() => setOpen(null)}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={cur.src} alt={cur.title} onClick={(e) => e.stopPropagation()} />
          <div className="lg__bar" onClick={(e) => e.stopPropagation()}>
            <button type="button" onClick={() => go(-1)} aria-label="Předchozí">
              ←
            </button>
            <p>
              <b>{cur.n}</b> {cur.title}
              <small>{[cur.note, cur.font && `Písmo: ${cur.font}`, cur.pal && `Paleta: ${cur.pal}`].filter(Boolean).join(' · ')}</small>
            </p>
            <button type="button" onClick={() => go(1)} aria-label="Další">
              →
            </button>
            <button type="button" onClick={() => setOpen(null)} aria-label="Zavřít">
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  );
}
