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
 * Sekce „Případy“. Zatím jsou všechny tři MODELOVÉ: typická firma, typické objemy, výpočet ukázaný celý.
 * Nejsou to reference klientů a sekce to říká (štítek na kartě a poznámka pod ní).
 * Až bude skutečný případ s písemným souhlasem klienta, přepiš u něj kind na 'real': štítek zmizí,
 * a když už nezbude žádný modelový, zmizí i poznámka. Žádné pevné ceny ani termíny dodání;
 * hodiny jsou ušetřený čas z výpočtu, který je vidět pod každým případem.
 */
export const cases = {
  title: 'Čeho se bojíte?',
  accent: 'Ukážeme, jak to řešíme.',
  lead: 'Tři obavy, které má skoro každý, kdo o automatizaci uvažuje. U každé vidíte, co jsme postavili, co zůstalo na lidech a jak se pozná, že to funguje.',
  modelLabel: 'Modelový případ',
  note: 'Modelové případy: typická firma, typické objemy a výpočet, který vidíte celý. Skutečná čísla u vás spočítáme na prvním hovoru. Jména klientů zveřejníme jen s jejich souhlasem.',
  labels: { built: 'Co jsme postavili', human: 'Co zůstalo na lidech', before: 'Ručně', hours: 'týdně' },
  items: [
    {
      id: 'chyby',
      nav: 'Chyby',
      kind: 'model',
      firm: 'Účetní kancelář',
      fear: 'Co když si systém splete číslo?',
      built: 'Systém doklady přečte, roztřídí a přepíše do tabulky. Co si není jistý, zvýrazní a pošle člověku.',
      human: 'Sporné doklady schvaluje člověk a pravidelně se kontroluje vzorek těch hotových.',
      visual: { type: 'dots', total: 150, human: 15, auto: 'Zvládl sám', toHuman: 'Šlo k člověku' },
      result: {
        before: { value: '10 h', hours: 10 },
        after: { label: 'S kontrolou', value: '1,5 h', hours: 1.5 },
        math: ['150 dokladů týdně × 4 min ručně = 10 h', '15 sporných × 2 min + kontrola vzorku 1 h = 1,5 h'],
      },
    },
    {
      id: 'navratnost',
      nav: 'Návratnost',
      kind: 'model',
      firm: 'Stavební firma',
      fear: 'Zaplatíme to a nikdo to nebude používat.',
      built: 'Systém každé ráno projde portály s veřejnými zakázkami a pošle jen ty, které firma zvládne. K nejlepší rovnou připraví koncept nabídky.',
      human: 'Firma rozhoduje, kterou zakázku vezme. Co má systém umět, je v návrhu napsané předem, takže se dá změřit.',
      visual: {
        type: 'funnel',
        steps: [
          { label: 'Nových zakázek', n: '2 341', w: 100 },
          { label: 'Váš obor', n: '186', w: 67 },
          { label: 'Váš kraj', n: '41', w: 48 },
          { label: 'Hodnota, kterou zvládnete', n: '9', w: 28 },
          { label: 'Termín, který stihnete', n: '3', w: 14 },
        ],
      },
      result: {
        before: { value: '7,5 h', hours: 7.5 },
        after: { label: 'Čtení návrhů', value: '1 h', hours: 1 },
        math: ['1,5 h denně procházení portálů × 5 dní = 7,5 h', '10 min denně na přečtení tří návrhů = asi 1 h'],
      },
    },
    {
      id: 'data',
      nav: 'Data',
      kind: 'model',
      firm: 'Zubní klinika',
      fear: 'Naše data nikam nepatří.',
      built: 'Interní asistent odpovídá jen z dokumentů kliniky: dovolená, rozpis směn, postupy. Běží lokálně u vás.',
      human: 'Žádost o volno schválí vedoucí. Když asistent odpověď nezná, řekne to a předá dotaz člověku.',
      visual: {
        type: 'perimeter',
        inside: 'U vás',
        chips: ['Dokumenty kliniky', 'Asistent', 'Jen určení lidé'],
        outside: 'Cizí cloud',
        outsideNote: 'Do AI modelů jde jen to, co se předem domluví.',
      },
      result: {
        before: { value: '3 h', hours: 3 },
        after: { label: 'Schvalování', value: '20 min', hours: 0.33 },
        math: ['30 dotazů týdně × 6 min vyřizování = 3 h', '30 schválení jedním klikem × 40 s = 20 min'],
      },
    },
  ],
  assurances: [
    { k: 'Rozhodujete vy', t: 'O důležitých věcech pořád rozhoduje člověk, ne systém.' },
    { k: 'Data zůstávají vaše', t: 'Před začátkem podepíšeme NDA a smlouvu o zpracování osobních údajů.' },
    { k: 'Živá ukázka každý týden', t: 'Vidíte, jak to postupuje, ne až na konci.' },
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
