import type { Article } from '@/lib/blog';

/** Text článku: nadpisy, odstavce, výčty a „V kostce“ na konci. Stejný v panelu i na /blog/slug. */
export default function ArticleBody({ a }: { a: Article }) {
  return (
    <div className="art-body">
      {a.body.map((b, i) =>
        b.t === 'h' ? (
          <h3 key={i}>{b.text}</h3>
        ) : b.t === 'list' ? (
          <ul key={i}>
            {b.items.map((it) => (
              <li key={it}>{it}</li>
            ))}
          </ul>
        ) : (
          <p key={i}>{b.text}</p>
        ),
      )}
      <aside className="art-body__sum">
        <span className="label">V kostce</span>
        <p>{a.sum}</p>
      </aside>
    </div>
  );
}
