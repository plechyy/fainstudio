import { StoryEnd } from './parts';

/* ATELIER 22: jednoduchá věc, krátká studie. Nejdřív normálně, co to je; vedle tři kroky. */
const steps = [
  { k: 'Poslouchá', x: 'Poradu na stole i online a pozná, kdo mluví.' },
  { k: 'Zapisuje', x: 'Po konci pošle všem krátký zápis: co se rozhodlo a co zůstává otevřené.' },
  { k: 'Rozdává úkoly', x: 'Každý úkol, který zazněl, zapíše týmu do úkolníčku, se jménem a termínem.' },
];

export default function MeetingStory() {
  return (
    <article className="st st--split st--short">
      <div className="st-side">
        <p className="st-plain">Program, který poslouchá poradu, napíše zápis a úkoly rozdá týmu. Nikdo nic nepřepisuje.</p>
        <h3 className="st-h">Kdo za kým přišel</h3>
        <p>
          Projekční kancelář ATELIER 22 se ozvala s tím, že se na poradách rozhodovalo a po poradách ztrácelo. Každý si pamatoval něco jiného a
          zápis psal ten, kdo se nestihl vymluvit.
        </p>
      </div>
      <div className="st-main">
        <ol className="st-three">
          {steps.map((s) => (
            <li key={s.k}>
              <b>{s.k}</b>
              {s.x}
            </li>
          ))}
        </ol>
        <h3 className="st-h">Na co si dát pozor</h3>
        <ul className="st-checks">
          <li>Nahrává se jen se souhlasem všech zúčastněných.</li>
          <li>Citlivé porady se nenahrávají, stačí je vypnout.</li>
          <li>Úkol bez jména dostane značku „bez jména“ a systém se zeptá, komu patří.</li>
        </ul>
      </div>
      <StoryEnd />
    </article>
  );
}
