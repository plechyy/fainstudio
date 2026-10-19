import { cases } from '@/lib/content';
import { CAL_URL } from '@/lib/config';
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

        <div className="cs__cta">
          <a className="btn btn--primary" href={CAL_URL}>
            {cases.cta}
          </a>
        </div>
      </div>
    </section>
  );
}
