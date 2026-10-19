'use client';

import { useEffect, useState, type CSSProperties } from 'react';

/*
 * Úzký pruh na šířku ve spodní části hero: jemný technický náznak toho, co AI dělá.
 * Tři verze (výběr přes ?hero=1, 2 nebo 3, na localhostu je vlevo dole přepínač).
 *   1 Čtení   AI přečte větu z faktury, pozná v ní dodavatele, částku a splatnost a zařadí ji
 *   2 Tok     pomalu plynoucí řádky hotových úkolů, jako výpis práce, kterou systém odvedl
 *   3 Signál  mřížka bodů, kterou pomalu projíždí vlna aktivity (jako aktivace sítě)
 * Barvy jsou pevná paleta webu (--pal-h), takže je nemění Color studio ani motiv.
 */

const v = (o: Record<string, string | number>) => o as CSSProperties;

/* 1 Čtení */
const TOKENS: { t: string; e?: string; label?: string; o?: number }[] = [
  { t: 'Faktura' },
  { t: 'č. 114/2026' },
  { t: 'od' },
  { t: 'Papírnictví Novák', e: 'dod', label: 'dodavatel', o: -38 },
  { t: 'na' },
  { t: '12 400 Kč', e: 'sum', label: 'částka', o: 108 },
  { t: 'splatná' },
  { t: 'do' },
  { t: '30. 11.', e: 'dat', label: 'splatnost', o: 165 },
];

function Reading() {
  return (
    <div className="st st--read" aria-hidden="true">
      <p className="st__sent">
        {TOKENS.map((k, i) => (
          <span
            key={i}
            className={`st__tk${k.e ? ' st__tk--e' : ''}`}
            data-label={k.label}
            style={v({ '--i': i, '--o': k.o ?? 0 })}
          >
            {k.t}
          </span>
        ))}
        <span className="st__done" style={v({ '--i': TOKENS.length })}>
          <i />
          zaúčtováno
        </span>
      </p>
    </div>
  );
}

/* 2 Tok */
const FLOW = [
  ['poptávka z webu', 'zařazena, odpověď odeslána'],
  ['faktura v PDF', 'údaje v tabulce'],
  ['e-mail od klienta', 'úkol v CRM'],
  ['nová objednávka', 'založen projekt'],
  ['schůzka', 'termín v kalendáři'],
  ['týdenní report', 'odeslán týmu'],
  ['dotaz kolegy', 'odpověď z firemních dokumentů'],
  ['smlouva', 'podepsána a uložena'],
];
const HUES = [-38, 52, 165, 108, 0, -88, 222];

function Flow() {
  const row = (k: string) =>
    FLOW.map(([a, b], i) => (
      <span className="st__ln" key={`${k}${i}`} style={v({ '--o': HUES[i % HUES.length] })}>
        <i className="st__ok" />
        <b>{a}</b>
        <em>→</em>
        {b}
      </span>
    ));
  return (
    <div className="st st--flow" aria-hidden="true">
      <div className="st__track">
        {row('a')}
        {row('b')}
      </div>
    </div>
  );
}

/* 3 Signál */
function Signal() {
  return (
    <div className="st st--sig" aria-hidden="true">
      <i className="st__grid" />
      <i className="st__wave st__wave--1" />
      <i className="st__wave st__wave--2" />
    </div>
  );
}

const MARKS = [Reading, Flow, Signal];
const NAMES = ['Čtení', 'Tok', 'Signál'];

export default function HeroStrip() {
  const [n, setN] = useState(0);
  const [lab, setLab] = useState(false);

  useEffect(() => {
    const q = Number(new URLSearchParams(location.search).get('hero'));
    if (q >= 1 && q <= MARKS.length) setN(q - 1);
    setLab(process.env.NODE_ENV === 'development' || q > 0);
  }, []);

  const pick = (i: number) => {
    setN(i);
    const u = new URL(location.href);
    u.searchParams.set('hero', String(i + 1));
    history.replaceState(null, '', u);
  };

  const Mark = MARKS[n];
  return (
    <>
      <div className="hero__strip seq" style={{ ['--i' as string]: 5 }}>
        <Mark />
      </div>
      {lab && (
        <div className="hs-lab" role="group" aria-label="Verze pruhu pod hero">
          {NAMES.map((name, i) => (
            <button key={name} type="button" aria-pressed={i === n} onClick={() => pick(i)}>
              {i + 1} · {name}
            </button>
          ))}
        </div>
      )}
    </>
  );
}
