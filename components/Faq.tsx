import { faq } from '@/lib/content';
import SectionHead from './SectionHead';

export default function Faq() {
  return (
    <section className="section" id="faq" aria-labelledby="faq-title">
      <div className="wrap faq-grid">
        <SectionHead index="09" name="Otázky" id="faq-title" title={
            <>
              <span className="silver silver--block">Máte otázky?</span>
              <span className="hd__accent">Máme odpovědi:</span>
            </>
          } />

        <div className="faq reveal">
          {faq.map((f) => (
            <details className="faq__item" id={f.q.startsWith('Kolik') ? 'cena' : f.q.startsWith('Kde jsou') ? 'data' : undefined} key={f.q}>
              <summary>
                <span className="faq__q">{f.q}</span>
                <span className="faq__icon" aria-hidden="true" />
              </summary>
              <p className="faq__a">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
