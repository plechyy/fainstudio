'use client';

import { useEffect, useRef } from 'react';
import { systems } from '@/lib/content';
import Artifact from './Artifact';

/*
 * Mobilní carousel: každý systém je vlastní container, listuje se prstem.
 * Nekonečno dělá trojitý seznam — jakmile se scroll dostane k okraji, skočí
 * o jednu sadu zpátky. Skok je přes stejné karty, takže ho není vidět.
 */

export default function Carousel() {
  const items = systems.items;
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const set = () => el.scrollWidth / 3;
    el.scrollLeft = set();
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const s = set();
        if (el.scrollLeft < s * 0.5) el.scrollLeft += s;
        else if (el.scrollLeft > s * 1.5) el.scrollLeft -= s;
      });
    };
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      el.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  // tři sady za sebou: dozadu i dopředu je vždycky kam scrollovat
  const slides = [...items, ...items, ...items];

  return (
    <div className="sysx" ref={ref} role="list" aria-label="Systémy">
      {slides.map((it, i) => (
        <article
          className="sysx__slide"
          key={`${it.id}-${i}`}
          role="listitem"
          aria-hidden={i < items.length || i >= items.length * 2 || undefined}
        >
          <Artifact id={it.id} />
          <div>
            <h3 className="sysx__name">{it.name}</h3>
            <p className="sysx__text">{it.text}</p>
          </div>
        </article>
      ))}
    </div>
  );
}
