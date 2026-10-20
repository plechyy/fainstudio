/* SeidlServis: vyprávění o jednom rozhovoru s účetní. Pravidla upomínek jsou rovnou v textu. */
export default function Dunning() {
  return (
    <>
      <p className="ca-open">
        Majitel SeidlServisu se nám ozval s větou, která nezněla jako zadání: „Nechci volat zákazníkům kvůli penězům.“ Většina z nich nebyla zlá. Jen zapomněli
        zaplatit fakturu za výměnu oleje a po třech týdnech už jim bylo trapné se ozvat.
      </p>

      <h2>Jak jsme začali: u účetní</h2>
      <p>
        Nejdřív jsme chtěli mluvit s účetní, ne s majitelem. Faktury hlídala v Excelu a podle jejích slov „když si vzpomněla“. Ukázala nám tabulku s barvami: zelená
        zaplaceno, žlutá čeká, červená po splatnosti. Červených řádků bývalo tolik, že jim přestala věřit.
      </p>
      <p>
        Ptali jsme se, jak vypadá její ideální týden. Řekla, že by chtěla volat jen těm pár lidem, u kterých to opravdu vázne. A že připomínky by měly znít jako
        od slušného člověka. Z toho jsme si vzali dvě pravidla: systém nikdy nepíše dřív, než je faktura po splatnosti, a první věta je vždy zdvořilá.
      </p>

      <h2>Jak upomínky vypadají dnes</h2>
      <ul className="ca-rules">
        <li>
          <b>Po splatnosti</b>
          Nic. Dáme čas, platba může být na cestě.
        </li>
        <li>
          <b>Den 1</b>
          Přátelská připomínka e-mailem s platebními údaji.
        </li>
        <li>
          <b>Den 5</b>
          Připomínka s QR platbou a aktuální částkou.
        </li>
        <li>
          <b>Den 12</b>
          Účetní dostane upozornění, komu zavolat a proč.
        </li>
        <li>
          <b>Platba přijde</b>
          Systém ji spáruje s fakturou v bance a upomínky se zastaví.
        </li>
      </ul>
      <p>
        Pravidla jsme psali spolu s účetní a dvakrát je změnili. Původně byla první připomínka už v den splatnosti, ale zákazníci, kteří platili o den později, to
        brali jako urážku. Posunuli jsme ji o den a stížnosti zmizely.
      </p>

      <h2>Co jsme museli ohlídat</h2>
      <p>
        Největší chyba, kterou jsme mohli udělat, byla připomenout fakturu, která už je zaplacená. Párování s bankou proto jede každou noc a upomínka se zkontroluje
        ještě jednou těsně před odesláním. Stálí zákazníci, kteří splácejí na splátky, mají vlastní pravidlo a systém jim nic nepřipomíná.
      </p>

      <h2>Co to přineslo</h2>
      <p>
        Dřív zákazník zaplatil v průměru po třech týdnech od splatnosti. Dnes po šesti dnech. Účetní volá jen těm, kde to vázne, a nevolá z povinnosti.
        Majitel říká, že největší rozdíl je v tom, že zákazníkovi teď volá s něčím jiným než s penězi.
      </p>
      <p>
        Příště bychom do pravidel hned na začátku přidali jednu věc: tón připomínky podle toho, jak dlouho je zákazník u nás. Stálému zákazníkovi nepíšeme
        stejně jako někomu, kdo přijel poprvé.
      </p>
    </>
  );
}
