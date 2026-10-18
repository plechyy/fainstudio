'use client';

import type { CSSProperties } from 'react';
import { ico, Svg } from './systems/live/scene';

/*
 * Animace pro sekci „Proč AI“. Všechny jsou nekonečné smyčky bez stmívání: konec
 * plynule navazuje na začátek. Flow běží na časové ose `--wt` (0 → 1, viz .wt
 * v components.css), ze které si prvky v CSS spočítají, kdy nastoupí a kdy odejdou.
 */

const v = (o: Record<string, string | number>) => o as CSSProperties;

/* 01 Efektivita: nekonečný pás úkolů. Ručně jede pomalu, s AI čtyřikrát rychleji. */
const TOKENS = 12;
const LANES = [
  { id: 'hand', name: 'Ručně', rate: '1×', gate: ico.user },
  { id: 'ai', name: 'S AI', rate: '4×', gate: null },
];

function Belt({ done }: { done?: boolean }) {
  return (
    <span className={`we__clip${done ? ' we__clip--done' : ''}`}>
      <span className="we__belt">
        {Array.from({ length: TOKENS }, (_, i) => (
          <i key={i} />
        ))}
      </span>
    </span>
  );
}

export function Efficiency() {
  return (
    <div className="we" aria-hidden="true">
      {LANES.map((l) => (
        <div className={`we__lane we__lane--${l.id}`} key={l.id}>
          <b>{l.name}</b>
          <span className="we__track">
            <Belt />
            <Belt done />
            <span className="we__gate">{l.gate ? <Svg>{l.gate}</Svg> : 'F'}</span>
          </span>
          <span className="we__rate">{l.rate}</span>
        </div>
      ))}
    </div>
  );
}

/* 02 Napříč firmou: mozaika všech možných druhů práce, přes kterou pořád běží vlna digitalizace */
const WORK = [
  ico.mail, ico.invoice, ico.cal, ico.table, ico.chat, ico.pen,
  ico.user, ico.folder, ico.globe, ico.send, ico.search, ico.bell,
  ico.board, ico.laptop, ico.approve, ico.lock, ico.clip, ico.key,
];
const COLS = 6;

export function Mosaic() {
  return (
    <div className="wm" aria-hidden="true">
      {WORK.map((icon, i) => {
        const c = i % COLS;
        const r = Math.floor(i / COLS);
        return (
          <span className="wm__tile" key={i} style={{ animationDelay: `${((c + r) * 0.14).toFixed(2)}s` }}>
            <span className="wm__face">
              <Svg>{icon}</Svg>
            </span>
            <span className="wm__face wm__face--on">
              <Svg>{icon}</Svg>
            </span>
          </span>
        );
      })}
    </div>
  );
}

/* 03 Pomocník: přečte zdroje, připraví návrhy, vy vyberete a ono to rovnou provede */
const SRC = [26, 62, 98, 134];
const OUT = [44, 80, 116];

function SrcIcon({ i, x, y }: { i: number; x: number; y: number }) {
  if (i === 0) return <path d={`M${x - 6} ${y - 4.5}h12v9h-12zM${x - 6} ${y - 4}l6 4.5 6-4.5`} />;
  if (i === 1) return <path d={`M${x - 6} ${y - 5}h12v10h-12zM${x - 6} ${y - 1}h12M${x - 1} ${y - 5}v10`} />;
  if (i === 2) return <path d={`M${x - 4.5} ${y - 6}h6l3 3v9h-9zM${x - 2.5} ${y + 0.5}h5M${x - 2.5} ${y + 3}h5`} />;
  return <path d={`M${x - 6} ${y - 5}h12v8h-7l-3 3v-3h-2z`} />;
}
function OutIcon({ i, x, y }: { i: number; x: number; y: number }) {
  if (i === 0) return <path d={`M${x - 6} ${y}l12-6-4 12-2.5-4.5zM${x - 0.5} ${y + 1.5}l6.5-7.5`} />;
  if (i === 1) return <path d={`M${x - 6} ${y - 4}h12v10h-12zM${x - 6} ${y}h12M${x - 3} ${y - 6.5}v3M${x + 3} ${y - 6.5}v3`} />;
  return <path d={`M${x - 6} ${y - 4.5}h4.5l2 2h5.5v8h-12z`} />;
}

export function Flow() {
  return (
    <svg className="wt why-v wf" viewBox="0 0 300 160" aria-hidden="true">
      {/* zdroje → AI */}
      {SRC.map((y, i) => {
        return (
          <g key={`s${y}`} className="wf__src">
            <path className="wf__wire" d={`M28 ${y}C46 ${y} 48 80 64 80`} />
            <path
              className="wf__comet"
              d={`M28 ${y}C46 ${y} 48 80 64 80`}
              pathLength="1"
              style={{ animationDelay: `${i * 0.22}s` }}
            />
            <rect className="wf__box" x="5" y={y - 11} width="22" height="22" rx="6" />
            <g className="wf__ico">
              <SrcIcon i={i} x={16} y={y} />
            </g>
          </g>
        );
      })}

      <circle className="wf__ring" cx="80" cy="80" r="21" />
      <circle className="wf__core" cx="80" cy="80" r="15" />
      <text className="wf__coret" x="80" y="85.6">
        F
      </text>

      {/* AI → dva návrhy */}
      {[53, 107].map((y, n) => (
        <path key={`p${y}`} className="wf__draw" d={`M95 80C104 80 102 ${y} 112 ${y}`} pathLength="1" style={v({ '--at': 0.04 + n * 0.04 })} />
      ))}
      {[
        { k: 'A', y: 34, w: [0.5, 0.34] },
        { k: 'B', y: 88, w: [0.88, 0.72] },
      ].map((c, n) => (
        <g key={c.k} className={`wf__card wf__card--${c.k.toLowerCase()}`} style={v({ '--at': 0.08 + n * 0.05 })}>
          <rect className="wf__cardbox" x="112" y={c.y} width="88" height="38" rx="9" />
          <text className="wf__cardt" x="121" y={c.y + 14}>
            Návrh {c.k}
          </text>
          {c.w.map((w, r) => (
            <g key={r}>
              <rect className="wf__track" x="121" y={c.y + 20 + r * 7} width="70" height="3.5" rx="1.75" />
              <rect className="wf__fill" x="121" y={c.y + 20 + r * 7} width="70" height="3.5" rx="1.75" style={v({ '--w': w })} />
            </g>
          ))}
        </g>
      ))}
      <g className="wf__ok">
        <circle cx="200" cy="88" r="7" />
        <path d="M197 88.3l2 2 4-4.3" />
      </g>

      {/* vybraný návrh → rovnou se provede v dalších systémech */}
      {OUT.map((y, j) => {
        const at = 0.5 + j * 0.06;
        return (
          <g key={`o${y}`} className="wf__out" style={v({ '--at': at })}>
            <path className="wf__draw" d={`M200 107C226 107 228 ${y} 250 ${y}`} pathLength="1" />
            <rect className="wf__box" x="251" y={y - 11} width="22" height="22" rx="6" />
            <g className="wf__ico">
              <OutIcon i={j} x={262} y={y} />
            </g>
            <g className="wf__done">
              <circle cx="273" cy={y - 10} r="5" />
              <path d={`M270.8 ${y - 10}l1.5 1.5 2.8-3`} />
            </g>
          </g>
        );
      })}

      <circle className="wf__ripple" cx="176" cy="114" r="10" />
      <g className="wf__cur">
        <path d="M0 0v14l3.8-3.6 2.8 6.4 2.8-1.3-2.8-6.2h5.6z" />
        <rect x="11" y="14" width="20" height="13" rx="6.5" />
        <text x="21" y="23.4">
          Vy
        </text>
      </g>
    </svg>
  );
}
