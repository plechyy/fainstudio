/**
 * Texty webu. Hlas a pravidla jsou v TONE-OF-VOICE.md — před úpravou si je přečti.
 * Žádné pevné ceny, termíny ani počty dní: každá zakázka je jiná, cena i termín se domlouvají
 * na prvním hovoru. Slovu „agentura“ se vyhýbáme, píšeme, co děláme („Digitalizujeme firmy pomocí AI“).
 */

export const hero = {
  // první řádek nadpisu; druhý se píše a maže (components/HeroRotate.tsx)
  // malý nadtitulek nad nadpisem: hlavní klíčová slova, viditelná a uvnitř H1
  kicker: 'Digitalizujeme firmy pomocí AI',
  title: 'Umělá inteligence,',
  rotateLead: 'která',
  rotate: ['šetří čas', 'maká za vás', 'šetří peníze', 'usnadňuje práci', 'je FaiN'],
  titleSr: 'Digitalizujeme firmy pomocí AI. Umělá inteligence, která šetří čas, maká za vás, šetří peníze, usnadňuje práci a je FaiN.',
  lead: 'Skoro každá firma dělá něco, co by zvládl systém. Máte nápad? Postavíme ho. Nemáte? Projdeme to spolu.',
  primary: 'Mám zájem',
  secondary: 'Co všechno umíme',
};

export const proof = {
  title: 'Čísla, za kterými si stojíme',
  stats: [
    { value: 'až 90 %', label: 'Úspora času a peněz', text: 'Méně ruční práce u procesů, které jsme dodali. K tomu méně chyb a přesčasů a víc peněz na účtu. Kolik přesně u vás, spočítáme na prvním hovoru.' },
    { value: 'Ihned', label: 'Adaptace', text: 'Napojíme se na to, co už používáte, a lidi zaučíme. Žádné týdny zvykání, žádný nový program od nuly.' },
    { value: 'Vždy', label: 'Spolehlivost', text: 'Systém nezapomene, neonemocní a nemá blbý den. Pravidla se dodržují pokaždé stejně. O důležitých věcech pořád rozhodujete vy.' },
    { value: '24/7', label: 'Nonstop provoz', text: 'Zatímco spíte, systém odpovídá, třídí a počítá. Ráno je hotovo.' },
  ],
};

export const systems = {
  title: 'Co všechno jde? Skoro cokoliv',
  lead: 'Tohle je jen ochutnávka. Jestli se to dá udělat systémem, uděláme to. A když ne, řekneme vám to rovnou.',
  items: [
    {
      id: 'nastroje',
      name: 'CRM a interní nástroje',
      short: 'CRM',
      text: 'Jedno místo pro klienty, zakázky a práci celého týmu. Systém je ušitý podle toho, jak vaše firma funguje, a návaznosti mezi kroky řeší za vás. Lidé vidí, co je na nich, a vy máte přehled bez dohledávání a porad navíc. Roste s vámi, takže ho nemusíte po čase měnit za jiný.',
    },
    {
      id: 'procesy',
      name: 'Automatizace procesů',
      short: 'Procesy',
      text: 'Jedním klikem spustíte celý řetězec kroků napříč nástroji, které už používáte. Smlouvy, účty, objednávky i maily se rozjedou samy a vy vidíte, co je hotové.',
    },
    {
      id: 'poptavky',
      name: 'Zpracování poptávek',
      short: 'Poptávky',
      text: 'Poptávky ze všech kanálů se sejdou na jednom místě a vyřídí se včas. Zákazník nemusí čekat a vám nic nezapadne. Víte, co se řeší, kdo to má na starosti a co čeká na odpověď. A víc poptávek znamená víc obchodu, ne víc chaosu.',
    },
    {
      id: 'dokumenty',
      name: 'Zpracování dokumentů',
      short: 'Dokumenty',
      text: 'Systém dokumenty přečte, roztřídí a data z nich dostane tam, kam patří. Nikdo je nemusí přepisovat ručně. Ubývá chyb z přepisování i času stráveného papírováním. A když je něco nejasné, systém na to upozorní a člověk jen potvrdí.',
    },
    {
      id: 'asistent',
      name: 'Asistent nad firemními daty',
      short: 'Asistent',
      text: 'Asistent, který zná vaše dokumenty, postupy a interní systémy. Odpoví na to, na co se ho zeptáte, a kde je potřeba, rovnou něco zařídí. Znalosti firmy tak nezůstávají v hlavách jednotlivců a noví lidé se zaučí mnohem rychleji. Přístup má jen k tomu, co mu povolíte.',
    },
    {
      id: 'data',
      name: 'Hlídání trhu a dat',
      short: 'Hlídání trhu',
      text: 'Systém průběžně sleduje zdroje, které vás zajímají, a vybere jen to, co má smysl řešit. Vy se věnujete rozhodnutím, ne hledání. Nic důležitého vám neuteče a nemusíte kvůli tomu nikoho držet u obrazovky. Výsledek dostanete tam, kde ho používáte.',
    },
    {
      id: 'weby',
      name: 'Chytré weby',
      short: 'Weby',
      text: 'Web, který není jen vizitka. Umí pracovat s návštěvníky a výsledky se propíšou rovnou do vašich systémů. Navazuje na to, jak vaše firma funguje, a pomáhá vám získávat zákazníky, ne jen dobře vypadat. Postaráme se i o rychlost, přehlednost a to, aby šel pohodlně používat na každém zařízení.',
    },
  ],
};

// sekce „Proč AI“: krátký obecný explainer, žádné konkrétní případy
export const why = {
  title: 'Jak můžete být',
  accent: 'FaiN?',
  lead: 'Nemusíte AI rozumět. Stačí vědět, co pro vás udělá.',
  items: [
    { k: 'Proč', t: 'Víc práce. Stejný tým.', d: 'Odpovídáte rychleji, rozhodujete s lepšími informacemi a nikoho nemusíte nabírat.' },
    { k: 'Kde', t: 'Úplně všude.', d: 'Administrativa, procesy i kreativa. Ukažte nám kteroukoliv část firmy a najdeme, co v ní jde líp.' },
    { k: 'Jakou roli', t: 'Dříč, ne šéf.', d: 'Čte, počítá, odpovídá, píše a navrhuje. Šéf jste pořád vy.' },
  ],
};

export const process = {
  title: 'Čtyři kroky. Žádné zbytečné schůzky.',
  lead: 'Každý krok končí něčím, co si můžete hned vyzkoušet. Ne slibem.',
  steps: [
    { name: 'Úvodní hovor', text: 'Nemusíte vědět, co chcete. To zjistíme spolu. Z hovoru odcházíte s tím, co vám systém přinese.' },
    { name: 'Návrh', text: 'Černé na bílém: co systém udělá, co od vás potřebujeme, kdy bude hotovo a kolik to bude stát. Podpis, záloha a jedeme.' },
    { name: 'Stavíme po týdnech', text: 'Každý týden dostanete živou ukázku. Vyzkoušíte ji, řeknete, co jinak, a další týden to máte. Žádné čekání na velké odhalení.' },
    { name: 'Zaučení a spuštění', text: 'Vaše lidi to naučíme, napojíme to na vaše nástroje a pustíme do provozu. Od té chvíle to maká za vás.' },
  ],
};

/*
 * Sekce „Případy“: carousel šesti případů z různých oborů. Zatím jsou všechny MODELOVÉ:
 * typická firma, typické objemy a výpočet výsledku napsaný celý. Nejsou to reference klientů
 * a sekce to říká (lead, štítek na kartě, poznámka pod carouselem).
 * Až bude skutečný případ s písemným souhlasem klienta, přepiš u něj kind na 'real': štítek zmizí,
 * a když nezbude žádný modelový, zmizí i poznámka. Žádné pevné ceny ani termíny dodání.
 * Každý případ má jiný vizuál (visual.type) a jiný druh výsledku, ať nejsou všechny stejné.
 */
export const cases = {
  title: 'Projekty, díky kterým',
  accent: 'už jsou ostatní FaiN',
  lead: 'Modelové případy z oborů, kde to dává největší smysl. U každého vidíte, co bylo potřeba vyřešit, jak jsme to postavili, proč zrovna takhle a co to přineslo.',
  modelLabel: 'Modelový případ',
  labels: { more: 'Jak probíhala spolupráce', less: 'Skrýt průběh', problem: 'Co bylo potřeba vyřešit', how: 'Jak jsme to vyřešili', why: 'Proč zrovna takhle', result: 'Co to přineslo', before: 'Dřív', after: 'Teď', prev: 'Předchozí případ', next: 'Další případ' },
  items: [
    {
      id: 'reality',
      brand: { l: 0.62, c: 0.17, h: 272 }, // barva loga firmy
      kind: 'model',
      firm: 'Unica Real',
      title: 'Hlídač realitních portálů: nové nabídky od majitelů hned v mobilu makléře.',
      standfirst: 'Majitelka realitní kanceláře chtěla vědět o novém bytě od majitele dřív než konkurence. Dnes to makléř ví do několika minut.',
      summary: 'Systém hlídá realitní portály nonstop. Jakmile se objeví nový inzerát od majitele, během několika minut pošle makléři do mobilu zprávu se vším, co potřebuje: kontakt, cenu, popis i srovnání s trhem. Realitky a duplicity vyřadí sám, makléř jen zvedne telefon.',
      industry: 'Realitní služby, Brno a okolí',
      built: 'Hlídač nabídek na realitních portálech',
      problem: 'Makléři každé ráno procházeli portály a hledali byty, které prodávají přímo majitelé. Kdo zavolá první, má zakázku. Často to nebyli oni.',
      how: 'Systém každých pár minut projde portály, najde nové inzeráty od majitelů v jejich lokalitách, vyřadí realitky a duplicity a pošle makléři kontakt i srovnání ceny s trhem.',
      why: 'U nabídek od majitelů rozhoduje rychlost. Makléř nic nehledá, jen zvedne telefon.',
      visual: {
        type: 'feed',
        window: 'Hlídač nabídek · Brno',
        scanning: 'Prochází 14 portálů',
        found: '47 nových dnes',
        alert: { title: 'Nový byt od majitele', sub: '3+kk Královo Pole · 6,2 mil. Kč, o 4 % pod trhem', btn: 'Zavolat' },
        rows: [
          { t: 'Byt 3+kk, Královo Pole', meta: 'před 2 min · majitel', ok: true, tag: 'Pošleno makléři' },
          { t: 'Byt 2+1, Žabovřesky', meta: 'před 6 min · realitní kancelář', ok: false, tag: 'Vyřazeno' },
          { t: 'Byt 3+kk, Královo Pole', meta: 'před 7 min · stejný inzerát jinde', ok: false, tag: 'Duplicita' },
          { t: 'Dům 5+1, Kuřim', meta: 'před 11 min · majitel', ok: true, tag: 'Pošleno makléři' },
        ],
      },
      result: { before: 'druhý den', after: '15 min', unit: 'od zveřejnění inzerátu k telefonátu', math: 'Dřív ranní procházení portálů. Teď upozornění do pár minut od zveřejnění.' },
    },
    {
      id: 'kouc',
      brand: { l: 0.5, c: 0.07, h: 255 }, // barva loga firmy
      kind: 'model',
      firm: 'Brightline Digital',
      title: 'Systém pro obchodníky: vyhodnotí každý hovor hned po zavěšení.',
      standfirst: 'Obchodní ředitel chtěl, aby obchodníci dostávali zpětnou vazbu hned po hovoru, a ne jednou za měsíc. Ať je to trenér, ne dohled.',
      summary: 'Systém zachytí každý hovor obchodníka. AI v něm hovor vyhodnotí a obchodník dostane hned po zavěšení do mobilu hodnocení: co se povedlo, co příště jinak, co bylo zbytečné a co nezaznělo. Vždy začíná tím dobrým a ukazuje, jak se obchodník zlepšil. Vedoucí vidí jen trendy celého týmu, ne jednotlivé hovory.',
      industry: 'B2B prodej',
      built: 'Systém, který vyhodnotí každý hovor',
      problem: 'Vedoucí neměl čas poslouchat hovory. Zpětná vazba přišla jednou za měsíc a obecně, takže se všichni zlepšovali pomalu.',
      how: 'Systém každý hovor zaznamená a AI v něm vyhodnotí, co bylo dobře, co špatně, co zbytečné a co nezaznělo. Obchodník to má v mobilu hned po zavěšení.',
      why: 'Hodnocení přijde, dokud si hovor pamatuje. Ukazuje hlavně pokrok, takže motivuje, a vedoucí vidí, co trápí celý tým.',
      visual: {
        type: 'score',
        call: 'Hovor s firmou Novotný stavby · 12 min',
        who: 'Novotný stavby',
        live: 'Hovor probíhá',
        ended: 'Hovor ukončen',
        card: 'Hodnocení hovoru',
        analyzing: 'Vyhodnocuji hovor',
        rows: [
          { k: 'good', label: 'Dobře', t: 'Hned na začátku zjistil, kdo rozhoduje a jaký je rozpočet.' },
          { k: 'bad', label: 'Příště jinak', t: 'Třikrát skočil klientovi do řeči u otázky na cenu.' },
          { k: 'skip', label: 'Zbytečné', t: 'Pět minut o funkcích, o které klient nestál.' },
          { k: 'miss', label: 'Nezaznělo', t: 'Nedomluvil další krok ani termín rozhodnutí.' },
        ],
        trend: 'Lepší než minulý týden',
      },
      result: { before: '1× měsíčně', after: 'po hovoru', unit: 'zpětná vazba pro obchodníka', math: 'Dřív obecné poznámky na měsíční poradě. Teď konkrétní hodnocení pár vteřin po zavěšení.' },
    },
    {
      id: 'fotka',
      brand: { l: 0.6, c: 0.22, h: 27 }, // barva loga firmy
      kind: 'model',
      firm: 'Gareko',
      title: 'Předběžná cena koupelny z fotky za minutu.',
      standfirst: 'Zákazník pošle fotku koupelny a za minutu ví, kolik zhruba bude rekonstrukce stát. Technici jezdí jen tam, kde z toho bude zakázka.',
      summary: 'Zákazník na webu nahraje fotky své koupelny a odpoví na pár otázek. Systém pozná, co v ní je (fotky v něm vyhodnocuje AI), odhadne rozsah prací a podle ceníku firmy mu do minuty pošle předběžnou cenu s rozpětím. Technici jezdí na obhlídku jen k zákazníkům, kteří to myslí vážně.',
      industry: 'Rekonstrukce koupelen',
      built: 'Odhad ceny z fotek na webu',
      problem: 'Každá poptávka znamenala výjezd na obhlídku. Polovina zákazníků mezitím zavolala jinam a technici jezdili i tam, kde z toho nic nebylo.',
      how: 'Zákazník na webu nafotí koupelnu a odpoví na pár otázek. Systém pozná, co v ní je (fotky v něm vyhodnocuje AI), odhadne rozsah prací a podle ceníku firmy pošle cenu s rozpětím.',
      why: 'Kdo pošle cenu první, většinou vyhraje. A na obhlídku se jezdí jen za těmi, kdo to myslí vážně.',
      visual: {
        type: 'photo',
        window: 'gareko.cz · Cena koupelny',
        dropHint: 'Nahrajte pár fotek koupelny',
        analyzing: 'Poznávám, co na fotkách je',
        found: 'Na fotkách jsme poznali',
        items: [
          { t: 'Vana', v: 'bude sprchový kout' },
          { t: 'Obklad', v: '14 m²' },
          { t: 'Umyvadlo a baterie', v: 'výměna' },
        ],
        price: { k: 'Předběžná cena', v: '148–172 tis. Kč', s: 'Obhlídka jen pro upřesnění', btn: 'Domluvit obhlídku' },
        toast: { title: 'Nová poptávka z webu', sub: 'Koupelna · 148–172 tis. Kč · chce obhlídku' },
      },
      result: { before: 'pár dní', after: '1 min', unit: 'od poptávky k ceně', math: 'Dřív obhlídka a nacenění v kanceláři. Teď odhad hned, obhlídka jen u vážných zájemců.' },
    },
    {
      id: 'smlouvy',
      brand: { l: 0.7, c: 0.06, h: 75 }, // barva loga firmy
      kind: 'model',
      firm: 'Woodline Interiors',
      abroad: 'Zahraniční spolupráce · USA',
      title: 'Kontrola smluv: systém najde rizika dřív, než něco podepíšete.',
      standfirst: 'Jedna smlouva majitele stála tři roky. Dnes mu systém přečte každou novou dřív, než ji podepíše, a ukáže, kde je háček.',
      summary: 'Systém přečte každou smlouvu od dodavatele dřív, než ji majitel podepíše. AI v něm zvýrazní rizikové články (automatické prodloužení, pokuty, jednostranné změny ceny) a ke každému navrhne, co chtít jinak. Smlouvy s vážným rizikem jdou k právníkovi už s hotovým přehledem.',
      industry: 'Výroba nábytku',
      built: 'Kontrola smluv s dodavateli',
      problem: 'Majitel podepisoval smlouvy s dodavateli a odběrateli bez právníka, protože na něj nebyl čas. Jednou ho to stálo tři roky drahé smlouvy, která se sama prodloužila.',
      how: 'Systém smlouvu přečte, AI v něm ji porovná s tím, co firma běžně přijímá, a zvýrazní rizika: prodloužení, pokuty, jednostranné změny ceny. Ke každému navrhne, co chtít jinak.',
      why: 'Majitel ví hned, co podepisuje, a k právníkovi jde jen se smlouvou, která to opravdu potřebuje. Poslední slovo má on nebo právník, ne systém.',
      visual: {
        type: 'contract',
        title: 'Rámcová smlouva o dodávkách',
        reading: 'Čtu smlouvu',
        summary: { title: '3 rizika ve smlouvě', sub: 'Návrh změn je připravený k odeslání' },
        flags: [
          { lvl: 'high', at: 'Čl. 7.2', t: 'Sama se prodlouží o 36 měsíců', fix: 'Chtít prodloužení jen na rok' },
          { lvl: 'high', at: 'Čl. 9.1', t: 'Pokuta 0,5 % denně z celé zakázky', fix: 'Strop pokuty 10 %' },
          { lvl: 'mid', at: 'Čl. 11', t: 'Dodavatel může zvednout cenu bez souhlasu', fix: 'Změna ceny jen dohodou' },
        ],
      },
      result: { before: 'naslepo', after: '5 min', unit: 'a víte, co podepisujete', math: 'Dřív podpis bez čtení drobného písma. Teď přehled rizik a návrh změn ještě před podpisem.' },
    },
    {
      id: 'knowhow',
      brand: { l: 0.7, c: 0.17, h: 55 }, // barva loga firmy
      kind: 'model',
      firm: 'Strojírna Veselý',
      title: 'Asistent s know-how mistra: nováčkům odpovídá jeho slovy.',
      standfirst: 'Nejzkušenější mistr odcházel do důchodu a všechno měl v hlavě. Dílna má teď asistenta, který odpovídá jeho slovy.',
      summary: 'Asistent vznikl z rozhovorů s mistrem, jeho poznámek, fotek a nahrávek u strojů a odpovědi v něm skládá AI. Nováček se zeptá do mobilu přímo u stroje a dostane odpověď mistrovými slovy i s odkazem, odkud ji asistent ví. Když odpověď nezná, řekne to a předá dotaz mistrovi nebo vedoucímu směny.',
      industry: 'Strojírenská výroba',
      built: 'Asistent se znalostmi mistra',
      problem: 'Mistr, který znal každý stroj, za rok odchází. Všechno měl v hlavě a nováčci za ním chodili s každou drobností.',
      how: 'S mistrem jsme vedli krátké rozhovory u strojů a přidali jeho poznámky, výkresy a fotky. Vznikl systém s asistentem, kterého se nováček zeptá do mobilu a dostane odpověď mistrovými slovy.',
      why: 'Zkušenosti z desítek let nikde nebyly zapsané. Teď nezmizí s jedním člověkem a nováček nemusí čekat, až má mistr čas.',
      visual: {
        type: 'brain',
        q: 'Proč se trojce zasekává posuv?',
        a: 'Když je studená, nech ji deset minut běžet naprázdno a pak dotáhni vedení. Ráno to dělá skoro vždycky.',
        who: 'Jarda, mistr dílny',
        app: 'Dílna · asistent',
        machine: 'U stroje: Frézka č. 3',
        machines: ['Frézka č. 3', 'Lis', 'Svařovna', 'Brusky'],
        thinking: 'Hledám v mistrových zápiscích',
        from: 'Odpověď vychází z',
        sources: ['Rozhovor u stroje 3', 'Poznámky z údržby', 'Fotka vedení'],
      },
      result: { before: '1 člověk', after: 'celá dílna', unit: 'ví, jak na každý stroj', math: 'Dřív jeden mistr a fronta otázek. Teď odpověď v mobilu u stroje.' },
    },
    {
      id: 'porady',
      brand: { l: 0.7, c: 0.02, h: 220 }, // barva loga firmy
      kind: 'model',
      firm: 'Proengineers',
      title: 'Zápisy z porad: systém poslechne poradu, napíše zápis a rozdá úkoly.',
      standfirst: 'Z porad se přestalo ztrácet, co kdo slíbil. Zápis i úkoly vzniknou samy hned po poradě.',
      summary: 'Systém poslouchá poradu, na stole i online, a AI v něm pozná, kdo mluví a co zaznělo. Po jejím skončení pošle všem krátký zápis. Každý úkol, který zazněl, zapíše týmu do úkolníčku se jménem a termínem. Nikdo nic nepřepisuje.',
      industry: 'Projekce a architektura',
      built: 'Zápisy z porad',
      problem: 'Po poradě si každý pamatoval něco jiného. Zápis psal ten, kdo se nestihl vymluvit, a úkoly se ztrácely v mailech.',
      how: 'Systém poradu poslouchá, na stole i online. Po konci pošle krátký zápis a úkoly se jménem a termínem rovnou založí v nástroji, který tým používá.',
      why: 'Nikdo nic nepřepisuje a nic se neztratí. Před další poradou přijde přehled, co je hotové a co visí.',
      visual: {
        type: 'meeting',
        window: 'Porada · pondělí 9:00',
        writing: 'Porada skončila, zapisuji',
        board: 'Úkoly z porady',
        done: 'Zápis odeslán všem',
        tasks: [
          { who: 'Lenka', said: 'Materiál na Lesnou musíme objednat do úterka.', t: 'Objednat materiál na stavbu Lesná', when: 'úterý' },
          { who: 'Petr', said: 'Nabídku pro Kovo Brno pošlu do pátku.', t: 'Poslat nabídku pro Kovo Brno', when: 'pátek' },
          { who: 'Tomáš', said: 'Fakturu od statika zkontroluju zítra.', t: 'Zkontrolovat fakturu od statika', when: 'zítra' },
        ],
      },
      result: { before: '30 min', after: '0 min', unit: 'psaní zápisu po každé poradě', math: 'Dřív zápis ručně a úkoly v mailech. Teď zápis i úkoly hned po poradě.' },
    },
  ],
  cta: 'Chci zjistit, co by šlo líp',
} as const;

export const compare = {
  title: 'Jiné cesty to taky umí. Jen jinak.',
  columns: ['FaiN Studio', 'Jiný dodavatel', 'Hotový nástroj', 'Vlastní vývojář'],
  rows: [
    { label: 'Jak dlouho to trvá', values: ['Týdny', 'Měsíce', 'Dny', 'Měsíce'] },
    { label: 'Řeší právě váš proces', values: ['Ano', 'Ano', 'Ne', 'Ano'] },
    { label: 'Zaučení lidí v ceně', values: ['Ano', 'Někdy', 'Ne', 'Ne'] },
    { label: 'Cenu znáte po prvním hovoru', values: ['Ano', 'Ne', 'Ano', 'Někdy'] },
    { label: 'Když skončíme, všechno zůstane vám', values: ['Ano', 'Záleží na smlouvě', 'Ne, s paušálem končí i nástroj', 'Ne, know-how odejde s ním'] },
  ],
};

export const faq = [
  {
    q: 'Co je AI digitalizace?',
    a: 'Systém, který za vás dělá opakovanou práci a přitom rozumí textu. Přečte e-mail, fakturu nebo poptávku, pochopí, co v ní je, a podle toho jedná. Běžná digitalizace jen přesouvá data podle pevných pravidel. S umělou inteligencí zvládne i práci, ke které byl dřív potřeba člověk.',
  },
  {
    q: 'Pro koho to je? Nevíme, co by šlo zlepšit.',
    a: 'Pro malé a střední firmy, kde se pořád něco opakuje. Spolupracovat můžeme osobně i na dálku. Obor nerozhoduje. Na rutinu si člověk zvykne a přestane si jí všímat, takže když nevíte, co by šlo zlepšit, je to normální. Na hovoru projdeme, jak ve firmě pracujete, a ukážeme, co by mohl převzít systém. Kdybychom nic nenašli, řekneme vám to.',
  },
  {
    q: 'Nahradí to někoho z našich lidí?',
    a: 'Ne. Odlehčí jim od práce, kterou stejně nikdo nedělá rád. Rozhodovat, vyjednávat a mluvit se zákazníkem budou dál oni.',
  },
  {
    q: 'Kolik to stojí?',
    a: 'Cena se u každého projektu liší a odvíjí se od toho, co má systém dělat. Skládá se z rozsahu (kolik činností převezme), počtu nástrojů, které se mají napojit, počtu lidí, kteří s ním budou pracovat, a toho, jak složitá jsou vaše data. Na prvním hovoru projdeme, co potřebujete, a konkrétní číslo dostanete ještě před podpisem.',
  },
  {
    q: 'Jak dlouho to trvá?',
    a: 'Podle rozsahu. Termín domluvíme na prvním hovoru a každý týden dostanete živou ukázku, takže vidíte, jak to postupuje. Kdybychom věděli, že to nestihneme, řekneme to dřív, než cokoli podepíšete.',
  },
  {
    q: 'Musíme u sebe něco měnit? Napojíte to na naše nástroje?',
    a: 'Nic měnit nemusíte a nikdo se nemusí učit nový program. Napojíme se na mail, web, tabulky a běžné cloudové nástroje, které už máte. Starší podnikové systémy a stěhování dat ze starého softwaru neděláme, a řekneme vám to hned na prvním hovoru.',
  },
  {
    q: 'Kde jsou naše data a jsou v bezpečí?',
    a: 'Data zůstávají vaše. Systém může běžet v cloudu, nebo lokálně u vás, podle toho, co vám víc vyhovuje. Přístup k datům mají jen lidé, které určíte. Před začátkem podepíšeme NDA a smlouvu o zpracování osobních údajů a předem se domluvíme, jaká data smí do AI modelů a jaká ne.',
  },
  {
    q: 'Co když spolupráce skončí? Nezůstaneme na vás závislí?',
    a: 'Ne. Kód, data i přístupy patří vám. Když spolupráci ukončíte, předáme vám všechno: zdrojový kód, účty u služeb, na kterých systém běží, a dokumentaci, podle které ho zvládne spravovat kdokoli jiný. Žádný paušál, bez kterého by systém přestal fungovat, a žádná data zamčená u nás.',
  },
];

export const about = {
  name: 'Matyáš Plecháč',
  ico: '21019011',
  verify: 'Ověřit v ARES',
  title: 'Nejdřív vám porozumíme.',
  accent: 'Pak to postavíme.',
  // krátký popis pro vyhledávače (strukturovaná data)
  text: 'Stavíme AI digitalizaci, interní nástroje, sběr dat a weby podle toho, jak vaše firma opravdu funguje.',
  lead: 'Víme, že jsme dobří, a ne z reklamy, ale z toho, co po nás zůstává u klientů. Neprodáváme hotové nástroje, do kterých se musíte vejít. Pracujeme podle toho, jak funguje vaše firma, protože přidaná hodnota není v technologii. Je v tom, že pochopíme vaše procesy, najdeme, kde se ztrácí nejvíc času, a postavíme systém, který lidé opravdu používají.',
  origin: 'Celé to začalo otázkou, kterou jsme slyšeli pořád dokola: „Nešlo by tohle udělat líp?“ Šlo.',
  /*
   * REFERENCE — ZATÍM SKRYTÉ.
   * Nezobrazovat, dokud zadavatel nemá od každého klienta písemný souhlas
   * se zveřejněním jména. Po získání souhlasu nastavit `show: true`
   * (u každé položky zvlášť) — sekce se pak vykreslí sama.
   */
  references: [
    { show: false, name: 'TheMAG', text: 'Nástroj na sběr dat, vizuály pro AirBank, TV spot pro Tugedr' },
    { show: false, name: 'Kino Blansko', text: 'Animovaný spot, běží před filmy' },
    { show: false, name: 'Tugedr', text: '3D produktová animace pro novou funkci v aplikaci' },
  ],
};

export const cta = {
  title: 'Jeden hovor. Pak už nebudete chtít zpátky.',
  text: 'Přijďte s nápadem, nebo bez něj. Projdeme vaši firmu, ukážeme, co jde líp, a spočítáme, kolik vám to ušetří. A když to nedává smysl, řekneme vám to do očí.',
  button: 'Chci to u nás',
  // tlačítko pod čísly
  priceButton: 'Mám zájem',
};
