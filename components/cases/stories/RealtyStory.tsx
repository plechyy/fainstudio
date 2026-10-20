import { StoryEnd, StoryHead } from './parts';

/* Lindner Reality: stopky. Studie je jedno ráno vyprávěné po minutách, protože celý případ je o rychlosti. */
const morning = [
  { t: '7:42', who: 'Majitel', x: 'Zveřejní na portálu inzerát na byt 3+kk. Nechce realitku, chce kupce.' },
  { t: '7:44', who: 'Hlídač', x: 'Inzerát najde, přečte text a telefonní číslo a zjistí, že ho nepsala realitka.' },
  { t: '7:45', who: 'Hlídač', x: 'Ověří, jestli stejný byt už není na dalších webech. Není, je to nová nabídka.' },
  { t: '7:46', who: 'Hlídač', x: 'Porovná cenu s podobnými byty v okolí. Vychází o 4 % pod trhem.' },
  { t: '7:47', who: 'Makléř', x: 'V mobilu mu naskočí kontakt na majitele, cena a srovnání s trhem.' },
  { t: '7:52', who: 'Makléř', x: 'Volá. Majitel ještě nikoho jiného neslyšel.' },
];

export default function RealtyStory({ id, title }: { id: string; title: string }) {
  return (
    <article className="st st--log">
      <StoryHead id={id} title={title} />

      <p className="st-lead">
        Majitelka Lindner Reality nám napsala poté, co jí konkurent vzal tři byty od majitelů. Všechny tři inzeráty visely na portálech
        už hodiny a nikdo z kanceláře o nich nevěděl. Chtěla, aby makléř věděl o novém inzerátu dřív než kdokoli jiný.
      </p>

      <section aria-labelledby="st-log-h">
        <h3 className="st-h" id="st-log-h">
          Jedno ráno z pohledu jednoho inzerátu
        </h3>
        <ol className="st-clock">
          {morning.map((m) => (
            <li key={m.t} data-who={m.who}>
              <time className="num">{m.t}</time>
              <span>
                <b>{m.who}</b>
                {m.x}
              </span>
            </li>
          ))}
        </ol>
      </section>

      <div className="st-cols">
        <section>
          <h3 className="st-h">Co jsme museli doladit</h3>
          <p>
            Prvních pár dní se mezi majitele schovávaly realitky. Naučili jsme hlídače poznat je podle opakujících se telefonních
            čísel, stylu textu a fotek ze stejné kanceláře. Když si není jistý, pošle inzerát makléři s poznámkou, ať se podívá sám.
          </p>
        </section>
        <section>
          <h3 className="st-h">Co zůstalo na makléřích</h3>
          <p>
            Telefon a domluva prohlídky. Hlídač nikomu nevolá ani nepíše, jen řekne, že se něco objevilo, a ukáže, jestli je cena
            rozumná. Rozhodnutí, jestli se majiteli ozvat, je pořád na makléři.
          </p>
        </section>
      </div>

      <p className="st-tools">
        Napojeno na: realitní portály, telefon makléře (upozornění) a tabulku kontaktů kanceláře.
      </p>
      <StoryEnd />
    </article>
  );
}
