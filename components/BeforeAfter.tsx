import { CAL_URL } from '@/lib/config';
import { beforeAfter as ba } from '@/lib/content';
import ShaderBackground from './ShaderBackground';

export default function BeforeAfter() {
  return (
    <section className="section section--tight" id="pred-po" aria-labelledby="ba-title">
      <div className="wrap">
        <div className="ba reveal">
          <header className="ba-head">
            <p className="label shead__index" aria-hidden="true">
              <b>04</b>
              Dneska a potom
            </p>
            <h2 className="h2 ba-head__title" id="ba-title">
              <span className="silver silver--block">Jak to vypadá dneska.</span>
              <span className="ba-head__accent">A jak potom.</span>
            </h2>
            <p className="ba-head__lead">{ba.lead}</p>
          </header>

          <div className="ba__card ba__card--before">
            <h3 className="ba__label">
              <span className="ba__led" aria-hidden="true" />
              {ba.before.label}
            </h3>
            <ul className="ba__list">
              {ba.before.items.map((t, i) => (
                <li key={i}>
                  <span className="ba__mark" aria-hidden="true">
                    –
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </div>

          <div className="ba__card ba__card--after">
            {/* stejná karta jako závěrečné CTA: černá, kouř vpravo */}
            <div className="ba__smoke" aria-hidden="true">
              <ShaderBackground bgVar="--smoke-bg" phase={95} />
            </div>
            <h3 className="ba__label">
              <span className="ba__led" aria-hidden="true" />
              {ba.after.label}
            </h3>
            <ul className="ba__list">
              {ba.after.items.map((t, i) => (
                <li key={i}>
                  <span className="ba__mark" aria-hidden="true">
                    <svg viewBox="0 0 16 16" width="16" height="16">
                      <path
                        d="M3 8.5 6.5 12 13 4.5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="square"
                      />
                    </svg>
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </div>

          <div className="ba__cta">
            <a className="btn btn--primary" href={CAL_URL}>
              {ba.cta}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
