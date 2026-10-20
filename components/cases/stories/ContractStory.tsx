import { StoryEnd, StoryHead } from './parts';

/* Woodline Interiér: příběh se čte přes konkrétní články smlouvy, poznámky jsou na okraji. */
const rows = [
  {
    lvl: 'high',
    clause: 'Čl. 7.2 Smlouva se automaticky prodlužuje o dalších 36 měsíců, pokud ji dodavatel neobdrží vypovězenou 6 měsíců před koncem trvání.',
    note: 'Právě tohle majitele stálo tři roky. Návrh: prodloužení vždy jen o rok a výpověď měsíc předem.',
  },
  {
    lvl: 'high',
    clause: 'Čl. 9.1 Při prodlení odběratele náleží dodavateli smluvní pokuta 0,5 % denně z celé hodnoty zakázky.',
    note: 'Pokuta z celé hodnoty, ne z dlužné částky. Návrh: strop 10 % a jen z toho, co je po splatnosti.',
  },
  {
    lvl: 'mid',
    clause: 'Čl. 11 Dodavatel je oprávněn jednostranně změnit ceny s účinností od následujícího měsíce.',
    note: 'Cena se může změnit bez vašeho souhlasu. Návrh: změna jen dohodou, nebo s výpovědním právem.',
  },
  {
    lvl: 'ok',
    clause: 'Čl. 14 Spory řeší místně příslušný soud odběratele.',
    note: 'V pořádku. Soud je u vás.',
  },
];

const watches = ['automatické prodloužení', 'pokuty a jejich výše', 'jednostranné změny ceny', 'výpovědní lhůty', 'výhradní odběr'];

export default function ContractStory({ id, title }: { id: string; title: string }) {
  return (
    <article className="st st--paper">
      <StoryHead id={id} title={title} />

      <p className="st-lead">
        Majitele Woodline Interiér stála jedna smlouva tři roky. Dodavatelská smlouva se sama prodloužila, protože na výpověď
        nikdo nehlídal lhůtu. Právníka na každou smlouvu platit nechtěl, ale podepisovat naslepo už taky ne.
      </p>

      <section aria-labelledby="st-paper-h">
        <h3 className="st-h" id="st-paper-h">
          Jak AI čte smlouvu
        </h3>
        <ul className="st-paper">
          {rows.map((r) => (
            <li className={`is-${r.lvl}`} key={r.clause}>
              <p className="st-paper__clause">{r.clause}</p>
              <p className="st-paper__note">{r.note}</p>
            </li>
          ))}
        </ul>
      </section>

      <div className="st-cols">
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
          <p>
            Smlouvy s vážným rizikem jdou k právníkovi už s hotovým přehledem. Řeší jen to, co opravdu potřebuje jeho oči. Poslední
            slovo má vždy majitel nebo právník, nikdy AI.
          </p>
        </section>
      </div>

      <StoryEnd />
    </article>
  );
}
