import { CAL_URL } from '@/lib/config';
import { hero } from '@/lib/content';
import HeroRotate from './HeroRotate';
import Artifact from './systems/Artifact';
import ShaderBackground from './ShaderBackground';

export default function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-bg" aria-hidden="true">
        <div className="hero-bg__fallback" />
        <ShaderBackground sides brandVar="--primary" />
        <div className="hero-bg__mask" />
        <div className="hero-bg__grain" />
      </div>

      <div className="wrap hero__inner">
        <h1 id="hero-title" className="display hero__title seq seq--rise-only" style={{ ['--i' as string]: 1 }}>
          <span className="sr-only">{hero.titleSr}</span>
          <span className="hero__kicker label" aria-hidden="true">
            {hero.kicker}
          </span>
          <span className="silver silver--block" aria-hidden="true">
            {hero.title}
          </span>
          <HeroRotate lead={hero.rotateLead} phrases={hero.rotate} />
        </h1>

        <p className="lead hero__lead seq" style={{ ['--i' as string]: 2 }}>
          {hero.lead}
        </p>

        <div className="hero__actions seq" style={{ ['--i' as string]: 3 }}>
          <a className="btn btn--primary" href={CAL_URL}>
            {hero.primary}
          </a>
          <a className="btn btn--ghost" href="#systemy">
            <span className="hero__down" aria-hidden="true">↓</span>
            {hero.secondary}
          </a>
        </div>

        <ul className="hero__safe seq" style={{ ['--i' as string]: 4 }} aria-label="Vaše data">
          <li>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <rect x="5" y="10.5" width="14" height="9.5" rx="2.6" />
              <path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5M12 14.5v2" />
            </svg>
            Data zůstávají vaše
          </li>
          <li>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M7 18.5h10.2a3.8 3.8 0 0 0 .6-7.55A5.3 5.3 0 0 0 7.6 9.6 4.5 4.5 0 0 0 7 18.5z" />
            </svg>
            V cloudu, nebo lokálně u vás
          </li>
          <li>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 3.5l7 2.8v5.1c0 4.1-2.8 7.2-7 9.1-4.2-1.9-7-5-7-9.1V6.3z" />
              <path d="m9 12 2.2 2.2L15.2 10" />
            </svg>
            Přístup jen pro koho určíte
          </li>
        </ul>

        {/* ukázka toho, co systém dělá: stejná scéna jako v sekci 2, jen menší */}
        <div className="hero__scene seq" style={{ ['--i' as string]: 5 }}>
          <Artifact id="nastroje" />
        </div>
      </div>
    </section>
  );
}
