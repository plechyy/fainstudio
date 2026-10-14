'use client';

import { useState } from 'react';
import { systems } from '@/lib/content';
import Artifact from './Artifact';

/*
 * C — Dílna. Nahoře řádek jmen jako prostý text, pod ním jeden velký výstup přes
 * celou šířku a vedle něj popis. Vybraný systém je vidět v plné velikosti.
 */

export default function VariantC() {
  const items = systems.items;
  const [active, setActive] = useState(0);
  const s = items[active];

  const onKey = (e: React.KeyboardEvent) => {
    const n = items.length;
    const map: Record<string, number> = {
      ArrowRight: (active + 1) % n,
      ArrowDown: (active + 1) % n,
      ArrowLeft: (active - 1 + n) % n,
      ArrowUp: (active - 1 + n) % n,
      Home: 0,
      End: n - 1,
    };
    if (e.key in map) {
      e.preventDefault();
      setActive(map[e.key]);
    }
  };

  return (
    <div className="sv-c reveal">
      <div className="sv-c__pick" role="tablist" aria-label="Systémy" onKeyDown={onKey}>
        {items.map((it, i) => (
          <button
            key={it.id}
            type="button"
            role="tab"
            id={`sv-c-tab-${it.id}`}
            aria-selected={i === active}
            aria-controls="sv-c-stage"
            tabIndex={i === active ? 0 : -1}
            className="sv-c__name"
            onClick={() => setActive(i)}
          >
            {it.name}
          </button>
        ))}
      </div>

      <div className="sv-c__stage" id="sv-c-stage" role="tabpanel" aria-labelledby={`sv-c-tab-${s.id}`}>
        <div className="sv-c__copy" key={`c${active}`}>
          <h3 className="sv-c__title">{s.name}</h3>
          <p className="sv-c__text">{s.text}</p>
        </div>
        <Artifact id={s.id} className="sv-c__art" key={`a${active}`} />
      </div>
    </div>
  );
}
