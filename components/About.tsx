import { about } from '@/lib/content';
import Plate from './Plate';
import { SIGNATURE_LEN, SIGNATURE_STROKES, SIGNATURE_VIEWBOX } from '@/lib/signature';

export default function About() {
  const refs = about.references.filter((r) => r.show);
  return (
    <section className="section" id="kdo" aria-labelledby="kdo-title">
      <div className="wrap about">
        <Plate className="about__photo reveal" fig="Obr. 08" caption="Portrét">
          {/*
            ZÁSTUPNÝ PRVEK. Nahradit fotkou:
            public/media/matyas.webp (+ .jpg), 960 × 1200 px (4:5), max 200 KB.
          */}
          <div className="about__ph">
            <span className="label">Sem patří fotka</span>
            <span>Portrét 4 : 5, 960 × 1200 px, přirozené světlo, pohled do kamery.</span>
          </div>
        </Plate>

        <div className="about__copy">
          <p className="label shead__index reveal" aria-hidden="true">
            <b>08</b>O nás
          </p>
          <h2 className="h2 reveal" id="kdo-title">
            <span className="silver silver--block">{about.title}</span>
            <span className="hd__accent">{about.accent}</span>
          </h2>
          <p className="about__text reveal">{about.lead}</p>
          <p className="about__origin reveal">{about.origin}</p>
          {/* firma je dohledatelná ve veřejném rejstříku: jméno + IČO + odkaz do ARES */}
          <p className="about__id reveal">
            <span>{about.name}</span>
            <span>
              IČO <span className="num">{about.ico}</span>
            </span>
            <a href={`https://ares.gov.cz/ekonomicke-subjekty?ico=${about.ico}`} target="_blank" rel="noopener noreferrer">
              {about.verify} <span aria-hidden="true">↗</span>
            </a>
          </p>

          {/* Podpis: čára, která se při scrollu napíše jako perem (tahy za sebou). Obrázek, ne text; jméno je v nadpisu. */}
          <div className="sig reveal" aria-hidden="true">
            <svg viewBox={SIGNATURE_VIEWBOX}>
              {SIGNATURE_STROKES.map((s, i) => {
                const before = SIGNATURE_STROKES.slice(0, i).reduce((n, t) => n + t.len, 0);
                return (
                  <path
                    key={i}
                    className="sig__p"
                    pathLength="1"
                    d={s.d}
                    style={{ ['--sd' as string]: `${((before / SIGNATURE_LEN) * 1.8 + i * 0.025).toFixed(3)}s`, ['--sl' as string]: `${((s.len / SIGNATURE_LEN) * 1.8).toFixed(3)}s` }}
                  />
                );
              })}
            </svg>
          </div>

          {refs.length > 0 && (
            <div className="refs reveal">
              <h3 className="label">Pro koho jsme pracovali</h3>
              <ul>
                {refs.map((r) => (
                  <li key={r.name}>
                    <b>{r.name}</b>
                    <span>{r.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
