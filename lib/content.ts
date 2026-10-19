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
      id: 'objednavky',
      hue: -38,
      kind: 'model',
      firm: 'Velkoobchod s nářadím',
      title: 'Objednávky z mailu potvrzené za pár minut.',
      problem: 'Objednávky chodily mailem, v PDF i jako fotka papíru. Obchodníci je dvakrát denně přepisovali do systému a zákazník čekal na potvrzení půl dne.',
      how: 'Systém každý mail přečte, vytáhne položky a množství, založí objednávku a zákazníkovi hned pošle potvrzení. Co nedává smysl, ukáže obchodníkovi.',
      why: 'Firma nemusela měnit systém ani zákazníky učit nový formulář. Objednávky chodí pořád stejně, jen je nikdo nepřepisuje.',
      visual: {
        type: 'timeline',
        start: '8:00',
        end: '16:00',
        rows: [
          { label: 'Dřív', in: 15, out: 70, inT: 'Mail 9:12', outT: 'Potvrzení 13:40' },
          { label: 'Teď', in: 15, out: 17, inT: 'Mail 9:12', outT: 'Potvrzení 9:17' },
        ],
      },
      result: { before: '4 h', after: '5 min', unit: 'na potvrzení objednávky', math: 'Dřív se objednávky zpracovávaly v dávkách dvakrát denně. Teď odpověď odchází hned, sporné kusy do hodiny.' },
    },
    {
      id: 'doklady',
      hue: 52,
      kind: 'model',
      firm: 'Účetní kancelář',
      title: 'Doklady se přepíšou samy. Sporné kontroluje člověk.',
      problem: 'Klienti posílali faktury, účtenky a výpisy, jak se jim to hodilo. Dvě účetní trávily každý týden hodiny přepisováním čísel z PDF.',
      how: 'Systém doklady přečte, roztřídí do složek a údaje přepíše do tabulky pro účetní program. Co si není jistý, zvýrazní a pošle ke kontrole.',
      why: 'Účetní nesou za čísla odpovědnost, takže poslední slovo musí mít ony. Systém dělá přepis, ony kontrolu.',
      visual: { type: 'dots', total: 150, human: 15, auto: 'Zvládl sám', toHuman: 'Ke kontrole' },
      result: { before: '10 h', after: '1,5 h', unit: 'týdně na doklady', math: '150 dokladů × 4 min = 10 h. Teď 15 sporných × 2 min a kontrola vzorku 1 h.' },
    },
    {
      id: 'zakazky',
      hue: 108,
      kind: 'model',
      firm: 'Stavební firma',
      title: 'Ze dvou tisíc zakázek denně jen ty tři, které stojí za to.',
      problem: 'Majitel každé ráno projížděl portály s veřejnými zakázkami. Trvalo to přes hodinu a dobré zakázky stejně občas utekly.',
      how: 'Systém ráno projde portály, vyfiltruje zakázky podle oboru, kraje, hodnoty a termínu a pošle krátký přehled. K nejlepší připraví koncept nabídky.',
      why: 'Rozhodnutí, do čeho jít, je obchodní a zůstává majiteli. Systém mu jen ušetří hledání a rozjede papíry.',
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
      result: { before: '7,5 h', after: '1 h', unit: 'týdně na hledání zakázek', math: '1,5 h denně × 5 dní. Teď 10 minut denně na přečtení tří návrhů.' },
    },
    {
      id: 'studio',
      hue: -88,
      kind: 'model',
      firm: 'Jógové studio',
      title: 'Rezervace bez večerů na telefonu.',
      problem: 'Lidé se hlásili přes zprávy na Instagramu a telefonem. Majitelka každý večer hodinu odpovídala, kdo kam může přijít a kolik je volných míst.',
      how: 'Nový web s rozvrhem a asistentem, který odpoví na dotazy, přihlásí na lekci a vezme platbu. Majitelce se rozvrh doplní sám.',
      why: 'Lidi se hlásí, když je to napadne, často pozdě večer. Web jim odpoví hned a majitelka už u toho být nemusí.',
      visual: { type: 'week', days: ['Po', 'Út', 'St', 'Čt', 'Pá', 'So', 'Ne'], beforeLabel: 'Večer na zprávách', afterLabel: 'Večer volno' },
      result: { before: '7 večerů', after: '0', unit: 'týdně u telefonu', math: 'Dřív hodina zpráv každý večer. Teď ráno jeden pohled na rozvrh.' },
    },
    {
      id: 'agentura',
      hue: 222,
      kind: 'model',
      firm: 'Marketingová agentura',
      title: 'Podepsaná zakázka se rozjede jedním tahem.',
      problem: 'Po každém podpisu následovalo sedm drobností: faktura, složka, úkoly, mail klientovi a další. Půl hodiny práce, a pokaždé se na něco zapomnělo.',
      how: 'V CRM stačí přesunout zakázku do sloupce Podepsáno. Faktura, projekt, úkoly pro tým i uvítací mail se založí samy.',
      why: 'Tým dál pracuje v CRM, které zná. Jen sedm ručních kroků nahradil jeden, který už dělal stejně.',
      visual: {
        type: 'chain',
        steps: ['Zálohová faktura', 'Složka projektu', 'Úkoly pro tým', 'Uvítací mail klientovi', 'Smlouva do archivu', 'Úvodní schůzka v kalendáři', 'Záznam v přehledu zakázek'],
      },
      result: { before: '7 kroků', after: '1 tah', unit: 'po každém podpisu', math: 'Dřív zhruba 30 minut ruční práce na zakázku. Teď jedno přetažení karty.' },
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
