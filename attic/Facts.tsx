import { facts } from '@/lib/content';
import Plate from './Plate';

export default function Facts() {
  return (
    <section className="section factsec" aria-label="Fakta">
      <div className="wrap factsec__grid">
        <Plate className="factsec__plate reveal" fig="Obr. 01" caption="Systém v provozu">
          <video
            className="factsec__video"
            data-hero-video
            muted
            loop
            playsInline
            preload="metadata"
            poster="/media/hero-poster.webp"
            width={640}
            height={640}
            aria-hidden="true"
            tabIndex={-1}
          >
            <source src="/media/hero-loop.webm" type="video/webm" />
            <source src="/media/hero-loop.mp4" type="video/mp4" />
          </video>
        </Plate>

        <dl className="facts reveal" style={{ ['--i' as string]: 1 }}>
          {facts.map((f) => (
            <div className="fact" key={f.label}>
              <dt className="fact__value num">{f.value}</dt>
              <dd className="fact__label">{f.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
