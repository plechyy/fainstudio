import { compare } from '@/lib/content';
import ShaderBackground from './ShaderBackground';

const good = (v: string) => v === 'Ano' || v.startsWith('Do ');
const bad = (v: string) => v.startsWith('Ne') && v !== 'Někdy';

/** Hodnota buňky: Ano = fajfka, Ne = křížek (slovo jen pro čtečky), ostatní zůstává textem */
function Val({ v }: { v: string }) {
  if (v === 'Ano') {
    return (
      <span className="cmp-val">
        <svg className="cmp-ico cmp-ico--yes" viewBox="0 0 16 16" width="18" height="18" aria-hidden="true">
          <path d="M3 8.5 6.5 12 13 4.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
        </svg>
        <span className="sr-only">Ano</span>
      </span>
    );
  }
  if (bad(v)) {
    const rest = v.replace(/^Ne,?\s*/, '');
    return (
      <span className="cmp-val">
        <svg className="cmp-ico cmp-ico--no" viewBox="0 0 16 16" width="18" height="18" aria-hidden="true">
          <path d="M4 4l8 8M12 4l-8 8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
        </svg>
        <span className={rest ? 'cmp-val__rest' : 'sr-only'}>{rest || 'Ne'}</span>
      </span>
    );
  }
  return <span className="cmp-val">{v}</span>;
}

export default function Compare() {
  return (
    <section className="section" id="srovnani" aria-labelledby="srovnani-title">
      <div className="wrap">
        <header className="hd reveal">
          <p className="label shead__index" aria-hidden="true">
            <b>05</b>
            Srovnání
          </p>
          <h2 className="h2 hd__title" id="srovnani-title">
            <span className="silver silver--block">Jiné cesty to taky umí.</span>
            <span className="hd__accent">Jen jinak.</span>
          </h2>
        </header>

        <div className="cmp-table reveal">
          <div className="cmp-smoke" aria-hidden="true">
            <ShaderBackground brandVar="--primary" phase={95} />
          </div>
          <table>
            <caption className="sr-only">{compare.title}</caption>
            <thead>
              <tr>
                <td />
                {compare.columns.map((c, i) => (
                  <th scope="col" className={i === 0 ? 'us' : undefined} key={c}>
                    {i === 0 && <span className="cmp-led" aria-hidden="true" />}
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {compare.rows.map((r) => (
                <tr key={r.label}>
                  <th scope="row">{r.label}</th>
                  {r.values.map((v, i) => (
                    <td className={`${i === 0 ? 'us ' : ''}${good(v) || i === 0 ? 'yes' : ''}`.trim() || undefined} key={i}>
                      <Val v={v} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="cmp-cards">
          {compare.columns.map((c, ci) => (
            <section className={`cmp-card reveal${ci === 0 ? ' us' : ''}`} aria-label={c} key={c}>
              {ci === 0 && (
                <div className="cmp-smoke cmp-smoke--card" aria-hidden="true">
                  <ShaderBackground bgVar="--smoke-bg" brandVar="--primary" phase={95} />
                </div>
              )}
              <h3 className="cmp-card__title">
                {ci === 0 && <span className="cmp-led" aria-hidden="true" />}
                {c}
              </h3>
              <dl>
                {compare.rows.map((r) => (
                  <div className="cmp-card__row" key={r.label}>
                    <dt>{r.label}</dt>
                    <dd className={good(r.values[ci]) ? 'yes' : undefined}>
                      <Val v={r.values[ci]} />
                    </dd>
                  </div>
                ))}
              </dl>
            </section>
          ))}
        </div>

        <p className="cmp-note">{compare.note}</p>
      </div>
    </section>
  );
}
