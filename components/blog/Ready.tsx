'use client';

import { useEffect } from 'react';

/** Stránky blogu nemají úvodní loader: zruší jeho zámek scrollu, který nastaví layout. */
export default function Ready() {
  useEffect(() => {
    document.documentElement.classList.remove('is-loading');
  }, []);
  return null;
}
