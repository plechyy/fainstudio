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
    { value: '100 %', label: 'Spolehlivost', text: 'Systém nezapomene, neonemocní a nemá blbý den. O důležitých věcech pořád rozhodujete vy.' },
    { value: '24/7', label: 'Nonstop provoz', text: 'Zatímco spíte, systém odpovídá, třídí a počítá. Ráno je hotovo.' },
  ],
  strip: {
    title: 'Efektivita',
    text: 'Stejný tým zvládne víc. Nic nezapadne mezi e-maily a tabulkami a lidé se věnují práci, ke které je potřeba hlava.',
  },
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
      name: 'Weby a rezervace',
      short: 'Weby',
      text: 'Web, na kterém se dá rovnou něco udělat: objednat, přihlásit se, domluvit termín. Vám to naskočí v systému, na počítači i v mobilu.',
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
    { name: 'Úvodní hovor', text: 'Nemusíte vědět, co chcete. To zjistíme spolu. Z hovoru odcházíte s tím, co vám systém přinese a kolik bude stát.' },
    { name: 'Návrh', text: 'Černé na bílém: co systém udělá, co od vás potřebujeme, kdy bude hotovo a kolik to bude stát. Podpis, záloha a jedeme.' },
    { name: 'Stavíme po týdnech', text: 'Každý týden dostanete živou ukázku. Vyzkoušíte ji, řeknete, co jinak, a další týden to máte. Žádné čekání na velké odhalení.' },
    { name: 'Zaučení a spuštění', text: 'Vaše lidi to naučíme, napojíme to na vaše nástroje a pustíme do provozu. Od té chvíle to maká za vás.' },
  ],
};

export const beforeAfter = {
  title: 'Jak to vypadá dneska. A jak potom.',
  lead: 'Neměníme, co vaše firma dělá. Měníme to, kolik z toho musí dělat lidé ručně.',
  before: {
    label: 'Dneska',
    items: [
      { k: 'Informace', t: 'Rozházené po e-mailech, tabulkách a hlavách lidí.' },
      { k: 'Práce', t: 'Dělají ji lidé ručně, krok za krokem.' },
      { k: 'Rozhodování', t: 'Podle toho, co se zrovna stihlo dohledat.' },
      { k: 'Růst', t: 'Víc práce znamená víc lidí.' },
    ],
  },
  after: {
    label: 'Potom',
    items: [
      { k: 'Informace', t: 'Na jednom místě a pořád aktuální.' },
      { k: 'Práce', t: 'Udělá ji systém. Lidé ji řídí a kontrolují.' },
      { k: 'Rozhodování', t: 'Podle čísel, která máte po ruce.' },
      { k: 'Růst', t: 'Víc práce zvládne i stejný tým.' },
    ],
  },
  cta: 'Chci to u nás',
};

export const compare = {
  title: 'Jiné cesty to taky umí. Jen jinak.',
  note: 'Jiná agentura, hotový nástroj i vlastní vývojář tu stojí jako druhy řešení. Nemyslíme tím nikoho konkrétního.',
  columns: ['FaiN Studio', 'Jiná agentura', 'Hotový nástroj', 'Vlastní vývojář'],
  rows: [
    { label: 'Jak dlouho to trvá', values: ['Týdny', 'Měsíce', 'Dny', 'Měsíce'] },
    { label: 'Řeší právě váš proces', values: ['Ano', 'Ano', 'Ne', 'Ano'] },
    { label: 'Mluvíte s tím, kdo to staví', values: ['Ano', 'Ne', 'Ne', 'Ano'] },
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
    q: 'Pro koho to děláte?',
    a: 'Pro malé a střední firmy, které chtějí zapojit umělou inteligenci do běžné práce. Jsme AI agentura z Prahy a spolupracovat můžeme osobně i na dálku. Obor nerozhoduje. Rozhoduje, kolik práce se u vás pořád opakuje.',
  },
  {
    q: 'Nevíme, co by šlo zlepšit. Je to pro nás?',
    a: 'Ano. Na rutinu si člověk zvykne a přestane si jí všímat, takže je to normální. Na hovoru projdeme, jak ve firmě pracujete, a ukážeme, co by mohl převzít systém. Kdybychom nic nenašli, řekneme vám to.',
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
    q: 'Musíme u sebe něco měnit?',
    a: 'Ne. Napojíme se na mail, web a nástroje, které už máte. Nikdo se nemusí učit nový program.',
  },
  {
    q: 'Kde jsou naše data a jsou v bezpečí?',
    a: 'Data zůstávají vaše. Systém může běžet v cloudu, nebo lokálně u vás, podle toho, co vám víc vyhovuje. Přístup k datům mají jen lidé, které určíte. Před začátkem podepíšeme NDA a smlouvu o zpracování osobních údajů a předem se domluvíme, jaká data smí do AI modelů a jaká ne.',
  },
  {
    q: 'Napojíte to na náš systém?',
    a: 'Na mail, web, tabulky a běžné cloudové nástroje ano. Starší podnikové systémy a stěhování dat ze starého softwaru neděláme, a řekneme vám to hned na prvním hovoru.',
  },
];

export const about = {
  name: 'Matyáš Plecháč',
  ico: '21019011',
  text: 'Jsme malé studio z Prahy. Stavíme automatizace, interní nástroje, sběr dat a weby. Když napíšete, odpoví vám ten, kdo to pak bude dělat.',
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
