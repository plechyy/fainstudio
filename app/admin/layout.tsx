import type { Metadata } from 'next';
import { logout } from '@/app/adminlogin/actions';
import { requireAdmin } from '@/lib/admin-session';
import Link from 'next/link';
import AdminCrumb from './AdminCrumb';
import AdminNav from './AdminNav';
import './admin.css';

export const metadata: Metadata = {
  title: { default: 'Administrace', template: '%s | Administrace' },
  robots: { index: false, follow: false, nocache: true },
};

/* Rám administrace: vlevo navigace, vpravo obsah podle vybrané položky. */
export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  await requireAdmin();
  const email = (process.env.ADMIN_EMAIL || '').trim();
  return (
    <div className="adm adm--app">
      <aside className="adm__side">
        <Link className="adm__logo" href="/admin/todo" aria-label="FaiN Studio administrace">
          <span className="adm__word">
            FaiN<span>Studio</span>
          </span>
          <small>Admin</small>
        </Link>
        <AdminNav />
        <a className="adm__site" href="/" target="_blank" rel="noopener">
          Zobrazit web
          <span aria-hidden="true">↗</span>
        </a>
        <form action={logout} className="adm__logout--m">
          <button type="submit" className="adm__out">
            Odhlásit se
          </button>
        </form>
      </aside>
      <header className="adm__top">
        <AdminCrumb />
        <div className="adm__user">
          <div className="adm__me">
            <span className="adm__av" aria-hidden="true">
              {(email[0] || 'A').toUpperCase()}
            </span>
            <p className="adm__who">
              <b>Správce</b>
              <span>{email}</span>
            </p>
          </div>
          <form action={logout}>
            <button type="submit" className="adm__out">
              Odhlásit se
            </button>
          </form>
        </div>
      </header>
      <main className="adm__content">
        <div className="adm__page">{children}</div>
      </main>
    </div>
  );
}
