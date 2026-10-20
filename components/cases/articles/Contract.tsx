/* Woodline Interiors (USA): příběh jedné smlouvy. Úryvky ze smlouvy jsou přímo v textu, poznámky u nich. */
export default function Contract() {
  return (
    <>
      <p className="ca-open">
        Majitele Woodline Interiors stála jedna smlouva tři roky. Neměla v sobě nic podezřelého. Dodavatel dřeva ji poslal e-mailem, majitel ji přelétl,
        podepsal a zasunul do složky. O rok později zjistil, že výpovědní lhůta uplynula půl roku před tím, než si na smlouvu vzpomněl.
      </p>

      <h2>Jak se k nám dostal</h2>
      <p>
        Woodline Interiors vyrábí nábytek ve Spojených státech, takže celá spolupráce běžela na dálku: hovory přes video, živé ukázky každý týden a smlouvy v
        angličtině. Úryvky níže jsou v překladu.
      </p>
      <p>
        Řekl nám to bez obalu: právníka na každou smlouvu platit nechce, na to ho nemá, ale podepisovat naslepo už taky ne. Nejdřív chtěl vědět, jestli to nějak
        jde. Odpověděli jsme, že jde, ale ne tak, aby AI rozhodovala. Má smlouvu přečíst, ukázat, kde jsou rizika, a poradit, co navrhnout jinak. Rozhodnutí zůstává
        na majiteli, a když je riziko vážné, na právníkovi.
      </p>

      <h2>Co jsme v té jedné smlouvě našli</h2>
      <p>Na začátku jsme si od majitele vzali tu starou smlouvu, aby bylo na čem zkoušet. Hned v ní byl článek, který ho stál tři roky:</p>
      <div className="ca-clause is-high">
        <p className="ca-clause__text">
          Čl. 7.2 Smlouva se automaticky prodlužuje o dalších 36 měsíců, pokud ji dodavatel neobdrží vypovězenou 6 měsíců před koncem trvání.
        </p>
        <p className="ca-clause__note">
          Automatické prodloužení o tři roky a výpověď půl roku předem. Systém to označí jako vysoké riziko a navrhne prodloužení vždy jen o rok a výpověď měsíc
          předem.
        </p>
      </div>
      <p>
        Další dva články najdete skoro v každé smlouvě, tady byly obzvlášť nevýhodné. První se týkal pokuty při prodlení platby:
      </p>
      <div className="ca-clause is-high">
        <p className="ca-clause__text">Čl. 9.1 Při prodlení odběratele náleží dodavateli smluvní pokuta 0,5 % denně z celé hodnoty zakázky.</p>
        <p className="ca-clause__note">Pokuta se počítá z celé zakázky, ne z dlužné částky. Návrh: strop 10 % a jen z toho, co je po splatnosti.</p>
      </div>
      <p>A druhý se týkal toho, že dodavatel mohl měnit ceny:</p>
      <div className="ca-clause is-mid">
        <p className="ca-clause__text">Čl. 11 Dodavatel je oprávněn jednostranně změnit ceny s účinností od následujícího měsíce.</p>
        <p className="ca-clause__note">Cena se může změnit bez souhlasu odběratele. Návrh: změna jen dohodou, nebo s právem smlouvu vypovědět.</p>
      </div>

      <h2>Jak jsme to ladili</h2>
      <p>
        Hned první živá ukázka měla chybu: systém označoval jako riziko každý odstavec, ve kterém bylo slovo „pokuta“. Majitel se podíval na pět falešných poplachů a
        řekl, že takhle to číst nebude. Naučili jsme systém rozlišovat výši, základ a podmínku a poplachů ubylo na jednotky.
      </p>
      <p>
        Druhou ukázku jsme postavili na deseti smlouvách, které majitel poslal ze starého archivu. U osmi z nich se našlo něco, co chtěl vědět, a u dvou nic. Právě
        to „nic“ bylo důležité: když je smlouva v pořádku, systém to řekne jednou větou a nepřemlouvá.
      </p>
      <p>
        Co hlídá vždy: automatické prodloužení, pokuty a jejich výši, jednostranné změny ceny, výpovědní lhůty a výhradní odběr. Kdykoli se objeví něco, co v seznamu
        není, a vypadá to nezvykle, systém na to upozorní zvlášť.
      </p>

      <h2>Co zůstalo na právníkovi</h2>
      <p>
        Smlouvy, ve kterých systém najde vážné riziko, jdou k právníkovi už s hotovým přehledem. Ten pak řeší jen to, co opravdu potřebuje jeho oči, a nezačíná
        čtením od první strany. Poslední slovo má vždy majitel nebo právník, nikdy AI. To jsme si napsali do návrhu a stojí to i na každé stránce přehledu.
      </p>

      <h2>Co to přineslo</h2>
      <p>
        Dřív podepisoval majitel naslepo. Dnes dostane přehled rizik a návrh změn, dřív než cokoli podepíše, a trvá mu to pět minut. První smlouvu, kterou pak
        poslal zpátky s požadavkem na změnu, dodavatel přijal bez diskuze. Podle majitele proto, že mu předložil konkrétní články a konkrétní návrh, a ne obecné
        „nelíbí se nám to“.
      </p>
    </>
  );
}
