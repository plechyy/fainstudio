import logo from '@/scripts/brand/logo.json';

/*
 * Logo FaiN Studio: čtyřlístek a „fain studio“ (písmo na křivky, žádný webfont).
 * Barvy řídí CSS: text dědí barvu písma (currentColor), čtyřlístek a „ai“ jsou v primární.
 * Zdroj tvarů: scripts/brand/logo.json (vzniká generátorem v scripts/brand/logo-lab).
 */
export default function Logo({ mark = false, className = '' }: { mark?: boolean; className?: string }) {
  const d = mark ? logo.mark : logo.full;
  const [x, y, w, h] = d.box;
  return (
    <svg
      className={`logo-svg${className ? ` ${className}` : ''}`}
      viewBox={`${x} ${y} ${w} ${h}`}
      role="img"
      aria-label="FaiN Studio"
      dangerouslySetInnerHTML={{ __html: d.svg }}
    />
  );
}
