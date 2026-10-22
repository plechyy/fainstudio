import type { CSSProperties } from 'react';
import { compare } from '@/lib/content';
import { STAR_D, STAR_STROKE } from '@/lib/star';
import ShaderBackground from './ShaderBackground';

const isYes = (v: string) => v === 'Ano';
const isNo = (v: string) => v.startsWith('Ne') && v !== 'Někdy';
const at = (row: number, col: number): CSSProperties => ({ gridRow: row, gridColumn: col });

/** Značka buňky: u FaiN Studia hvězdička, u ostatních fajfka, „ne“ je pomlčka (důvod malým písmem), ostatní zůstává slovy */
function Mark({ v, us }: { v: string; us?: boolean }) {
  if (isYes(v)) {
    return (
      <span className={`cmp-mark ${us ? 'cmp-mark--star' : 'cmp-mark--yes'}`}>
        {us ? (
          <svg viewBox="0 0 100 100" aria-hidden="true" focusable="false">
            <path d={STAR_D} fill="currentColor" stroke="currentColor" strokeWidth={STAR_STROKE} strokeLinejoin="round" />
          </svg>
        ) : (
          <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false">
            <path d="M3 8.5 6.5 12 13 4.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
        <span className="sr-only">Ano</span>
      </span>
    );
  }
  if (isNo(v)) {
    const rest = v.replace(/^Ne,?\s*/, '');
    return (
      <span className="cmp-mark cmp-mark--no">
        <i aria-hidden="true" />
        {rest ? <small>{rest}</small> : <span className="sr-only">Ne</span>}
      </span>
    );
  }
  return <span className="cmp-text">{v}</span>;
}

export default function Compare() {
  const rows = compare.rows;
  return (
    <section className="section" id="srovnani" aria-labelledby="srovnani-title">
      <div className="wrap">
        <header className="hd reveal">
          <p className="label shead__index" aria-hidden="true">
            <b>06</b>
            Proč FaiN?
          </p>
          <h2 className="h2 hd__title" id="srovnani-title">
            <span className="silver silver--block">Jiné cesty to taky umí.</span>
            <span className="hd__accent">Jen jinak.</span>
          </h2>
        </header>

        <div className="cmpx reveal" role="table" aria-label={compare.title}>
          <div className="cmp-smoke" style={{ gridColumn: 2, gridRow: `1 / span ${rows.length + 1}` }} aria-hidden="true">
            <ShaderBackground bgVar="--smoke-bg" brandVar="--primary" phase={95} />
          </div>
          <div className="cmpx__head" role="row">
            <span role="columnheader" style={at(1, 1)} />
            {compare.columns.map((c, i) => (
              <span role="columnheader" className={i === 0 ? 'is-us' : undefined} style={at(1, i + 2)} key={c}>
                {c}
              </span>
            ))}
          </div>
          {rows.map((r, ri) => (
            <div className="cmpx__row" role="row" key={r.label}>
              <span role="rowheader" className="cmpx__label" style={at(ri + 2, 1)}>
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

        <div className="cmp-cards">
          {compare.columns.map((c, ci) => (
            <section className={`cmp-card reveal${ci === 0 ? ' us' : ''}`} aria-label={c} key={c}>
              {ci === 0 && (
                <div className="cmp-smoke cmp-smoke--card" aria-hidden="true">
                  <ShaderBackground bgVar="--smoke-bg" brandVar="--primary" phase={95} />
                </div>
              )}
              <h3 className="cmp-card__title">{c}</h3>
              <dl>
                {compare.rows.map((r) => (
                  <div className="cmp-card__row" key={r.label}>
                    <dt>{r.label}</dt>
                    <dd>
                      <Mark v={r.values[ci]} us={ci === 0} />
                    </dd>
                  </div>
                ))}
              </dl>
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}
