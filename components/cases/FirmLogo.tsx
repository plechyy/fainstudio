/*
 * Jednoduchá loga firem v případech: každé jiné písmo, váha, tvar a značka, ať se nepodobají.
 * Ilustrační, kreslená v CSS a SVG (žádný obrázek). Barva značky bere --cc (barvu případu),
 * text zůstává v barvě textu, takže fungují ve světlém i tmavém motivu.
 */
export default function FirmLogo({ id, className = '' }: { id: string; className?: string }) {
  const cls = `fl fl--${id}${className ? ` ${className}` : ''}`;
  switch (id) {
    case 'reality':
      return (
        <span className={cls} role="img" aria-label="Lindner Reality">
          <svg viewBox="0 0 28 28" aria-hidden="true">
            <path d="M3 14 14 4l11 10" />
            <path d="M7 12.5V24h14V12.5" />
            <path d="M12 24v-6h4v6" />
          </svg>
          <span>
            Lindner<em>Reality</em>
          </span>
        </span>
      );
    case 'kouc':
      return (
        <span className={cls} role="img" aria-label="Brightline">
          <span>
            bright<i aria-hidden="true" />line
          </span>
        </span>
      );
    case 'fotka':
      return (
        <span className={cls} role="img" aria-label="Aquaform">
          <svg viewBox="0 0 28 28" aria-hidden="true">
            <path d="M14 3c4.5 6 8 9.4 8 13.5a8 8 0 0 1-16 0C6 12.4 9.5 9 14 3z" />
            <path d="M9.5 17c1.6 1.5 3.2 1.5 4.5 0s2.9-1.5 4.5 0" />
          </svg>
          <span>aquaform</span>
        </span>
      );
    case 'smlouvy':
      return (
        <span className={cls} role="img" aria-label="Woodline Interiér">
          <svg viewBox="0 0 28 28" aria-hidden="true">
            <circle cx="14" cy="14" r="10.5" />
            <circle cx="14" cy="14" r="6.5" />
            <circle cx="14" cy="14" r="2.6" />
          </svg>
          <span>
            WOODLINE<em>INTERIÉR</em>
          </span>
        </span>
      );
    case 'knowhow':
      return (
        <span className={cls} role="img" aria-label="Strojírna Veselý">
          <svg viewBox="0 0 28 28" aria-hidden="true">
            <path d="M4 22V10l7 4V10l7 4V6h6v16z" />
          </svg>
          <span>
            STROJÍRNA<em>VESELÝ</em>
          </span>
        </span>
      );
    case 'porady':
      return (
        <span className={cls} role="img" aria-label="ATELIER 22">
          <span className="fl__ring" aria-hidden="true">
            22
          </span>
          <span>ATELIER</span>
        </span>
      );
    case 'upominky':
      return (
        <span className={cls} role="img" aria-label="SeidlServis">
          <span className="fl__badge" aria-hidden="true">
            S
          </span>
          <span>
            Seidl<em>Servis</em>
          </span>
        </span>
      );
    default:
      return null;
  }
}
