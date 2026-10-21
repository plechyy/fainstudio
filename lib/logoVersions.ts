/* Verze loga, mezi kterými jde na localhostu přepínat (components/BrandLab.tsx). Čísla jsou z galerie návrhů v adminu. */
export const LOGO_VERSIONS = [
  { id: 'clover', n: '022', label: 'Čtyřlístek', p: '#0fbf7a' },
  { id: 'star6', n: '010', label: 'Hvězdice', p: '#c8ff3d' },
  { id: 'star8i', n: '026', label: 'Hvězda nad i', p: '#7dffb3' },
  { id: 'bauhaus', n: '003', label: 'Bauhaus', p: '#0fbf7a', p2: '#5b36ff' },
  { id: 'mosaic', n: '044', label: 'Mozaika', p: '#ff5a1f', p2: '#ffb020' },
] as const;

export type LogoId = (typeof LOGO_VERSIONS)[number]['id'];
export const LOGO_DEFAULT: LogoId = 'clover';
