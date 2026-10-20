import { StoryEnd, StoryHead } from './parts';

/* Strojírna Veselý: znalost je rozložená po strojích, tak je studie stroj po stroji. Nejdelší ze všech. */
const machines = [
  {
    name: 'Frézka č. 3',
    said: 'Když je ráno studená, posuv se zasekává. Nech ji pár minut běžet naprázdno a až potom dotáhni vedení.',
    made: 'Odpověď na otázku „proč se zasekává posuv“, s fotkou vedení a odkazem na rozhovor u stroje.',
  },
  {
    name: 'Hydraulický lis',
    said: 'Než se porouchá, změní zvuk. Pozná se to po poslechu, ne podle displeje.',
    made: 'Záznam zvuku zdravého a unaveného lisu a postup, co kontrolovat jako první.',
  },
  {
    name: 'Svařovna',
    said: 'Za vlhka je potřeba přidat proud a drát dát o stupeň jinak. Sešit s nastavením nikdy neexistoval.',
    made: 'Tabulka nastavení podle počasí, poprvé zapsaná.',
  },
  {
    name: 'Brusky',
    said: 'Kotouč se mění dřív, než se zdá nutné. Pozdní výměna zkazí celou dávku.',
    made: 'Pravidlo pro výměnu s vysvětlením, proč právě tehdy.',
  },
];

export default function MasterStory({ id, title }: { id: string; title: string }) {
  return (
    <article className="st st--interviews">
      <StoryHead id={id} title={title} />

      <p className="st-lead">
        Ozval se syn zakladatele, dnes ředitel dílny. Mistr, který zná každý stroj, odchází do důchodu a všechno má v hlavě. Žádný
        manuál nic z toho neobsahuje a nováčci za ním chodí s každou drobností. Ředitel chtěl, aby jeho zkušenosti dílna neztratila.
      </p>

      <section aria-labelledby="st-int-h">
        <h3 className="st-h" id="st-int-h">
          Rozhovory u strojů
        </h3>
        <p className="st-sub">
          S mistrem jsme prošli stroj po stroji. Mluvil, my jsme zapisovali, fotili a nahrávali. Z každého stroje vznikla část
          znalostí, na kterou se dá ptát.
        </p>
        <ul className="st-machines">
          {machines.map((m) => (
            <li key={m.name}>
              <h4>{m.name}</h4>
              <p className="st-machines__said">
                <small>Co nám mistr řekl</small>
                {m.said}
              </p>
              <p className="st-machines__made">
                <small>Co z toho vzniklo</small>
                {m.made}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <div className="st-cols">
        <section>
          <h3 className="st-h">Jak asistent odpovídá</h3>
          <p>
            Z rozhovorů, poznámek z údržby a fotek jsme postavili asistenta. Nováček se zeptá do mobilu u stroje a dostane odpověď
            mistrovými slovy. Pod odpovědí vždy vidí, odkud to asistent ví.
          </p>
        </section>
        <section>
          <h3 className="st-h">Co mistr opravil</h3>
          <p>
            Odpovědi si prošel sám. Dvě opravil a jednu přepsal celou. Teprve potom jsme asistenta pustili k lidem v dílně.
          </p>
        </section>
        <section>
          <h3 className="st-h">Když asistent neví</h3>
          <p>
            Řekne to a pošle dotaz mistrovi nebo vedoucímu směny. Nic si nevymýšlí. Odpověď se pak doplní, takže příště už ji zná.
          </p>
        </section>
      </div>

      <StoryEnd />
    </article>
  );
}
