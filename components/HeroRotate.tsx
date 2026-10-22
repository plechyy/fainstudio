'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';

/*
 * Druhý řádek hero nadpisu: slovo „která“ stojí pořád, věta za ním se otáčí jako válec
 * (starý text se odvalí nahoru, nový se přivalí zespodu, žádné překlápění karty). Řádek se
 * přitom plynule rozšiřuje a zužuje podle délky nové věty a tečka na konci jede s ním.
 * Šířky vět se měří neviditelnými kopiemi. Kdo má vypnuté animace nebo JavaScript,
 * vidí první větu celou.
 */

const HOLD_MS = 2300; // jak dlouho věta stojí
const ROLL_MS = 720; // otočení válce i změna šířky

export default function HeroRotate({ lead, phrases }: { lead: string; phrases: string[] }) {
  const [idx, setIdx] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [widths, setWidths] = useState<number[] | null>(null);
  const sizes = useRef<HTMLSpanElement>(null);

  // šířky všech vět, po načtení písem a při každé změně velikosti okna (písmo nadpisu se mění s oknem)
  useLayoutEffect(() => {
    const el = sizes.current;
    if (!el) return;
    const measure = () => setWidths([...el.children].map((c) => (c as HTMLElement).getBoundingClientRect().width));
    measure();
    document.fonts?.ready.then(measure);
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [phrases]);

  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let timer = 0;
    let stopped = false;
    let i = 0;

    const later = (fn: () => void, ms: number) => {
      timer = window.setTimeout(() => {
        if (!stopped) fn();
      }, ms);
    };
    const step = () => {
      const next = (i + 1) % phrases.length;
      setPrev(i);
      setIdx(next);
      i = next;
      later(() => setPrev(null), ROLL_MS);
      later(step, HOLD_MS + ROLL_MS);
    };

    // začíná se, až zmizí úvodní loader, a první věta mezitím stojí celá
    const root = document.documentElement;
    const go = () => later(step, HOLD_MS);
    let mo: MutationObserver | undefined;
    if (root.classList.contains('is-loading')) {
      mo = new MutationObserver(() => {
        if (!root.classList.contains('is-loading')) {
          mo?.disconnect();
          go();
        }
      });
      mo.observe(root, { attributes: true, attributeFilter: ['class'] });
    } else {
      go();
    }

    return () => {
      stopped = true;
      clearTimeout(timer);
      mo?.disconnect();
    };
  }, [phrases]);

  return (
    <span className="hero__rot" aria-hidden="true">
      <span className="hero__accent">{lead}</span>
      <span className="hero__roll" style={widths ? { width: widths[idx] } : undefined}>
        {prev !== null && (
          <span className="hero__face hero__accent is-out" key={`o${prev}`}>
            {phrases[prev]}
          </span>
        )}
        <span className={`hero__face hero__accent${prev !== null ? ' is-in' : ''}`} key={`i${idx}`}>
          {phrases[idx]}
        </span>
      </span>
      <span className="hero__dot-end">.</span>
      <span className="hero__rot-size" ref={sizes}>
        {phrases.map((p) => (
          <span key={p}>{p}</span>
        ))}
      </span>
    </span>
  );
}
