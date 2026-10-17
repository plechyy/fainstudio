'use client';

import { useEffect, useState } from 'react';

/*
 * Druhý řádek hero nadpisu: slovo „která“ stojí pořád, zbytek věty se napíše,
 * chvíli stojí a smaže se, pak se píše další. Maže se jen to, čím se další věta
 * liší. Na konci je vždy bílá tečka. Neviditelné kopie všech vět leží ve stejné
 * buňce mřížky, takže řádek má pořád výšku nejdelší věty a nic pod ním neskáče. Kdo má vypnuté
 * animace nebo vypnutý JavaScript, vidí první větu celou.
 */

const TYPE_MS = 80; // jedno písmeno při psaní
const DELETE_MS = 38; // jedno písmeno při mazání
const HOLD_MS = 2100; // jak dlouho věta stojí
const GAP_MS = 320; // pauza mezi smazáním a dalším psaním

/** Kolik znaků mají dvě věty společných od začátku (po celých slovech). */
function common(a: string, b: string) {
  let n = 0;
  while (n < a.length && n < b.length && a[n] === b[n]) n++;
  // zůstane jen celé slovo i s mezerou za ním, ne půlka slova
  return n === a.length || a[n - 1] === ' ' ? n : a.lastIndexOf(' ', n - 1) + 1;
}

export default function HeroRotate({ lead, phrases }: { lead: string; phrases: string[] }) {
  const [text, setText] = useState(phrases[0]);
  const [idle, setIdle] = useState(true);

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

    const type = (word: string, n: number) => {
      setIdle(false);
      setText(word.slice(0, n));
      if (n < word.length) later(() => type(word, n + 1), TYPE_MS);
      else {
        setIdle(true);
        later(() => erase(word, word.length), HOLD_MS);
      }
    };

    // maže se jen to, čím se další věta liší („šetří“ mezi „čas“ a „peníze“ zůstane)
    const erase = (word: string, n: number) => {
      const next = phrases[(i + 1) % phrases.length];
      const keep = common(word, next);
      setIdle(false);
      setText(word.slice(0, n));
      if (n > keep) later(() => erase(word, n - 1), DELETE_MS);
      else {
        i = (i + 1) % phrases.length;
        later(() => type(next, keep + 1), GAP_MS);
      }
    };

    // začíná se, až zmizí úvodní loader, a první věta mezitím stojí celá
    const root = document.documentElement;
    const go = () => later(() => erase(phrases[0], phrases[0].length), HOLD_MS);
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
      {phrases.map((p) => (
        <span className="hero__rot-size" key={p}>
          {lead} {p}.
        </span>
      ))}
      <span className="hero__rot-live">
        {/* slovo „která“ zůstává stát, píše a maže se jen to za ním */}
        <span className="hero__accent">
          {lead}
          {text && ` ${text}`}
          <i className={`hero__caret${idle ? ' is-idle' : ''}`} />
        </span>
        <span className="hero__dot-end">.</span>
      </span>
    </span>
  );
}
