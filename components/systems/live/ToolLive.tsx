'use client';

import { Cursor, ico, Layer, Scene, Svg, Toast, useLoop } from './scene';

/*
 * Interní nástroje: do firemní aplikace přijde žádost, počítadlo „Čeká na vás“
 * vyskočí, kurzor ji schválí a kolegyně se to hned dozví.
 *
 * Fáze: 0 přijde žádost · 1 počítadlo · 2 kurzor jede · 3 klik · 4 schváleno · 5 doznění
 */
const DUR = [1000, 800, 950, 380, 2800, 450];
const DONE = 4;

const nav = ['Žádosti', 'Sklad', 'Docházka', 'Přehledy'];

export default function ToolLive() {
  const { s, ref } = useLoop(DUR, DONE);
  const ok = s === 4;
  const count = s === 0 || s >= 4 ? 1 : 2;

  return (
    <Scene sceneRef={ref} className={`sc--tool${s === 5 ? ' is-out' : ''}`}>
      <Layer z={-90} className="sc__ghost" />

      <div className="win tl">
        <div className="win__bar">
          <span className="win__dots" />
          <b className="win__name">Interní systém</b>
        </div>

        <div className="tl__body">
          <ul className="tl__nav">
            {nav.map((n, i) => (
              <li className={i === 0 ? 'is-on' : ''} key={n}>
                {n}
              </li>
            ))}
          </ul>

          <div className="tl__main">
            <p className="tl__head">
              <b>Žádosti</b>
              <span className={`tl__count${count === 2 ? ' is-bump' : ''}`}>
                Čeká na vás: <span className="num">{count}</span>
              </span>
            </p>

            <div className={`tl__row tl__row--new${s === 5 ? ' is-new' : ''}`}>
              <span>
                <b>Objednávka materiálu</b>
                <span>Svobodová · 12 400 Kč</span>
              </span>
              <span className="tl__st">
                {ok ? (
                  <span className="tl__ok">
                    <Svg className="sc-ok">{ico.check}</Svg>
                    Schváleno
                  </span>
                ) : (
                  <span className={`sc-btn${s === 3 ? ' is-press' : ''}`}>Schválit</span>
                )}
                <Cursor state={s === 2 ? 'in' : s === 3 ? 'click' : 'off'} />
              </span>
            </div>
            <div className="tl__row">
              <span>
                <b>Dovolená 12.–16. 1.</b>
                <span>Novák · 5 dní</span>
              </span>
              <span className="tl__st">
                <span className="tl__wait">Čeká na vás</span>
              </span>
            </div>
            <div className="tl__row">
              <span>
                <b>Cestovní příkaz</b>
                <span>Dvořák · 3 150 Kč</span>
              </span>
              <span className="tl__st">
                <span className="tl__done">Schváleno</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* malá karta s tím, co se díky tomu změnilo */}
      <Layer z={70} className="tl__stat-l">
        <div className="tl__stat">
          <span>Průměrné schválení</span>
          <b className="num">2 hodiny</b>
          <span>dřív 3 dny v mailech</span>
        </div>
      </Layer>

      <Layer z={120} className="tl__toast">
        <Toast show={ok} icon={ico.user} title="Svobodová dostala zprávu" sub="Objednávka jde rovnou k dodavateli" />
      </Layer>
    </Scene>
  );
}
