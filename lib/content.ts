/**
 * Texty webu. Hlas a pravidla jsou v TONE-OF-VOICE.md — před úpravou si je přečti.
 * Žádné pevné ceny, termíny ani počty dní: každá zakázka je jiná, cena i termín se domlouvají
 * na prvním hovoru. Nepsat ani „nejsme agentura“.
 */

export const hero = {
  // první řádek nadpisu; druhý se píše a maže (components/HeroRotate.tsx)
  title: 'Umělá inteligence,',
  rotateLead: 'která',
  rotate: ['šetří čas', 'šetří peníze', 'usnadňuje práci', 'je FaiN'],
  titleSr: 'Umělá inteligence, která šetří čas, šetří peníze, usnadňuje práci a je FaiN.',
  lead: 'Skoro každá firma dělá něco, co by zvládl systém. Máte nápad? Postavíme ho. Nemáte? Projdeme to spolu.',
  primary: 'Chci zjistit, co by šlo líp',
  secondary: 'Co všechno umíme',
};

export const proof = {
  title: 'Co z toho budete mít',
  // čísla jsou z průzkumu Ipsos pro AMSP ČR (2026), žádné naše sliby: velké číslo je to, co firmy trápí, text říká, co s tím uděláme
  stats: [
    { value: '31 %', label: 'Úspora času', text: 'firem trápí administrativa a byrokracie. Práce, která dnes bere hodiny, se dělá sama a čas zbyde na lidi.' },
    { value: '51 %', label: 'Úspora peněz', text: 'firem trápí rostoucí náklady. Méně ruční práce znamená méně chyb a přesčasů. Kolik to ušetří u vás, spočítáme na prvním hovoru.' },
    { value: '50 %', label: 'Efektivita', text: 'firem čeká, že jim umělá inteligence zrychlí administrativu. Stejný tým pak zvládne víc a nic nezapadne mezi e-maily a tabulkami.' },
    { value: '26 %', label: 'Spolehlivost', text: 'firem se bojí chyb umělé inteligence. Proto o důležitých krocích rozhoduje člověk a systém po spuštění ladíme na vašich skutečných datech.' },
  ],
  source: 'Čísla: průzkum Ipsos pro AMSP ČR, 2026, 201 majitelů a jednatelů firem.',
  strip: {
    title: 'Zvyknete si hned',
    text: '31 % firem se bojí, že na to nemají znalosti. Nemusíte je mít. Systém se napojí na nástroje, které už používáte, a lidi, kteří s ním budou pracovat, zaučíme, takže se firma přizpůsobí hned.',
  },
};

export const systems = {
  title: 'Co vše zvládneme udělat',
  lead: 'Tohle je jen pár příkladů. Zvládneme i mnohem víc, fantazii se meze nekladou. Každé firmě uděláme přesně to, co potřebuje.',
  items: [
    {
      id: 'nastroje',
      name: 'CRM a interní nástroje',
      short: 'CRM',
      text: 'Klienti, obchody, schvalování a úkoly na jednom místě. Posunete zakázku o sloupec dál a faktura, projekt i úkoly pro tým se založí samy.',
      img: 'system-07-nastroje',
    },
    {
      id: 'procesy',
      name: 'Automatizace procesů',
      short: 'Procesy',
      text: 'Jedním klikem spustíte celý řetězec kroků napříč nástroji, které už používáte. Smlouvy, účty, objednávky i maily se rozjedou samy a vy vidíte, co je hotové.',
      img: 'system-06-procesy',
    },
    {
      id: 'poptavky',
      name: 'Zpracování poptávek',
      short: 'Poptávky',
      text: 'Zprávy z webu, mailu i sociálních sítí se sejdou na jednom místě. Každý zákazník dostane odpověď hned a termín si vybere sám. Nic nezapadne.',
      img: 'system-01-poptavky',
    },
    {
      id: 'dokumenty',
      name: 'Zpracování dokumentů',
      short: 'Dokumenty',
      text: 'Faktury, účtenky, smlouvy i výpisy si systém přečte a roztřídí. Údaje skončí v tabulce nebo v účetnictví. Přepisovat čísla z PDF už nikdo nemusí.',
      img: 'system-02-dokumenty',
    },
    {
      id: 'asistent',
      name: 'Asistent nad firemními daty',
      short: 'Asistent',
      text: 'Chat, který zná vaše dokumenty, postupy a interní systémy. Kolega se zeptá normální češtinou a dostane odpověď. Když je potřeba něco zařídit, asistent to rovnou zařídí.',
      img: 'system-03-asistent',
    },
    {
      id: 'data',
      name: 'Hlídání trhu a dat',
      short: 'Hlídání trhu',
      text: 'Systém každý den projde weby, portály a databáze, které vás zajímají. Z tisíců záznamů vám pošle jen těch pár, které má smysl řešit.',
      img: 'system-04-data',
    },
    {
      id: 'weby',
      name: 'Weby a rezervace',
      short: 'Weby',
      text: 'Web, na kterém se dá rovnou něco udělat: objednat, přihlásit se, domluvit termín. Vám to naskočí v systému, na počítači i v mobilu.',
      img: 'system-05-weby',
    },
  ],
};

// sekce „Proč AI“: krátký obecný explainer, žádné konkrétní případy
export const why = {
  title: 'Jak můžete být',
  accent: 'FaiN?',
  lead: 'Nemusíte jí rozumět. Stačí vědět, co pro vás udělá.',
  items: [
    { k: 'Proč', t: 'Firma toho zvládne víc.', d: 'Se stejnými lidmi uděláte víc práce, odpovídáte rychleji a rozhodujete s lepšími informacemi.' },
    { k: 'Kde', t: 'Napříč celou firmou.', d: 'Od administrativy přes procesy až po kreativu. Dokážeme digitalizovat jakoukoliv část vaší práce.' },
    { k: 'Jakou roli', t: 'Chytrý pomocník, ne šéf.', d: 'Čte, počítá, odpovídá, píše a navrhuje. Rozhodujete pořád vy.' },
  ],
};

export const process = {
  title: 'Čtyři kroky, žádná záhada',
  lead: 'Každý krok skončí něčím, co si můžete otevřít a vyzkoušet.',
  steps: [
    { name: 'Úvodní hovor', text: 'Nemusíte vědět, co chcete. Probereme, jak ve firmě pracujete, a společně vymyslíme, co by šlo líp. Cenu znáte hned po hovoru.' },
    { name: 'Návrh', text: 'Co systém udělá, co od vás potřebujeme a kdy bude hotovo. Pak podpis a zálohová faktura.' },
    { name: 'Stavíme po týdnech', text: 'Fungujeme agilně. Každý týden dostanete živou ukázku, vyzkoušíte si ji a řeknete, co změnit. Další týden to doladíme. Jsme s vámi v kontaktu celou dobu.' },
    { name: 'Zaučení a spuštění', text: 'Ukážeme to lidem, kteří s tím budou pracovat. Napojíme to na vaše nástroje a data a pustíme to do běžného provozu.' },
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
  cta: 'Chci to vidět u nás',
};

export const compare = {
  title: 'Jiné cesty to taky umí. Jen jinak.',
  note: 'Agentura, hotový nástroj i vlastní vývojář tu stojí jako druhy řešení. Nemyslíme tím nikoho konkrétního.',
  columns: ['FainStudio', 'Agentura', 'Hotový nástroj', 'Vlastní vývojář'],
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
    q: 'Nevíme, co by šlo zlepšit. Je to pro nás?',
    a: 'Ano. Na rutinu si člověk zvykne a přestane si jí všímat, takže je to normální. Na hovoru projdeme, jak ve firmě pracujete, a ukážeme, co by mohl převzít systém. Kdybychom nic nenašli, řekneme vám to.',
  },
  {
    q: 'Nahradí to někoho z našich lidí?',
    a: 'Ne. Odlehčí jim od práce, kterou stejně nikdo nedělá rád. Rozhodovat, vyjednávat a mluvit se zákazníkem budou dál oni.',
  },
  {
    q: 'Co když to nebude fungovat?',
    a: 'Po spuštění to dolaďujeme na vašich skutečných datech, dokud to nesedí. Doplatek posíláme až po předání.',
  },
  {
    q: 'Kolik to stojí?',
    a: 'Záleží na tom, co má systém dělat, takže cenu neříkáme od oka. Na prvním hovoru projdeme, co potřebujete, a konkrétní číslo dostanete ještě před podpisem.',
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
    q: 'Napojíte to na náš systém?',
    a: 'Na mail, web, tabulky a běžné cloudové nástroje ano. Starší podnikové systémy a stěhování dat ze starého softwaru neděláme, a řekneme vám to hned na prvním hovoru.',
  },
];

export const about = {
  name: 'Matyáš Plecháč',
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
  title: 'Jeden hovor a budete vědět, jestli to má smysl',
  text: 'Přijďte s nápadem, nebo bez něj. Projdeme, jak ve firmě pracujete, a spočítáme, kolik by vám změna ušetřila. A když to nedává smysl, dozvíte se to hned.',
  button: 'Chci to u nás',
  // tlačítko pod čísly
  priceButton: 'Chci úvodní hovor',
};
