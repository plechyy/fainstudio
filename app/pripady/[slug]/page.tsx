import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Footer from '@/components/Footer';
import { StoryFig, StoryHero, StoryText } from '@/components/cases/Story';
import { CAL_URL } from '@/lib/config';
import { cases } from '@/lib/content';
import { brandStyle } from '@/components/cases/brand';

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

  return (
    <>
      <header className="legal__top">
        <div className="wrap">
          <Link href="/#pripady" className="legal__back">
            ← Všechny případy
          </Link>
        </div>
      </header>

      <main className="ca" id="obsah" style={brandStyle(c.brand)}>
        <div className="wrap">
          <StoryHero c={c} as="h1" />
          <StoryFig c={c} />
          <StoryText id={c.id} />

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
