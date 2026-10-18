import wm from '@/scripts/brand/wordmark.json';

/*
 * Nápis „FaiNStudio“ z písma loga (Finger Paint převedené na křivky), který se při
 * doscrollování namaluje: každé písmeno odkryje klikatý tah prstem zleva doprava.
 * Spouští ho třída .is-in, kterou přidává Enhance u .reveal. Styly .paint* v components.css.
 */

type Glyph = { d: string; adv: number };
const G = wm.glyphs as Record<string, Glyph>;
const EM = wm.unitsPerEm;
const LS = 0.01 * EM; // letter-spacing jako u loga
const GAP = 0.14 * EM; // mezera před „Studio“
const BOLD = EM / 32; // syntetický bold u „FaiN“ jako v navigaci

// tah prstu: klikatá čára od shora dolů, krok menší než šířka tahu, ať nezůstanou mezery
const BRUSH = 170;
const STEP = 90;
const TOP = -960;
const BOTTOM = 160;

function zigzag(x0: number, x1: number) {
  let d = `M${x0} ${TOP}`;
  let k = 1;
  for (let x = x0 + STEP; x < x1 + STEP; x += STEP, k++) d += `L${Math.min(x, x1)} ${k % 2 ? BOTTOM : TOP}`;
  return d;
}

type Letter = { ch: string; x: number; part: 'fain' | 'studio' };
const letters: Letter[] = [];
let x = 0;
for (const ch of 'FaiN') {
  letters.push({ ch, x, part: 'fain' });
  x += G[ch].adv + LS;
}
x += GAP - LS;
for (const ch of 'Studio') {
  letters.push({ ch, x, part: 'studio' });
  x += G[ch].adv + LS;
}
const WIDTH = x - LS;

export default function PaintedWordmark({ className = '' }: { className?: string }) {
  return (
    <p className={`paint reveal${className ? ` ${className}` : ''}`} aria-label="FaiNStudio">
      <svg className="paint__svg" viewBox={`-40 -900 ${WIDTH + 80} 1060`} aria-hidden="true" focusable="false">
        <defs>
          <mask id="paint-mask" maskUnits="userSpaceOnUse" x="-40" y="-1000" width={WIDTH + 80} height="1300">
            {letters.map((l, i) => (
              <path
                key={i}
                className="paint__stroke"
                d={zigzag(l.x - 30, l.x + G[l.ch].adv + 30)}
                pathLength="1"
                strokeWidth={BRUSH}
                style={{ animationDelay: `${(i * 0.24).toFixed(2)}s` }}
              />
            ))}
          </mask>
        </defs>
        <g mask="url(#paint-mask)">
          {letters.map((l, i) => (
            <path
              key={i}
              className={`paint__glyph paint__glyph--${l.part}`}
              transform={`translate(${l.x} 0)`}
              d={G[l.ch].d}
              strokeWidth={l.part === 'fain' ? BOLD : 0}
            />
          ))}
        </g>
      </svg>
    </p>
  );
}
