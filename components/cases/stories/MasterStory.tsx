import { StoryEnd } from './parts';

/* Strojírna Veselý: znalost je rozložená po strojích, tak je studie stroj po stroji. Nejdelší ze všech. */
const machines = [
  { n: 'Frézka č. 3', said: 'Když je ráno studená, posuv se zasekává. Nech ji pár minut běžet naprázdno a až potom dotáhni vedení.', made: 'Odpověď na otázku „proč se zasekává posuv“ s fotkou vedení a odkazem na rozhovor u stroje.' },
  { n: 'Hydraulický lis', said: 'Než se porouchá, změní zvuk. Pozná se to po poslechu, ne podle displeje.', made: 'Záznam zvuku zdravého a unaveného lisu a co kontrolovat jako první.' },
  { n: 'Svařovna', said: 'Za vlhka přidat proud a drát dát o stupeň jinak. Sešit s nastavením nikdy neexistoval.', made: 'Tabulka nastavení podle počasí, poprvé zapsaná.' },
  { n: 'Brusky', said: 'Kotouč měnit dřív, než se zdá nutné. Pozdní výměna zkazí celou dávku.', made: 'Pravidlo pro výměnu i s důvodem, proč právě tehdy.' },
];

export default function MasterStory() {
  return (
    <article className="st st--machines-wrap">
      <p className="st-lead">
        <b>Kdo za kým přišel.</b> Ozval se syn zakladatele, dnes ředitel dílny. Mistr, který zná každý stroj, odchází do důchodu a všechno má v hlavě.
        Žádný manuál nic z toho neobsahuje a nováčci za ním chodí s každou drobností. Ředitel chtěl, aby dílna jeho zkušenosti neztratila.
      </p>
      <div>
        <h3 className="st-h">Rozhovory u strojů</h3>
        <p className="st-sub">S mistrem jsme prošli stroj po stroji. Mluvil, my jsme zapisovali, fotili a nahrávali.</p>
        <ul className="st-machines">
          {machines.map((m) => (
            <li key={m.n}>
              <h4>{m.n}</h4>
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
      </div>
      <div className="st-three-cols">
        <section>
          <h3 className="st-h">Jak asistent odpovídá</h3>
          <p>Nováček se zeptá do mobilu u stroje a dostane odpověď mistrovými slovy. Pod ní vidí, odkud to asistent ví.</p>
        </section>
        <section>
          <h3 className="st-h">Co mistr opravil</h3>
          <p>Odpovědi si prošel sám. Dvě opravil a jednu přepsal celou. Teprve potom jsme asistenta pustili k lidem v dílně.</p>
        </section>
        <section>
          <h3 className="st-h">Když asistent neví</h3>
          <p>Řekne to a pošle dotaz mistrovi nebo vedoucímu směny. Odpověď se pak doplní, takže příště už ji zná.</p>
        </section>
      </div>
      <StoryEnd />
    </article>
  );
}
