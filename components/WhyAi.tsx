import type { ReactNode } from 'react';
import { why } from '@/lib/content';

/*
 * Sekce „Proč AI“: tři krátké body (proč, kde, jakou roli hraje), každý s jednoduchou
 * obecnou animací, která ilustruje právě ten text. Záměrně obecně: bez konkrétních
 * případů a bez dlouhých textů.
 */

/* Proč: stejní tři lidé, ale každý toho zvládne víc (sloupce vyrostou nad čáru „dřív“) */
const PEOPLE = [50, 100, 150];
function More() {
  return (
    <svg className="why-v" viewBox="0 0 200 124" aria-hidden="true">
      <path className="why-v__before" d="M28 70H172" />
      {PEOPLE.map((x, i) => (
        <rect
          key={`b${x}`}
          className="why-v__bar"
          x={x - 11}
          y="18"
          width="22"
          height="68"
          rx="5"
          style={{ animationDelay: `${i * 0.14}s` }}
        />
      ))}
      <path className="why-v__base" d="M24 88H176" />
      {PEOPLE.map((x) => (
        <g key={`p${x}`} className="why-v__person">
          <circle cx={x} cy="100" r="5" />
          <path d={`M${x - 9} 119a9 9 0 0 1 18 0`} />
        </g>
      ))}
    </svg>
  );
}

/* Kde: světlo projde administrativou, procesy i kreativou */
const AREAS: { x: number; label: string; icon: ReactNode }[] = [
  {
    x: 40,
    label: 'Administrativa',
    icon: (
      <>
        <path d="M33 39h10l5 5v15H33z" />
        <path d="M37 49h7M37 54h7" />
      </>
    ),
  },
  {
    x: 105,
    label: 'Procesy',
    icon: (
      <>
        <path d="M113 45a9 9 0 0 0-16-2" />
        <path d="M97 37v6h6" />
        <path d="M97 53a9 9 0 0 0 16 2" />
        <path d="M113 61v-6h-6" />
      </>
    ),
  },
  {
    x: 170,
    label: 'Kreativa',
    icon: <path d="M170 38q2 9 11 11q-9 2-11 11q-2-9-11-11q9-2 11-11z" />,
  },
];
function Across() {
  return (
    <svg className="why-v" viewBox="0 0 210 124" aria-hidden="true">
      <path className="why-v__line" d="M40 49H170" />
      <circle className="why-v__pulse" cx="40" cy="49" r="4" />
      {AREAS.map((a, i) => (
        <g key={a.label} className="why-v__area" style={{ animationDelay: `${i * 0.9}s` }}>
          <rect x={a.x - 24} y="25" width="48" height="48" rx="13" />
          <g className="why-v__ico">{a.icon}</g>
          <text className="why-v__txt" x={a.x} y="96">
            {a.label}
          </text>
        </g>
      ))}
    </svg>
  );
}

/* Jakou roli: AI připraví dva návrhy, vybíráte vy (kurzor „Vy“ klikne) */
function Choice() {
  return (
    <svg className="why-v" viewBox="0 0 200 124" aria-hidden="true">
      {[12, 66].map((y, i) => (
        <g key={y} className={`why-v__card why-v__card--${i ? 'b' : 'a'}`}>
          <rect x="14" y={y} width="122" height="44" rx="10" />
          <text className="why-v__ai" x="31" y={y + 26}>
            AI
          </text>
          <path className="why-v__w" d={`M48 ${y + 17}H120`} pathLength="1" style={{ animationDelay: `${i * 0.25}s` }} />
          <path
            className="why-v__w"
            d={`M48 ${y + 28}H${i ? 104 : 96}`}
            pathLength="1"
            style={{ animationDelay: `${0.12 + i * 0.25}s` }}
          />
        </g>
      ))}
      <g className="why-v__pick">
        <circle cx="136" cy="66" r="9" />
        <path d="M131.5 66.5l3 3 6-6.5" />
      </g>
      <g className="why-v__cursor">
        <path d="M0 0v15l4-4 3 7 3-1.5-3-6.5h6z" />
        <rect x="11" y="15" width="24" height="15" rx="7.5" />
        <text x="23" y="25.5">
          Vy
        </text>
      </g>
    </svg>
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
