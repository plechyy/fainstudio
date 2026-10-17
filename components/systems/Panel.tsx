'use client';

import { useEffect, useState } from 'react';
import { systems } from '@/lib/content';
import Artifact, { LIVE } from './Artifact';
import Carousel from './Carousel';
import SysHead from './SysHead';

/*
 * Vnitřek sekce „Systémy“: seznam vlevo, vizuál vpravo.
 * Na počítači jsou dva sloupce stejné výšky: vlevo nadpis a jména, vpravo
 * vizuál od horní hrany nadpisu a pod ním popis vybraného systému.
 * Na mobilu je z toho nekonečný carousel.
 */

export default function Panel() {
  const items = systems.items;
  const [active, setActive] = useState(0);
  const [mobile, setMobile] = useState(false);
  const s = items[active];

  useEffect(() => {
    const mq = matchMedia('(max-width: 899px)');
    const sync = () => setMobile(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

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

  if (mobile) {
    return (
      <>
        <SysHead />
        <Carousel />
      </>
    );
  }

  return (
    <div className="sp">
      <div className="sp__left reveal">
        <SysHead />

        <div className="sp__list" role="tablist" aria-label="Příklady toho, co zvládneme" aria-orientation="vertical" onKeyDown={onKey}>
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
      </div>

      <div className="sp__right reveal" id="sp-panel" role="tabpanel" aria-labelledby={`sp-tab-${s.id}`}>
        {LIVE.has(s.id) ? (
          <div className="sp__stage" key={`p${active}`}>
            <Artifact id={s.id} />
          </div>
        ) : (
          /* místo na grafiku, kterou teprve doplníme */
          <div className="sp__ph" key={`p${active}`} aria-hidden="true">
            <span>Vizuál · {s.short}</span>
          </div>
        )}
        <div className="sp__copy" key={`c${active}`}>
          <h3 className="sp__title">{s.name}</h3>
          <p className="sp__text">{s.text}</p>
        </div>
      </div>
    </div>
  );
}
