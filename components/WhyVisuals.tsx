import type { CSSProperties } from 'react';

/*
 * Animace pro sekci „Proč AI“. Každá běží na jedné časové ose `--wt` (0 → 1,
 * viz .wt v components.css) a jednotlivé prvky si z ní v CSS spočítají, kdy se
 * rozsvítí. Díky tomu do sebe kroky přesně zapadají a smyčka se neposouvá.
 */

const v = (o: Record<string, string | number>) => o as CSSProperties;

/** součet „hotových“ kroků jako výraz pro CSS (pro počítadlo) */
const countExpr = (ends: number[]) =>
  `calc(${ends.map((e) => `clamp(0, (var(--wt) - ${e}) * 1000, 1)`).join(' + ')})`;

/* 01 Efektivita: za stejný čas ručně pár úkolů, s AI celá řada */
const CELLS = 10;
const LANES = [
  {
    id: 'hand',
    name: 'Ručně',
    cells: Array.from({ length: CELLS }, (_, i) => ({ s: 0.02 + i * 0.3, d: 0.27 })),
  },
  {
    id: 'ai',
    name: 'S AI',
    cells: Array.from({ length: CELLS }, (_, i) => ({ s: 0.06 + i * 0.07, d: 0.05 })),
  },
];

export function Efficiency() {
  return (
    <div className="wt we" aria-hidden="true">
      <p className="we__time">
        <span>Stejný čas</span>
        <i />
      </p>
      {LANES.map((l) => (
        <div className={`we__lane we__lane--${l.id}`} key={l.id}>
          <b>{l.name}</b>
          <span className="we__cells">
            {l.cells.map((c, i) => (
              <i key={i} style={v({ '--s': c.s, '--d': c.d })} />
            ))}
          </span>
          <span className="we__n" style={v({ '--n': countExpr(l.cells.map((c) => c.s + c.d)) })} />
        </div>
      ))}
    </div>
  );
}

/* 02 Napříč firmou: vrstvy firmy, kterými projede sken a postupně je zdigitalizuje */
const LAYERS = ['Administrativa', 'Procesy', 'Kreativa'];

export function Layers() {
  return (
    <div className="wt wl" aria-hidden="true">
      <div className="wl__stack">
        {LAYERS.map((l, i) => (
          <span className="wl__layer" key={l} style={v({ '--y': (i - 1) * 34, '--at': 0.15 + i * 0.25, zIndex: 3 - i })}>
            <i />
            <i />
            <i />
            <i />
          </span>
        ))}
        <span className="wl__scan" />
      </div>
      <ul className="wl__labels">
        {LAYERS.map((l, i) => (
          <li key={l} style={v({ '--y': (i - 1) * 34, '--at': 0.15 + i * 0.25 })}>
            {l}
          </li>
        ))}
      </ul>
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
        const at = 0.02 + i * 0.05;
        return (
          <g key={`s${y}`} className="wf__src" style={v({ '--at': at })}>
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
      <text className="wf__coret" x="80" y="83.6">
        AI
      </text>

      {/* AI → dva návrhy */}
      {[53, 107].map((y, n) => (
        <path key={`p${y}`} className="wf__draw" d={`M95 80C104 80 102 ${y} 112 ${y}`} pathLength="1" style={v({ '--at': 0.3 + n * 0.05 })} />
      ))}
      {[
        { k: 'A', y: 34, w: [0.5, 0.34] },
        { k: 'B', y: 88, w: [0.88, 0.72] },
      ].map((c, n) => (
        <g key={c.k} className={`wf__card wf__card--${c.k.toLowerCase()}`} style={v({ '--at': 0.36 + n * 0.06 })}>
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
        const at = 0.64 + j * 0.06;
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
