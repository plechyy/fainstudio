/**
 * Texty webu. Hlas a pravidla jsou v TONE-OF-VOICE.md — před úpravou si je přečti.
 * Žádné pevné ceny, termíny ani počty dní: každá zakázka je jiná, cena i termín se domlouvají
 * na prvním hovoru. Nepsat ani „nejsme agentura“.
 */

export const hero = {
  // první řádek nadpisu; druhý se píše a maže (components/HeroRotate.tsx)
  title: 'Umělá inteligence,',
  rotateLead: 'která',
  rotate: ['maká za vás', 'nespí', 'šetří peníze', 'je FaiN'],
  titleSr: 'Umělá inteligence, která maká za vás, nespí, šetří peníze a je FaiN.',
  lead: 'Spoustu toho, co ve firmě děláte ručně, zvládne systém. My ho postavíme. Vy se mezitím věnujte tomu, co opravdu vydělává.',
  primary: 'Chci vidět, co umíte',
  secondary: 'Co všechno zvládneme',
};

export const proof = {
  title: 'Čísla, za kterými si stojíme',
  stats: [
    { value: 'až 90 %', label: 'Úspora času a peněz', text: 'Hodiny ruční práce převezme systém. Méně chyb, méně přesčasů a víc peněz na účtu. Kolik přesně u vás, spočítáme na prvním hovoru.' },
    { value: 'Ihned', label: 'Adaptace', text: 'Napojíme se na to, co už používáte, a lidi zaučíme. Žádné týdny zvykání, žádný nový program od nuly.' },
    { value: '100 %', label: 'Spolehlivost', text: 'Systém nezapomene, neonemocní a nemá blbý den. O důležitých věcech pořád rozhodujete vy.' },
    { value: '24/7', label: 'Nonstop provoz', text: 'Zatímco spíte, systém odpovídá, třídí a počítá. Ráno je hotovo.' },
  ],
  strip: {
    title: 'Efektivita',
    text: 'Stejný tým zvládne víc. Nikdo už nic nehledá v e-mailech a každý dělá práci, za kterou ho platíte.',
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
  lead: 'Nemusíte jí rozumět. To je naše práce.',
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
    { name: 'Návrh', text: 'Černé na bílém: co systém udělá, co od vás potřebujeme a kdy bude hotovo. Podpis, záloha a jedeme.' },
    { name: 'Stavíme po týdnech', text: 'Každý týden dostanete živou ukázku. Vyzkoušíte ji, řeknete, co jinak, a další týden to máte. Žádné čekání na velké odhalení.' },
    { name: 'Zaučení a spuštění', text: 'Vaše lidi to naučíme, napojíme to na vaše nástroje a pustíme do provozu. Od té chvíle to maká za vás.' },
  ],
};

export const beforeAfter = {
  title: 'Jak to vypadá dneska. A jak potom.',
  lead: 'Neměníme, co děláte. Měníme, kolik se u toho nadřete.',
  before: {
    label: 'Dneska',
    items: [
      { k: 'Informace', t: 'Rozházené po e-mailech, tabulkách a hlavách. Hodně štěstí při hledání.' },
      { k: 'Práce', t: 'Ručně, krok za krokem. Pořád dokola.' },
      { k: 'Rozhodování', t: 'Od oka, podle toho, co se stihlo dohledat.' },
      { k: 'Růst', t: 'Víc práce? Víc lidí. Víc nákladů.' },
    ],
  },
  after: {
    label: 'Potom',
    items: [
      { k: 'Informace', t: 'Na jednom místě. Vždycky aktuální.' },
      { k: 'Práce', t: 'Udělá ji systém. Lidé jen řídí a kontrolují.' },
      { k: 'Rozhodování', t: 'Podle čísel, která máte okamžitě po ruce.' },
      { k: 'Růst', t: 'Víc práce zvládne stejný tým. Bez náboru.' },
    ],
  },
  cta: 'Chci to taky',
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
    a: 'Přesně pro vás. Na rutinu si člověk zvykne a přestane ji vidět. My ji vidíme hned. A kdybychom nic nenašli, řekneme vám to na rovinu.',
  },
  {
    q: 'Nahradí to někoho z našich lidí?',
    a: 'Ne. Vezme jim práci, kterou stejně nikdo nedělá rád. Rozhodovat, vyjednávat a mluvit se zákazníky budou dál oni, jen na to konečně budou mít čas.',
  },
  {
    q: 'Co když to nebude fungovat?',
    a: 'Bude. Po spuštění to ladíme na vašich skutečných datech, dokud to nesedí, a doplatek posíláme až po předání. Riziko je na nás.',
  },
  {
    q: 'Kolik to stojí?',
    a: 'Míň, než vás stojí dělat to ručně. Přesné číslo dostanete po prvním hovoru, ještě před podpisem.',
  },
  {
    q: 'Jak dlouho to trvá?',
    a: 'Rychleji, než čekáte. Termín domluvíme na prvním hovoru a každý týden uvidíte živou ukázku, takže víte, že se to hýbe.',
  },
  {
    q: 'Musíme u sebe něco měnit?',
    a: 'Ne. Přizpůsobíme se my vám. Napojíme se na mail, web a nástroje, které už máte.',
  },
  {
    q: 'Napojíte to na náš systém?',
    a: 'Na mail, web, tabulky a běžné cloudové nástroje bez problému. Staré podnikové systémy a stěhování dat neděláme a řekneme vám to hned, ne až po podpisu.',
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
  title: 'Jeden hovor. Pak už nebudete chtít zpátky.',
  text: 'Přijďte s nápadem, nebo bez něj. Projdeme vaši firmu, ukážeme, co jde líp, a spočítáme, kolik vám to ušetří. A když to nedává smysl, řekneme vám to do očí.',
  button: 'Chci to u nás',
  // tlačítko pod čísly
  priceButton: 'Chci začít',
};
