import type { Metadata } from 'next';
import { logout } from '@/app/adminlogin/actions';
import { requireAdmin } from '@/lib/admin-session';
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
        <p className="adm__brand">
          FaiN Studio <small>Admin</small>
        </p>
        <AdminNav />
        <div className="adm__logout">
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
      </aside>
      <main className="adm__content">
        <div className="adm__page">{children}</div>
      </main>
    </div>
  );
}
