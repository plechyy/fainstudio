import { why } from '@/lib/content';

/*
 * Sekce „Proč AI“: tři krátké body (proč, kde, jakou roli hraje), každý s jednoduchou
 * obecnou animací. Záměrně bez konkrétních příkladů z praxe a bez dlouhých textů.
 */

/* Proč: kolečko, které se pořád točí, a práce jde dokola sama */
function Loop() {
  return (
    <svg className="why-v why-v--loop" viewBox="0 0 120 120" aria-hidden="true">
      <circle className="why-v__track" cx="60" cy="60" r="34" />
      <g className="why-v__spin">
        <circle className="why-v__arc" cx="60" cy="60" r="34" pathLength="100" />
        <circle className="why-v__dot" cx="60" cy="26" r="5" />
      </g>
      <path className="why-v__tick" d="M48 60.5l8 8 16-17" pathLength="1" />
    </svg>
  );
}

/* Kde: mřížka teček, ve které se tu a tam rozsvítí místa, kde AI pomůže */
function Spots() {
  const lit = [1, 5, 7, 10, 14];
  return (
    <svg className="why-v why-v--spots" viewBox="0 0 120 120" aria-hidden="true">
      {Array.from({ length: 16 }, (_, i) => {
        const on = lit.indexOf(i);
        return (
          <circle
            key={i}
            className={on >= 0 ? 'why-v__spot is-on' : 'why-v__spot'}
            cx={24 + (i % 4) * 24}
            cy={24 + Math.floor(i / 4) * 24}
            r="6"
            style={on >= 0 ? { animationDelay: `${on * 0.55}s` } : undefined}
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

const visuals = [Loop, Spots, Hand];

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
