import { about } from '@/lib/content';
import Plate from './Plate';
import { SIGNATURE_D, SIGNATURE_VIEWBOX } from '@/lib/signature';

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
            <b>08</b>Kdo to staví
          </p>
          <h2 className="h2 reveal" id="kdo-title">
            {about.name}
          </h2>
          <p className="about__text reveal">{about.text}</p>
          {/* firma je dohledatelná ve veřejném rejstříku: jméno + IČO + odkaz do ARES */}
          <p className="about__id reveal">
            <span>
              IČO <span className="num">{about.ico}</span>
            </span>
            <a href={`https://ares.gov.cz/ekonomicke-subjekty?ico=${about.ico}`} target="_blank" rel="noopener noreferrer">
              {about.verify} <span aria-hidden="true">↗</span>
            </a>
          </p>

          {/* Podpis: písmo převedené na křivky (obrázek, ne text), odkryje se zleva při scrollu. Vizuálně jen ozdoba, jméno je v nadpisu. */}
          <div className="sig reveal" aria-hidden="true">
            <svg viewBox={SIGNATURE_VIEWBOX}>
              <path className="sig__p" fill="currentColor" d={SIGNATURE_D} />
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
