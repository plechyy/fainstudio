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
            <span className="silver silver--block">Čísla, za kterými</span>
            <span className="hd__accent">si stojíme.</span>
          </h2>
        </header>

        <ul className="proof reveal">
          {proof.stats.map((f, i) => (
            <li className="proof__item" style={{ ['--n' as string]: i }} key={f.label}>
              <p className="proof__label">{f.label}</p>
              <p className="proof__value num">
                {/^(od|až) /.test(f.value) && <span className="proof__pre">{f.value.slice(0, 3)}</span>}
                {f.value.replace(/^(od|až) /, '')}
              </p>
              <p className="proof__text">{f.text}</p>
            </li>
          ))}
        </ul>

        <CtaRow label={cta.priceButton} />
      </div>
    </section>
  );
}
