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
        <span className={cls} role="img" aria-label="Unica Real">
          <span aria-hidden="true">
            UNIC<UnicaA />
            <em>
              RE<UnicaA />L
            </em>
          </span>
        </span>
      );
    case 'kouc':
      return (
        <span className={cls} role="img" aria-label="Brightline Digital">
          <span>BRIGHTLINE DIGITAL</span>
        </span>
      );
    case 'fotka':
      return (
        <span className={cls} role="img" aria-label="Gareko">
          <span aria-hidden="true">
            GA<b>REKO</b>
            <i />
          </span>
        </span>
      );
    case 'smlouvy':
      return (
        <span className={cls} role="img" aria-label="Woodline Interiors">
          <svg viewBox="0 0 28 28" aria-hidden="true">
            <circle className="fl-wl__disc" cx="14" cy="14" r="13.4" />
            <circle className="fl-wl__ring" cx="14" cy="14" r="11.4" strokeDasharray="16 1.6 21 1.6 13 1.6 17 1.6" />
            <circle className="fl-wl__ring" cx="14" cy="14" r="9.4" strokeDasharray="11 1.6 15 1.6 19 1.6" />
            <circle className="fl-wl__ring" cx="14" cy="14" r="7.4" strokeDasharray="9 1.6 13 1.6 17 1.6" transform="rotate(70 14 14)" />
            <path className="fl-wl__w" d="M5.6 8.4h3.6l2 7.4 2-6.2h1.6l2 6.2 2-7.4h3.6l-3.9 12h-3l-1.5-5-1.5 5h-3z" />
          </svg>
          <span>
            WOODLINE<em>INTERIORS</em>
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
        <span className={cls} role="img" aria-label="Proengineers">
          <svg viewBox="0 0 28 28" aria-hidden="true">
            <rect x="2" y="2" width="24" height="24" />
            <circle cx="14" cy="14" r="10.6" />
            <path d="M2 14h24" />
          </svg>
          <span>proengineers</span>
        </span>
      );
  }
}

/* Áčko z loga Unica Real: příčka nedosahuje k levé noze */
function UnicaA() {
  return (
    <svg className="fl-a" viewBox="0 0 20 22" aria-hidden="true">
      <path d="M2.2 21 10 2l7.8 19" />
      <path d="M9.6 14.6h5.6" />
    </svg>
  );
}
