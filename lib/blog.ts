/*
 * Sekce „Proč AI“ a blog. Krátké texty, které majiteli firmy vysvětlí, co AI ve firmě
 * dělá, co ne a proč se jí nemusí bát. Tón jako zbytek webu: „my“, vykání, krátké věty,
 * žádné buzzwordy, žádné strašení, žádná vymyšlená čísla.
 * Články se otevírají v panelu nad stránkou (?clanek=slug) a mají i vlastní stránku /blog/slug.
 */

export type Block =
  | { t: 'p'; text: string }
  | { t: 'h'; text: string }
  | { t: 'list'; items: string[] };

export type Article = {
  slug: string;
  cat: string;
  title: string;
  teaser: string;
  min: number;
  body: Block[];
  /** jedna věta na konec: co si z článku odnést */
  sum: string;
};

export const why = {
  index: '03',
  name: 'Proč AI',
  titleA: 'AI ve firmě',
  titleB: 'bez mlhy a bez strašení.',
  lead: 'O umělé inteligenci se mluví buď jako o zázraku, nebo jako o hrozbě. Ve firmě je to hlavně nástroj, který umí číst, třídit a psát. Sepsali jsme pár krátkých textů, ať víte, co od ní čekat a co ne.',
  example: {
    label: 'Jak to vypadá v praxi',
    text: 'Přijde e-mail s objednávkou. AI ho přečte a pochopí, co zákazník chce. Zápis do tabulky a odpověď už obstará obyčejná automatika. A když si AI není jistá, nechá to na člověku.',
  },
  principles: [
    { b: 'AI jen tam, kde se vyplatí.', t: 'Kde stačí obyčejné pravidlo, dáme pravidlo. Je levnější a spolehlivější.' },
    { b: 'Poslední slovo máte vy.', t: 'Co je důležité nebo nevratné, systém připraví a člověk potvrdí.' },
    { b: 'Systém vidí jen to, co potřebuje.', t: 'Žádné přístupy navíc, všechno dohledatelné.' },
  ],
  more: 'Do hloubky',
  read: 'Číst',
};

export const articles: Article[] = [
  {
    slug: 'co-ai-ve-firme-dela',
    cat: 'Základy',
    title: 'Co AI ve firmě opravdu dělá',
    teaser: 'Nečekejte robota ani chytrého společníka. Čekejte nástroj, který čte, třídí a píše rychleji než člověk.',
    min: 3,
    body: [
      { t: 'p', text: 'Když se řekne AI, většina lidí si představí chat, se kterým se dá povídat. Ve firmě ji ale většinou ani nevidíte. Sedí uvnitř systému a dělá jednu konkrétní práci.' },
      { t: 'h', text: 'Tři věci, které umí dobře' },
      {
        t: 'list',
        items: [
          'Číst a chápat. E-maily, faktury, smlouvy, fotky účtenek. Pozná, co je v nich důležité, i když každý vypadá jinak.',
          'Třídit a rozhodovat jednoduché věci. Kam dokument patří, jestli dotaz spěchá, komu ho předat.',
          'Psát návrhy. Odpověď zákazníkovi, shrnutí schůzky, popis produktu. Člověk je pak jen zkontroluje.',
        ],
      },
      { t: 'h', text: 'A všechno ostatní?' },
      { t: 'p', text: 'Zbytek je obyčejná automatizace. Přesunout údaje z mailu do tabulky, poslat upozornění, založit úkol. To programy zvládaly i dřív. Nové je, že teď umí zpracovat i věci, které nemají pevný tvar. Na ty dřív musel člověk.' },
      { t: 'h', text: 'Co neumí' },
      { t: 'p', text: 'Nezná vaši firmu, dokud jí ji neukážeme. Nerozhoduje za vás tam, kde jde o peníze nebo o vztahy. A občas se splete, takže ji stavíme tak, aby to nevadilo. O tom je samostatný text.' },
    ],
    sum: 'AI ve firmě je rychlý čtenář a písař uvnitř systému. Ne kouzlo a ne náhrada lidí.',
  },
  {
    slug: 'vezme-to-nekomu-praci',
    cat: 'Lidé',
    title: 'Vezme to někomu práci?',
    teaser: 'Krátce: ne. Delší odpověď: vezme lidem tu část práce, kterou stejně nikdo nedělá rád.',
    min: 2,
    body: [
      { t: 'p', text: 'Je to nejčastější obava a je pochopitelná. Jenže v menší firmě obvykle není problém, že by bylo lidí moc. Bývá to naopak: ti, které máte, tráví hodiny přepisováním, hledáním a odpovídáním na pořád stejné dotazy.' },
      { t: 'h', text: 'Co ubude' },
      {
        t: 'list',
        items: [
          'Přepisování z e-mailu do systému a z jednoho systému do druhého.',
          'Hledání, kde co je a kdo to má na starosti.',
          'Připomínání, kontrolování a posílání pořád stejných odpovědí.',
        ],
      },
      { t: 'h', text: 'Co zůstane lidem' },
      { t: 'p', text: 'Rozhodování, vyjednávání, péče o zákazníky, nápady. Všechno, kde je potřeba úsudek a vztah. Tohle AI dobře neumí a nestavíme ji tak, aby to dělala.' },
      { t: 'p', text: 'Cíl je jednoduchý: aby se lidé mohli věnovat práci, kvůli které jste je přijali.' },
    ],
    sum: 'Systém bere rutinu, lidé si nechávají úsudek.',
  },
  {
    slug: 'co-se-deje-s-daty',
    cat: 'Data',
    title: 'Co se děje s vašimi daty',
    teaser: 'Kam informace tečou, kdo je vidí a jak to máte pod kontrolou. Bez právničiny.',
    min: 3,
    body: [
      { t: 'p', text: 'Když systém čte vaše e-maily nebo faktury, je fér chtít vědět, kam ty informace jdou. Tady je, jak k tomu přistupujeme.' },
      { t: 'h', text: 'Systém vidí jen to, co potřebuje' },
      { t: 'p', text: 'Napojíme ho jen na schránky, složky a tabulky, se kterými má pracovat. Ne na celou firmu. Co nepotřebuje, k tomu přístup nemá.' },
      { t: 'h', text: 'Vaše data nejsou učební materiál' },
      { t: 'p', text: 'U služeb s umělou inteligencí volíme takové, které vaše data nepoužívají k vylepšování svých modelů. Co systému pošlete, slouží jen k vyřízení vaší práce.' },
      { t: 'h', text: 'Kontrolu máte vy' },
      { t: 'p', text: 'Přístupy nastavíme tak, abyste je měli pod kontrolou a mohli je kdykoli odebrat. A systém si zapisuje, co dělal, takže se dá zpětně dohledat každý krok.' },
      { t: 'h', text: 'Osobní údaje' },
      { t: 'p', text: 'Když má systém pracovat s osobními údaji zákazníků nebo zaměstnanců, probereme to předem a nastavíme to podle toho. Nic nespouštíme naslepo.' },
    ],
    sum: 'Minimum přístupů, žádné učení na vašich datech a kontrola na vaší straně.',
  },
  {
    slug: 'co-kdyz-se-ai-splete',
    cat: 'Spolehlivost',
    title: 'Co když se AI splete?',
    teaser: 'Splete. Proto ji stavíme tak, aby chyba skončila u člověka, a ne u zákazníka.',
    min: 3,
    body: [
      { t: 'p', text: 'AI se plete. Méně než unavený člověk v pátek odpoledne, ale plete. Tvrdit opak by bylo nefér, takže s tím počítáme od začátku.' },
      { t: 'h', text: 'Když si není jistá, nechá to člověku' },
      { t: 'p', text: 'Systém pozná, kdy si odpovědí není jistý. Takovou věc nedokončí sám, ale předá ji člověku a napíše proč.' },
      { t: 'h', text: 'Důležité věci potvrzujete vy' },
      { t: 'p', text: 'Odpověď zákazníkovi, platba, cokoli nevratného: systém to připraví a vy to jedním klikem potvrdíte. Až mu budete věřit, můžete pustit víc.' },
      { t: 'h', text: 'Každý krok je dohledatelný' },
      { t: 'p', text: 'Systém si zapisuje, co a proč udělal. Když se něco nepovede, hned víte kde a dá se to opravit.' },
      { t: 'h', text: 'Ladíme na skutečném provozu' },
      { t: 'p', text: 'Prvních 14 dní po spuštění systém dolaďujeme na vašich skutečných datech a nic za to neúčtujeme. Právě tehdy se ukáže, co je potřeba doladit.' },
    ],
    sum: 'S chybami počítáme: nejistota jde k člověku, důležité věci potvrzujete vy a všechno je dohledatelné.',
  },
  {
    slug: 'proc-nestaci-chatgpt',
    cat: 'Nástroje',
    title: 'Proč firmě nestačí ChatGPT',
    teaser: 'Chat je skvělý pomocník pro jednoho člověka. Firma ale potřebuje, aby práce běžela, i když se nikdo neptá.',
    min: 3,
    body: [
      { t: 'p', text: 'ChatGPT a podobné chaty jsou užitečné. Napíšou e-mail, shrnou dokument, poradí. Pořád ale musí někdo přijít, vložit text a výsledek někam zkopírovat.' },
      { t: 'h', text: 'Chat čeká, systém pracuje' },
      { t: 'p', text: 'Systém je napojený přímo na mail, web a tabulky. Poptávka přijde v noci a ráno je zapsaná, roztříděná a má připravenou odpověď. Nikdo nic nekopíroval.' },
      { t: 'h', text: 'Zná vaše věci' },
      { t: 'p', text: 'Chat neví, jaký máte ceník, které zakázky běží a co jste minulý týden slíbili zákazníkovi. Systém postavený pro vás to ví, protože pracuje s vašimi daty.' },
      { t: 'h', text: 'Pokaždé stejně' },
      { t: 'p', text: 'V chatu záleží na tom, kdo se ptá a jak. Systém jde pokaždé stejnými kroky, takže výsledek nezávisí na tom, kdo má zrovna službu.' },
    ],
    sum: 'Chat je osobní pomocník. Systém je práce, která běží sama.',
  },
  {
    slug: 'nemusite-ai-rozumet',
    cat: 'Začátek',
    title: 'AI nemusíte rozumět',
    teaser: 'Nemusíte se nic učit ani měnit nástroje. Stačí vědět, co vás zdržuje. Zbytek je na nás.',
    min: 2,
    body: [
      { t: 'p', text: 'Spousta firem s AI otálí, protože mají pocit, že by jí nejdřív museli rozumět. Nemusíte. Stejně jako nemusíte rozumět motoru, abyste mohli jezdit autem.' },
      { t: 'h', text: 'Nic se neučíte' },
      { t: 'p', text: 'Napojíme se na mail, web a nástroje, které už máte. Nikdo se nemusí učit nový program. Lidé pracují jako dřív, jen jim ubude rutiny.' },
      { t: 'h', text: 'Stačí jeden hovor' },
      { t: 'p', text: 'Na úvodním hovoru projdeme, jak ve firmě pracujete, a ukážeme, co by mohl převzít systém. Kdybychom nic rozumného nenašli, řekneme vám to rovnou.' },
      { t: 'h', text: 'A pak to jde rychle' },
      { t: 'p', text: 'Systém stavíme do deseti dní od podpisu, od 18 000 Kč bez DPH. Přesnou cenu znáte hned po prvním hovoru.' },
    ],
    sum: 'Nemusíte být technici. Stačí vědět, co vás zdržuje.',
  },
];

export const findArticle = (slug: string | null | undefined) => articles.find((a) => a.slug === slug);
