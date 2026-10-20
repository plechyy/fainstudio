import { StoryEnd } from './parts';

/* ATELIER 22: jednoduchá věc, krátká studie. Nejdřív normálně řečeno, co to je. */
const steps = [
  { k: 'Poslouchá', x: 'Poradu na stole i online a pozná, kdo mluví.' },
  { k: 'Zapisuje', x: 'Po konci pošle všem krátký zápis.' },
  { k: 'Rozdává úkoly', x: 'Každý úkol zapíše týmu do úkolníčku, se jménem a termínem.' },
];

export default function MeetingStory() {
  return (
    <article className="st st--short">
      <p className="st-plain">Program, který poslouchá poradu, napíše zápis a úkoly rozdá týmu. Nikdo nic nepřepisuje.</p>
      <ol className="st-three">
        {steps.map((s) => (
          <li key={s.k}>
            <b>{s.k}</b>
            {s.x}
          </li>
        ))}
      </ol>
      <p>
        <b>Kdo za kým přišel.</b> Projekční kancelář ATELIER 22 se ozvala s tím, že se na poradách rozhodovalo a po poradách ztrácelo. Každý si
        pamatoval něco jiného a zápis psal ten, kdo se nestihl vymluvit.
      </p>
      <ul className="st-checks">
        <li>Nahrává se jen se souhlasem všech.</li>
        <li>Citlivé porady se nenahrávají, stačí je vypnout.</li>
        <li>Úkol bez jména dostane značku „bez jména“ a systém se zeptá, komu patří.</li>
      </ul>
      <StoryEnd />
    </article>
  );
}
