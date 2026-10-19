'use client';

import { useEffect, useState, type CSSProperties } from 'react';
import { ico, Svg } from './systems/live/scene';

/*
 * Prvek nad nadpisem hero. Čtyři různé verze, vybírá se přes ?mark=1…4
 * (na localhostu je vpravo dole přepínač). Všechny říkají totéž obecně:
 * práci za vás dělá systém, pořád a sám. Barvy jsou pevná paleta webu (--pal-h).
 *   1 Jádro    – veškerá práce firmy krouží kolem jednoho systému
 *   2 Hotovo   – úkoly se samy dokončují jeden za druhým
 *   3 Nonstop  – puls systému, který běží 24/7 a u každého úderu něco vyřídí
 *   4 Autopilot – seznam práce jede a kurzor ho sám odklikává
 */

const v = (o: Record<string, string | number>) => o as CSSProperties;
const HUES = [-38, 52, 165, 108, 0, -88];
const WORK = [ico.mail, ico.invoice, ico.cal, ico.table, ico.chat, ico.folder];

/* ── 1 Jádro ──────────────────────────────────────────────────────── */
function Orbit() {
  const n = WORK.length;
  return (
    <div className="hm hm-orbit" aria-hidden="true">
      <span className="hm-orbit__ring" />
      <span className="hm-orbit__ring hm-orbit__ring--b" />
      {WORK.map((icon, i) => (
        <span className="hm-orbit__arm" key={i} style={v({ '--o': HUES[i], animationDelay: `${(-i * 18) / n}s` })}>
          <span className="hm-orbit__pos" style={{ animationDelay: `${(-i * 18) / n}s` }}>
            <span className="hm-orbit__chip hm-c" style={{ animationDelay: `${(-i * 18) / n}s` }}>
              <Svg>{icon}</Svg>
            </span>
          </span>
        </span>
      ))}
      <span className="hm-orbit__core">
        <span className="hm-orbit__pulse" />
        <span className="hm-orbit__pulse hm-orbit__pulse--b" />
        <b>FS</b>
      </span>
    </div>
  );
}

/* ── 2 Hotovo ─────────────────────────────────────────────────────── */
function Stack() {
  const items = [ico.invoice, ico.mail, ico.cal, ico.table, ico.chat];
  return (
    <div className="hm hm-stack" aria-hidden="true">
      {items.map((icon, i) => (
        <div className="hm-stack__card hm-c" key={i} style={v({ '--o': HUES[i], animationDelay: `${-i * 2}s` })}>
          <span className="hm-stack__ico">
            <Svg>{icon}</Svg>
          </span>
          <span className="hm-stack__lines">
            <i style={v({ '--w': `${[72, 58, 80, 64, 70][i]}%` })} />
            <i style={v({ '--w': `${[44, 52, 36, 48, 40][i]}%` })} />
          </span>
          <svg className="hm-stack__ok" viewBox="0 0 24 24" style={{ animationDelay: `${-i * 2}s` }}>
            <circle cx="12" cy="12" r="10" />
            <path d="m7.5 12.3 3 3 6-6.3" pathLength="1" style={{ animationDelay: `${-i * 2}s` }} />
          </svg>
        </div>
      ))}
    </div>
  );
}

/* ── 3 Nonstop ────────────────────────────────────────────────────── */
const W = 720;
const MID = 60;
// rovná linka s údery; u každého úderu se něco vyřídí
const BEATS = [70, 190, 300, 420, 545, 650];
const PTS: [number, number][] = (() => {
  const p: [number, number][] = [[0, MID]];
  BEATS.forEach((x, i) => {
    const amp = [34, 26, 40, 30, 36, 24][i];
    p.push([x - 16, MID], [x - 8, MID + 8], [x, MID - amp], [x + 9, MID + amp * 0.45], [x + 17, MID]);
  });
  p.push([W, MID]);
  return p;
})();
const LEN = (() => {
  const cum = [0];
  for (let i = 1; i < PTS.length; i++) cum.push(cum[i - 1] + Math.hypot(PTS[i][0] - PTS[i - 1][0], PTS[i][1] - PTS[i - 1][1]));
  return cum;
})();
const TOTAL = LEN[LEN.length - 1];
const PULSE_S = 4.2;

function Pulse() {
  const d = 'M' + PTS.map(([x, y]) => `${x} ${y}`).join('L');
  return (
    <div className="hm hm-pulse" aria-hidden="true">
      <svg viewBox={`0 0 ${W} 120`} preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="hm-pulse-g" x1="0" x2="1">
            {[-38, 52, 165, 108, 0, -88].map((h, i, a) => (
              <stop key={i} offset={i / (a.length - 1)} style={v({ stopColor: `oklch(0.83 0.13 calc(var(--pal-h) + ${h}))` })} />
            ))}
          </linearGradient>
        </defs>
        <path className="hm-pulse__base" d={d} />
        <path className="hm-pulse__glow" d={d} pathLength="1000" />
        <path className="hm-pulse__line" d={d} pathLength="1000" />
        {BEATS.map((x, i) => {
          const peak = 1 + i * 5 + 2; // index vrcholu úderu v PTS
          const f = LEN[peak] / TOTAL;
          const delay = `${(f - 1) * PULSE_S}s`;
          return (
            <g key={x} className="hm-pulse__beat hm-c" style={v({ '--o': HUES[i], animationDelay: delay })}>
              <circle className="hm-pulse__ring" cx={x} cy={PTS[peak][1]} r="9" style={{ animationDelay: delay }} />
              <circle className="hm-pulse__dot" cx={x} cy={PTS[peak][1]} r="4.2" style={{ animationDelay: delay }} />
            </g>
          );
        })}
      </svg>
    </div>
  );
}

/* ── 4 Autopilot ──────────────────────────────────────────────────── */
function Autopilot() {
  const rows = [ico.mail, ico.invoice, ico.cal, ico.table];
  return (
    <div className="hm hm-auto" aria-hidden="true">
      <div className="hm-auto__win">
        <div className="hm-auto__bar">
          <i />
          <i />
          <i />
        </div>
        <div className="hm-auto__list">
          {rows.map((icon, i) => (
            <div className="hm-auto__row hm-c" key={i} style={v({ '--o': HUES[i], animationDelay: `${-i * 2}s` })}>
              <span className="hm-auto__ico">
                <Svg>{icon}</Svg>
              </span>
              <span className="hm-auto__line" style={v({ '--w': `${[68, 54, 76, 60][i]}%`, animationDelay: `${-i * 2}s` })} />
              <span className="hm-auto__box" style={{ animationDelay: `${-i * 2}s` }}>
                <Svg>{ico.check}</Svg>
              </span>
            </div>
          ))}
        </div>
        <span className="hm-auto__cur">
          <svg viewBox="0 0 20 22">
            <path d="M2 1.5v16l4.4-4.1 3.2 7.2 3.1-1.4-3.2-7h6.4z" />
          </svg>
          <b>FS</b>
        </span>
      </div>
    </div>
  );
}

const MARKS = [Orbit, Stack, Pulse, Autopilot];
const NAMES = ['Jádro', 'Hotovo', 'Nonstop', 'Autopilot'];

export default function HeroMark({ className = '', style }: { className?: string; style?: CSSProperties }) {
  const [n, setN] = useState(0);
  const [lab, setLab] = useState(false);

  useEffect(() => {
    const q = Number(new URLSearchParams(location.search).get('mark'));
    if (q >= 1 && q <= MARKS.length) setN(q - 1);
    setLab(process.env.NODE_ENV === 'development' || q > 0);
  }, []);

  const pick = (i: number) => {
    setN(i);
    const u = new URL(location.href);
    u.searchParams.set('mark', String(i + 1));
    history.replaceState(null, '', u);
  };

  const Mark = MARKS[n];
  return (
    <>
      <div className={`hero__mark hero__mark--${n + 1} ${className}`.trim()} style={style}>
        <Mark />
      </div>
      {lab && (
        <div className="hm-lab" role="group" aria-label="Verze prvku v hero">
          {NAMES.map((name, i) => (
            <button key={name} type="button" aria-pressed={i === n} onClick={() => pick(i)}>
              {i + 1} {name}
            </button>
          ))}
        </div>
      )}
    </>
  );
}
