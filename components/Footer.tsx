import { EMAIL, ICO, PRIVACY_URL } from '@/lib/config';
import Logo from './Logo';

export default function Footer() {
  return (
    <footer className="foot" id="paticka">
      <div className="wrap foot__in">
        <span>FaiN Studio</span>
        <span>IČO {ICO}</span>
        <a className="foot__legal" href={PRIVACY_URL}>
          Ochrana osobních údajů
        </a>
        <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
      </div>
      {/* úplně dole: velké logo jako podpis na konci stránky */}
      <div className="wrap">
        <div className="foot__logo reveal">
          <Logo />
        </div>
      </div>
    </footer>
  );
}
