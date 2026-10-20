/* Brightline: esej o tom, kdo smí co vidět. Souvislý text, jen tři nadpisy a jedna věta, na které případ stojí. */
export default function Coach() {
  return (
    <>
      <p className="ca-open">
        Obchodní ředitel Brightline nám napsal větu, kterou slyšíme často: „Nestíhám poslouchat hovory. A když už jo, říkám pořád to samé.“ Tým rostl, noví lidé
        přibývali a zpětnou vazbu dostávali jednou za měsíc na poradě, obecně a už bez vět z hovoru, o kterých se mluvilo.
      </p>

      <p>
        Chtěl mít u každého hovoru někoho, kdo ho poslechne a řekne, co bylo dobře a co příště jinak. To zní jako jednoduchý úkol. Opravdu těžká byla jedna věc,
        která s technologií skoro nesouvisí: nikdo z obchodníků nechce, aby ho poslouchal robot, který pak vedoucímu hlásí, kolikrát se zakecal.
      </p>

      <h2>Začali jsme u obchodníků, ne u ředitele</h2>
      <p>
        Na prvním hovoru jsme ředitele požádali o dvě věci. Aby nám nedával seznam funkcí, které chce, a aby nás pustil si promluvit se dvěma lidmi z týmu dřív, než
        cokoli navrhneme. Zkušená obchodnice a nováček řekli skoro stejnou větu: „Bude nás to hlídat?“
      </p>
      <p>
        Z té otázky jsme udělali pravidlo, na kterém stojí celý systém. Hodnocení hovoru vidí jako první a sám ten, kdo hovor vedl. Vedoucí nevidí jednotlivé
        hovory, vidí jen trendy celého týmu a hovory, které si obchodník sám označí ke sdílení. Napsali jsme to do návrhu černé na bílém a ředitel to schválil
        dřív, než jsme se stihli zeptat.
      </p>
      <blockquote className="ca-quote">
        Zpětná vazba má být trenér po hovoru, ne zápis do kartotéky.
        <cite>věta, kterou jsme si napsali na začátku a pak podle ní rozhodovali</cite>
      </blockquote>

      <h2>Jak se hodnocení měnilo mezi ukázkami</h2>
      <p>
        První živá ukázka byla příliš dlouhá. Systém vypsal všechno, co v hovoru slyšel, a obchodníci to po třech řádcích přestali číst. Zkrátili jsme to na čtyři
        části: co se povedlo, co příště jinak, co bylo zbytečné a co nezaznělo, i když mělo. Poslední dvě vznikly na přání nováčka, který nevěděl, co všechno měl
        říct.
      </p>
      <p>
        Druhá verze se líbila víc, ale pořád chyběl důvod ji otevřít po dalším hovoru. Až u třetí ukázky jsme přidali řádek nahoře, který porovnává hovor s minulým
        týdnem. Třeba „Dnes jsi nechal klienta dokončit větu u ceny. Minule to bylo třikrát míň.“ Od té chvíle si hodnocení začali pouštět sami.
      </p>
      <p>
        U tónu jsme byli přísní. Systém nikdy nepíše „chyba“ a vždycky začíná tím, co se povedlo. Slova jako „příště zkus“ fungují jinak než „špatně“, a obchodníci
        si je pamatují. O formulacích jsme se s ředitelem a dvěma obchodníky bavili skoro tolik jako o technice.
      </p>

      <h2>Co vidí vedoucí a co zůstává na lidech</h2>
      <p>
        Souhrn týmu přichází bez jmen. Třeba že skoro každý u otázky na cenu jde do obhajoby místo do otázky. Z toho vznikla krátká společná
        příprava, která míří přesně na to, co tým opravdu dělá. Rozhovory jeden na jednoho s vedoucím zůstaly. Hodnocení je podklad k nim, ne jejich náhrada.
      </p>
      <p>
        Hovory se vyhodnocují jen se souhlasem druhé strany. Na začátku zazní upozornění, že hovor slouží ke zlepšování práce týmu, a kdo nechce, hovor se
        nevyhodnotí. S ředitelem jsme tohle řešili jako první ze všeho a smlouvu o zpracování údajů jsme podepsali před jakýmkoli zkoušením.
      </p>

      <h2>Co to přineslo</h2>
      <p>
        Zpětná vazba se změnila z jednou za měsíc na po každém hovoru. Nováčci se začali opravovat dřív, než si špatný zvyk zafixují, a zkušení obchodníci poprvé
        slyšeli, co dělají pořád stejně. Nečekali jsme, že se hodnocení stane něčím, co si lidé pouštějí před dalším hovorem. Dnes to dělá většina týmu.
      </p>
      <p>
        Kdybychom to dělali znovu, začali bychom ještě o krok dřív: dali bychom obchodníkům před spuštěním jedno dopoledne, kdy by si hodnocení zkusili na svých
        starých hovorech. Důvěra se nevyrábí slovy. Vyrábí se tím, že se lidé přesvědčí, že jim systém neškodí.
      </p>
    </>
  );
}
