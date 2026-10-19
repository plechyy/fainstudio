import { about } from '@/lib/content';
import SectionHead from './SectionHead';

/*
 * Důkaz: kdo to staví a co už vzniklo. Názvy klientů se nezveřejňují bez písemného souhlasu,
 * proto jsou zakázky popsané anonymně. Fotka: až bude, přidat do .ab__who místo monogramu
 * (public/media/matyas.webp, 4:5).
 */
export default function About() {
  return (
    <section className="section" id="kdo" aria-labelledby="kdo-title">
      <div className="wrap">
        <SectionHead
          index="08"
          name="Kdo to staví"
          id="kdo-title"
          title={
            <>
              <span className="silver silver--block">Odpoví vám ten,</span>
              <span className="hd__accent">kdo to pak postaví.</span>
            </>
          }
        />

        <div className="ab">
          <div className="ab__who reveal">
            <span className="ab__mono" aria-hidden="true">
              MP
            </span>
            <div>
              <h3 className="ab__name">{about.name}</h3>
              <p className="ab__ico">FainStudio · Praha · IČO {about.ico}</p>
            </div>
            <p className="ab__text">{about.text}</p>
            {/* podpis: ručně kreslená čmáranice, vykreslí se tahem při scrollu */}
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
          </div>

          <div className="ab__proj reveal">
            <h3 className="label">Co už vzniklo</h3>
            <ul>
              {about.projects.map((p) => (
                <li key={p.title}>
                  <span className="ab__tag">{p.tag}</span>
                  <b>{p.client || p.title}</b>
                  <p>{p.text}</p>
                  {p.quote && <q className="ab__q">{p.quote}</q>}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
