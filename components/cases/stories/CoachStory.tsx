import { StoryEnd } from './parts';

/* Brightline: vlevo věta, na které celý případ stojí, vpravo kapitoly. Největší téma je lidské, tak je nejdelší. */
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
    x: 'Po zavěšení přijde do mobilu karta: co se povedlo, co příště jinak, co bylo zbytečné a co nezaznělo, i když mělo. Začíná vždy tím dobrým a nahoře je věta o tom, jak se obchodník proti minulému týdnu zlepšil.',
  },
  {
    h: 'Co vidí vedoucí',
    x: 'Souhrn týmu bez jmen. Třeba že u otázky na cenu jde skoro každý do obhajoby místo do otázky. Z toho vznikne krátké společné školení, které míří přesně na to, co tým opravdu dělá.',
  },
  {
    h: 'Co zůstává na lidech',
    x: 'Hovory se hodnotí jen se souhlasem druhé strany. Hodnocení nenahrazuje rozhovor s vedoucím, je to podklad, o kterém se mluví, ne verdikt.',
  },
];

export default function CoachStory() {
  return (
    <article className="st st--split st--chapters">
      <div className="st-side">
        <blockquote>Zpětná vazba má být trenér po hovoru, ne zápis do kartotéky.</blockquote>
        <dl className="st-facts">
          <div>
            <dt>Kdo se ozval</dt>
            <dd>obchodní ředitel</dd>
          </div>
          <div>
            <dt>Kdo to používá</dt>
            <dd>celý obchodní tým</dd>
          </div>
          <div>
            <dt>Napojeno na</dt>
            <dd>telefonní ústřednu a CRM</dd>
          </div>
        </dl>
      </div>
      <div className="st-main">
        {chapters.map((c) => (
          <section key={c.h}>
            <h3 className="st-h">{c.h}</h3>
            <p>{c.x}</p>
          </section>
        ))}
      </div>
      <StoryEnd />
    </article>
  );
}
