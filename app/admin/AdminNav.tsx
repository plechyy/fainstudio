'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const ICONS = {
  todo: <path d="M9 11l2 2 4-4M5 4h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1z" />,
  files: <path d="M3 7.5A1.5 1.5 0 0 1 4.5 6h4.2l2 2.2h8.8A1.5 1.5 0 0 1 21 9.7v8.8a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 18.5z" />,
  stats: <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />,
};

const ITEMS = [
  { href: '/admin/todo', label: 'To do', icon: 'todo' },
  { href: '/admin/soubory', label: 'Soubory', icon: 'files' },
  { href: '/admin/analytika', label: 'Analytika', icon: 'stats' },
] as const;

export default function AdminNav() {
  const path = usePathname();
  return (
    <nav className="adm__nav" aria-label="Administrace">
      {ITEMS.map((i) => (
        <Link key={i.href} href={i.href} data-i={i.icon} aria-current={path === i.href || path.startsWith(`${i.href}/`) ? 'page' : undefined}>
          <span className="adm__ico" aria-hidden="true">
            <svg viewBox="0 0 24 24">{ICONS[i.icon]}</svg>
          </span>
          {i.label}
        </Link>
      ))}
    </nav>
  );
}
