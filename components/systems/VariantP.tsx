'use client';

import { useState } from 'react';
import { systems } from '@/lib/content';
import Artifact from './Artifact';

/*
 * P — původní rozvržení (seznam vlevo, vizuál vpravo) bez toho, co na něm
 * vypadalo jako šablona: žádná čísla, žádné karty pod každou položkou,
 * žádné vodiče, výboje ani automatické přepínání. Vybraná položka se pozná
 * podle bílého textu a oranžové značky.
 */

export default function VariantP() {
  const items = systems.items;
  const [active, setActive] = useState(0);
  const s = items[active];

  const onKey = (e: React.KeyboardEvent) => {
    const n = items.length;
    const map: Record<string, number> = {
      ArrowDown: (active + 1) % n,
      ArrowRight: (active + 1) % n,
      ArrowUp: (active - 1 + n) % n,
      ArrowLeft: (active - 1 + n) % n,
      Home: 0,
      End: n - 1,
    };
    if (e.key in map) {
      e.preventDefault();
      setActive(map[e.key]);
    }
  };

  return (
    <div className="sp reveal">
      <div className="sp__list" role="tablist" aria-label="Systémy" aria-orientation="vertical" onKeyDown={onKey}>
        {items.map((it, i) => (
          <button
            key={it.id}
            type="button"
            role="tab"
            id={`sp-tab-${it.id}`}
            aria-selected={i === active}
            aria-controls="sp-panel"
            tabIndex={i === active ? 0 : -1}
            className="sp__item"
            onClick={() => setActive(i)}
          >
            {it.name}
          </button>
        ))}
      </div>

      <div className="sp__panel" id="sp-panel" role="tabpanel" aria-labelledby={`sp-tab-${s.id}`}>
        {/* na počítači čeká prázdné místo na grafiku, na mobilu zůstává kreslený výstup */}
        <div className="sp__ph" key={`p${active}`} aria-hidden="true">
          <span>Vizuál · {s.short}</span>
        </div>
        <Artifact id={s.id} className="sp__art" key={`a${active}`} />
        <div className="sp__copy" key={`c${active}`}>
          <h3 className="sp__title">{s.name}</h3>
          <p className="sp__text">{s.text}</p>
        </div>
      </div>
    </div>
  );
}
