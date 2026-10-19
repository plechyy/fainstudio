'use client';

import { ico, Layer, Scene, Svg, Toast, useLoop } from '../systems/live/scene';
import type { CaseVisual } from './types';

/*
 * Porada: tři lidé mluví, věty naskakují do přepisu a ten, kdo mluví, má kolem sebe kroužek.
 * Po konci z přepisu vyletí úkoly na nástěnku se jménem a termínem a všem odejde zápis.
 *
 * Fáze: 0–2 mluví jeden po druhém · 3 zapisuje · 4–6 úkoly · 7 zápis odeslán · 8 drží · 9 doznění
 */
const DUR = [1400, 1400, 1400, 900, 500, 500, 500, 900, 2400, 450];
const DONE = 8;

export default function MeetingLive({ v }: { v: CaseVisual<'meeting'> }) {
  const { s, ref } = useLoop(DUR, DONE);
  const talking = s <= 2 ? s : -1;

  return (
    <Scene sceneRef={ref} base={460} className={`sc--meet${s === 9 ? ' is-out' : ''}`}>
      <Layer z={-90} className="sc__ghost" />

      <div className="win cz-meet">
        <div className="win__bar">
          <span className="win__dots" />
          <b className="win__name">{v.window}</b>
          <span className={`win__live${s >= 3 ? ' is-off' : ''}`}>{s >= 3 ? v.writing : 'Nahrává se'}</span>
        </div>
        <div className="cz-meet__people">
          {v.tasks.map((t, i) => (
            <span className={i === talking ? 'is-talk' : undefined} key={t.who}>
              <b>{t.who[0]}</b>
              {t.who}
            </span>
          ))}
        </div>
        <ul className="cz-meet__log">
          {v.tasks.map((t, i) => (
            <li className={`${s >= i && s <= 8 ? 'is-in' : ''}${s >= 4 + i && s <= 8 ? ' is-picked' : ''}`} key={t.who}>
              <b>{t.who}:</b> {t.said}
            </li>
          ))}
        </ul>
      </div>

      {/* nástěnka úkolů v nástroji týmu */}
      <Layer z={110} className={`cz-board-l${s >= 4 && s <= 8 ? ' is-in' : ''}`}>
        <div className="cz-board">
          <p className="cz-board__h">
            <Svg>{ico.board}</Svg>
            {v.board}
          </p>
          {v.tasks.map((t, i) => (
            <div className={`cz-board__card${s >= 4 + i && s <= 8 ? ' is-in' : ''}`} key={t.t}>
              <b>{t.t}</b>
              <span>
                <i>{t.who[0]}</i>
                {t.who} · {t.when}
              </span>
            </div>
          ))}
        </div>
      </Layer>

      <Layer z={150} className="cz-meet__toast">
        <Toast show={s >= 7 && s <= 8} icon={ico.mail} title={v.done} sub="Zápis a úkoly pro tři lidi" />
      </Layer>
    </Scene>
  );
}
