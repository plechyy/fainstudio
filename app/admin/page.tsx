import { logout } from '@/app/adminlogin/actions';
import { requireAdmin } from '@/lib/admin-session';

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
        <h1 className="adm__h1">Analytika</h1>
        <p className="adm__muted">Tady bude přehled. Obsah se doplní.</p>
      </main>
    </div>
  );
}
