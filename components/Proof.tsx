import { proof, cta } from '@/lib/content';
import CtaRow from './CtaRow';

export default function Proof() {
  return (
    <section className="section section--tight" id="proof" aria-labelledby="proof-title">
      <div className="wrap">
        <header className="hd reveal">
          <p className="label shead__index" aria-hidden="true">
            <b>07</b>
            Přínosy
          </p>
          <h2 className="h2 hd__title" id="proof-title">
            <span className="silver silver--block">Co z toho</span>
            <span className="hd__accent">budete mít.</span>
          </h2>
        </header>

        <ul className="proof reveal">
          {proof.stats.map((f, i) => (
            <li className="proof__item" style={{ ['--n' as string]: i }} key={f.label}>
              <p className="proof__label">{f.label}</p>
              <p className="proof__value num">
                {f.value.startsWith('od ') && <span className="proof__pre">od </span>}
                {f.value.replace(/^od /, '')}
              </p>
              <p className="proof__text">{f.text}</p>
            </li>
          ))}
        </ul>

        <p className="proof__src reveal">{proof.source}</p>

        <div className="proof-strip reveal">
          <h3 className="proof-strip__title">{proof.strip.title}</h3>
          <p className="proof-strip__text">{proof.strip.text}</p>
        </div>

        <CtaRow label={cta.priceButton} />
      </div>
    </section>
  );
}
