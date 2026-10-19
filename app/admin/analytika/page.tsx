import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Analytika' };

export default function Page() {
  return (
    <section>
      <h2 className="td__h">Analytika</h2>
      <p className="adm__muted">Tady bude přehled. Obsah se doplní.</p>
    </section>
  );
}
