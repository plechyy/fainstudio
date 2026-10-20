import { StoryEnd } from './parts';

/* Woodline Interiér: smlouva čtená po článcích; každý řádek je článek a vedle něj, co s ním. */
const rows = [
  { lvl: 'high', c: 'Čl. 7.2 Smlouva se automaticky prodlužuje o dalších 36 měsíců, pokud ji dodavatel neobdrží vypovězenou 6 měsíců před koncem trvání.', n: 'Právě tohle majitele stálo tři roky. Návrh: prodloužení vždy jen o rok a výpověď měsíc předem.' },
  { lvl: 'high', c: 'Čl. 9.1 Při prodlení odběratele náleží dodavateli smluvní pokuta 0,5 % denně z celé hodnoty zakázky.', n: 'Pokuta z celé hodnoty, ne z dlužné částky. Návrh: strop 10 % a jen z toho, co je po splatnosti.' },
  { lvl: 'mid', c: 'Čl. 11 Dodavatel je oprávněn jednostranně změnit ceny s účinností od následujícího měsíce.', n: 'Cena se může změnit bez vašeho souhlasu. Návrh: změna jen dohodou, nebo s právem smlouvu vypovědět.' },
  { lvl: 'ok', c: 'Čl. 14 Spory řeší místně příslušný soud odběratele.', n: 'V pořádku. Soud je u vás.' },
];
const watches = ['automatické prodloužení', 'pokuty a jejich výše', 'jednostranné změny ceny', 'výpovědní lhůty', 'výhradní odběr'];

export default function ContractStory() {
  return (
    <article className="st st--paper">
      <p className="st-lead">
        <b>Kdo za kým přišel.</b> Majitele Woodline Interiér stála jedna smlouva tři roky. Dodavatelská smlouva se sama prodloužila, protože nikdo nehlídal
        lhůtu pro výpověď. Právníka na každou smlouvu platit nechtěl, ale podepisovat naslepo už taky ne.
      </p>
      <ul className="st-paper">
        {rows.map((r) => (
          <li className={`is-${r.lvl}`} key={r.c}>
            <p className="st-paper__clause">{r.c}</p>
            <p className="st-paper__note">{r.n}</p>
          </li>
        ))}
      </ul>
      <div className="st-two">
        <section>
          <h3 className="st-h">Co hlídá vždy</h3>
          <ul className="st-checks">
            {watches.map((w) => (
              <li key={w}>{w}</li>
            ))}
          </ul>
        </section>
        <section>
          <h3 className="st-h">Co zůstalo na právníkovi</h3>
          <p>Smlouvy s vážným rizikem jdou k právníkovi už s hotovým přehledem. Poslední slovo má vždy majitel nebo právník, nikdy AI.</p>
        </section>
      </div>
      <StoryEnd />
    </article>
  );
}
