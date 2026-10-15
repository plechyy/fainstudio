/*
 * Pozadí hera: silueta výrobního stroje napojeného konduity na „AI mozek".
 * Čisté inline SVG, barvy z proměnných (ladí s tématem i s odstínem ze slideru).
 * Dekorace → aria-hidden. Animace pulzů respektují prefers-reduced-motion.
 */
export default function HeroBackground() {
  return (
    <div className="hero-bg" aria-hidden="true">
      <div className="hero-bg__glow" />
      <svg
        className="hero-bg__art"
        viewBox="0 0 1440 820"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="rim" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" style={{ stopColor: 'var(--secondary)', stopOpacity: 0.0 }} />
            <stop offset="1" style={{ stopColor: 'var(--secondary)', stopOpacity: 0.9 }} />
          </linearGradient>
          <radialGradient id="node" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" style={{ stopColor: 'var(--secondary)', stopOpacity: 1 }} />
            <stop offset="1" style={{ stopColor: 'var(--secondary)', stopOpacity: 0 }} />
          </radialGradient>
        </defs>

        {/* ── STROJ (vlevo): rám lisu, ozubená kola, robotické rameno ── */}
        <g className="art-fill" stroke="var(--line-strong)" strokeWidth="2">
          {/* základna + sloupy */}
          <path d="M70 700 H520 V740 H70 Z" />
          <path d="M120 360 H180 V700 H120 Z" />
          <path d="M430 360 H490 V700 H430 Z" />
          {/* horní traverza lisu */}
          <path d="M96 300 H514 V372 H96 Z" />
          {/* beran lisu */}
          <path d="M235 372 H375 V470 H235 Z" />
          <path d="M262 470 H348 V500 H262 Z" />
          {/* pracovní stůl */}
          <path d="M205 560 H405 V612 H205 Z" />
        </g>

        {/* ozubená kola */}
        <g className="art-gear" stroke="var(--line-strong)" strokeWidth="2" fill="var(--bg-deep)">
          <Gear cx={168} cy={250} r={54} teeth={12} />
          <Gear cx={250} cy={196} r={34} teeth={10} />
        </g>

        {/* robotické rameno od stroje k mozku */}
        <g stroke="var(--line-strong)" strokeWidth="13" strokeLinecap="round" fill="none" className="art-fill">
          <path d="M455 430 L600 470 L690 410" />
          <circle cx="455" cy="430" r="16" fill="var(--bg-deep)" />
          <circle cx="600" cy="470" r="14" fill="var(--bg-deep)" />
          <circle cx="690" cy="410" r="12" fill="var(--bg-deep)" />
        </g>

        {/* ── KONDUITY: stroj → mozek, s putujícími pulzy ── */}
        <g fill="none" strokeWidth="2.5">
          <path className="conduit" d="M700 410 C 820 360, 900 330, 1010 352" stroke="var(--line-strong)" />
          <path className="conduit" d="M700 440 C 840 470, 930 500, 1030 486" stroke="var(--line-strong)" />
          <path className="conduit" d="M700 425 C 860 420, 940 408, 1050 418" stroke="var(--line-strong)" />
          <path className="pulse pulse--1" d="M700 410 C 820 360, 900 330, 1010 352" stroke="var(--secondary)" strokeWidth="3" strokeLinecap="round" />
          <path className="pulse pulse--2" d="M700 440 C 840 470, 930 500, 1030 486" stroke="var(--secondary)" strokeWidth="3" strokeLinecap="round" />
          <path className="pulse pulse--3" d="M700 425 C 860 420, 940 408, 1050 418" stroke="var(--secondary)" strokeWidth="3" strokeLinecap="round" />
        </g>

        {/* ── AI MOZEK (vpravo): uzlová síť v obrysu hlavy ── */}
        <g className="art-brain">
          {/* obrys hlavy / mozku */}
          <path
            className="art-fill"
            d="M1040 430
               C 1010 330, 1080 250, 1180 240
               C 1230 235, 1270 255, 1295 290
               C 1345 285, 1385 320, 1385 375
               C 1400 400, 1395 440, 1365 455
               C 1368 505, 1330 545, 1275 545
               C 1255 580, 1205 592, 1165 575
               C 1110 590, 1055 560, 1052 505
               C 1022 490, 1020 450, 1040 430 Z"
            stroke="url(#rim)"
            strokeWidth="2.5"
          />
          {/* synapse (hrany sítě) */}
          <g stroke="var(--line-strong)" strokeWidth="1.6" className="art-synapse">
            <path d="M1110 330 L1200 300 L1300 340 M1200 300 L1180 400 M1110 330 L1150 430 L1180 400 L1270 420 M1180 400 L1230 490 M1270 420 L1320 380 M1150 430 L1180 510 M1230 490 L1180 510 M1300 340 L1320 380 M1270 420 L1290 500" />
          </g>
          {/* uzly */}
          <g className="art-nodes">
            {NODES.map(([x, y, big], i) => (
              <g key={i}>
                {big ? <circle cx={x} cy={y} r={18} fill="url(#node)" opacity={0.9} /> : null}
                <circle
                  cx={x}
                  cy={y}
                  r={big ? 6 : 3.4}
                  fill={big ? 'var(--secondary)' : 'var(--ink-3)'}
                  className={big ? 'node node--lit' : 'node'}
                  style={{ animationDelay: `${(i % 5) * 0.4}s` }}
                />
              </g>
            ))}
          </g>
        </g>
      </svg>
      <div className="hero-bg__mask" />
    </div>
  );
}

function Gear({ cx, cy, r, teeth }: { cx: number; cy: number; r: number; teeth: number }) {
  const inner = r * 0.62;
  const teethPath: string[] = [];
  for (let i = 0; i < teeth; i++) {
    const a = (i / teeth) * Math.PI * 2;
    const a2 = ((i + 0.5) / teeth) * Math.PI * 2;
    const x1 = cx + Math.cos(a) * r;
    const y1 = cy + Math.sin(a) * r;
    const x2 = cx + Math.cos(a2) * (r + 10);
    const y2 = cy + Math.sin(a2) * (r + 10);
    teethPath.push(`${i === 0 ? 'M' : 'L'}${x1.toFixed(1)} ${y1.toFixed(1)} L${x2.toFixed(1)} ${y2.toFixed(1)}`);
  }
  return (
    <g>
      <path d={teethPath.join(' ') + ' Z'} />
      <circle cx={cx} cy={cy} r={r} />
      <circle cx={cx} cy={cy} r={inner} />
      <circle cx={cx} cy={cy} r={r * 0.2} />
    </g>
  );
}

// [x, y, big] — svítící uzly jsou akcentní
const NODES: [number, number, 0 | 1][] = [
  [1110, 330, 1],
  [1200, 300, 1],
  [1300, 340, 0],
  [1180, 400, 1],
  [1150, 430, 0],
  [1270, 420, 1],
  [1230, 490, 0],
  [1320, 380, 0],
  [1180, 510, 1],
  [1290, 500, 0],
  [1085, 470, 0],
  [1250, 350, 0],
];
