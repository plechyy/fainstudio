import { StoryEnd } from './parts';

/* Lindner Reality: tři otázky, které padly na začátku, a odpovědi. Žádná časová osa. */
const qa = [
  {
    q: 'Jak poznáte, že inzerát nepsala realitka?',
    a: 'Podle telefonního čísla, stylu textu a fotek ze stejné kanceláře. Co si hlídač není jistý, pošle makléři s poznámkou, ať se podívá sám.',
  },
  {
    q: 'Co když je jeden byt na pěti webech?',
    a: 'Hlídač to pozná a makléři ho pošle jen jednou.',
  },
  {
    q: 'Zavolá hlídač majiteli za nás?',
    a: 'Ne. Jen řekne, že se něco objevilo, a ukáže, jestli je cena rozumná. Telefon a domluva prohlídky zůstávají makléři.',
  },
];

export default function RealtyStory() {
  return (
    <article className="st st--qa">
      <p className="st-lead">
        <b>Kdo za kým přišel.</b> Majitelka Lindner Reality nám napsala poté, co jí konkurent vzal tři byty od majitelů. Inzeráty visely na
        portálech hodiny a nikdo z kanceláře o nich nevěděl.
      </p>
      <h3 className="st-h">Tři otázky na začátku</h3>
      <dl className="st-qa">
        {qa.map((x) => (
          <div key={x.q}>
            <dt>{x.q}</dt>
            <dd>{x.a}</dd>
          </div>
        ))}
      </dl>
      <p className="st-tools">Napojeno na: realitní portály, telefon makléře (upozornění), tabulka kontaktů kanceláře.</p>
      <StoryEnd />
    </article>
  );
}
