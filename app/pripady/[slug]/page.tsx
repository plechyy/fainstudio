import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Footer from '@/components/Footer';
import FirmLogo from '@/components/cases/FirmLogo';
import Live from '@/components/cases/Live';
import { bodies } from '@/components/cases/articles';
import { CAL_URL } from '@/lib/config';
import { cases } from '@/lib/content';

/*
 * Stránka jednoho případu: pevná kostra (logo, nadpis, perex, řádek údajů, výsledek, živá scéna)
 * a tělo, které je u každého případu jiné a napsané zvlášť (components/cases/articles).
 */
export function generateStaticParams() {
  return cases.items.map((c) => ({ slug: c.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const c = cases.items.find((x) => x.id === slug);
  if (!c) return {};
  return {
    title: `${c.firm}: ${c.title}`,
    description: c.standfirst,
    alternates: { canonical: `/pripady/${c.id}` },
    robots: { index: true, follow: true },
  };
}

export default async function CasePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const i = cases.items.findIndex((x) => x.id === slug);
  if (i < 0) notFound();
  const c = cases.items[i];
  const next = cases.items[(i + 1) % cases.items.length];
  const Body = bodies[c.id];
  const L = cases.labels;

  return (
    <>
      <header className="legal__top">
        <div className="wrap">
          <Link href="/#pripady" className="legal__back">
            ← Všechny případy
          </Link>
        </div>
      </header>

      <main className="ca" id="obsah" style={{ ['--co' as string]: c.hue }}>
        <div className="wrap">
          <header className="ca-hero">
            <FirmLogo id={c.id} className="fl--lg" />
            <h1 className="ca-hero__t">{c.title}</h1>
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

            <p className="cx-res ca-res">
              <span className="cx-res__before">
                <small>{L.before}</small>
                <s className="num">{c.result.before}</s>
              </span>
              <span className="cx-res__arrow" aria-hidden="true" />
              <span className="cx-res__after">
                <small>{L.after}</small>
                <b className="num">{c.result.after}</b>
              </span>
              <span className="cx-res__unit">{c.result.unit}</span>
            </p>
          </header>

          <div className="ca-fig art" style={{ ['--ac-h' as string]: `calc(var(--pal-h) + ${c.hue})` }} aria-hidden="true">
            <Live v={c.visual} />
          </div>

          <div className="ca-prose">
            <Body />
          </div>

          <footer className="ca-end">
            <p>
              <a className="btn btn--primary" href={`/${CAL_URL}`}>
                {cases.cta}
              </a>
            </p>
            <Link href={`/pripady/${next.id}`} className="ca-next">
              <small>Další případ</small>
              <span>
                {next.firm}: {next.title}
              </span>
            </Link>
          </footer>
        </div>
      </main>
      <Footer />
    </>
  );
}
