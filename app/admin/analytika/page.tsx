import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Analytika' };

export default function Page() {
  return (
    <section>
      <header className="adm__head">
        <div>
          <h1 className="adm__title">Analytika</h1>
          <p className="adm__sub">Přehled návštěvnosti a poptávek.</p>
        </div>
      </header>
      <div className="td__card">
        <p className="fl__empty">Tady zatím nic není. Obsah se doplní.</p>
      </div>
    </section>
  );
}
