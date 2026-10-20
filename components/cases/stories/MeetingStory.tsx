import { StoryEnd, StoryHead } from './parts';

/* ATELIER 22: jednoduchá věc, krátká studie. Nejdřív normálně řečeno, co to je. */
const steps = [
  { k: 'Poslouchá', x: 'Poradu na stole i online. Rozpozná, kdo mluví.' },
  { k: 'Zapisuje', x: 'Po konci pošle všem krátký zápis: co se rozhodlo, co zůstává otevřené.' },
  { k: 'Rozdává úkoly', x: 'Každý úkol, který zazněl, zapíše v nástroji, který tým už používá, se jménem a termínem.' },
];

export default function MeetingStory({ id, title }: { id: string; title: string }) {
  return (
    <article className="st st--short">
      <StoryHead id={id} title={title} />

      <p className="st-plain">
        Je to program, který poslouchá poradu, po jejím skončení napíše zápis a každý úkol, který na ní zazněl, zapíše týmu do
        úkolníčku. Se jménem a termínem. Nikdo nic nepřepisuje.
      </p>

      <ol className="st-three">
        {steps.map((s) => (
          <li key={s.k}>
            <b>{s.k}</b>
            {s.x}
          </li>
        ))}
      </ol>

      <section>
        <h3 className="st-h">Kdo za kým přišel</h3>
        <p>
          Projekční kancelář ATELIER 22 se ozvala s tím, že se na poradách rozhodovalo a po poradách ztrácelo. Každý si pamatoval něco
          jiného a zápis psal ten, kdo se nestihl vymluvit.
        </p>
      </section>

      <section>
        <h3 className="st-h">Na co si dát pozor</h3>
        <ul className="st-checks">
          <li>Nahrává se jen se souhlasem všech zúčastněných.</li>
          <li>Citlivé porady se nenahrávají, stačí je vypnout jedním tlačítkem.</li>
          <li>Úkol bez jasného jména dostane značku „bez jména“ a systém se zeptá, komu patří.</li>
        </ul>
      </section>

      <StoryEnd />
    </article>
  );
}
