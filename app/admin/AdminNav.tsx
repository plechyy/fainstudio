'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const ITEMS = [
  { href: '/admin/todo', label: 'To do' },
  { href: '/admin/soubory', label: 'Soubory' },
  { href: '/admin/analytika', label: 'Analytika' },
];

export default function AdminNav() {
  const path = usePathname();
  return (
    <nav className="adm__nav" aria-label="Administrace">
      {ITEMS.map((i) => (
        <Link key={i.href} href={i.href} aria-current={path === i.href || path.startsWith(`${i.href}/`) ? 'page' : undefined}>
          {i.label}
        </Link>
      ))}
    </nav>
  );
}
