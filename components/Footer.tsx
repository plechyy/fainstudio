import { NAME, CITY, EMAIL } from '@/lib/config';
import PaintedWordmark from './PaintedWordmark';

export default function Footer() {
  return (
    <footer className="foot">
      <div className="wrap foot__in">
        <span>
          {NAME}, FainStudio
        </span>
        <span>{CITY}</span>
        <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
      </div>
      {/* úplně dole: velký nápis, který se namaluje, když k němu dojedete */}
      <div className="wrap">
        <PaintedWordmark className="foot__paint" />
      </div>
    </footer>
  );
}
