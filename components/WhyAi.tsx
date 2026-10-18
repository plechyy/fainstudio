import { why } from '@/lib/content';

/*
 * Sekce „Proč AI“: tři krátké body (proč, kde, jakou roli hraje), každý s jednoduchou
 * obecnou animací. Záměrně obecně: bez konkrétních případů a bez dlouhých textů.
 */

/* Proč: rozházené informace se propojí v jeden celek, uprostřed se rozsvítí */
const NODES = [
  [24, 38],
  [58, 16],
  [96, 30],
  [100, 78],
  [62, 104],
  [20, 86],
];
function Network() {
  return (
    <svg className="why-v why-v--net" viewBox="0 0 120 120" aria-hidden="true">
      {NODES.map(([x, y], i) => (
        <path
          key={`l${i}`}
          className="why-v__link"
          d={`M${x} ${y}L60 60`}
          pathLength="1"
          style={{ animationDelay: `${i * 0.18}s` }}
        />
      ))}
      {NODES.map(([x, y], i) => (
        <circle key={`n${i}`} className="why-v__bit" cx={x} cy={y} r="5" style={{ animationDelay: `${i * 0.18}s` }} />
      ))}
      <circle className="why-v__core" cx="60" cy="60" r="9" />
    </svg>
  );
}

/* Kde: mřížka, která se postupně rozsvítí celá, tedy všude */
function Spots() {
  return (
    <svg className="why-v why-v--spots" viewBox="0 0 120 120" aria-hidden="true">
      {Array.from({ length: 16 }, (_, i) => {
        const c = i % 4;
        const r = Math.floor(i / 4);
        return (
          <circle
            key={i}
            className="why-v__spot"
            cx={24 + c * 24}
            cy={24 + r * 24}
            r="6"
            style={{ animationDelay: `${(c + r) * 0.16}s` }}
          />
        );
      })}
    </svg>
  );
}

/* Jakou roli: AI připraví, vy potvrdíte */
function Hand() {
  return (
    <svg className="why-v why-v--hand" viewBox="0 0 120 120" aria-hidden="true">
      <path className="why-v__line" d="M34 60h52" />
      <circle className="why-v__packet" cx="34" cy="60" r="4.5" />
      <circle className="why-v__node" cx="28" cy="60" r="16" />
      <text className="why-v__txt" x="28" y="64.5">AI</text>
      <circle className="why-v__node why-v__node--you" cx="92" cy="60" r="16" />
      <text className="why-v__txt" x="92" y="64.5">Vy</text>
      <path className="why-v__ok" d="M85 60.5l5 5 9-10" pathLength="1" />
    </svg>
  );
}

const visuals = [Network, Spots, Hand];

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
