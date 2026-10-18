import type { CSSProperties } from 'react';
import { why } from '@/lib/content';

/*
 * Sekce „Proč AI“: tři krátké body (proč, kde, jakou roli hraje), každý s jednoduchou
 * obecnou animací, která ilustruje právě ten text. Záměrně obecně: bez konkrétních
 * případů a bez dlouhých textů.
 */

/* Proč: tým zůstává stejný, hotové práce přibývá */
function More() {
  return (
    <svg className="why-v" viewBox="0 0 240 124" aria-hidden="true">
      <defs>
        <linearGradient id="why-area" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--primary)" stopOpacity="0.35" />
          <stop offset="1" stopColor="var(--primary)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path className="why-v__grid" d="M14 34H226M14 64H226" />
      <path className="why-v__axis" d="M14 108H226" />
      <path className="why-v__area" d="M14 96C58 94 88 86 118 70S180 34 222 24V108H14Z" fill="url(#why-area)" />
      <path className="why-v__team" d="M14 96H222" />
      <text className="why-v__lbl" x="222" y="105">
        stejný tým
      </text>
      <path className="why-v__rise" d="M14 96C58 94 88 86 118 70S180 34 222 24" pathLength="1" />
      <g className="why-v__end">
        <circle cx="222" cy="24" r="4.5" />
        <rect x="150" y="2" width="58" height="17" rx="8.5" />
        <text x="179" y="13.8">
          víc práce
        </text>
      </g>
    </svg>
  );
}

/* Kde: radar obkrouží celou firmu a rozsvítí každou oblast */
const AREAS = ['Administrativa', 'Procesy', 'Obchod', 'Kreativa', 'Data', 'Zákazníci'];
const SWEEP = 4; // s, jedna otočka radaru
function Across() {
  return (
    <div className="wr" aria-hidden="true">
      <span className="wr__ring" />
      <span className="wr__ring wr__ring--in" />
      <span className="wr__sweep" />
      <span className="wr__core">AI</span>
      {AREAS.map((a, i) => {
        const t = (i / AREAS.length) * Math.PI * 2;
        const style = {
          '--sx': Math.sin(t).toFixed(3),
          '--sy': (-Math.cos(t)).toFixed(3),
          animationDelay: `${((i / AREAS.length) * SWEEP).toFixed(2)}s`,
        } as CSSProperties;
        return (
          <span className="wr__chip" key={a} style={style}>
            {a}
          </span>
        );
      })}
    </div>
  );
}

/* Jakou roli: AI čte, počítá a píše, pak připraví dva návrhy. Vybíráte vy. */
const VERBS = ['čte', 'počítá', 'odpovídá', 'píše', 'navrhuje'];
function Choice() {
  return (
    <div className="wc" aria-hidden="true">
      <p className="wc__status">
        <span className="wc__ai">AI</span>
        <span className="wc__dots">
          <i />
          <i />
          <i />
        </span>
        <span className="wc__verbs">
          {VERBS.map((v, i) => (
            <span key={v} style={{ animationDelay: `${i * 1.04}s` }}>
              {v}
            </span>
          ))}
        </span>
      </p>
      <div className="wc__opts">
        {['A', 'B'].map((k, n) => (
          <div className={`wc__opt wc__opt--${k.toLowerCase()}`} key={k}>
            <b>Návrh {k}</b>
            {[0, 1, 2].map((l) => (
              <i key={l} style={{ animationDelay: `${(n * 0.3 + l * 0.12).toFixed(2)}s` }} />
            ))}
            {n === 1 && (
              <span className="wc__ok">
                <svg viewBox="0 0 16 16">
                  <path d="M4 8.5l2.6 2.6L12 5.5" />
                </svg>
              </span>
            )}
          </div>
        ))}
      </div>
      <span className="wc__cur">
        <svg viewBox="0 0 14 20">
          <path d="M1 1v15l4-4 3 7 3-1.5-3-6.5h6z" />
        </svg>
        <b>Vy</b>
      </span>
    </div>
  );
}

const visuals = [More, Across, Choice];

export default function WhyAi() {
  return (
    <section className="section" id="proc-ai" aria-labelledby="proc-ai-title">
      <div className="wrap">
        <header className="shead reveal">
          <p className="shead__index label" aria-hidden="true">
            <b>03</b>
            Proč AI
          </p>
          <h2 className="h2" id="proc-ai-title">
            <span className="silver silver--block">{why.title}</span>
            <span className="hd__accent">{why.accent}</span>
          </h2>
          <p className="lead shead__lead">{why.lead}</p>
        </header>

        <ol className="why reveal">
          {why.items.map((it, i) => {
            const V = visuals[i];
            return (
              <li className="why__item" key={it.k}>
                <div className="why__vis">
                  <V />
                </div>
                <p className="label why__k">
                  <b className="num">0{i + 1}</b> {it.k}
                </p>
                <h3 className="why__t">{it.t}</h3>
                <p className="why__d">{it.d}</p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
