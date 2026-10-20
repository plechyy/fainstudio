/* Strojírna Veselý: příběh se vypráví stroj po stroji, protože znalost je rozložená po strojích. Nejdelší z případů. */
export default function Master() {
  return (
    <>
      <p className="ca-open">
        Mistr, který v dílně pracoval od otevření, oznámil, že za rok odchází do důchodu. Znal každý stroj, jeho nálady i to, jak se chová v zimě. Nic z toho nebylo
        zapsané. Ředitel dílny, syn zakladatele, to řekl přesně: „Až odejde, odejde s ním polovina dílny.“
      </p>

      <h2>Jak se k nám dostali</h2>
      <p>
        Ředitel nám zavolal po tom, co se nováček pokazil frézku a mistr ho z druhého konce haly poznal po zvuku. Chtěl vědět, jestli se dá udělat něco víc než
        manuál, který se stejně nikdo nečte. Po prvním hovoru jsme se shodli na jedné věci: nebudeme psát příručku. Chceme, aby se nováček zeptal a dostal
        odpověď mistrovými slovy.
      </p>
      <p>
        Mistrovi jsme to řekli rovnou. Že tu nejde o to, aby ho někdo nahradil. Jde o to, aby jeho zkušenosti zůstaly dílně, a on sám rozhodne, co z nich a jak se
        řekne. Souhlasil s jednou podmínkou: odpovědi si projde, než se dostanou k lidem.
      </p>

      <h2>Rozhovory u strojů</h2>
      <p>
        Znalost se v dílně nedá sepsat u stolu, protože je rozložená po strojích. Chodili jsme proto s mistrem od stroje ke stroji. Mluvil, my jsme zapisovali,
        fotili a nahrávali zvuk.
      </p>

      <h3 className="ca-machine">Frézka č. 3</h3>
      <p>
        „Když je ráno studená, posuv se zasekává. Nech ji pár minut běžet naprázdno a až potom dotáhni vedení.“ Tohle nikde nebylo. Mistr to dělal automaticky
        patnáct let a nikdy to nikomu neřekl, protože nikdo se neptal. Zapsali jsme to i s fotkou vedení, na kterou ukazoval.
      </p>

      <h3 className="ca-machine">Hydraulický lis</h3>
      <p>
        „Než se porouchá, změní zvuk.“ Nahráli jsme zdravý lis a pak jeden, který už byl unavený. Rozdíl jsme na displeji neviděli, ale slyšet byl hned. Dnes je
        u odpovědi o lisu zvuk, který si nováček může pustit.
      </p>

      <h3 className="ca-machine">Svařovna</h3>
      <p>
        Tady mistr zavrtěl hlavou: „Za vlhka přidat proud a drát dát o stupeň jinak.“ Sešit s nastavením nikdy neexistoval. Poprvé vznikla tabulka podle počasí
        a mistr při psaní dvakrát opravil, co původně řekl. To jsou věci, které se z hlavy tak snadno nedostanou.
      </p>

      <h3 className="ca-machine">Brusky</h3>
      <p>
        „Kotouč měnit dřív, než se zdá nutné. Pozdní výměna zkazí celou dávku.“ Z toho vzniklo pravidlo i s vysvětlením, proč právě tehdy. Nováček si pravidlo
        zapamatuje, jen když ví, proč platí.
      </p>

      <h2>Jak vznikl asistent</h2>
      <p>
        Z rozhovorů, poznámek z údržby, fotek a nahrávek jsme postavili asistenta. Nováček se zeptá do mobilu přímo u stroje a dostane odpověď mistrovými slovy.
        Pod odpovědí vždy vidí, odkud to asistent ví: „Rozhovor u stroje 3“, „Poznámky z údržby“. Když se ptá na něco, co mistr neřekl, asistent to přizná.
      </p>
      <p>
        Mistr si odpovědi prošel sám. Dvě opravil, jednu přepsal celou, protože ji my zjednodušili tak, až to nebyla pravda. Teprve potom jsme asistenta pustili
        k lidem v dílně. První týden se ho ptali hlavně nováčci. Druhý týden i zkušení, a to nás potěšilo nejvíc.
      </p>

      <h2>Co když asistent neví</h2>
      <p>
        Řekne to a pošle dotaz mistrovi nebo vedoucímu směny. Odpověď se pak doplní, takže příště ji asistent už zná. Po odchodu mistra půjdou dotazy vedoucímu
        směny a znalosti se budou dál doplňovat. Systém tak roste, i když jeho zdroj už v dílně není.
      </p>

      <h2>Co to přineslo</h2>
      <p>
        Dřív věděl, jak na každý stroj, jeden člověk, a všichni stáli ve frontě na jeho otázky. Dnes je odpověď v mobilu u stroje. Ředitel říká, že největší
        změna je klid: konečně ví, že odchod jednoho člověka nezastaví dílnu.
      </p>
      <p>
        Příště bychom nahrávky začali dřív. Mistr měl po roce dvakrát víc práce, než očekával, a věci, které si pamatuje jen v situaci (třeba hlas stroje), bylo
        nejlepší zachytit, když se opravdu dějí.
      </p>
    </>
  );
}
