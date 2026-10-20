import { StoryEnd } from './parts';

/* Woodline Interiér: smlouva čtená po článcích, poznámky pod nimi. */
const rows = [
  { lvl: 'high', c: 'Čl. 7.2 Smlouva se automaticky prodlužuje o 36 měsíců, pokud není vypovězena 6 měsíců předem.', n: 'Právě tohle majitele stálo tři roky. Návrh: prodloužení vždy o rok, výpověď měsíc předem.' },
  { lvl: 'high', c: 'Čl. 9.1 Smluvní pokuta 0,5 % denně z celé hodnoty zakázky.', n: 'Pokuta z celé hodnoty, ne z dlužné částky. Návrh: strop 10 %.' },
  { lvl: 'mid', c: 'Čl. 11 Dodavatel může jednostranně změnit ceny.', n: 'Změna bez vašeho souhlasu. Návrh: jen dohodou, nebo s právem vypovědět.' },
  { lvl: 'ok', c: 'Čl. 14 Spory řeší soud odběratele.', n: 'V pořádku. Soud je u vás.' },
];

export default function ContractStory() {
  return (
    <article className="st st--paper">
      <p className="st-lead">
        <b>Kdo za kým přišel.</b> Majitele Woodline Interiér stála jedna smlouva tři roky, protože se sama prodloužila a nikdo nehlídal lhůtu pro
        výpověď. Právníka na každou smlouvu platit nechtěl, ale podepisovat naslepo už taky ne.
      </p>
      <ul className="st-paper">
        {rows.map((r) => (
          <li className={`is-${r.lvl}`} key={r.c}>
            <p className="st-paper__clause">{r.c}</p>
            <p className="st-paper__note">{r.n}</p>
          </li>
        ))}
      </ul>
      <p>
        <b>Co zůstalo na právníkovi.</b> Smlouvy s vážným rizikem jdou k němu už s hotovým přehledem. Poslední slovo má vždy majitel nebo právník,
        nikdy AI.
      </p>
      <StoryEnd />
    </article>
  );
}
