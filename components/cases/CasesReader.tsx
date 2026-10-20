'use client';

import { useCallback, useEffect, useState } from 'react';
import { cases } from '@/lib/content';
import CasesCarousel from '../CasesCarousel';
import StoryReader from './StoryReader';

/* Varianta 1: carousel + čtečka přes celou obrazovku; adresa se mění na #pripad-<id>, takže funguje Zpět i sdílení. */
const idOf = (i: number) => cases.items[i].id;
const fromHash = () => {
  const m = location.hash.match(/^#pripad-(.+)$/);
  const i = m ? cases.items.findIndex((c) => c.id === m[1]) : -1;
  return i >= 0 ? i : null;
};

export default function CasesReader() {
  const [index, setIndex] = useState<number | null>(null);

  useEffect(() => {
    const h = fromHash();
    if (h !== null) setIndex(h);
    const onPop = () => setIndex(fromHash());
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const open = useCallback((i: number) => {
    history.pushState({ rd: true }, '', `#pripad-${idOf(i)}`);
    setIndex(i);
  }, []);
  const go = useCallback((i: number) => {
    history.replaceState({ rd: true }, '', `#pripad-${idOf(i)}`);
    setIndex(i);
  }, []);
  const close = useCallback(() => {
    if (history.state?.rd) history.back();
    else {
      history.replaceState(null, '', location.pathname + location.search);
      setIndex(null);
    }
  }, []);

  return (
    <>
      <CasesCarousel onRead={open} />
      <StoryReader index={index} onClose={close} onGo={go} />
    </>
  );
}
