import { StoryEnd, StoryHead } from './parts';

/* Brightline: dlouhé kapitoly s přilepenými fakty. Největší téma je lidské, tak má nejvíc prostoru. */
const chapters = [
  { id: 'kdo', n: 'Kdo za kým přišel' },
  { id: 'obava', n: 'Čeho se tým bál' },
  { id: 'vypada', n: 'Jak hodnocení vypadá' },
  { id: 'vedouci', n: 'Co vidí vedoucí' },
  { id: 'prekvapilo', n: 'Co nás překvapilo' },
  { id: 'lide', n: 'Co zůstává na lidech' },
];

export default function CoachStory({ id, title }: { id: string; title: string }) {
  return (
    <article className="st st--chapters">
      <StoryHead id={id} title={title} />

      <div className="st-ch">
        <aside className="st-ch__side">
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
              <dt>Odkud začínáme</dt>
              <dd>od obchodníků, ne od vedení</dd>
            </div>
            <div>
              <dt>Napojeno na</dt>
              <dd>telefonní ústřednu a CRM</dd>
            </div>
          </dl>
          <nav aria-label="Kapitoly">
            <ol>
              {chapters.map((c) => (
                <li key={c.id}>
                  <a href={`#ch-${c.id}`}>{c.n}</a>
                </li>
              ))}
            </ol>
          </nav>
        </aside>

        <div className="st-ch__main">
          <section id="ch-kdo">
            <h3 className="st-h">Kdo za kým přišel</h3>
            <p>
              Ozval se obchodní ředitel Brightline. Tým rostl a on nestíhal poslouchat hovory. Noví obchodníci dostávali zpětnou vazbu
              jednou za měsíc, často už bez konkrétních vět z hovoru. Přišel s jednou otázkou: jde to dělat tak, aby to obchodníky
              bavilo, a ne aby se cítili sledovaní?
            </p>
          </section>

          <section id="ch-obava">
            <h3 className="st-h">Čeho se tým bál</h3>
            <p>
              První reakce obchodníků byla jasná: bude nás to hlídat? Proto jsme začali u nich, ne u vedení. Obchodník vidí hodnocení
              jako první a sám. Vedoucí vidí jen trendy týmu a hovory, které si obchodník sám označí ke sdílení.
            </p>
            <blockquote>Zpětná vazba má být trenér po hovoru, ne zápis do kartotéky.</blockquote>
          </section>

          <section id="ch-vypada">
            <h3 className="st-h">Jak hodnocení vypadá</h3>
            <p>
              Po zavěšení přijde do mobilu krátká karta se čtyřmi částmi: <b>co se povedlo</b>, <b>co příště jinak</b>, <b>co bylo
              zbytečné</b> a <b>co nezaznělo, i když mělo</b>. Každé hodnocení začíná tím, co se povedlo. Nahoře je vždy jedna věta o tom,
              jak se obchodník proti minulému týdnu zlepšil.
            </p>
          </section>

          <section id="ch-vedouci">
            <h3 className="st-h">Co vidí vedoucí</h3>
            <p>
              Souhrn celého týmu bez jmen. Třeba že u otázky na cenu jde skoro každý do obhajoby místo do otázky. Z toho vznikne krátké
              společné školení, které míří přesně na to, co tým opravdu dělá.
            </p>
          </section>

          <section id="ch-prekvapilo">
            <h3 className="st-h">Co nás překvapilo</h3>
            <p>
              Obchodníci si hodnocení začali pouštět před dalším hovorem. A protože přijde hned, pamatují si, co přesně řekli. U
              měsíční porady by si většinu z toho nevybavili.
            </p>
          </section>

          <section id="ch-lide">
            <h3 className="st-h">Co zůstává na lidech</h3>
            <p>
              Hovory se vyhodnocují jen se souhlasem druhé strany, na začátku hovoru zazní upozornění. Hodnocení nikdy nenahrazuje
              rozhovor s vedoucím. Je to podklad, o kterém se mluví, ne verdikt.
            </p>
          </section>
        </div>
      </div>

      <StoryEnd />
    </article>
  );
}
