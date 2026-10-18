import { cta } from '@/lib/content';
import ContactForm from './ContactForm';
import ShaderBackground from './ShaderBackground';

export default function Cta() {
  return (
    <section className="section" id="rezervace" aria-labelledby="cta-title">
      <div className="wrap">
        <div className="cta reveal">
          <div className="cta__bg" aria-hidden="true">
            <div className="cta__fallback" />
            <ShaderBackground bgVar="--smoke-bg" brandVar="--primary" phase={95} />
            <div className="cta__shade" />
          </div>
          <div className="cta__copy">
            <h2 className="display cta__title" id="cta-title">
              {cta.title}
            </h2>
            <p className="cta__text">{cta.text}</p>
          </div>
          <div className="cta__form">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
