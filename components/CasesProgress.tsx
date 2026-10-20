'use client';

import { cases } from '@/lib/content';

/*
 * Lišta případů (úseky jako v Postupu). Samostatný komponent: má pevnou šířku i výšku bez ohledu na to,
 * co je zrovna v počítadle vedle ní (logo, štítek), takže se nehýbe pod prstem ani kurzorem.
 */
export default function CasesProgress({ active, onGo }: { active: number; onGo: (i: number) => void }) {
  const items = cases.items;
  return (
    <div className="cxp" role="tablist" aria-label="Případy">
      {items.map((it, i) => (
        <button
          type="button"
          role="tab"
          aria-selected={i === active}
          aria-controls={`pripad-${it.id}`}
          aria-label={`${i + 1}. ${it.firm}`}
          title={it.firm}
          className="cxp__seg"
          data-state={i < active ? 'done' : i === active ? 'now' : 'next'}
          style={{ ['--co' as string]: it.hue }}
          onClick={() => onGo(i)}
          key={it.id}
        >
          <i />
        </button>
      ))}
    </div>
  );
}
