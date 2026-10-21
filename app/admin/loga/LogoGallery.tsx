'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { saveLikes } from './actions';

export type Logo = { src: string; n: string; title: string; note: string; pal: string; font: string };

const Heart = ({ on }: { on: boolean }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 20.5s-7.5-4.6-9.3-9.4C1.5 7.600 3.800 4.500 7 4.500c2 0 3.700 1.100 5 3 1.300-1.900 3-3 5-3 3.200 0 5.500 3.100 4.300 6.600-1.800 4.800-9.300 9.400-9.300 9.400z" fill={on ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
  </svg>
);

export default function LogoGallery({ items, initialLikes }: { items: Logo[]; initialLikes: string[] }) {
  const [cols, setCols] = useState(2);
  const [openN, setOpenN] = useState<string | null>(null);
  const [likes, setLikes] = useState<Set<string>>(() => new Set(initialLikes));
  const [only, setOnly] = useState(false);
  const [status, setStatus] = useState('');
  const queue = useRef<Promise<unknown>>(Promise.resolve());

  const list = useMemo(() => (only ? items.filter((i) => likes.has(i.n)) : items), [only, items, likes]);
  const cur = openN === null ? null : (items.find((i) => i.n === openN) ?? null);

  const toggle = useCallback((n: string) => {
    setLikes((prev) => {
      const next = new Set(prev);
      if (next.has(n)) next.delete(n);
      else next.add(n);
      setStatus('Ukládám…');
      const snapshot = [...next];
      queue.current = queue.current.then(() =>
        saveLikes(snapshot)
          .then((r) => setStatus(r.ok ? 'Uloženo' : 'Uložení se nepovedlo'))
          .catch(() => setStatus('Uložení se nepovedlo')),
      );
      return next;
    });
  }, []);

  const go = useCallback(
    (d: number) => {
      if (!list.length) return;
      setOpenN((n) => {
        const i = list.findIndex((x) => x.n === n);
        return list[i < 0 ? 0 : (i + d + list.length) % list.length].n;
      });
    },
    [list],
  );

  useEffect(() => {
    if (openN === null) return;
    const key = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenN(null);
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft') go(-1);
      if (e.key === 'l' || e.key === 'L') toggle(openN);
    };
    addEventListener('keydown', key);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      removeEventListener('keydown', key);
      document.body.style.overflow = prev;
    };
  }, [openN, go, toggle]);

  return (
    <>
      <div className="lg__tools">
        <div role="group" aria-label="Velikost náhledů" className="lg__cols">
          <span>Sloupců:</span>
          {[1, 2, 3, 4].map((c) => (
            <button key={c} type="button" aria-pressed={cols === c} onClick={() => setCols(c)}>
              {c}
            </button>
          ))}
        </div>
        <button type="button" className="lg__only" aria-pressed={only} onClick={() => setOnly((v) => !v)}>
          <Heart on /> Olajkované ({likes.size})
        </button>
        <span className="lg__status" aria-live="polite">
          {status}
        </span>
      </div>

      {only && !list.length && <p className="adm__sub">Zatím nic olajkovaného. Srdíčko je v rohu každé karty.</p>}

      <ul className="lg__grid" style={{ ['--lg-cols' as string]: cols }}>
        {list.map((it) => (
          <li key={it.src} className="lg__item">
            <button type="button" className="lg__card" onClick={() => setOpenN(it.n)} aria-label={`${it.n} ${it.title}, otevřít velký náhled`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={it.src} alt="" loading="lazy" decoding="async" width={640} height={420} />
              <span className="lg__cap">
                <b>{it.n}</b> {it.title}
              </span>
            </button>
            <button type="button" className={`lg__like${likes.has(it.n) ? ' is-on' : ''}`} aria-pressed={likes.has(it.n)} aria-label={`Olajkovat ${it.n}`} onClick={() => toggle(it.n)}>
              <Heart on={likes.has(it.n)} />
            </button>
          </li>
        ))}
      </ul>

      {cur && (
        <div className="lg__view" role="dialog" aria-modal="true" aria-label={`${cur.n} ${cur.title}`} onClick={() => setOpenN(null)}>
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
            <button type="button" className={`lg__like lg__like--bar${likes.has(cur.n) ? ' is-on' : ''}`} aria-pressed={likes.has(cur.n)} aria-label="Olajkovat (L)" onClick={() => toggle(cur.n)}>
              <Heart on={likes.has(cur.n)} />
            </button>
            <button type="button" onClick={() => go(1)} aria-label="Další">
              →
            </button>
            <button type="button" onClick={() => setOpenN(null)} aria-label="Zavřít">
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  );
}
