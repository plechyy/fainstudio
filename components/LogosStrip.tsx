/*
 * Točící se pás pod herem (nekonečný marquee).
 * Žádná cizí loga bez souhlasu (brief, sekce 9): zatím zástupné značky s textem „Logo".
 * Po získání souhlasu nahraď položky skutečnými logy (ideálně monochromatické SVG, výška ~28 px).
 */
const MARKS = [
  <circle key="a" cx="18" cy="18" r="13" />,
  <path key="b" d="M18 4 34 32 2 32 Z" />,
  <rect key="c" x="5" y="5" width="26" height="26" rx="6" />,
  <path key="d" d="M18 3 32 11 32 25 18 33 4 25 4 11 Z" />,
  <path key="e" d="M6 18a12 12 0 0 1 24 0 12 12 0 0 1-24 0Z M18 6v24" />,
  <path key="f" d="M8 28 18 8 28 28 Z M12 22h12" />,
];

// Jedna sada = dost široká, aby pokryla i širokou obrazovku; druhá kopie dělá smyčku bez švu.
const SET = [...MARKS, ...MARKS];

function Row({ hidden }: { hidden?: boolean }) {
  return (
    <ul className="logos__set" aria-hidden={hidden || undefined}>
      {SET.map((m, i) => (
        <li key={i} className="logos__item">
          <svg viewBox="0 0 36 36" width="34" height="34" fill="none" stroke="currentColor" strokeWidth="2.2">
            {m}
          </svg>
          <span className="logos__ph silver">Logo</span>
        </li>
      ))}
    </ul>
  );
}

export default function LogosStrip() {
  return (
    <div className="logos" aria-label="Reference">
      <div className="logos__track">
        <Row />
        <Row hidden />
      </div>
    </div>
  );
}
