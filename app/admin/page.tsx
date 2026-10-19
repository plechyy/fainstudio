import { logout } from '@/app/adminlogin/actions';
import { requireAdmin } from '@/lib/admin-session';
import AdminTodo from './AdminTodo';

export default async function Admin() {
  await requireAdmin();
  return (
    <div className="adm">
      <header className="adm__bar">
        <p className="adm__brand">
          <span>FaiN</span> Studio <small>administrace</small>
        </p>
        <form action={logout}>
          <button type="submit" className="adm__out">
            Odhlásit se
          </button>
        </form>
      </header>
      <main className="adm__main">
        <AdminTodo />

        <h2 className="adm__h2">Analytika</h2>
        <p className="adm__muted">Tady bude přehled. Obsah se doplní.</p>
      </main>
    </div>
  );
}
