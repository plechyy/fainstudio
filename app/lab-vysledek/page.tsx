import type { Metadata } from 'next';
import Result from '@/components/cases/Result';
import { cases } from '@/lib/content';

/* DOČASNÁ stránka k porovnání tří podob výsledku Dřív → Teď. Po výběru se smaže. */
export const metadata: Metadata = { title: 'Lab: výsledek', robots: { index: false, follow: false } };

export default function Lab() {
  return (
    <main className="wrap" style={{ paddingBlock: '48px 120px', display: 'grid', gap: 72 }}>
      {(['a', 'b', 'c'] as const).map((v) => (
        <section key={v}>
          <h2 className="h3" style={{ marginBottom: 28 }}>
            Varianta {v.toUpperCase()}
          </h2>
          <div style={{ display: 'grid', gap: 40, gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 320px), 1fr))' }}>
            {cases.items.map((c) => (
              <div className="cx-case is-seen" style={{ ['--co' as string]: c.hue, display: 'block', opacity: 1 }} key={c.id}>
                <p style={{ margin: '0 0 14px', color: 'var(--ink-3)', fontSize: 12 }}>{c.firm}</p>
                <Result c={c} v={v} />
              </div>
            ))}
          </div>
        </section>
      ))}
    </main>
  );
}
