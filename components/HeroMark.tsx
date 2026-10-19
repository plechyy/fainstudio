'use client';

import { useEffect, useState, type CSSProperties } from 'react';
import { ico, Svg } from './systems/live/scene';

/*
 * Prvek nad nadpisem hero. Čtyři různé verze, vybírá se přes ?mark=1…5
 * (na localhostu je vpravo dole přepínač). Všechny říkají totéž obecně:
 * práci za vás dělá systém, pořád a sám. Barvy jsou pevná paleta webu (--pal-h).
 *   1 Jádro    – veškerá práce firmy krouží kolem jednoho systému
 *   2 Hotovo   – úkoly se samy dokončují jeden za druhým
 *   3 Nonstop  – puls systému, který běží 24/7 a u každého úderu něco vyřídí
 *   4 Autopilot – seznam práce jede a kurzor ho sám odklikává
 *   5 Proměny  – výjev se mění s rotující větou v nadpisu (čas, práce, peníze, snadnost, FaiN)
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


/* ── 5 Proměny ────────────────────────────────────────────────────── */
/* Ilustrace se mění s rotující větou v nadpisu: každá věta má vlastní malý výjev. */
const SCENE_HUES = [165, -38, 108, 52, 0];
const TICKS = Array.from({ length: 12 }, (_, i) => i * 30);

function SceneTime() {
  return (
    <g>
      <circle className="mo-dim" cx="110" cy="76" r="54" />
      {TICKS.map((a) => (
        <line key={a} className="mo-tick" x1="110" y1="27" x2="110" y2={a % 90 ? 31 : 34} transform={`rotate(${a} 110 76)`} />
      ))}
      <circle className="mo-arc" cx="110" cy="76" r="54" pathLength="1" transform="translate(110 76) rotate(-90) scale(1 -1) translate(-110 -76)" />
      <line className="mo-hand mo-hand--h" x1="110" y1="76" x2="110" y2="50" />
      <line className="mo-hand mo-hand--m" x1="110" y1="76" x2="110" y2="36" />
      <circle className="mo-fill" cx="110" cy="76" r="4.5" />
    </g>
  );
}
function SceneWork() {
  return (
    <g>
      {[0, 1, 2].map((r) => (
        <g key={r} className="mo-row" style={v({ '--d': `${0.25 + r * 0.42}s` })}>
          <rect className="mo-box" x="44" y={30 + r * 34} width="22" height="22" rx="7" />
          <path className="mo-check" d={`M49.5 ${41.5 + r * 34}l4 4 7.5-8`} pathLength="1" />
          <rect className="mo-bar" x="78" y={37 + r * 34} width={[96, 74, 86][r]} height="8" rx="4" />
          <rect className="mo-bar mo-bar--on" x="78" y={37 + r * 34} width={[96, 74, 86][r]} height="8" rx="4" />
        </g>
      ))}
      <g className="mo-cursor">
        <path d="M0 0v17l4.6-4.3 3.4 7.6 3.3-1.5-3.4-7.4h6.8z" />
      </g>
    </g>
  );
}
function SceneMoney() {
  const bars = [34, 52, 74, 104];
  return (
    <g>
      <line className="mo-dim" x1="34" y1="134" x2="190" y2="134" />
      {bars.map((h, i) => (
        <rect key={i} className="mo-grow" x={44 + i * 38} y={134 - h} width="26" height={h} rx="7" style={v({ '--d': `${0.1 + i * 0.16}s` })} />
      ))}
      <path className="mo-trend" d="M42 104 86 86 124 64 170 24" pathLength="1" />
      <path className="mo-trend mo-trend--head" d="M156 22h15v15" pathLength="1" />
    </g>
  );
}
function SceneEase() {
  return (
    <g>
      <path
        className="mo-knot"
        d="M24 104C52 104 50 40 82 44S96 116 120 100 92 34 132 40 150 112 168 92 176 60 196 60"
        pathLength="1"
      />
      <path className="mo-straight" d="M24 76H196" pathLength="1" />
      <circle className="mo-fill mo-end" cx="24" cy="76" r="6" />
      <circle className="mo-fill mo-end mo-end--b" cx="196" cy="76" r="6" />
    </g>
  );
}
function SceneFain() {
  return (
    <g>
      {Array.from({ length: 10 }, (_, i) => (
        <line key={i} className="mo-ray" x1="110" y1="34" x2="110" y2="20" transform={`rotate(${i * 36} 110 76)`} />
      ))}
      <circle className="mo-halo" cx="110" cy="76" r="40" />
      <text className="mo-fs" x="110" y="91">
        FS
      </text>
      <path className="mo-spark" d="M168 34l3 7 7 3-7 3-3 7-3-7-7-3 7-3z" />
      <path className="mo-spark mo-spark--b" d="M52 108l2.2 5 5 2.2-5 2.2-2.2 5-2.2-5-5-2.2 5-2.2z" />
    </g>
  );
}
const SCENES = [SceneTime, SceneWork, SceneMoney, SceneEase, SceneFain];

function Morph() {
  const [on, setOn] = useState(0);
  useEffect(() => {
    const f = (e: Event) => setOn(((e as CustomEvent<number>).detail ?? 0) % SCENES.length);
    window.addEventListener('hero-phrase', f);
    return () => window.removeEventListener('hero-phrase', f);
  }, []);
  return (
    <div className="hm hm-morph" aria-hidden="true">
      {SCENES.map((Scene, i) => (
        <svg key={i} viewBox="0 0 220 150" className={`mo hm-c${i === on ? ' is-on' : ''}`} style={v({ '--o': SCENE_HUES[i] })}>
          <Scene />
        </svg>
      ))}
    </div>
  );
}

const MARKS = [Orbit, Stack, Pulse, Autopilot, Morph];
const NAMES = ['Jádro', 'Hotovo', 'Nonstop', 'Autopilot', 'Proměny'];
const DEFAULT = 4;

export default function HeroMark({ className = '', style }: { className?: string; style?: CSSProperties }) {
  const [n, setN] = useState(DEFAULT);
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
