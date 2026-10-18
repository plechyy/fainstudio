import Footer from '@/components/Footer';
import Ready from './Ready';

/** Rám samostatných stránek blogu: logo zpět na web, obsah, patička. */
export default function BlogShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Ready />
      <header className="wrap blog-top">
        <a className="logo" href="/" aria-label="FainStudio, hlavní stránka">
          <span className="logo__word">
            FaiN<span className="logo__sub">Studio</span>
          </span>
        </a>
        <a className="btn btn--ghost btn--sm" href="/#proc-ai">
          ← Zpět na web
        </a>
      </header>
      <main id="obsah">{children}</main>
      <Footer />
    </>
  );
}
