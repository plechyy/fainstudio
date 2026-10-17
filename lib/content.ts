/**
 * Texty webu. Hlas a pravidla jsou v TONE-OF-VOICE.md — před úpravou si je přečti.
 * Čísla (10 dní, 14 dní, od 18 000 Kč, 28–45 tisíc, 0 Kč paušál, týž den) jsou z briefu:
 * nic nepřidávat ani nezaokrouhlovat.
 */

export const hero = {
  eyebrow: 'Malé studio. Hotovo do 10 dní.',
  title: ['Co dnes děláte rukama,', 'za vás zvládne systém.'],
  lead: 'Řekněte nám, co vás zdržuje nejvíc. My to postavíme, připojíme k nástrojům, které už máte, a ukážeme vašim lidem, jak s tím pracovat. Všechno do deseti dní.',
  primary: 'Chci znát cenu',
  secondary: 'Co všechno umíme',
};

export const facts = [
  { value: '10 dní', label: 'Od podpisu do spuštění', text: 'Pokud to nestihneme, uslyšíte to od nás ještě před podpisem.' },
  { value: 'od 18 000 Kč', label: 'Nejmenší projekt, bez DPH', text: 'Ty větší stojí 28 až 45 tisíc. Přesné číslo znáte po prvním hovoru.' },
  { value: 'Bez agentury', label: 'Mluvíte přímo s tím, kdo to staví', text: 'Nejsme agentura, takže vám nikdo nepředává zadání z ruky do ruky.' },
  { value: 'Týž den', label: 'Odpověď na mail nebo telefon', text: 'Napište nebo zavolejte. Ozveme se ještě ten samý den.' },
];

export const proof = {
  title: 'Cena i termín, černé na bílém',
  stats: [
    { value: '10 dní', label: 'Od podpisu do spuštění', text: 'Pokud to nestihneme, uslyšíte to od nás ještě před podpisem.' },
    { value: '14 dní', label: 'Ladění bez příplatku', text: 'Po spuštění to dva týdny dolaďujeme na vašich skutečných datech. Nic za to neúčtujeme.' },
    { value: 'od 18 000 Kč', label: 'Nejmenší projekt, bez DPH', text: 'Ty větší stojí 28 až 45 tisíc. Přesné číslo znáte po prvním hovoru, ne po týdnech auditu.' },
    { value: '0 Kč', label: 'Měsíční paušál', text: 'Platíte jednou. Doplatek posíláme až poté, co vám to předáme.' },
  ],
  strip: {
    title: 'Přímá linka',
    text: 'Nejsme agentura, takže vám nikdo nepředává zadání z ruky do ruky. Napíšete nebo zavoláte a ještě týž den se ozveme.',
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

export const process = {
  title: 'Čtyři kroky, žádná záhada',
  lead: 'Každý krok skončí něčím, co si můžete otevřít a vyzkoušet.',
  steps: [
    { name: 'Hovor na 20 minut', text: 'Řekněte nám, co vás stojí nejvíc času. Na konci hovoru znáte cenu i termín.' },
    { name: 'Návrh na jedné stránce', text: 'Co systém udělá, co od vás potřebujeme a kdy bude hotovo. Pak podpis a zálohová faktura.' },
    { name: 'Spuštění do 10 dní', text: 'Napojíme to na vaše nástroje a data a pustíme to do běžného provozu.' },
    { name: 'Zaučení a doladění', text: 'Ukážeme to lidem, kteří s tím budou pracovat. Prvních 14 dní to dolaďujeme na vašich datech, bez příplatku.' },
  ],
};

export const beforeAfter = {
  title: 'Jak to vypadá dneska. A jak potom.',
  lead: 'Vlevo běžný den, jak ho znáte. Vpravo stejná práce poté, co rutinu převezme systém.',
  before: {
    label: 'Dneska',
    items: [
      'Poptávky a dotazy vyřizujete po jednom, ručně.',
      'Čísla z faktur a objednávek přepisujete do tabulek sami.',
      'Zákazník na odpověď čeká hodiny, občas až do druhého dne.',
    ],
  },
  after: {
    label: 'Potom',
    items: [
      'Rutinu odbaví systém. Vám zbyde to, k čemu je potřeba lidská hlava.',
      'Faktura dorazí a její údaje už na vás čekají v tabulce.',
      'Zákazník má odpověď do dvou minut, i o půlnoci.',
    ],
  },
  cta: 'Chci to bez rutiny',
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
    q: 'Nahradí to někoho z našich lidí?',
    a: 'Ne. Odlehčí jim od práce, kterou stejně nikdo nedělá rád. Rozhodovat, vyjednávat a mluvit se zákazníkem budou dál oni.',
  },
  {
    q: 'Co když to nebude fungovat?',
    a: 'Prvních 14 dní po spuštění to dolaďujeme na vašich skutečných datech a nic za to neúčtujeme. Doplatek posíláme až po předání.',
  },
  {
    q: 'Kolik to stojí?',
    a: 'Od 18 000 Kč bez DPH, větší projekty vyjdou na 28 až 45 tisíc. Přesnou cenu znáte po prvním hovoru, ne po týdnech auditu.',
  },
  {
    q: 'Jak dlouho to trvá?',
    a: 'Do deseti dní od podpisu. Kdybychom věděli, že to nestihneme, řekneme to dřív, než cokoli podepíšete.',
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
  text: 'Nejsme agentura, jsme malé studio z Prahy. Stavíme automatizace, interní nástroje, sběr dat a weby. Když napíšete, odpoví vám ten, kdo to pak bude dělat.',
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
  text: 'Řekněte nám, co vás zdržuje nejvíc. My spočítáme, kolik by vám změna ušetřila. A když to nedává smysl, dozvíte se to hned.',
  button: 'Chci to u nás',
  // tlačítko pod čísly
  priceButton: 'Chci hovor na 20 minut',
};
