'use client';

import { useEffect, useState } from 'react';

type Item = { id: string; nav: string; firm: string };

/*
 * Obsah sekce Případy: tři obavy vlevo, přilepené při scrollu. Rozsvítí se ta, jejíž případ
 * je zrovna uprostřed obrazovky. Je to jen odkaz na kartu, takže funguje i bez JavaScriptu.
 */
export default function CasesNav({ items }: { items: Item[] }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const cards = items.map((it) => document.getElementById(`pripad-${it.id}`)).filter(Boolean) as HTMLElement[];
    if (!cards.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(cards.indexOf(e.target as HTMLElement));
        }
      },
      // „čtecí čára“ kousek nad středem obrazovky
      { rootMargin: '-38% 0px -52% 0px' },
    );
    cards.forEach((c) => io.observe(c));
    return () => io.disconnect();
  }, [items]);

  return (
    <nav className="cs-nav" aria-label="Případy">
      <ol>
        {items.map((it, i) => (
          <li key={it.id} style={{ ['--co' as string]: [52, 108, 165][i] ?? 0 }}>
            <a href={`#pripad-${it.id}`} aria-current={i === active ? 'true' : undefined} data-active={i === active || undefined}>
              <b className="num">0{i + 1}</b>
              <span>
                {it.nav}
                <small>{it.firm}</small>
              </span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
