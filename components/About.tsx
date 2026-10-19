import { about } from '@/lib/content';
import Plate from './Plate';

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

          {/* Podpis: ručně kreslená čmáranice (SVG), vykreslí se tahem při scrollu. Vizuálně jen ozdoba, jméno je v nadpisu. */}
          <div className="sig reveal" aria-hidden="true">
            <svg viewBox="0 0 330 120" width="330" height="120" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path
                className="sig__a"
                pathLength={1000}
                d="M10 92 C14 64 22 26 36 22 C50 18 46 74 54 84 C58 52 72 12 88 26 C100 38 82 88 98 84 C112 80 112 50 124 52 C136 54 118 94 136 86 C152 78 156 46 170 50 C182 54 166 90 184 82 C198 76 204 58 214 62 C224 66 212 90 230 80 C248 70 262 38 282 36 C300 34 284 70 262 92 C252 102 296 94 320 74"
              />
              <path className="sig__b" pathLength={1000} d="M26 104 C96 92 206 100 316 86" />
              <path className="sig__c" pathLength={1000} d="M158 70 C176 60 198 56 214 58" />
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
