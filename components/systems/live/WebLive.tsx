'use client';

import { Cursor, ico, Layer, Scene, Svg, Toast, useLoop } from './scene';

/*
 * Weby: stránka s jedním úkolem se načte v prohlížeči, vedle ta samá na
 * telefonu. Návštěvník klikne na jediné tlačítko a firmě přijde objednávka.
 *
 * Fáze: 0 načítá se · 1 stránka · 2 kurzor jede · 3 klik · 4 objednávka · 5 doznění
 */
const DUR = [900, 1000, 950, 380, 2800, 450];
const DONE = 4;

export default function WebLive() {
  const { s, ref } = useLoop(DUR, DONE);
  const ready = s >= 1 && s <= 4;

  return (
    <Scene sceneRef={ref} className={`sc--web${s === 5 ? ' is-out' : ''}`}>
      <Layer z={-90} className="sc__ghost" />

      <div className={`win wb${ready ? ' is-ready' : ''}`}>
        <div className="win__bar">
          <span className="win__dots" />
          <span className="wb__url">
            <Svg>{ico.lock}</Svg>
            pekarnaumostu.cz
          </span>
        </div>

        <div className="wb__page">
          <div className="wb__real">
            <p className="wb__nav">
              <b>U Mostu</b>
              <span>Dorty</span>
              <span>Kontakt</span>
            </p>
            <div className="wb__hero">
              <div>
                <p className="wb__h">Dorty na objednávku do 48 hodin.</p>
                <p className="wb__p">Napište, na kdy a pro kolik lidí. Ozveme se ještě ten den.</p>
                <span className="wb__cta">
                  <span className={`sc-btn${s === 3 ? ' is-press' : ''}`}>Objednat dort</span>
                  <Cursor state={s === 2 ? 'in' : s === 3 ? 'click' : 'off'} />
                </span>
              </div>
              <span className="wb__img" />
            </div>
          </div>

          {/* než se stránka načte */}
          <div className="wb__skel" aria-hidden="true">
            <i style={{ width: '30%' }} />
            <i style={{ width: '70%', height: 18 }} />
            <i style={{ width: '55%' }} />
            <i style={{ width: '24%', height: 26 }} />
          </div>
        </div>
      </div>

      {/* ta samá stránka na telefonu */}
      <Layer z={70} className="wb__phone-l">
        <div className={`wb__phone${ready ? ' is-ready' : ''}`}>
          <span className="wb__notch" />
          <span className="wb__pimg" />
          <p className="wb__ph">Dorty na objednávku do 48 hodin.</p>
          <i className="wb__pl" />
          <i className="wb__pl" style={{ width: '70%' }} />
          <span className="wb__pbtn">Objednat dort</span>
        </div>
      </Layer>

      <Layer z={120} className="wb__toast">
        <Toast show={s === DONE} icon={ico.mail} title="Nová objednávka z webu" sub="Jana Malá · dort na sobotu pro 12 lidí" />
      </Layer>
    </Scene>
  );
}
