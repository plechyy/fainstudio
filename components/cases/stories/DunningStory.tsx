import { StoryEnd, StoryHead } from './parts';

/* SeidlServis: jádro případu je rozpis, co kdy odejde a jakým tónem, tak je to tabulka pravidel. */
const rules = [
  { d: 'Po splatnosti', what: 'Nic. Dáme čas, platba může být na cestě.', tone: 'klid' },
  { d: 'Den 1', what: 'Přátelská připomínka e-mailem s platebními údaji.', tone: 'přátelský' },
  { d: 'Den 5', what: 'Připomínka s QR platbou a aktuální částkou.', tone: 'věcný' },
  { d: 'Den 12', what: 'Účetní dostane upozornění s poznámkou, komu zavolat a proč.', tone: 'osobní' },
  { d: 'Platba přijde', what: 'Systém ji spáruje s fakturou v bance a upomínky zastaví.', tone: 'konec' },
];

export default function DunningStory({ id, title }: { id: string; title: string }) {
  return (
    <article className="st st--rules">
      <StoryHead id={id} title={title} />

      <p className="st-lead">
        Majitel SeidlServisu nechtěl volat zákazníkům kvůli penězům. Většina z nich nebyla zlá, jen zapomněla. Faktury hlídala
        účetní v Excelu, když si vzpomněla, a peníze mezitím ležely u zákazníků.
      </p>

      <section aria-labelledby="st-rules-h">
        <h3 className="st-h" id="st-rules-h">
          Pravidla upomínek
        </h3>
        <table className="st-table">
          <thead>
            <tr>
              <th scope="col">Kdy</th>
              <th scope="col">Co se stane</th>
              <th scope="col">Tón</th>
            </tr>
          </thead>
          <tbody>
            {rules.map((r) => (
              <tr key={r.d}>
                <th scope="row">{r.d}</th>
                <td>{r.what}</td>
                <td>{r.tone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <div className="st-cols">
        <section>
          <h3 className="st-h">Proč tak zdvořile</h3>
          <p>
            Většina lidí nezaplatí, protože zapomněla. Připomínka ve správnou chvíli to vyřeší a nikdo se nemusí cítit jako dlužník.
            Přísnější tón přijde, jen když ten první nepomůže.
          </p>
        </section>
        <section>
          <h3 className="st-h">Co zůstalo na účetní</h3>
          <p>
            Telefonáty a výjimky. Stálí zákazníci se splátkami mají vlastní pravidla a systém jim nic nepřipomíná. Rozhodnutí, komu
            zavolat, má pořád člověk.
          </p>
        </section>
      </div>

      <StoryEnd />
    </article>
  );
}
