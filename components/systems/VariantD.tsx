'use client';

import { useEffect, useRef, useState } from 'react';
import { systems } from '@/lib/content';
import Artifact from './Artifact';

/*
 * D — Posuv. Vlevo jdou systémy pod sebou tak, jak scrollujete, vpravo stojí jeden
 * výstup a mění se podle toho, co máte zrovna před očima. Na mobilu stojí výstup
 * rovnou pod svým textem, nic se nelepí.
 */

export default function VariantD() {
  const items = systems.items;
  const [active, setActive] = useState(0);
  const blocks = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const els = blocks.current.filter(Boolean) as HTMLElement[];
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!hit) return;
        const i = els.indexOf(hit.target as HTMLElement);
        if (i >= 0) setActive(i);
      },
      { rootMargin: '-42% 0px -42% 0px', threshold: 0 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="sv-d reveal">
      <div className="sv-d__col">
        {items.map((it, i) => (
          <section
            key={it.id}
            className={`sv-d__block${i === active ? ' is-on' : ''}`}
            ref={(el) => {
              blocks.current[i] = el;
            }}
          >
            <h3 className="sv-d__name">{it.name}</h3>
            <p className="sv-d__text">{it.text}</p>
            <Artifact id={it.id} className="sv-d__inline" />
          </section>
        ))}
      </div>

      <div className="sv-d__stage" aria-hidden="true">
        <div className="sv-d__frame">
          {items.map((it, i) => (
            <Artifact key={it.id} id={it.id} className={`sv-d__art${i === active ? ' is-on' : ''}`} />
          ))}
        </div>
      </div>
    </div>
  );
}
