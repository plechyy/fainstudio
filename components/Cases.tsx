import { cases } from '@/lib/content';
import { CAL_URL, ICO, NAME } from '@/lib/config';
import CasesNav from './CasesNav';

type Item = (typeof cases.items)[number];

/* barevný odstín případu v paletě scén (stejné posuny jako u systémů) */
const HUE = [52, 108, 165];

function Visual({ v }: { v: Item['visual'] }) {
  if (v.type === 'dots') {
    // sporné doklady jsou rozházené nepravidelně, ať to nevypadá jako vzor
    const human = new Set([6, 19, 33, 41, 58, 64, 77, 85, 93, 104, 112, 121, 130, 139, 147].slice(0, v.human));
    return (
      <figure className="cs-vis cs-dots" aria-label={`${v.total} dokladů, ${v.human} z nich šlo k člověku`}>
        <div className="cs-dots__grid" aria-hidden="true">
          {Array.from({ length: v.total }, (_, i) => (
            <i className={human.has(i) ? 'is-human' : undefined} style={{ ['--i' as string]: i }} key={i} />
          ))}
        </div>
        <figcaption>
          <span>
            <i /> {v.auto} <b className="num">{v.total - v.human}</b>
          </span>
          <span className="is-human">
            <i /> {v.toHuman} <b className="num">{v.human}</b>
          </span>
        </figcaption>
      </figure>
    );
  }
  if (v.type === 'funnel') {
    return (
      <figure className="cs-vis cs-fun">
        <ol>
          {v.steps.map((s, i) => (
            <li key={s.label} style={{ ['--i' as string]: i }}>
              <span className="cs-fun__bar" style={{ width: `${s.w}%` }} aria-hidden="true" />
              <span className="cs-fun__t">{s.label}</span>
              <b className="num">{s.n}</b>
            </li>
          ))}
        </ol>
      </figure>
    );
  }
  return (
    <figure className="cs-vis cs-peri">
      <div className="cs-peri__in">
        <p className="cs-peri__lab">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <rect x="5" y="11" width="14" height="9" rx="2.2" />
            <path d="M8 11V8a4 4 0 0 1 8 0v3" />
          </svg>
          {v.inside}
        </p>
        <ul>
          {v.chips.map((c, i) => (
            <li style={{ ['--i' as string]: i }} key={c}>
              {c}
            </li>
          ))}
        </ul>
      </div>
      <p className="cs-peri__out">
        <span>{v.outside}</span>
        {v.outsideNote}
      </p>
    </figure>
  );
}

export default function Cases() {
  const L = cases.labels;
  const anyModel = cases.items.some((it) => it.kind === 'model');

  return (
    <section className="section" id="pripady" aria-labelledby="pripady-title">
      <div className="wrap cs">
        <div className="cs__side">
          <header className="hd reveal">
            <p className="label shead__index" aria-hidden="true">
              <b>05</b>
              Případy
            </p>
            <h2 className="h2 hd__title" id="pripady-title">
              <span className="silver silver--block">{cases.title}</span>
              <span className="hd__accent">{cases.accent}</span>
            </h2>
            <p className="hd__lead">{cases.lead}</p>
          </header>

          <CasesNav items={cases.items.map(({ id, nav, firm }) => ({ id, nav, firm }))} />

          <div className="cs__cta">
            <a className="btn btn--primary" href={CAL_URL}>
              {cases.cta}
            </a>
          </div>
        </div>

        <div className="cs__main">
          {cases.items.map((c, i) => (
            <article
              className="cs-case reveal"
              id={`pripad-${c.id}`}
              style={{ ['--co' as string]: HUE[i] ?? 0 }}
              aria-labelledby={`pripad-${c.id}-t`}
              key={c.id}
            >
              <p className="cs-case__tag">
                <b className="num">0{i + 1}</b>
                {c.firm}
                {c.kind === 'model' && <span>{cases.modelLabel}</span>}
              </p>
              <h3 className="cs-case__fear" id={`pripad-${c.id}-t`}>
                <span className="silver">„{c.fear}“</span>
              </h3>

              <div className="cs-case__pair">
                <p>
                  <b>{L.built}</b>
                  {c.built}
                </p>
                <p>
                  <b>{L.human}</b>
                  {c.human}
                </p>
              </div>

              <Visual v={c.visual} />

              <div className="cs-res">
                <div className="cs-res__row">
                  <span className="cs-res__l">{L.before}</span>
                  <span className="cs-res__bar cs-res__bar--before" aria-hidden="true" />
                  <b className="cs-res__v num">
                    {c.result.before.value} <small>{L.hours}</small>
                  </b>
                </div>
                <div className="cs-res__row cs-res__row--after">
                  <span className="cs-res__l">{c.result.after.label}</span>
                  <span
                    className="cs-res__bar cs-res__bar--after"
                    style={{ ['--w' as string]: `${Math.max(3, (c.result.after.hours / c.result.before.hours) * 100)}%` }}
                    aria-hidden="true"
                  />
                  <b className="cs-res__v num">
                    {c.result.after.value} <small>{L.hours}</small>
                  </b>
                </div>
                <ul className="cs-res__math">
                  {c.result.math.map((m) => (
                    <li key={m}>{m}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}

          {anyModel && <p className="cs__note">{cases.note}</p>}

          <section className="cs-ass reveal" aria-label="Co platí vždy">
            <ul>
              {cases.assurances.map((a) => (
                <li key={a.k}>
                  <svg viewBox="0 0 16 16" aria-hidden="true">
                    <path d="M3 8.5 6.5 12 13 4.5" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="square" />
                  </svg>
                  <p>
                    <b>{a.k}</b>
                    {a.t}
                  </p>
                </li>
              ))}
            </ul>
            <p className="cs-ass__id">
              <span>
                {cases.verify.lead} <b>{NAME}</b>, IČO <span className="num">{ICO}</span>.
              </span>
              <a href={`https://ares.gov.cz/ekonomicke-subjekty?ico=${ICO}`} target="_blank" rel="noopener noreferrer">
                {cases.verify.link} <span aria-hidden="true">↗</span>
              </a>
            </p>
          </section>

          <div className="cs__cta cs__cta--m">
            <a className="btn btn--primary" href={CAL_URL}>
              {cases.cta}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
