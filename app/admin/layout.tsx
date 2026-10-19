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
  return (
    <div className="adm adm--app">
      <aside className="adm__side">
        <p className="adm__brand">
          FaiN Studio <small>Admin</small>
        </p>
        <AdminNav />
        <form action={logout} className="adm__logout">
          <button type="submit" className="adm__out">
            Odhlásit se
          </button>
        </form>
      </aside>
      <main className="adm__content">
        <div className="adm__page">{children}</div>
      </main>
    </div>
  );
}
