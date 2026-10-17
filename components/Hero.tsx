import { CAL_URL } from '@/lib/config';
import { hero } from '@/lib/content';
import HeroRotate from './HeroRotate';
import ShaderBackground from './ShaderBackground';
import MachineStage from './machine/MachineStage';

/**
 * bg="smoke": hlavní stránka, kouř a vycentrovaný text.
 * bg="machine": /hero2, text nahoře uprostřed, pod ním 3D stroj v primární záři.
 */
export default function Hero({ bg = 'smoke' }: { bg?: 'smoke' | 'machine' }) {
  const stage = bg === 'machine';

  const lead = (
    <p className="lead hero__lead seq" style={{ ['--i' as string]: 2 }}>
      {hero.lead}
    </p>
  );
  const actions = (
    <div className="hero__actions seq" style={{ ['--i' as string]: 3 }}>
      <a className="btn btn--primary" href={CAL_URL}>
        {hero.primary}
      </a>
      <a className="btn btn--ghost" href="#systemy">
        <span className="hero__down" aria-hidden="true">↓</span>
        {hero.secondary}
      </a>
    </div>
  );

  return (
    <section className={`hero${stage ? ' hero--stage' : ''}`} aria-labelledby="hero-title">
      <div className={`hero-bg${stage ? ' hero-bg--stage' : ''}`} aria-hidden="true">
        <div className="hero-bg__fallback" />
        {stage ? <MachineStage /> : <ShaderBackground sides brandVar="--primary" />}
        <div className="hero-bg__mask" />
        <div className="hero-bg__grain" />
      </div>

      <div className="wrap hero__inner">
        <h1 id="hero-title" className="display hero__title seq seq--rise-only" style={{ ['--i' as string]: 1 }}>
          <span className="sr-only">{hero.titleSr}</span>
          <span className="silver silver--block" aria-hidden="true">
            {hero.title}
          </span>
          <HeroRotate lead={hero.rotateLead} phrases={hero.rotate} />
        </h1>

        {lead}
        {actions}
      </div>
    </section>
  );
}
