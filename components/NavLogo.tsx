import wm from '@/scripts/brand/wordmark.json';
import { STAR_D, STAR_STROKE } from '@/lib/star';

/*
 * Logo v navigaci jako obrázek: kreslená hvězdička a nápis „FaiN Studio“ z písma loga převedeného na křivky
 * (žádný text, nejde ho označit). Barvy řídí CSS: „FaiN“ dědí barvu písma, „Studio“ a hvězdička jsou v primární.
 * Rozložení je stejné jako v exportu loga (scripts/brand-export.mjs, „vodorovne“).
 */
type Glyph = { d: string; adv: number };
const G = wm.glyphs as Record<string, Glyph>;
const EM = wm.unitsPerEm;
const LS = 0.01 * EM;
const GAP = 0.14 * EM;
const BOLD = EM / 32;

type Run = { d: string; x: number; part: 'fain' | 'studio' };
const runs: Run[] = [];
let x = 0;
for (const ch of 'FaiN') {
  runs.push({ d: G[ch].d, x, part: 'fain' });
  x += G[ch].adv + LS;
}
x += GAP - LS;
for (const ch of 'Studio') {
  runs.push({ d: G[ch].d, x, part: 'studio' });
  x += G[ch].adv + LS;
}
const WORD_W = x - LS;

// hvězdička vlevo od nápisu, svisle vystředěná na písmena
const S = 1130;
const SX = -S - 150;
const SY = -400 - S / 2;
const VB = `${SX} ${SY} ${WORD_W - SX} ${S}`;

export default function NavLogo() {
  return (
    <svg className="logo-img" viewBox={VB} role="img" aria-label="FaiN Studio" focusable="false">
      <g className="logo-img__star" transform={`translate(${SX} ${SY}) scale(${S / 100})`}>
        <path d={STAR_D} strokeWidth={STAR_STROKE} strokeLinejoin="round" />
      </g>
      {runs.map((r, i) =>
        r.part === 'fain' ? (
          <path key={i} className="logo-img__fain" transform={`translate(${r.x.toFixed(1)} 0)`} d={r.d} strokeWidth={BOLD} strokeLinejoin="round" />
        ) : (
          <path key={i} className="logo-img__studio" transform={`translate(${r.x.toFixed(1)} 0)`} d={r.d} />
        ),
      )}
    </svg>
  );
}
