import { StoryEnd } from './parts';

/* SeidlServis: jádro případu je rozpis, co kdy odejde, tak je to tabulka; vedle vysvětlení. */
const rules = [
  { d: 'Po splatnosti', what: 'Nic. Dáme čas, platba může být na cestě.' },
  { d: 'Den 1', what: 'Přátelská připomínka e-mailem s platebními údaji.' },
  { d: 'Den 5', what: 'Připomínka s QR platbou a aktuální částkou.' },
  { d: 'Den 12', what: 'Účetní dostane upozornění, komu zavolat a proč.' },
  { d: 'Platba přijde', what: 'Spáruje se s fakturou v bance a upomínky se zastaví.' },
];

export default function DunningStory() {
  return (
    <article className="st st--split st--rules">
      <div className="st-main">
        <h3 className="st-h">Pravidla upomínek</h3>
        <table className="st-table">
          <tbody>
            {rules.map((r) => (
              <tr key={r.d}>
                <th scope="row">{r.d}</th>
                <td>{r.what}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="st-side">
        <h3 className="st-h">Kdo za kým přišel</h3>
        <p>Majitel SeidlServisu nechtěl volat zákazníkům kvůli penězům. Většina z nich nebyla zlá, jen zapomněla. Faktury hlídala účetní v Excelu, když si vzpomněla, a peníze mezitím ležely u zákazníků.</p>
        <h3 className="st-h">Proč tak zdvořile</h3>
        <p>Připomínka ve správnou chvíli to vyřeší a nikdo se nemusí cítit jako dlužník. Přísnější tón přijde, jen když ten první nepomůže.</p>
        <h3 className="st-h">Co zůstalo na účetní</h3>
        <p>Telefonáty a výjimky. Stálí zákazníci se splátkami mají vlastní pravidla a systém jim nic nepřipomíná.</p>
      </div>
      <StoryEnd />
    </article>
  );
}
