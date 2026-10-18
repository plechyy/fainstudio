import { why } from '@/lib/content';
import { Efficiency, Flow, Mosaic } from './WhyVisuals';

/*
 * Sekce „Proč AI“: tři krátké body (proč, kde, jakou roli hraje), každý s jednoduchou
 * obecnou animací, která ilustruje právě ten text. Záměrně obecně: bez konkrétních
 * případů a bez dlouhých textů.
 */

const visuals = [Efficiency, Mosaic, Flow];

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
