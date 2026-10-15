'use client';

import { useEffect, useState } from 'react';

/*
 * Dočasná lišta na proklikání variant hlavního tlačítka. Volba se nastaví jako
 * html[data-btn] (CSS pak přebarví .btn--primary), pamatuje se v localStorage a jde
 * vynutit odkazem (?btn=b). Po výběru zůstane jedna varianta a tohle zmizí.
 */

const VARIANTS = [
  { id: 'now', label: 'Teď', note: 'Bílý kouř' },
  { id: 'a', label: 'A', note: 'Plná bílá pilulka' },
  { id: 'b', label: 'B', note: 'Barevné sklo' },
  { id: 'c', label: 'C', note: 'Zlatá s čipem' },
  { id: 'd', label: 'D', note: 'Obrys, výplň při najetí' },
  { id: 'e', label: 'E', note: 'Černá s barevným čipem' },
  { id: 'f', label: 'F', note: 'Hranatá, zlatý obrys' },
] as const;

const KEY = 'btn-variant';

export default function ButtonVariants() {
  const [v, setV] = useState<string>('now');

  useEffect(() => {
    let saved: string | null = null;
    try {
      saved = new URLSearchParams(location.search).get('btn') || localStorage.getItem(KEY);
    } catch {}
    if (saved && VARIANTS.some((x) => x.id === saved)) setV(saved);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.btn = v;
    try {
      localStorage.setItem(KEY, v);
    } catch {}
  }, [v]);

  return (
    <div className="bvx" role="group" aria-label="Varianta tlačítka">
      <span className="bvx__lead">Tlačítka</span>
      {VARIANTS.map((x) => (
        <button key={x.id} type="button" className="bvx__btn" aria-pressed={v === x.id} title={x.note} onClick={() => setV(x.id)}>
          {x.label}
        </button>
      ))}
      <span className="bvx__note">{VARIANTS.find((x) => x.id === v)?.note}</span>
    </div>
  );
}
