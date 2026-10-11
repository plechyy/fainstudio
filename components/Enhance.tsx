'use client';

import { useEffect } from 'react';

/** Progresivní vylepšení: reveal při scrollu, přehrávání hero videa, otevření FAQ z #cena. */
export default function Enhance() {
  useEffect(() => {
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Reveal
    const els = Array.from(document.querySelectorAll<HTMLElement>('.reveal'));
    if (reduce || !('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('is-in'));
    } else {
      const io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (!e.isIntersecting) continue;
            const el = e.target as HTMLElement;
            el.style.willChange = 'opacity, transform';
            el.classList.add('is-in');
            el.addEventListener('transitionend', () => (el.style.willChange = ''), { once: true });
            io.unobserve(el);
          }
        },
        { rootMargin: '0px 0px -14% 0px', threshold: 0.08 },
      );
      els.forEach((el) => io.observe(el));
    }

    // Hero video
    const v = document.querySelector<HTMLVideoElement>('[data-hero-video]');
    let vio: IntersectionObserver | undefined;
    if (v) {
      const rm = matchMedia('(prefers-reduced-motion: reduce)');
      let visible = true;
      const sync = () => {
        if (rm.matches || !visible || document.hidden) v.pause();
        else v.play().catch(() => {});
      };
      vio = new IntersectionObserver(([e]) => {
        visible = e.isIntersecting;
        sync();
      });
      vio.observe(v);
      rm.addEventListener('change', sync);
      document.addEventListener('visibilitychange', sync);
    }

    // FAQ: odkaz #cena otevře příslušnou otázku
    const openFromHash = () => {
      const el = location.hash && document.getElementById(location.hash.slice(1));
      if (el instanceof HTMLDetailsElement) el.open = true;
    };
    openFromHash();
    window.addEventListener('hashchange', openFromHash);

    return () => {
      io_cleanup(vio);
      window.removeEventListener('hashchange', openFromHash);
    };
  }, []);

  return null;
}

function io_cleanup(io?: IntersectionObserver) {
  io?.disconnect();
}
