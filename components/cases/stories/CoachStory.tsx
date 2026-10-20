import { StoryEnd } from './parts';

/* Brightline: čtyři krátké kapitoly. Největší téma je lidské (strach z hlídání), tak je nejdelší. */
const chapters = [
  {
    h: 'Kdo za kým přišel',
    x: 'Ozval se obchodní ředitel. Tým rostl a on nestíhal poslouchat hovory. Noví obchodníci dostávali zpětnou vazbu jednou za měsíc. Ptal se, jestli to jde dělat tak, aby to obchodníky bavilo, a ne aby se cítili sledovaní.',
  },
  {
    h: 'Čeho se tým bál',
    x: 'Že ho to bude hlídat. Proto jsme začali u obchodníků, ne u vedení. Obchodník vidí hodnocení jako první a sám. Vedoucí vidí jen trendy týmu a hovory, které si obchodník sám označí ke sdílení.',
  },
  {
    h: 'Jak hodnocení vypadá',
    x: 'Po zavěšení přijde do mobilu karta: co se povedlo, co příště jinak, co bylo zbytečné a co nezaznělo, i když mělo. Začíná vždy tím dobrým a nahoře je věta o tom, jak se obchodník zlepšil.',
  },
  {
    h: 'Co zůstává na lidech',
    x: 'Hovory se hodnotí jen se souhlasem druhé strany. Hodnocení nenahrazuje rozhovor s vedoucím, je to podklad, o kterém se mluví. Vedoucí z týmových trendů dělá společná školení.',
  },
];

export default function CoachStory() {
  return (
    <article className="st st--chapters">
      {chapters.map((c) => (
        <section key={c.h}>
          <h3 className="st-h">{c.h}</h3>
          <p>{c.x}</p>
        </section>
      ))}
      <p className="st-tools">Napojeno na: telefonní ústřednu a CRM.</p>
      <StoryEnd />
    </article>
  );
}
