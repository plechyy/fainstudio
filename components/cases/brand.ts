/* Barva případu = barva loga firmy (cases.items[].brand). Světlost se v CSS ořízne, aby byl text čitelný v obou motivech. */
export type Brand = { l: number; c: number; h: number };

export const brandStyle = (b: Brand) => ({
  ['--bl' as string]: b.l,
  ['--bc' as string]: b.c,
  ['--bh' as string]: b.h,
});

/* živá scéna případu: odstín loga, sytost držená v rozumném rozmezí */
export const sceneStyle = (b: Brand) => ({
  ['--ac-h' as string]: b.h,
  ['--ac-c' as string]: Math.min(0.14, Math.max(0.07, b.c)),
});
