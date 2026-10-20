import { cases } from '@/lib/content';
import FirmLogo from './FirmLogo';
import Live from './Live';
import Result from './Result';
import { bodies } from './articles';

export type CaseItem = (typeof cases.items)[number];

/* Dílčí kusy case study. Skládají se různě podle varianty (čtečka, rozbalení, přehled) i na samostatné stránce. */

/** logo, nadpis, perex, řádek údajů a výsledek Dřív → Teď */
export function StoryHero({ c, as: Tag = 'h2' }: { c: CaseItem; as?: 'h1' | 'h2' }) {
  const L = cases.labels;
  return (
    <header className="ca-hero">
      <FirmLogo id={c.id} className="fl--lg" />
      <Tag className="ca-hero__t">{c.title}</Tag>
      <p className="ca-hero__lead">{c.standfirst}</p>
      <dl className="ca-facts">
        <div>
          <dt>Klient</dt>
          <dd>{c.firm}</dd>
        </div>
        <div>
          <dt>Obor</dt>
          <dd>{c.industry}</dd>
        </div>
        <div>
          <dt>Co jsme postavili</dt>
          <dd>{c.built}</dd>
        </div>
      </dl>
      <div className="ca-res">
        <Result c={c} />
      </div>
    </header>
  );
}

/** živá scéna případu v barvě případu */
export function StoryFig({ c }: { c: CaseItem }) {
  return (
    <div className="ca-fig art" style={{ ['--ac-h' as string]: `calc(var(--pal-h) + ${c.hue})` }} aria-hidden="true">
      <Live v={c.visual} />
    </div>
  );
}

/** samotný příběh (tělo je u každého případu napsané zvlášť) */
export function StoryText({ id }: { id: string }) {
  const Body = bodies[id];
  return (
    <div className="ca-prose">
      <Body />
    </div>
  );
}
