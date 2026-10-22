'use client';

import { useEffect, useState } from 'react';
import { compare } from '@/lib/content';
import ShaderBackground from '@/components/ShaderBackground';

/* Dočasné varianty srovnání. Zvýraznění FaiN Studia (zelený kouř) je ve všech stejné, mění se zbytek. */

const NAMES = ['A · Tichá tabulka', 'B · Odpověď a poznámky', 'C · Souboj'];
const [US, ...OTHERS] = compare.columns;

const isYes = (v: string) => v === 'Ano';
const isNo = (v: string) => v.startsWith('Ne') && v !== 'Někdy';
const noText = (v: string) => v.replace(/^Ne,?\s*/, '');

const at = (row: number, col: number): React.CSSProperties => ({ gridRow: row, gridColumn: col });

function Smoke({ style }: { style?: React.CSSProperties }) {
  return (
    <div className="cmp-smoke cl-smoke" style={style} aria-hidden="true">
      <ShaderBackground bgVar="--smoke-bg" brandVar="--primary" phase={95} />
    </div>
  );
}

/* tečka = ano, pomlčka = ne, ostatní slovy; žádné fajfky a křížky */
function Mark({ v, us }: { v: string; us?: boolean }) {
  if (isYes(v)) {
    return (
      <span className={`cl-mark cl-mark--yes${us ? ' is-us' : ''}`}>
        <i aria-hidden="true" />
        <span className="sr-only">Ano</span>
      </span>
    );
  }
  if (isNo(v)) {
    const rest = noText(v);
    return (
      <span className="cl-mark cl-mark--no">
        <i aria-hidden="true" />
        {rest ? <small>{rest}</small> : <span className="sr-only">Ne</span>}
      </span>
    );
  }
  return <span className="cl-text">{v}</span>;
}

/* A: tichá tabulka bez rámečku, jen tenké linky mezi řádky a sloupec FaiN na kouři */
function VariantA() {
  const rows = compare.rows;
  return (
    <div className="cl-a" role="table" aria-label={compare.title}>
      <Smoke style={{ gridColumn: 2, gridRow: `1 / span ${rows.length + 1}` }} />
      <div className="cl-a__head" role="row">
        <span role="columnheader" style={at(1, 1)} />
        {compare.columns.map((c, i) => (
          <span role="columnheader" className={i === 0 ? 'is-us' : undefined} style={at(1, i + 2)} key={c}>
            {c}
          </span>
        ))}
      </div>
      {rows.map((r, ri) => (
        <div className="cl-a__row" role="row" key={r.label}>
          <span role="rowheader" className="cl-a__label" style={at(ri + 2, 1)}>
            {r.label}
          </span>
          {r.values.map((v, i) => (
            <span role="cell" className={i === 0 ? 'is-us' : undefined} style={at(ri + 2, i + 2)} key={i}>
              <Mark v={v} us={i === 0} />
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}

/* B: velká odpověď FaiN vlevo, ostatní jako poznámka vedle (každý řádek je věta) */
function VariantB() {
  const rows = compare.rows;
  return (
    <div className="cl-b" role="table" aria-label={compare.title}>
      <Smoke style={{ gridColumn: 2, gridRow: `1 / span ${rows.length + 1}` }} />
      <div className="cl-b__head" role="row">
        <span role="columnheader" style={at(1, 1)} />
        <span role="columnheader" className="is-us" style={at(1, 2)}>
          {US}
        </span>
        <span role="columnheader" className="cl-b__others-h" style={at(1, 3)}>
          Ostatní cesty
        </span>
      </div>
      {rows.map((r, ri) => (
        <div className="cl-b__row" role="row" key={r.label}>
          <span role="rowheader" className="cl-b__label" style={at(ri + 2, 1)}>
            {r.label}
          </span>
          <span role="cell" className="cl-b__us" style={at(ri + 2, 2)}>
            {r.values[0]}
          </span>
          <ul role="cell" className="cl-b__others" style={at(ri + 2, 3)}>
            {OTHERS.map((o, i) => {
              const v = r.values[i + 1];
              return (
                <li key={o}>
                  <span className="cl-b__who">{o}</span>
                  <span className={isNo(v) ? 'is-no' : isYes(v) ? 'is-yes' : undefined}>{isNo(v) ? (noText(v) ? `Ne, ${noText(v)}` : 'Ne') : v}</span>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}

/* C: souboj. Vyberete konkurenta a proti FaiN stojí jen on; kritérium je uprostřed */
function VariantC() {
  const [i, setI] = useState(0);
  const rows = compare.rows;
  return (
    <div className="cl-c">
      <div className="cl-c__tabs" role="tablist" aria-label="S kým porovnat">
        {OTHERS.map((o, n) => (
          <button type="button" role="tab" aria-selected={n === i} className={n === i ? 'is-on' : ''} onClick={() => setI(n)} key={o}>
            {o}
          </button>
        ))}
      </div>
      <div className="cl-c__board" role="table" aria-label={`${US} proti: ${OTHERS[i]}`}>
        <Smoke style={{ gridColumn: 1, gridRow: `1 / span ${rows.length + 1}` }} />
        <div className="cl-c__head" role="row">
          <span role="columnheader" className="is-us" style={at(1, 1)}>
            {US}
          </span>
          <span role="columnheader" style={at(1, 2)} />
          <span role="columnheader" className="is-them" style={at(1, 3)}>
            {OTHERS[i]}
          </span>
        </div>
        {rows.map((r, ri) => (
          <div className="cl-c__row" role="row" key={r.label}>
            <span role="cell" className="cl-c__us" style={at(ri + 2, 1)}>
              {r.values[0]}
            </span>
            <span role="rowheader" className="cl-c__label" style={at(ri + 2, 2)}>
              {r.label}
            </span>
            <span role="cell" className="cl-c__them" style={at(ri + 2, 3)}>
              {isNo(r.values[i + 1]) ? (
                <>
                  <b>Ne</b>
                  {noText(r.values[i + 1]) && <small>{noText(r.values[i + 1])}</small>}
                </>
              ) : (
                <b className={isYes(r.values[i + 1]) ? 'is-yes' : undefined}>{r.values[i + 1]}</b>
              )}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function CompareLab() {
  const [v, setV] = useState(0);

  useEffect(() => {
    const key = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') setV((x) => (x + 1) % 3);
      if (e.key === 'ArrowLeft') setV((x) => (x + 2) % 3);
    };
    addEventListener('keydown', key);
    return () => removeEventListener('keydown', key);
  }, []);

  return (
    <>
      <div className="cl-switch" role="group" aria-label="Varianty srovnání">
        <p>
          <b>{v + 1}/3</b> {NAMES[v]}
        </p>
        <div>
          {NAMES.map((n, k) => (
            <button type="button" className={k === v ? 'is-on' : ''} onClick={() => setV(k)} key={n}>
              {n}
            </button>
          ))}
        </div>
        <small>šipky ← → přepínají</small>
      </div>
      {v === 0 && <VariantA />}
      {v === 1 && <VariantB />}
      {v === 2 && <VariantC />}
    </>
  );
}
