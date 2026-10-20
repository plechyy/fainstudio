/* Gareko: majitel se ptal, my jsme odpovídali. Komunikace je hlavní příběh, tak je to otázka za otázkou. */
const chat = [
  { w: 'z', x: 'Nahraje tři fotky a napíše: „Chci sprchový kout místo vany, obklad nechám.“' },
  { w: 'a', x: 'Vidím vanu, obklad kolem 14 m², umyvadlo a baterii. Je vedení vody ve zdi u vany? A chcete odtok v podlaze?' },
  { w: 'z', x: 'Voda je ve zdi. Odtok v podlaze ano.' },
  { w: 'a', x: 'Předběžně 148 až 172 tisíc korun. Přesná cena bude po krátké obhlídce. Mám domluvit termín?' },
];

export default function Photo() {
  return (
    <>
      <p className="ca-open">
        Majitel firmy Gareko se nám ozval po týdnu, ve kterém jeho technik odjel na pět obhlídek a žádná z nich neskončila zakázkou. Čtyři lidé mezitím poptali jinou
        firmu a pátý chtěl jen vědět, kolik koupelna zhruba stojí. Napsal nám, že to nechce dělat takhle dál.
      </p>
      <p>
        Průběh spolupráce jsme s ním vedli hlavně písemně a tohle je výběr otázek, které od něj postupně padly. Dobře ukazují, jak jsme s ním o věci
        přemýšleli.
      </p>

      <p className="ca-q">Dá se cena poznat z fotky?</p>
      <p>
        Přesná ne, rozumný odhad ano. Na prvním hovoru jsme si řekli, co všechno se z fotek pozná (rozsah prací, počet a velikost prvků, stav obkladů) a co ne
        (stav zdi pod omítkou, rozvody, nosnost podlahy). Z toho jsme udělali pravidlo: asistent odhadne to, co vidí, a řekne, co mu chybí, aby cenu upřesnil.
        Vedle fotek se proto ptá na pár věcí, které z fotek poznat nejde.
      </p>
      <div className="ca-chat" role="img" aria-label="Ukázka rozhovoru zákazníka s asistentem webu">
        {chat.map((c, i) => (
          <p className={c.w === 'z' ? 'is-z' : 'is-a'} key={i}>
            <small>{c.w === 'z' ? 'Zákazník' : 'Asistent webu'}</small>
            {c.x}
          </p>
        ))}
      </div>

      <p className="ca-q">Proč rozpětí a ne jedna cena?</p>
      <p>
        Protože jedna cena by byla slib, který bychom pak museli měnit. Majitel to zpočátku nechtěl, zákazníci prý chtějí číslo. Ukázali jsme mu proto dva
        návrhy vedle sebe, jeden s číslem a druhý s rozpětím a větou „přesnou cenu řekneme po obhlídce“. Vybral druhý s tím, že přesně takhle to říkají i jeho
        technici.
      </p>

      <p className="ca-q">Z čeho se asistent učil, kolik co stojí?</p>
      <p>
        Z dřívějších zakázek firmy. Majitel nám dal tabulku dokončených koupelen s konečnou cenou a my jsme na nich odhad ladili. První verze byla o něco nižší než
        skutečnost, protože nebrala v úvahu vedlejší práce, které se ukážou až po otevření zdi. Doplnili jsme je jako rezervu a teď odhady sedí. Do ceníku firma
        zasahuje sama a může ho měnit, aniž by nám kdokoli volal.
      </p>

      <p className="ca-q">Co se bude dít s fotkami?</p>
      <p>
        Zůstávají u firmy. Zákazník při nahrávání vidí, k čemu je firma použije (odhad ceny a případná obhlídka), a nic dalšího s nimi nedělá. Před spuštěním jsme
        podepsali smlouvu o zpracování údajů a na webu přibyla jedna věta navíc.
      </p>

      <p className="ca-q">Zastoupí to techniky?</p>
      <p>
        Ne, a majitel se na to ptal jako druhý. Obhlídka zůstává u zákazníků, kteří to myslí vážně, a závazná cena vzniká až při ní. Technici teď jezdí jen tam,
        kde už zákazník ví, v jakém řádu se pohybuje, a nikdo z nich neztrácí půl dne kvůli někomu, komu stačilo číslo.
      </p>

      <p className="ca-q">Jak to s ním probíhalo týden po týdnu?</p>
      <p>
        Každý týden jsme majiteli poslali odkaz na živou ukázku. V první se uměla odhadnout jen koupelna s vanou, ve druhé i sprchový kout, třetí už uměla
        ptát se na rozvody a čtvrtá poslala cenu do e-mailu zákazníkovi a technikovi. Po každé ukázce nám majitel napsal, co by ve skutečnosti řekl jinak, a to nás
        posunulo víc než jakákoli porada.
      </p>

      <h2>Co to přineslo</h2>
      <p>
        Zákazník má předběžnou cenu do minuty, ne za několik dní. Technici jezdí jen tam, kde z toho bude zakázka, a majitel poprvé vidí, kolik poptávek jsou
        jen zvědavci. Co si z toho odnášíme my: pokud má zákazník dostat číslo, musí vědět, proč je takové, a přesně to jsme v odpovědích asistenta dopsali.
      </p>
    </>
  );
}
