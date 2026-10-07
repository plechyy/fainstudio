/**
 * Texty webu. Jsou odladěné na to, co návštěvník slyšel v telefonu —
 * neměnit bez důvodu (viz BRIEF-WEB.md, sekce 4).
 */

export const hero = {
  eyebrow: 'Digitalizace a automatizace procesů',
  title: 'Postavím vám systém, který dělá tu práci, co u vás dneska dělá někdo rukou.',
  lead: 'Navrhnu to, postavím, pustím do provozu a zaučím lidi, kteří v tom budou dělat.',
  primary: 'Rezervovat 20 minut',
  secondary: 'Co stavím',
};

export const facts = [
  { value: '10 dní', label: 'Od podpisu do provozu' },
  { value: 'od 18\u00a0000\u00a0Kč', label: 'Nejmenší projekt, bez DPH' },
  { value: '1 člověk', label: 'Mluvíte přímo s tím, kdo to staví' },
  { value: 'Týž den', label: 'Odpověď na mail nebo telefon' },
];

export const systems = {
  title: 'Šest věcí, které stavím',
  lead: 'Každá řeší jeden konkrétní proces. Nemíchá se to a nedělá se to všechno najednou.',
  items: [
    {
      id: 'poptavky',
      name: 'Zpracování poptávek',
      short: 'Poptávky',
      text: 'Poptávka přijde, zákazník má do dvou minut odpověď a vám naskočí přehled. Nic nezůstane pod stolem. U poptávek rozhoduje, kdo se ozve první.',
      img: 'system-01-poptavky',
    },
    {
      id: 'dokumenty',
      name: 'Zpracování dokumentů',
      short: 'Dokumenty',
      text: 'Faktury, objednávky a smlouvy přečte a roztřídí systém. Data padají rovnou do tabulky nebo do nástrojů, které už používáte. Konec ručnímu přepisování.',
      img: 'system-02-dokumenty',
    },
    {
      id: 'asistent',
      name: 'Asistent nad firemními daty',
      short: 'Asistent',
      text: 'Chat nad vašimi dokumenty, ceníky a postupy. Lidi se zeptají česky a odpověď mají hned, bez hledání ve složkách.',
      img: 'system-03-asistent',
    },
    {
      id: 'data',
      name: 'Sběr dat a monitoring',
      short: 'Sběr dat',
      text: 'Sbírám veřejná data o cenách, konkurenci a trhu a hlídám, co se změnilo. Dostanete to v jednom přehledu, ne v tisíci mailů.',
      img: 'system-04-data',
    },
    {
      id: 'weby',
      name: 'Weby a vstupní stránky',
      short: 'Weby',
      text: 'Jednostránkový web, který má jeden úkol a dá se změřit. Žádný systém na správu obsahu, který nikdo nepoužije.',
      img: 'system-05-weby',
    },
    {
      id: 'video',
      name: 'AI video a animace',
      short: 'AI video',
      text: 'Reklamní spoty, produktové animace a vizuály. Dny místo týdnů a za zlomek ceny klasické produkce.',
      img: 'system-06-video',
    },
  ],
};

export const process = {
  title: 'Jak to probíhá',
  lead: 'Čtyři kroky. Výstupem každého je něco, co existuje, ne prezentace.',
  steps: [
    { name: 'Hovor, 20 minut', text: 'Projdeme proces, který vás stojí nejvíc času. Na konci máte cenu a termín.' },
    { name: 'Návrh na jednu stránku', text: 'Co systém udělá, co od vás potřebuju a kdy to bude. Podpis a zálohová faktura.' },
    { name: 'Nasazení do 10 dní', text: 'Napojím to na nástroje a data, která už máte, a pustím do provozu.' },
    { name: 'Zaučení a ladění', text: 'Projdu to s lidmi, kteří v tom budou dělat. Prvních 14 dní ladím na vašich datech v ceně.' },
  ],
};

export const beforeAfter = {
  title: 'Jak to vypadá dneska a jak potom',
  before: {
    label: 'Bez systému',
    items: [
      'Poptávky a dotazy řešíte ručně, jeden po druhém.',
      'Data z faktur a objednávek přepisujete rukou.',
      'Odpověď zákazníkovi trvá hodiny, někdy do druhého dne.',
    ],
  },
  after: {
    label: 'Se systémem',
    items: [
      'Rutinu vyřídí systém, vy řešíte jen výjimky a to, na čem záleží.',
      'Dokumenty se čtou samy, data padají tam, kam patří.',
      'Zákazník má odpověď do dvou minut, kdykoli během dne i v noci.',
    ],
  },
  cta: 'Chci to u nás',
};

export const compare = {
  title: 'Čím se to liší od ostatních cest',
  note: 'Agentura, hotový nástroj a vlastní vývojář jsou obecné kategorie, ne konkrétní firmy.',
  columns: ['FainStudio', 'Agentura', 'Hotový nástroj', 'Vlastní vývojář'],
  rows: [
    { label: 'Čas do provozu', values: ['Do 10 dní', 'Měsíce', 'Dny', 'Měsíce'] },
    { label: 'Postavené na váš proces', values: ['Ano', 'Ano', 'Ne', 'Ano'] },
    { label: 'Mluvíte s tím, kdo to staví', values: ['Ano', 'Ne', 'Ne', 'Ano'] },
    { label: 'Zaučení týmu v ceně', values: ['Ano', 'Někdy', 'Ne', 'Ne'] },
    { label: 'Cenu znáte po prvním hovoru', values: ['Ano', 'Ne', 'Ano', 'Někdy'] },
    { label: 'Platíte jednorázově', values: ['Ano', 'Ano', 'Ne, paušál navždy', 'Ano'] },
  ],
};

export const faq = [
  {
    q: 'Nahradí to někoho z našich lidí?',
    a: 'Ne. Přebírá rutinu, na kterou nikdo nemá čas. Rozhodování, cenu a jednání se zákazníkem dělá dál člověk.',
  },
  {
    q: 'Co když to nebude fungovat?',
    a: 'Prvních 14 dní po nasazení to ladím na vašich skutečných datech a je to v ceně. Doplatek platíte po předání, ne dopředu.',
  },
  {
    q: 'Kolik to stojí?',
    a: 'Od 18 000 Kč bez DPH, větší projekty mezi 28 a 45 tisíci. Konkrétní číslo dostanete na prvním hovoru, ne po třítýdenním auditu.',
  },
  {
    q: 'Jak dlouho to trvá?',
    a: 'Do deseti dní od podpisu. Když to z nějakého důvodu nejde, řeknu to dřív, než se cokoli podepíše.',
  },
  {
    q: 'Musíme u sebe něco měnit?',
    a: 'Ne. Napojuje se to na mail, web a nástroje, které už používáte. Nikdo se nemusí učit nový program.',
  },
  {
    q: 'Napojíte to na náš systém?',
    a: 'Na mail, web, tabulky a běžné cloudové nástroje ano. Starší podnikové systémy a migrace dat ze starého softwaru neberu a řeknu to hned na hovoru.',
  },
];

export const about = {
  name: 'Matyáš Plecháč',
  text: 'FainStudio je jeden člověk, ne agentura. Stavím automatizace, interní nástroje, sběr dat a AI video. Pracuju sám, takže mluvíte přímo s tím, kdo to dělá, a odpověď dostanete týž den.',
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
  title: 'Dvacet minut a budete vědět, jestli to má smysl',
  text: 'Projdeme proces, který vás stojí nejvíc času, a spočítáme, co by vám změna přinesla. Když to pro vás nemá smysl, řeknu vám to taky.',
  button: 'Rezervovat termín',
};
