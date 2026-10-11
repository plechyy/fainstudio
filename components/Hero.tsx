import { CAL_URL } from '@/lib/config';
import { hero } from '@/lib/content';
import ShaderBackground from './ShaderBackground';
import LogosStrip from './LogosStrip';

export default function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-bg" aria-hidden="true">
        <div className="hero-bg__fallback" />
        <ShaderBackground sides />
        <div className="hero-bg__mask" />
        <div className="hero-bg__grain" />
      </div>

      <div className="wrap hero__inner">
        <p className="label hero__eyebrow glass seq" style={{ ['--i' as string]: 0 }}>
          <span className="hero__dot" aria-hidden="true" />
          {hero.eyebrow}
        </p>

        <h1 id="hero-title" className="display hero__title seq seq--rise-only" style={{ ['--i' as string]: 1 }}>
          <span className="silver silver--block">Postavím vám systém, který dělá tu práci,</span>
          <span className="hero__accent">co u vás dneska dělá někdo rukou.</span>
        </h1>

        <p className="lead hero__lead seq" style={{ ['--i' as string]: 2 }}>
          {hero.lead}
        </p>

        <div className="hero__actions seq" style={{ ['--i' as string]: 3 }}>
          <a className="btn btn--primary" href={CAL_URL}>
            {hero.primary}
            <span className="btn__arrow" aria-hidden="true">→</span>
          </a>
          <a className="btn btn--ghost" href="#systemy">
            <span className="hero__down" aria-hidden="true">↓</span>
            {hero.secondary}
          </a>
        </div>
      </div>

      <LogosStrip />
    </section>
  );
}
