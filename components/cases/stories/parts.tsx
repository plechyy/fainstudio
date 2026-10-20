'use client';

import { CAL_URL } from '@/lib/config';
import { useStoryClose } from './ctx';

/* konec studie: vlevo sbalení, vpravo tichý odkaz na formulář */
export function StoryEnd({ children = 'Chci něco podobného' }: { children?: React.ReactNode }) {
  const close = useStoryClose();
  return (
    <p className="st-end">
      <button type="button" onClick={close}>
        <span aria-hidden="true">↑</span> Skrýt průběh
      </button>
      <a href={CAL_URL} onClick={close}>
        {children} <span aria-hidden="true">→</span>
      </a>
    </p>
  );
}
