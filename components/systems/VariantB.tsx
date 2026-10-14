'use client';

import { useState } from 'react';
import { systems } from '@/lib/content';
import Artifact from './Artifact';

/*
 * B — Rejstřík. Seznam vysázený velkým písmem, jeden řádek otevřený. Otevřený řádek
 * ukáže popis a výstup, ostatní zůstanou jen jako jména. Žádné karty, žádné linky.
 */

export default function VariantB() {
  const [open, setOpen] = useState(0);

  return (
    <div className="sv-b reveal">
      {systems.items.map((it, i) => {
        const on = i === open;
        return (
          <section className={`sv-b__row${on ? ' is-open' : ''}`} key={it.id}>
            <h3 className="sv-b__h">
              <button
                type="button"
                className="sv-b__btn"
                aria-expanded={on}
                aria-controls={`sv-b-${it.id}`}
                onClick={() => setOpen(on ? -1 : i)}
              >
                {it.name}
              </button>
            </h3>
            <div className="sv-b__body" id={`sv-b-${it.id}`} hidden={!on}>
              <p className="sv-b__text">{it.text}</p>
              <Artifact id={it.id} className="sv-b__art" />
            </div>
          </section>
        );
      })}
    </div>
  );
}
