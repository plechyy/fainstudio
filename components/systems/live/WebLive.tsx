'use client';

import { Cursor, ico, Layer, Scene, Svg, Toast, useLoop } from './scene';

/*
 * Web fitness studia: stránka se poskládá v prohlížeči, pak se okno smrskne
 * do telefonu. Návštěvnice se ťukem přihlásí na poslední místo na józe
 * a majitelce v rozvrhu naskočí „Obsazeno“.
 *
 * Fáze: 0 skládá se · 1 počítač · 2 promění se v telefon · 3 prst přijede
 *       4 ťuk · 5 přihlášeno · 6 drží · 7 doznění
 */
const DUR = [1300, 800, 900, 800, 350, 1200, 2800, 450];
const DONE = 6;

const lessons = [
  { t: 'Jóga', h: '18:00', left: 'poslední místo' },
  { t: 'Pilates', h: '19:15', left: '4 místa' },
  { t: 'Kruhový trénink', h: '20:00', left: '6 míst' },
];

export default function WebLive() {
  const { s, ref } = useLoop(DUR, DONE);
  const phone = s >= 2 && s <= 6;
  const booked = s >= 5 && s <= 6;

  return (
    <Scene sceneRef={ref} base={500} className={`sc--web${s === 7 ? ' is-out' : ''}`}>
      <Layer z={-90} className="sc__ghost" />

      <div className={`win fw${phone ? ' is-phone' : ''}${s === 0 ? ' is-build' : ''}`}>
        <div className="win__bar fw__bar">
          <span className="win__dots" />
          <span className="fw__url">
            <Svg>{ico.lock}</Svg>
            studioflow.cz
          </span>
        </div>
        <span className="fw__notch" />

        <div className="fw__page">
          <p className="fw__nav fw__b">
            <b>Studio Flow</b>
            <span>Rozvrh</span>
            <span>Ceník</span>
            <i className="fw__burger" />
          </p>
          <div className="fw__hero fw__b">
            <div>
              <p className="fw__h">Lekce, na které se budete těšit.</p>
              <p className="fw__p">Jóga, pilates a kruháče v centru Olomouce. První lekce je zdarma.</p>
            </div>
            <span className="fw__img" />
          </div>
          <p className="fw__sub fw__b">Dnes</p>
          <ul className="fw__list fw__b">
            {lessons.map((l, i) => (
              <li key={l.t}>
                <span>
                  <b>{l.t}</b>
                  <span className="num">
                    {l.h} · {i === 0 && booked ? 'obsazeno' : l.left}
                  </span>
                </span>
                {i === 0 ? (
                  <span className="fw__go">
                    {booked ? (
                      <span className="fw__done">
                        <Svg className="sc-ok">{ico.check}</Svg>
                        Přihlášeno
                      </span>
                    ) : (
                      <span className={`sc-btn${s === 4 ? ' is-press' : ''}`}>Přihlásit se</span>
                    )}
                    <Cursor state={s === 3 ? 'in' : s === 4 ? 'click' : 'off'} />
                  </span>
                ) : (
                  <span className="fw__ghost">Přihlásit se</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* rozvrh majitelky: ve chvíli, kdy se místo zaplní */}
      <Layer z={80} className={`fw__own-l${phone ? ' is-in' : ''}`}>
        <div className="fw__own">
          <p className="fw__oh">
            <Svg>{ico.cal}</Svg>
            Rozvrh · dnes
          </p>
          {[
            { t: 'Jóga 18:00', a: booked ? 12 : 11 },
            { t: 'Pilates 19:15', a: 8 },
            { t: 'Kruhový trénink 20:00', a: 6 },
          ].map((r, i) => (
            <div className={`fw__cap${i === 0 && booked ? ' is-full' : ''}`} key={r.t}>
              <p>
                <span>{r.t}</span>
                <b className="num">{i === 0 && booked ? 'Obsazeno' : `${r.a}/12`}</b>
              </p>
              <span>
                <i style={{ width: `${(r.a / 12) * 100}%` }} />
              </span>
            </div>
          ))}
        </div>
      </Layer>

      <Layer z={140} className="fw__toast">
        <Toast show={booked} delay={300} icon={ico.user} title="Nová přihláška na jógu" sub="Klára D. · platba kartou proběhla" />
      </Layer>
    </Scene>
  );
}
