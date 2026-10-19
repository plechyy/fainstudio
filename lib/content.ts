/**
 * Texty webu. Hlas a pravidla jsou v TONE-OF-VOICE.md — před úpravou si je přečti.
 * Žádné pevné ceny, termíny ani počty dní: každá zakázka je jiná, cena i termín se domlouvají
 * na prvním hovoru. Nepsat ani „nejsme agentura“.
 */

export const hero = {
  // první řádek nadpisu; druhý se píše a maže (components/HeroRotate.tsx)
  // malý nadtitulek nad nadpisem: hlavní klíčová slova, viditelná a uvnitř H1
  kicker: 'AI agentura pro automatizaci firem',
  title: 'Umělá inteligence,',
  rotateLead: 'která',
  rotate: ['šetří čas', 'maká za vás', 'šetří peníze', 'usnadňuje práci', 'je FaiN'],
  titleSr: 'AI agentura pro automatizaci firem. Umělá inteligence, která šetří čas, maká za vás, šetří peníze, usnadňuje práci a je FaiN.',
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
  title: 'Co vše zvládneme udělat',
  lead: 'Tohle je jen ochutnávka. Jestli se to dá udělat systémem, uděláme to. A když ne, řekneme vám to rovnou.',
  items: [
    {
      id: 'nastroje',
      name: 'CRM a interní nástroje',
      short: 'CRM',
      text: 'Klienti, obchody, schvalování a úkoly na jednom místě. Posunete zakázku o sloupec dál a faktura, projekt i úkoly pro tým se založí samy.',
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
      text: 'Zprávy z webu, mailu i sociálních sítí se sejdou na jednom místě. Každý zákazník dostane odpověď hned a termín si vybere sám. Nic nezapadne.',
    },
    {
      id: 'dokumenty',
      name: 'Zpracování dokumentů',
      short: 'Dokumenty',
      text: 'Faktury, účtenky, smlouvy i výpisy si systém přečte a roztřídí. Údaje skončí v tabulce nebo v účetnictví. Přepisovat čísla z PDF už nikdo nemusí.',
    },
    {
      id: 'asistent',
      name: 'Asistent nad firemními daty',
      short: 'Asistent',
      text: 'Chat, který zná vaše dokumenty, postupy a interní systémy. Kolega se zeptá normální češtinou a dostane odpověď. Když je potřeba něco zařídit, asistent to rovnou zařídí.',
    },
    {
      id: 'data',
      name: 'Hlídání trhu a dat',
      short: 'Hlídání trhu',
      text: 'Systém každý den projde weby, portály a databáze, které vás zajímají. Z tisíců záznamů vám pošle jen těch pár, které má smysl řešit.',
    },
    {
      id: 'weby',
      name: 'Chytré weby',
      short: 'Weby',
      text: 'Web, který za vás odpoví na dotazy, přihlásí na lekci nebo domluví termín. Vám to rovnou naskočí v systému, na počítači i v mobilu.',
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
 * Sekce „Případy“: carousel pěti případů z různých oborů. Zatím jsou všechny MODELOVÉ:
 * typická firma, typické objemy a výpočet výsledku napsaný celý. Nejsou to reference klientů
 * a sekce to říká (lead, štítek na kartě, poznámka pod carouselem).
 * Až bude skutečný případ s písemným souhlasem klienta, přepiš u něj kind na 'real': štítek zmizí,
 * a když nezbude žádný modelový, zmizí i poznámka. Žádné pevné ceny ani termíny dodání.
 * Každý případ má jiný vizuál (visual.type) a jiný druh výsledku, ať nejsou všechny stejné.
 */
export const cases = {
  title: 'Pět firem.',
  accent: 'Pět úplně jiných řešení.',
  lead: 'Modelové případy z oborů, kde to dává největší smysl. U každého vidíte, co bylo potřeba vyřešit, jak jsme to postavili, proč zrovna takhle a co to přineslo.',
  modelLabel: 'Modelový případ',
  note: 'Modelové případy: typická firma, typické objemy a výpočet, který vidíte celý. Skutečná čísla u vás spočítáme na prvním hovoru. Jména klientů zveřejníme jen s jejich souhlasem.',
  labels: { problem: 'Co bylo potřeba vyřešit', how: 'Jak jsme to vyřešili', why: 'Proč zrovna takhle', result: 'Co to přineslo', before: 'Dřív', after: 'Teď', prev: 'Předchozí případ', next: 'Další případ' },
  items: [
    {
      id: 'reality',
      hue: 52,
      kind: 'model',
      firm: 'Realitní kancelář',
      title: 'Nový byt od majitele v mobilu dřív než u konkurence.',
      problem: 'Makléři každé ráno procházeli portály a hledali byty, které prodávají přímo majitelé. Kdo zavolá první, má zakázku. Často to nebyli oni.',
      how: 'Systém každých pár minut projde portály, najde nové inzeráty od majitelů v jejich lokalitách, vyřadí realitky a duplicity a pošle makléři kontakt i srovnání ceny s trhem.',
      why: 'U nabídek od majitelů rozhoduje rychlost. Makléř nic nehledá, jen zvedne telefon.',
      visual: {
        type: 'feed',
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
      hue: 108,
      kind: 'model',
      firm: 'Obchodní tým',
      title: 'Každý hovor má hned svoje hodnocení. Obchodníci se zlepšují sami.',
      problem: 'Vedoucí neměl čas poslouchat hovory. Zpětná vazba přišla jednou za měsíc a obecně, takže se všichni zlepšovali pomalu.',
      how: 'AI poslechne každý hovor a vyhodnotí, co bylo dobře, co špatně, co zbytečné a co nezaznělo. Obchodník to má v mobilu hned po zavěšení.',
      why: 'Hodnocení přijde, dokud si hovor pamatuje. Ukazuje hlavně pokrok, takže motivuje, a vedoucí vidí, co trápí celý tým.',
      visual: {
        type: 'score',
        call: 'Hovor s firmou Novotný stavby · 12 min',
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
      hue: -38,
      kind: 'model',
      firm: 'Rekonstrukce koupelen',
      title: 'Zákazník pošle fotku. Za minutu má předběžnou cenu.',
      problem: 'Každá poptávka znamenala výjezd na obhlídku. Polovina zákazníků mezitím zavolala jinam a technici jezdili i tam, kde z toho nic nebylo.',
      how: 'Zákazník na webu nafotí koupelnu a odpoví na pár otázek. AI pozná, co v ní je, odhadne rozsah prací a podle ceníku firmy pošle cenu s rozpětím.',
      why: 'Kdo pošle cenu první, většinou vyhraje. A na obhlídku se jezdí jen za těmi, kdo to myslí vážně.',
      visual: {
        type: 'photo',
        tags: [
          // x pod 50 = měřeno od levého okraje, nad 50 = štítek končí na x (ať nevyjede z fotky)
          { t: 'Vana → sprchový kout', x: 5, y: 48 },
          { t: 'Obklad 14 m²', x: 95, y: 10 },
          { t: 'Umyvadlo a baterie', x: 95, y: 62 },
        ],
        price: { k: 'Předběžná cena', v: '148–172 tis. Kč', s: 'Obhlídka jen pro upřesnění' },
      },
      result: { before: 'pár dní', after: '1 min', unit: 'od poptávky k ceně', math: 'Dřív obhlídka a nacenění v kanceláři. Teď odhad hned, obhlídka jen u vážných zájemců.' },
    },
    {
      id: 'odchody',
      hue: 222,
      kind: 'model',
      firm: 'Distributor kávy',
      title: 'Pozná, že zákazník odchází, dřív než odejde.',
      problem: 'Kavárny přestávaly objednávat potichu. Nikdo si toho nevšiml, dokud nebylo pozdě, a obchodníci volali hlavně těm, kdo objednávali tak jako tak.',
      how: 'Systém každý týden projde objednávky a pozná, kdo kupuje míň, nepravidelně, nebo přestal úplně. Obchodník dostane seznam s důvodem a návrhem, co nabídnout.',
      why: 'Udržet zákazníka je mnohem levnější než získat nového. Obchodník volá tam, kde to má smysl, a ví, co říct.',
      visual: {
        type: 'radar',
        rows: [
          { name: 'Kavárna U Mostu', note: 'Objednává o 40 % méně', bars: [9, 9, 8, 7, 5, 4], act: 'Nabídnout ochutnávku nové směsi' },
          { name: 'Bistro Lípa', note: '6 týdnů bez objednávky', bars: [7, 8, 7, 0, 0, 0], act: 'Zavolat dnes' },
          { name: 'Café Nora', note: 'Přešla na menší balení', bars: [8, 8, 6, 6, 5, 5], act: 'Ověřit, jestli nekupuje i jinde' },
        ],
      },
      result: { before: 'po odchodu', after: 'týdny předem', unit: 'víte, kdo odchází', math: 'Dřív si toho nikdo nevšiml. Teď upozornění, jakmile se objednávky začnou měnit.' },
    },
    {
      id: 'knowhow',
      hue: -88,
      kind: 'model',
      firm: 'Strojírenská dílna',
      title: 'Nejzkušenější mistr jde do důchodu. Jeho know-how zůstává.',
      problem: 'Mistr, který znal každý stroj, za rok odchází. Všechno měl v hlavě a nováčci za ním chodili s každou drobností.',
      how: 'AI s mistrem vedla krátké rozhovory u strojů a přidala jeho poznámky, výkresy a fotky. Vznikl asistent, kterého se nováček zeptá do mobilu a dostane odpověď mistrovými slovy.',
      why: 'Zkušenosti z desítek let nikde nebyly zapsané. Teď nezmizí s jedním člověkem a nováček nemusí čekat, až má mistr čas.',
      visual: {
        type: 'brain',
        q: 'Proč se trojce zasekává posuv?',
        a: 'Když je studená, nech ji deset minut běžet naprázdno a pak dotáhni vedení. Ráno to dělá skoro vždycky.',
        who: 'Jarda, mistr dílny',
        sources: ['Rozhovor u stroje 3', 'Poznámky z údržby', 'Fotka vedení'],
      },
      result: { before: '1 člověk', after: 'celá dílna', unit: 'ví, jak na každý stroj', math: 'Dřív jeden mistr a fronta otázek. Teď odpověď v mobilu u stroje.' },
    },
  ],
  assurances: [
    { k: 'Rozhodujete vy', t: 'O důležitých věcech pořád rozhoduje člověk, ne systém.' },
    { k: 'Živá ukázka každý týden', t: 'Vidíte, jak to postupuje, ne až na konci.' },
    { k: 'Vaše lidi zaučíme', t: 'Nikdo se nemusí učit nový program. Napojíme se na to, co už znáte.' },
    { k: 'Cena před podpisem', t: 'Konkrétní číslo dostanete ještě předtím, než cokoli podepíšete.' },
  ],
  verify: { lead: 'Za webem stojí konkrétní člověk a firma, kterou si ověříte v rejstříku.', link: 'Ověřit v ARES' },
  cta: 'Chci zjistit, co by šlo líp',
} as const;

export const compare = {
  title: 'Jiné cesty to taky umí. Jen jinak.',
  columns: ['FaiN Studio', 'Jiná agentura', 'Hotový nástroj', 'Vlastní vývojář'],
  rows: [
    { label: 'Jak dlouho to trvá', values: ['Týdny', 'Měsíce', 'Dny', 'Měsíce'] },
    { label: 'Řeší právě váš proces', values: ['Ano', 'Ano', 'Ne', 'Ano'] },
    { label: 'Mluvíte přímo s těmi, kdo to staví', values: ['Ano', 'Ne', 'Ne', 'Ano'] },
    { label: 'Zaučení lidí v ceně', values: ['Ano', 'Někdy', 'Ne', 'Ne'] },
    { label: 'Cenu znáte po prvním hovoru', values: ['Ano', 'Ne', 'Ano', 'Někdy'] },
    { label: 'Platíte jednorázově', values: ['Ano', 'Ano', 'Ne, paušál navždy', 'Ano'] },
  ],
};

export const faq = [
  {
    q: 'Co je AI automatizace?',
    a: 'Systém, který za vás dělá opakovanou práci a přitom rozumí textu. Přečte e-mail, fakturu nebo poptávku, pochopí, co v ní je, a podle toho jedná. Běžná automatizace jen přesouvá data podle pevných pravidel. S umělou inteligencí zvládne i práci, ke které byl dřív potřeba člověk.',
  },
  {
    q: 'Pro koho to je? Nevíme, co by šlo zlepšit.',
    a: 'Pro malé a střední firmy, kde se pořád něco opakuje. Jsme AI agentura a spolupracovat můžeme osobně i na dálku. Obor nerozhoduje. Na rutinu si člověk zvykne a přestane si jí všímat, takže když nevíte, co by šlo zlepšit, je to normální. Na hovoru projdeme, jak ve firmě pracujete, a ukážeme, co by mohl převzít systém. Kdybychom nic nenašli, řekneme vám to.',
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
];

export const about = {
  name: 'Matyáš Plecháč',
  ico: '21019011',
  text: 'Stavíme automatizace, interní nástroje, sběr dat a weby. Od prvního hovoru až po předání se s vámi bavíme my, bez prostředníků.',
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
