/*
 * Podpis: ručně kreslený obchodní podpis (velké M a P, zbytek jména jen jako rychlý ostrý zápis,
 * dlouhý výběh vpravo a podtržení). Cesty jsou v pořadí, v jakém se kreslí; skládají se pod náklonem SIGNATURE_SKEW.
 */
export const SIGNATURE_VIEWBOX = '8 -8 570 142';
export const SIGNATURE_SKEW = 'skewX(-18) translate(50 0)';
export const SIGNATURE_STROKES = [
  {
    w: 2.8,
    d: 'M4 104 C12 84 26 38 36 8 C38 4 41 6 42 12 C46 40 50 66 54 90 C58 92 62 70 70 44 C74 32 78 22 82 24 C86 28 90 62 94 90 C96 98 100 96 104 82 L112 56 C114 52 118 54 118 60 L116 84 C116 90 122 90 126 80 L138 50 C140 46 144 48 144 54 L142 80 C142 88 150 86 156 74 C162 62 166 58 170 64 C172 70 168 84 176 86 C186 88 196 66 206 60',
  },
  { w: 1.7, d: 'M96 56 C130 44 180 40 222 34' },
  { w: 1.7, d: 'M150 40 L158 30 L168 40' },
  { w: 3, d: 'M222 126 C226 92 232 40 240 6 C244 -4 262 0 274 6 C294 16 292 40 274 52 C262 60 246 56 238 54' },
  {
    w: 2.2,
    d: 'M238 54 C250 70 262 84 272 70 L286 44 C288 40 292 42 292 48 L290 72 C290 80 298 80 304 68 L316 44 C318 40 322 42 322 48 L320 70 C320 78 330 76 336 64 L348 48 C352 44 354 48 352 54 C350 64 360 62 368 54 C390 32 430 20 500 8',
  },
  { w: 1.7, d: 'M4 112 C120 122 300 122 430 100 C470 94 496 88 520 80' },
] as const;
