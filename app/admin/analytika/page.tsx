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
      <div className="adm__stats" aria-hidden="true">
        {['Návštěvy', 'Poptávky', 'Konverze'].map((t) => (
          <div className="st__card st__card--skel" key={t}>
            <span>{t}</span>
            <b />
          </div>
        ))}
      </div>
      <div className="td__card">
        <p className="fl__empty">Tady zatím nic není. Řekněte, co se tu má ukazovat, a doplním to.</p>
      </div>
    </section>
  );
}
