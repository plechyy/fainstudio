import { CAL_URL, EMAIL } from '@/lib/config';
import { cta } from '@/lib/content';
import ShaderBackground from './ShaderBackground';

export default function Cta() {
  return (
    <section className="section" id="rezervace" aria-labelledby="cta-title">
      <div className="wrap">
        <div className="cta reveal">
          <div className="cta__bg" aria-hidden="true">
            <div className="cta__fallback" />
            <ShaderBackground bgVar="--smoke-bg" brandVar="--cta" phase={95} />
            <div className="cta__shade" />
          </div>
          <h2 className="display cta__title" id="cta-title">
            {cta.title}
          </h2>
          <p className="cta__text">{cta.text}</p>
          <div className="cta__actions">
            <a className="btn btn--primary cta__btn" href={CAL_URL}>
              {cta.button}
            </a>
            <p className="cta__mail">
              Raději mailem? Pište na <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
