import { StoryEnd } from './parts';

/* Lindner Reality: tři otázky, které padly na začátku, a odpovědi. */
const qa = [
  {
    q: 'Jak poznáte, že inzerát nepsala realitka?',
    a: 'Podle telefonního čísla, stylu textu a fotek ze stejné kanceláře. Co si hlídač není jistý, pošle makléři s poznámkou, ať se podívá sám.',
  },
  {
    q: 'Co když je jeden byt na pěti webech?',
    a: 'Hlídač to pozná a makléři ho pošle jen jednou. Duplicity se do mobilu nedostanou.',
  },
  {
    q: 'Zavolá hlídač majiteli za nás?',
    a: 'Ne. Jen řekne, že se něco objevilo, a ukáže, jestli je cena rozumná. Telefon a domluva prohlídky zůstávají makléři.',
  },
];

export default function RealtyStory() {
  return (
    <article className="st st--split st--qa">
      <div className="st-side">
        <h3 className="st-h">Kdo za kým přišel</h3>
        <p>
          Majitelka Lindner Reality nám napsala poté, co jí konkurent vzal tři byty od majitelů. Všechny tři inzeráty visely na portálech
          hodiny a nikdo z kanceláře o nich nevěděl. Chtěla, aby makléř věděl o novém inzerátu dřív než kdokoli jiný.
        </p>
        <h3 className="st-h">Napojeno na</h3>
        <p>Realitní portály, telefon makléře (upozornění) a tabulka kontaktů kanceláře.</p>
      </div>
      <div className="st-main">
        <h3 className="st-h">Tři otázky na začátku</h3>
        <dl className="st-qa">
          {qa.map((x) => (
            <div key={x.q}>
              <dt>{x.q}</dt>
              <dd>{x.a}</dd>
            </div>
          ))}
        </dl>
      </div>
      <StoryEnd />
    </article>
  );
}
