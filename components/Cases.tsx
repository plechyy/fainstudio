import { cases } from '@/lib/content';
import { CAL_URL, ICO, NAME } from '@/lib/config';
import CasesCarousel from './CasesCarousel';

export default function Cases() {
  const anyModel = cases.items.some((it) => it.kind === 'model');

  return (
    <section className="section" id="pripady" aria-labelledby="pripady-title">
      <div className="wrap">
        <header className="hd reveal">
          <p className="label shead__index" aria-hidden="true">
            <b>05</b>
            Případy
          </p>
          <h2 className="h2 hd__title" id="pripady-title">
            <span className="silver silver--block">{cases.title}</span>
            <span className="hd__accent">{cases.accent}</span>
          </h2>
          <p className="hd__lead">{cases.lead}</p>
        </header>

        <div className="reveal">
          <CasesCarousel />
        </div>

        {anyModel && <p className="cs__note">{cases.note}</p>}

        <section className="cs-ass reveal" aria-label="Co platí vždy">
          <ul>
            {cases.assurances.map((a) => (
              <li key={a.k}>
                <svg viewBox="0 0 16 16" aria-hidden="true">
                  <path d="M3 8.5 6.5 12 13 4.5" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="square" />
                </svg>
                <p>
                  <b>{a.k}</b>
                  {a.t}
                </p>
              </li>
            ))}
          </ul>
          <p className="cs-ass__id">
            <span>
              {cases.verify.lead} <b>{NAME}</b>, IČO <span className="num">{ICO}</span>.
            </span>
            <a href={`https://ares.gov.cz/ekonomicke-subjekty?ico=${ICO}`} target="_blank" rel="noopener noreferrer">
              {cases.verify.link} <span aria-hidden="true">↗</span>
            </a>
          </p>
        </section>

        <div className="cs__cta">
          <a className="btn btn--primary" href={CAL_URL}>
            {cases.cta}
          </a>
        </div>
      </div>
    </section>
  );
}
