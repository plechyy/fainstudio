'use client';

import { CAL_URL } from '@/lib/config';
import { useStoryClose } from './ctx';

/* konec každé studie: tichý odkaz, který panel zavře a vede na formulář */
export function StoryEnd({ children = 'Chci něco podobného' }: { children?: React.ReactNode }) {
  const close = useStoryClose();
  return (
    <p className="st-end">
      <a href={CAL_URL} onClick={close}>
        {children} <span aria-hidden="true">→</span>
      </a>
    </p>
  );
}
