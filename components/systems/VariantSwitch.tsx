'use client';

import { useEffect, useSyncExternalStore } from 'react';
import { VARIANTS, getServerVariant, getVariant, restoreVariant, setVariant, subscribeVariant } from '@/lib/variant';

/*
 * Lišta na proklikání variant sekce „Systémy“. Dočasná — až bude jasno, zmizí
 * i s ostatními variantami.
 */

export function useSysVariant() {
  return useSyncExternalStore(subscribeVariant, getVariant, getServerVariant);
}

export default function VariantSwitch() {
  const v = useSysVariant();
  useEffect(restoreVariant, []);

  return (
    <div className="svx" role="group" aria-label="Varianta sekce Systémy">
      <span className="svx__lead">Sekce 2</span>
      {VARIANTS.map((x) => (
        <button
          key={x.id}
          type="button"
          className="svx__btn"
          aria-pressed={v === x.id}
          title={x.note}
          onClick={() => setVariant(x.id)}
        >
          {x.label}
        </button>
      ))}
      <span className="svx__note">{VARIANTS.find((x) => x.id === v)?.note}</span>
    </div>
  );
}
