/*
 * Výstup každého systému, nakreslený v HTML — místo prázdného rámečku s popiskem
 * „Vizuál“. Ukazujeme to, co ze systému reálně leze: odpověď na poptávku, vytažená
 * pole z faktury, odpověď asistenta se zdrojem, hlídací tabulku, stránku s jedním
 * úkolem a rozkres spotu. Čísla a jména jsou ukázková, ne reference klientů.
 */

/** Poptávky: přišlo → odpověď → zápis do přehledu. */
function Mail() {
  return (
    <div className="art__pane art__pane--mail">
      <article className="msg">
        <p className="msg__head">
          <b>Poptávka z webu</b>
          <span className="num">8:41</span>
        </p>
        <p className="msg__body">Dobrý den, potřebovali bychom cenu na 120 ks a termín do konce měsíce.</p>
      </article>
      <article className="msg msg--out">
        <p className="msg__head">
          <b>Odpověď odeslána</b>
          <span className="num">8:42</span>
        </p>
        <p className="msg__body">
          Dobrý den, 120 ks máme skladem, termín 24. 10. Posíláme nabídku a dva termíny na hovor.
        </p>
      </article>
      <p className="art__note">Zapsáno do přehledu · čeká na potvrzení</p>
    </div>
  );
}

/** Dokumenty: papír vlevo, vytažená pole vpravo. */
function Doc() {
  const fields: [string, string][] = [
    ['Dodavatel', 'Kovoobrábění Brno s.r.o.'],
    ['Variabilní symbol', '2026114'],
    ['Splatnost', '30. 10. 2026'],
    ['Částka', '48 300 Kč'],
  ];
  const lines = [92, 70, 84, 46, 78, 62, 88];
  return (
    <div className="art__pane art__pane--doc">
      <div className="paper">
        <span className="paper__title">Faktura</span>
        {lines.map((w, i) => (
          <i key={i} className="paper__line" style={{ width: `${w}%` }} />
        ))}
      </div>
      <dl className="fields">
        {fields.map(([k, v]) => (
          <div className="fields__row" key={k}>
            <dt>{k}</dt>
            <dd>{v}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

/** Asistent: otázka česky, odpověď a odkud ji systém vzal. */
function Chat() {
  return (
    <div className="art__pane art__pane--chat">
      <p className="bubble bubble--q">Jakou dáváme záruku na montáž?</p>
      <div className="bubble bubble--a">
        <p>Na montáž dáváme 24 měsíců. Na dodané díly platí záruka výrobce, většinou 12 měsíců.</p>
        <p className="bubble__src">Smlouva o dílo · čl. 6.2</p>
      </div>
    </div>
  );
}

/** Sběr dat: hlídací tabulka a čas poslední kontroly. */
function Watch() {
  const rows: [string, string, string | null][] = [
    ['Dodavatel A · profil 40×40', '1 290 Kč', '−8 %'],
    ['Dodavatel B · profil 40×40', '1 410 Kč', null],
    ['Dodavatel C · profil 40×40', '1 355 Kč', '+3 %'],
  ];
  return (
    <div className="art__pane art__pane--watch">
      <table className="watch">
        <thead>
          <tr>
            <th>Sledovaná položka</th>
            <th>Cena</th>
            <th>Od včera</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([name, price, delta]) => (
            <tr key={name}>
              <td>{name}</td>
              <td className="num">{price}</td>
              <td className={delta ? 'watch__d num' : 'watch__same'}>{delta ?? 'beze změny'}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="art__note">Kontrola každé ráno v 6:00</p>
    </div>
  );
}

/** Weby: stránka, na které zbylo jen to, co má jeden úkol. */
function Mini() {
  return (
    <div className="art__pane art__pane--mini">
      <div className="mini">
        <div className="mini__bar">
          <span className="mini__mark" />
          <span className="mini__dots" />
        </div>
        <p className="mini__h">Jedna stránka, jeden úkol.</p>
        <p className="mini__p">Dvě věty o tom, co děláte, a hned pod tím jedno tlačítko.</p>
        <span className="mini__btn">Domluvit hovor</span>
      </div>
      <p className="art__note">Žádné menu o osmi položkách, žádný redakční systém navíc.</p>
    </div>
  );
}

/** Procesy: řetězec kroků, který běží sám a na jednom místě čeká na člověka. */
function Flow() {
  const steps: [string, string, boolean][] = [
    ['Mail s objednávkou', '8:41', false],
    ['Zápis do tabulky', 'hotovo', false],
    ['Schválení', 'čeká na vás', true],
    ['Faktura odeslána', 'po schválení', false],
  ];
  return (
    <div className="art__pane art__pane--flow">
      <ol className="flow">
        {steps.map(([name, state, now], i) => (
          <li className={`flow__node${now ? ' flow__node--now' : ''}`} key={name}>
            <span className="flow__dot num">{i + 1}</span>
            <b className="flow__name">{name}</b>
            <span className="flow__state">{state}</span>
          </li>
        ))}
      </ol>
      <p className="art__note">Jeden klik od vás, zbytek běží sám</p>
    </div>
  );
}

/** Interní nástroje: jedno místo, kde je vidět, co na koho čeká. */
function Tool() {
  const rows: [string, string, string, boolean][] = [
    ['Dovolená 12.–16. 1.', 'Novák', 'Schváleno', false],
    ['Objednávka materiálu', 'Svobodová', 'Čeká na vás', true],
    ['Cestovní příkaz', 'Dvořák', 'Schváleno', false],
  ];
  return (
    <div className="art__pane art__pane--watch">
      <table className="watch">
        <thead>
          <tr>
            <th>Žádost</th>
            <th>Od koho</th>
            <th>Stav</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([name, who, state, wait]) => (
            <tr key={name}>
              <td>{name}</td>
              <td>{who}</td>
              <td className={wait ? 'watch__d' : 'watch__same'}>{state}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="art__note">Místo tabulky a řetězu mailů</p>
    </div>
  );
}

const map: Record<string, () => React.ReactElement> = {
  poptavky: Mail,
  dokumenty: Doc,
  asistent: Chat,
  data: Watch,
  weby: Mini,
  procesy: Flow,
  nastroje: Tool,
};

export default function Artifact({ id, className = '' }: { id: string; className?: string }) {
  const C = map[id] ?? Mail;
  return (
    <div className={`art art--${id}${className ? ` ${className}` : ''}`} data-ui aria-hidden="true">
      <C />
    </div>
  );
}
