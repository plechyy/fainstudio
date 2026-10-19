import type { CSSProperties } from 'react';

/*
 * Malý prvek nad nadpisem hero: třídič. Pestrá práce (každá barva = jedna oblast ze sekce 2)
 * přijde z leva zamotaná, projde jednou branou (to je systém) a vyjde srovnaná a hotová.
 * Přesně to děláme: nic neměníme na tom, co vaše firma dělá, jen z toho uděláme pořádek.
 */
const ITEMS = [
  { dy: -17, hue: -38 },
  { dy: 13, hue: 52 },
  { dy: -8, hue: 165 },
  { dy: 18, hue: 108 },
  { dy: -14, hue: -88 },
  { dy: 6, hue: 0 },
  { dy: -19, hue: 222 },
];
const DUR = 8; // s, celá dráha jedné položky

const v = (o: Record<string, string | number>) => o as CSSProperties;

export default function HeroSort({ className = '', style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg className={`hs ${className}`.trim()} viewBox="0 0 260 56" aria-hidden="true" style={style}>
      <line className="hs__rail" x1="0" y1="28" x2="260" y2="28" />
      <g className="hs__gate">
        <circle className="hs__halo" cx="104" cy="28" r="17" />
        <circle className="hs__ring" cx="104" cy="28" r="12.5" />
        <path className="hs__bar" d="M104 6v10M104 40v10" />
      </g>
      {ITEMS.map((it, i) => (
        <g
          key={i}
          className="hs__item"
          style={v({ '--dy': `${it.dy}px`, '--h': it.hue, animationDelay: `${(-i * DUR) / ITEMS.length}s` })}
        >
          <g className="hs__shift" style={{ animationDelay: `${(-i * DUR) / ITEMS.length}s` }}>
            <circle className="hs__dot" cx="0" cy="28" r="3.6" />
            <g className="hs__tick">
              <rect x="-4.4" y="23.6" width="8.8" height="8.8" rx="2.6" />
              <path d="M-2.1 28.2l1.7 1.7 3-3.4" />
            </g>
          </g>
        </g>
      ))}
    </svg>
  );
}
