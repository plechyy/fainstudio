import { NAME, CITY, EMAIL } from '@/lib/config';

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
    </footer>
  );
}
