import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CAL_URL } from '@/lib/config';
import { articles, findArticle } from '@/lib/blog';
import ArticleBody from '@/components/blog/ArticleBody';
import BlogShell from '@/components/blog/BlogShell';
import ShaderBackground from '@/components/ShaderBackground';

/* Článek jako samostatná stránka: pro sdílení odkazu a pro vyhledávače.
   Na hlavní stránce se stejný text otevírá v panelu (?clanek=slug). */

export const dynamicParams = false;

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await props.params;
  const a = findArticle(slug);
  if (!a) return {};
  const title = `${a.title} — FainStudio`;
  return {
    title,
    description: a.teaser,
    alternates: { canonical: `/blog/${a.slug}` },
    openGraph: { type: 'article', locale: 'cs_CZ', title, description: a.teaser, url: `/blog/${a.slug}` },
  };
}

export default async function ArticlePage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  const a = findArticle(slug);
  if (!a) notFound();
  const others = articles.filter((x) => x.slug !== a.slug);

  return (
    <BlogShell>
      <article className="blog-page">
        <header className="sheet__top blog-page__top">
          <span className="sheet__smoke" aria-hidden="true">
            <ShaderBackground center phase={40 + articles.indexOf(a) * 17} brandVar="--primary" />
          </span>
          <p className="why__meta">
            {a.cat} · {a.min} min čtení
          </p>
          <h1 className="sheet__title">{a.title}</h1>
          <p className="sheet__teaser">{a.teaser}</p>
        </header>
        <ArticleBody a={a} />
        <div className="sheet__end">
          <p>Chcete vědět, co by systém zvládl u vás?</p>
          <a className="btn btn--primary" href={CAL_URL}>
            Chci úvodní hovor
          </a>
        </div>
      </article>

      <nav className="wrap blog-more" aria-label="Další články">
        <p className="label why__more">Další články</p>
        <ul className="why__list">
          {others.map((o) => (
            <li key={o.slug}>
              <a className="why__row" href={`/blog/${o.slug}`}>
                <span className="why__meta">
                  {o.cat} · {o.min} min
                </span>
                <span className="why__row-title">{o.title}</span>
                <span className="why__teaser">{o.teaser}</span>
                <span className="why__arrow" aria-hidden="true">
                  →
                </span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </BlogShell>
  );
}
