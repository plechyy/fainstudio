'use client';

import { CAL_URL } from '@/lib/config';
import FirmLogo from '../FirmLogo';
import { useStoryClose } from './ctx';

/* společná hlavička každé studie: logo firmy a o co šlo (nadpis je stejný jako u případu) */
export function StoryHead({ id, title }: { id: string; title: string }) {
  return (
    <header className="st-head">
      <FirmLogo id={id} className="fl--lg" />
      <h2 className="st-head__t">{title}</h2>
    </header>
  );
}

/* konec každé studie: tlačítko, které okno zavře a vede na formulář */
export function StoryEnd({ children = 'Chci něco podobného' }: { children?: React.ReactNode }) {
  const close = useStoryClose();
  return (
    <p className="st-end">
      <a className="btn btn--primary" href={CAL_URL} onClick={close}>
        {children}
      </a>
    </p>
  );
}
