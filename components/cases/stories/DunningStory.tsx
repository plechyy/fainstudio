import { StoryEnd } from './parts';

/* SeidlServis: jádro případu je rozpis, co kdy odejde, tak je to tabulka. */
const rules = [
  { d: 'Po splatnosti', what: 'Nic. Dáme čas, platba může být na cestě.' },
  { d: 'Den 1', what: 'Přátelská připomínka e-mailem s platebními údaji.' },
  { d: 'Den 5', what: 'Připomínka s QR platbou a aktuální částkou.' },
  { d: 'Den 12', what: 'Účetní dostane upozornění, komu zavolat a proč.' },
  { d: 'Platba přijde', what: 'Spáruje se s fakturou v bance a upomínky se zastaví.' },
];

export default function DunningStory() {
  return (
    <article className="st st--rules">
      <p className="st-lead">
        <b>Kdo za kým přišel.</b> Majitel SeidlServisu nechtěl volat zákazníkům kvůli penězům. Většina z nich jen zapomněla. Faktury hlídala účetní
        v Excelu, když si vzpomněla.
      </p>
      <table className="st-table">
        <caption className="st-h">Pravidla upomínek</caption>
        <tbody>
          {rules.map((r) => (
            <tr key={r.d}>
              <th scope="row">{r.d}</th>
              <td>{r.what}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>
        <b>Co zůstalo na účetní.</b> Telefonáty a výjimky. Stálí zákazníci se splátkami mají vlastní pravidla a systém jim nic nepřipomíná.
      </p>
      <StoryEnd />
    </article>
  );
}
