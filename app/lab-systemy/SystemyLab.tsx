'use client';

import { useEffect, useState } from 'react';
import { systems } from '@/lib/content';
import Artifact from '@/components/systems/Artifact';

/* Dočasné varianty seznamu systémů. Scény (Artifact) jsou ve všech stejné, mění se seznam a jeho okolí. */

const NAMES = ['A · Rejstřík', 'B · Velká typografie', 'C · Pruh nad scénou'];
const items = systems.items;
const num = (i: number) => String(i + 1).padStart(2, '0');

function useKeys(active: number, setActive: (n: number) => void) {
  return (e: React.KeyboardEvent) => {
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
}

/* A: rejstřík. Číslované řádky oddělené linkami, popis se rozbalí přímo pod vybraným řádkem. */
function VariantA() {
  const [active, setActive] = useState(0);
  const onKey = useKeys(active, setActive);
  const s = items[active];
  return (
    <div className="lx lx-a">
      <ol className="lx-a__list" role="tablist" aria-orientation="vertical" onKeyDown={onKey}>
        {items.map((it, i) => (
          <li key={it.id} className={i === active ? 'is-on' : ''}>
            <button
              type="button"
              role="tab"
              aria-selected={i === active}
              tabIndex={i === active ? 0 : -1}
              onClick={() => setActive(i)}
              className="lx-a__row"
            >
              <span className="lx-a__n">{num(i)}</span>
              <span className="lx-a__name">{it.name}</span>
              <span className="lx-a__plus" aria-hidden="true" />
            </button>
            <div className="lx-a__more">
              <p>{it.text}</p>
            </div>
          </li>
        ))}
      </ol>
      <div className={`lx-a__stage sys-ac--${s.id}`} key={s.id}>
        <Artifact id={s.id} />
      </div>
    </div>
  );
}

/* B: velká typografie. Jen jména jako nabídka, bez linek a rámečků; vybraný je plný, ostatní tlumené. */
function VariantB() {
  const [active, setActive] = useState(0);
  const onKey = useKeys(active, setActive);
  const s = items[active];
  return (
    <div className="lx lx-b">
      <div className="lx-b__list" role="tablist" aria-orientation="vertical" onKeyDown={onKey}>
        {items.map((it, i) => (
          <button
            key={it.id}
            type="button"
            role="tab"
            aria-selected={i === active}
            tabIndex={i === active ? 0 : -1}
            onClick={() => setActive(i)}
            className="lx-b__item"
          >
            <sup>{num(i)}</sup>
            {it.name}
          </button>
        ))}
      </div>
      <div className="lx-b__right">
        <div className={`lx-b__stage sys-ac--${s.id}`} key={`s${s.id}`}>
          <Artifact id={s.id} />
        </div>
        <p className="lx-b__text" key={`t${s.id}`}>
          {s.text}
        </p>
      </div>
    </div>
  );
}

/* C: pruh nad scénou. Krátká jména v jedné řadě s jednou pohyblivou linkou, pod nimi velká scéna a popis vedle ní. */
function VariantC() {
  const [active, setActive] = useState(0);
  const onKey = useKeys(active, setActive);
  const s = items[active];
  return (
    <div className="lx lx-c">
      <div className="lx-c__bar" role="tablist" aria-orientation="horizontal" onKeyDown={onKey}>
        {items.map((it, i) => (
          <button
            key={it.id}
            type="button"
            role="tab"
            aria-selected={i === active}
            tabIndex={i === active ? 0 : -1}
            onClick={() => setActive(i)}
            className="lx-c__tab"
          >
            {it.short}
          </button>
        ))}
      </div>
      <div className="lx-c__body">
        <div className="lx-c__copy" key={`c${s.id}`}>
          <h3>{s.name}</h3>
          <p>{s.text}</p>
        </div>
        <div className={`lx-c__stage sys-ac--${s.id}`} key={`s${s.id}`}>
          <Artifact id={s.id} />
        </div>
      </div>
    </div>
  );
}

export default function SystemyLab() {
  const [v, setV] = useState(0);
  useEffect(() => {
    const h = Number(new URLSearchParams(location.search).get('v'));
    if (h >= 0 && h < 3) setV(h);
    document.querySelectorAll('.reveal').forEach((n) => n.classList.add('is-in'));
  }, []);
  return (
    <>
      <div className="lx-switch">
        <p>
          <b>Lab</b> seznam v sekci 2
        </p>
        <div>
          {NAMES.map((n, i) => (
            <button key={n} type="button" aria-pressed={v === i} onClick={() => setV(i)}>
              {n}
            </button>
          ))}
        </div>
      </div>
      {v === 0 && <VariantA />}
      {v === 1 && <VariantB />}
      {v === 2 && <VariantC />}
    </>
  );
}
