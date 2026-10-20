/* Unica Real: vyprávění od prvního e-mailu po první pípnutí. Souvislý text, nadpisy jen pro orientaci. */
export default function Realty() {
  return (
    <>
      <p className="ca-open">
        Byt 3+kk v Králově Poli visel na portálu čtyři hodiny, než se o něm někdo z kanceláře dozvěděl. Majitel ho mezitím slíbil makléři z konkurence. Byla to
        třetí zakázka od majitele, o kterou Unica Real během dvou měsíců přišla. Pokaždé o pár hodin.
      </p>

      <h2>Jak se k nám dostali</h2>
      <p>
        Majitelka kanceláře nám napsala krátký e-mail. Nepsala, že chce umělou inteligenci. Napsala, že konkurence je o hodinu rychlejší a že neví, jak to
        dohnat. Zkoušela brigádníka na ranní procházení portálů, ale po dvou týdnech to vzdal. Hledat byty od majitelů je nuda a ráno se na ně musí vstávat
        dřív než ostatní.
      </p>
      <p>
        U majitelů se totiž nerozhoduje cenou ani značkou. Rozhoduje to, kdo zavolá první. Majitel nechce platit provizi, a když mu někdo normální zavolá do půl
        hodiny od zveřejnění, většinou ho nechá jít dál.
      </p>

      <h2>První hovor: nejdřív ráno makléře</h2>
      <p>
        Na prvním hovoru jsme se neptali na technologii. Požádali jsme, jestli si můžeme jedno ráno sednout k makléři a dívat se, co dělá. Díky tomu jsme viděli
        pět portálů, na každém otevřených pár záložek, a makléře, který si pro každý inzerát v hlavě odpovídá na tři otázky: je to opravdu majitel? Nevidím ten
        byt už jinde? Stojí to za telefonát?
      </p>
      <p>
        Z té hodiny jsme si odnesli tři věci. Majitel se pozná podle drobností (telefonní číslo, způsob psaní, fotky), ne podle štítku „soukromá osoba“, který
        si realitky rády lepí samy. Stejný byt bývá na čtyřech webech najednou. A makléř nepotřebuje inzerát. Potřebuje důvod zvednout telefon: kontakt a odpověď,
        jestli je cena rozumná.
      </p>

      <h2>Co jsme jim napsali do návrhu</h2>
      <p>
        Návrh měl jednu stránku. Napsali jsme, co hlídač udělá: najde nové inzeráty od majitelů v lokalitách kanceláře, vyřadí realitky a duplicity a makléři
        pošle do mobilu kontakt, cenu a srovnání s podobnými byty. Napsali jsme, co od nich potřebujeme: seznam lokalit, čísla pro upozornění a jednoho makléře,
        který jednou týdně řekne „tohle byla realitka“.
      </p>
      <p>
        A napsali jsme, co se dělat nebude. Hlídač nebude psát majitelům ani jim volat, to je práce makléře. A nebude číst portály, které automatické čtení
        zakazují. Řekli jsme předem, kterých se to týká, a že u nich se makléři dívají dál ručně. Raději jim to řekneme na začátku než po spuštění.
      </p>

      <h2>Stavba po týdnech</h2>
      <p>
        První živá ukázka byla obyčejná tabulka. Hlídač z jednoho portálu přečetl nové inzeráty a makléři je dostali seřazené. Makléřka u třetího řádku řekla:
        „Tohle je realitka.“ Podle čeho to poznala, jsme si zapsali a druhý týden už to hlídač poznal sám.
      </p>
      <p>
        Druhá ukázka byla o duplicitách. Stejný byt se objevil na třech portálech, ale pokaždé s jinou cenou a jiným textem. Naučili jsme hlídač je spojit,
        takže makléř vidí jeden byt, ne tři.
      </p>
      <p>
        Třetí ukázka už pípala do telefonu. A tady jsme udělali chybu: v první verzi chodilo třicet upozornění denně, protože hlídač posílal všechno, co našel.
        Makléři je po dvou dnech přestali číst. Zúžili jsme to na nové inzeráty od majitelů, u kterých je cena pod trhem, a upozornění jsou dnes asi tři za den.
        Ukázalo se, že počet upozornění je nejlepší měřítko: čím méně jich je, tím víc jim makléři věří.
      </p>
      <blockquote className="ca-quote">
        Když mi to poprvé cinklo, myslela jsem, že je to test. Majitel měl v inzerátu ještě napsáno „fotky doplním“.
        <cite>makléřka Unica Real</cite>
      </blockquote>

      <h2>Spuštění</h2>
      <p>
        Naučit makléře nebylo potřeba skoro nic. Jediné pravidlo zní: upozornění znamená zvednout telefon do patnácti minut. Hlídač ukládá každý nález do
        sdílené tabulky kontaktů, kterou kancelář už měla, a makléř tam jen označí „zavolal / nezvedl / domluveno“. Po dvou týdnech jsme s kanceláří prošli, které
        upozornění byla zbytečná, a doladili filtry.
      </p>

      <h2>Co to přineslo</h2>
      <p>
        Dřív kancelář o novém bytě od majitele věděla druhý den, často až od někoho jiného. Teď to ví do patnácti minut od zveřejnění. První týden se stalo
        přesně to, kvůli čemu přišli: byt od majitele, o kterém ještě nikdo nevěděl, měla makléřka v mobilu dřív, než majitel stihl odpovědět prvnímu
        zájemci. Největší změna ale není rychlost. Makléři se přestali bát, že něco propásli.
      </p>

      <h2>Co bychom dnes udělali jinak</h2>
      <p>
        Filtr na realitky bychom nasadili hned první týden. Posílali jsme upozornění, která makléři mazali, a tím jsme zbytečně ztratili jejich důvěru. Další
        pravidlo, které jsme si z toho odvodili: nové upozornění se přidává až poté, co makléři řeknou, že jim ta stávající nevadí.
      </p>
    </>
  );
}
