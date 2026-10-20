'use client';

import { useEffect, useState } from 'react';
import { cases } from '@/lib/content';

type Item = (typeof cases.items)[number];
export type ResultVariant = 'a' | 'b' | 'c';

const L = cases.labels;

/*
 * Výsledek Dřív → Teď. DOČASNĚ ve třech podobách k výběru:
 * a = osa (dva body na lince), b = přepsaná věta (škrt a zvýraznění), c = diff (dva řádky − / +).
 * Bez `v` se vezme ?vysledek=a|b|c z adresy (jen kvůli porovnání na živé stránce), jinak a.
 */
export default function Result({ c, v }: { c: Item; v?: ResultVariant }) {
  const [q, setQ] = useState<ResultVariant>('a');
  useEffect(() => {
    if (v) return;
    const p = new URLSearchParams(location.search).get('vysledek');
    if (p === 'a' || p === 'b' || p === 'c') setQ(p);
  }, [v]);
  const kind = v ?? q;
  const { before, after, unit } = c.result;

  if (kind === 'b') {
    return (
      <p className="rs rs--b">
        <span className="rs-b__line">
          <span className="sr-only">{L.before}: </span>
          <s className="num">{before}</s>
          <span className="rs-b__to" aria-hidden="true">
            →
          </span>
          <span className="sr-only">{L.after}: </span>
          <mark className="num">{after}</mark>
        </span>
        <span className="rs__unit">{unit}</span>
      </p>
    );
  }

  if (kind === 'c') {
    return (
      <div className="rs rs--c">
        <p className="rs-c__row rs-c__row--before">
          <i aria-hidden="true">−</i>
          <s className="num">{before}</s>
          <small>{L.before}</small>
        </p>
        <p className="rs-c__row rs-c__row--after">
          <i aria-hidden="true">+</i>
          <b className="num">{after}</b>
          <small>{L.after}</small>
        </p>
        <p className="rs__unit">{unit}</p>
      </div>
    );
  }

  return (
    <div className="rs rs--a">
      <span className="rs-a__track" aria-hidden="true" />
      <p className="rs-a__pt rs-a__pt--before">
        <small>{L.before}</small>
        <s className="num">{before}</s>
      </p>
      <p className="rs-a__pt rs-a__pt--after">
        <small>{L.after}</small>
        <b className="num">{after}</b>
      </p>
      <p className="rs__unit">{unit}</p>
    </div>
  );
}
