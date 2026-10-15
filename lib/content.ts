/**
 * Texty webu. Jsou odladěné na to, co návštěvník slyšel v telefonu —
 * neměnit bez důvodu (viz BRIEF-WEB.md, sekce 4).
 */

export const hero = {
  eyebrow: 'Systémy na míru. Bez agentury.',
  title: 'Postavíme vám systém, který dělá tu práci, co u vás dneska dělá někdo rukou.',
  lead: 'Navrhneme to, postavíme, spustíme a zaučíme vaše lidi. Na konci vám něco běží, žádné PDF.',
  primary: 'Chci to u nás',
  secondary: 'Co stavíme',
};

/*
 * Proof sekce. Čísla jsou výhradně z briefu (BRIEF-WEB.md, 4.2 + FAQ) — nic nepřidávat
 * ani nezaokrouhlovat. Popisky pod čísly přebírají formulace z FAQ.
 */
export const facts = [
  { value: '10 dní', label: 'Od podpisu do provozu', text: 'Když to nejde, řekneme to dřív, než cokoli podepíšete.' },
  { value: 'od 18\u00a0000\u00a0Kč', label: 'Nejmenší projekt, bez DPH', text: 'Větší jsou mezi 28 a 45 tisíci. Cenu znáte po prvním hovoru.' },
  { value: 'Bez agentury', label: 'Mluvíte přímo s tím, kdo to staví', text: 'FainStudio není agentura. Staví to ten, s kým mluvíte.' },
  { value: 'Týž den', label: 'Odpověď na mail nebo telefon', text: 'Napište nebo zavolejte, ozveme se ten samý den.' },
];

/*
 * Proof / Čísla. Všechno je z briefu (FAQ, srovnání, o mně) — jen přeformulované do
 * čísel. Žádné vymyšlené počty klientů ani procenta. Až budou ověřená čísla z praxe,
 * stačí upravit tohle pole.
 */
export const proof = {
  title: 'Čísla, ne sliby',
  stats: [
    { value: '10 dní', label: 'Od podpisu do provozu', text: 'Když to nejde, řekneme to dřív, než cokoli podepíšete.' },
    { value: '14 dní', label: 'Ladění v ceně', text: 'Prvních 14 dní to ladíme na vašich skutečných datech. Je to v ceně.' },
    { value: 'od 18\u00a0000\u00a0Kč', label: 'Nejmenší projekt, bez DPH', text: 'Větší jsou mezi 28 a 45 tisíci. Cenu znáte po prvním hovoru.' },
    { value: '0\u00a0Kč', label: 'Měsíční paušál', text: 'Platíte jednorázově. Doplatek až po předání, ne dopředu.' },
  ],
  strip: {
    title: 'Bez prostředníků',
    text: 'FainStudio není agentura. Mluvíte s tím, kdo to staví, a odpověď na mail nebo telefon máte týž den.',
  },
};

export const systems = {
  title: 'Šest věcí, které stavíme',
  lead: 'Každá řeší jeden proces. Nemícháme to a nestavíme všechno naráz.',
  items: [
    {
      id: 'poptavky',
      name: 'Zpracování poptávek',
      short: 'Poptávky',
      text: 'Poptávka přijde, zákazník má do dvou minut odpověď a vám naskočí přehled. Nic nezůstane pod stolem. U poptávek vyhrává ten, kdo se ozve první.',
      img: 'system-01-poptavky',
    },
    {
      id: 'dokumenty',
      name: 'Zpracování dokumentů',
      short: 'Dokumenty',
      text: 'Faktury, objednávky a smlouvy čte a třídí systém. Data padají rovnou do tabulky nebo do nástrojů, které už máte. Ručnímu přepisování odzvonilo.',
      img: 'system-02-dokumenty',
    },
    {
      id: 'asistent',
      name: 'Asistent nad firemními daty',
      short: 'Asistent',
      text: 'Chat nad vašimi dokumenty, ceníky a postupy. Lidi se zeptají česky a odpověď mají hned. Žádné hledání ve složkách.',
      img: 'system-03-asistent',
    },
    {
      id: 'data',
      name: 'Sběr dat a monitoring',
      short: 'Sběr dat',
      text: 'Sbíráme veřejná data o cenách, konkurenci a trhu a hlídáme, co se změnilo. Dostanete jeden přehled, ne tisíc mailů.',
      img: 'system-04-data',
    },
    {
      id: 'weby',
      name: 'Weby a vstupní stránky',
      short: 'Weby',
      text: 'Jednostránkový web s jedním úkolem, který se dá změřit. Žádný redakční systém, který stejně nikdo nepoužije.',
      img: 'system-05-weby',
    },
    {
      id: 'video',
      name: 'AI video a animace',
      short: 'AI video',
      text: 'Reklamní spoty, produktové animace a vizuály. Za dny, ne za týdny, a za zlomek ceny klasické produkce.',
      img: 'system-06-video',
    },
  ],
};

export const process = {
  title: 'Jak to probíhá',
  lead: 'Čtyři kroky. Každý skončí něčím, co existuje, ne prezentací.',
  steps: [
    { name: 'Hovor, 20 minut', text: 'Projdeme proces, který vás stojí nejvíc času. Na konci znáte cenu a termín.' },
    { name: 'Návrh na jednu stránku', text: 'Co systém udělá, co potřebujeme od vás a kdy to bude. Pak podpis a zálohová faktura.' },
    { name: 'Nasazení do 10 dní', text: 'Napojíme to na nástroje a data, která už máte, a pustíme to do ostrého provozu.' },
    { name: 'Zaučení a ladění', text: 'Projdeme to s lidmi, kteří s tím budou pracovat. Prvních 14 dní ladíme na vašich datech, v ceně.' },
  ],
};

export const beforeAfter = {
  title: 'Jak to vypadá dneska. A jak potom.',
  // podtitulek doplněný k návrhu sekce (v briefu není)
  lead: 'Vlevo obyčejný den bez systému. Vpravo tatáž práce, když rutinu převezme systém.',
  before: {
    label: 'Bez systému',
    items: [
      'Poptávky a dotazy řešíte ručně, jeden po druhém.',
      'Data z faktur a objednávek přepisujete rukou.',
      'Zákazník čeká na odpověď hodiny, někdy do druhého dne.',
    ],
  },
  after: {
    label: 'Se systémem',
    items: [
      'Rutinu vyřídí systém. Vy řešíte jen výjimky a to, na čem záleží.',
      'Dokumenty se čtou samy, data končí tam, kam patří.',
      'Zákazník má odpověď do dvou minut, ve dne i v noci.',
    ],
  },
  cta: 'Chci to u nás',
};

export const compare = {
  title: 'Jiné cesty to taky umí. Jen jinak.',
  note: 'Agentura, hotový nástroj a vlastní vývojář jsou obecné kategorie, ne konkrétní firmy.',
  columns: ['FainStudio', 'Agentura', 'Hotový nástroj', 'Vlastní vývojář'],
  rows: [
    { label: 'Čas do provozu', values: ['Týdny', 'Měsíce', 'Dny', 'Měsíce'] },
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
    a: 'Ne. Systém přebírá rutinu, na kterou nikdo nemá čas. Rozhodovat, domlouvat cenu a jednat se zákazníkem budou dál lidi.',
  },
  {
    q: 'Co když to nebude fungovat?',
    a: 'Prvních 14 dní po spuštění to ladíme na vašich skutečných datech, v ceně. Doplatek platíte až po předání, ne dopředu.',
  },
  {
    q: 'Kolik to stojí?',
    a: 'Od 18 000 Kč bez DPH, větší projekty mezi 28 a 45 tisíci. Konkrétní číslo znáte po prvním hovoru, ne po třítýdenním auditu.',
  },
  {
    q: 'Jak dlouho to trvá?',
    a: 'Do deseti dní od podpisu. A když to nejde, řekneme to dřív, než cokoli podepíšete.',
  },
  {
    q: 'Musíme u sebe něco měnit?',
    a: 'Ne. Napojíme to na mail, web a nástroje, které už používáte. Nikdo se nemusí učit nový program.',
  },
  {
    q: 'Napojíte to na náš systém?',
    a: 'Na mail, web, tabulky a běžné cloudové nástroje ano. Starší podnikové systémy a migrace dat ze starého softwaru nebereme, a řekneme vám to hned na hovoru.',
  },
];

export const about = {
  name: 'Matyáš Plecháč',
  text: 'FainStudio není agentura. Stavíme automatizace, interní nástroje, sběr dat a AI video. Mluvíte s tím, kdo to dělá, a odpověď máte týž den.',
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
  text: 'Projdeme proces, který vás stojí nejvíc času, a spočítáme, co by vám změna přinesla. Když to nedává smysl, řekneme vám to taky.',
  button: 'Chci to u nás',
};
