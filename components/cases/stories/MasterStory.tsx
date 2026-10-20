import { StoryEnd } from './parts';

/* Strojírna Veselý: znalost je rozložená po strojích, tak je studie stroj po stroji. */
const machines = [
  { n: 'Frézka č. 3', said: 'Když je ráno studená, posuv se zasekává. Nech ji pár minut běžet naprázdno a pak dotáhni vedení.', made: 'Odpověď na „proč se zasekává posuv“ s fotkou vedení.' },
  { n: 'Hydraulický lis', said: 'Než se porouchá, změní zvuk. Pozná se to po poslechu, ne podle displeje.', made: 'Zvuk zdravého a unaveného lisu a co kontrolovat jako první.' },
  { n: 'Svařovna', said: 'Za vlhka přidat proud a drát jinak. Sešit s nastavením nikdy neexistoval.', made: 'Tabulka nastavení podle počasí, poprvé zapsaná.' },
  { n: 'Brusky', said: 'Kotouč měnit dřív, než se zdá nutné. Pozdní výměna zkazí celou dávku.', made: 'Pravidlo pro výměnu i s důvodem.' },
];

export default function MasterStory() {
  return (
    <article className="st st--machines-wrap">
      <p className="st-lead">
        <b>Kdo za kým přišel.</b> Ozval se syn zakladatele, dnes ředitel. Mistr, který zná každý stroj, odchází do důchodu a všechno má v hlavě. Ředitel
        chtěl, aby dílna jeho zkušenosti neztratila.
      </p>
      <h3 className="st-h">Rozhovory u strojů</h3>
      <ul className="st-machines">
        {machines.map((m) => (
          <li key={m.n}>
            <h4>{m.n}</h4>
            <p className="st-machines__said">{m.said}</p>
            <p className="st-machines__made">
              <small>Z toho vzniklo</small>
              {m.made}
            </p>
          </li>
        ))}
      </ul>
      <p>
        <b>Jak asistent odpovídá.</b> Nováček se zeptá do mobilu u stroje a dostane odpověď mistrovými slovy, s odkazem, odkud to asistent ví.
        Mistr si odpovědi prošel sám: dvě opravil a jednu přepsal celou. Když asistent neví, řekne to a pošle dotaz mistrovi nebo vedoucímu směny.
      </p>
      <StoryEnd />
    </article>
  );
}
