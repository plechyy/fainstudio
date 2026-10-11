/** Sdílené pro „elektrické“ vodiče (Systémy, Postup). */

export type Pt = [number, number];

/** Pravoúhlá trasa se skoro ostrými rohy (r = poloměr zaoblení v px). */
export function route(pts: Pt[], r = 2) {
  let d = `M${pts[0][0]},${pts[0][1]}`;
  for (let i = 1; i < pts.length - 1; i++) {
    const [px, py] = pts[i - 1];
    const [x, y] = pts[i];
    const [nx, ny] = pts[i + 1];
    const inLen = Math.hypot(x - px, y - py);
    const outLen = Math.hypot(nx - x, ny - y);
    const rr = Math.min(r, inLen / 2, outLen / 2);
    if (rr < 0.5) {
      d += ` L${x},${y}`;
      continue;
    }
    const ax = x - ((x - px) / inLen) * rr;
    const ay = y - ((y - py) / inLen) * rr;
    const bx = x + ((nx - x) / outLen) * rr;
    const by = y + ((ny - y) / outLen) * rr;
    d += ` L${ax},${ay} Q${x},${y} ${bx},${by}`;
  }
  const last = pts[pts.length - 1];
  return d + ` L${last[0]},${last[1]}`;
}
