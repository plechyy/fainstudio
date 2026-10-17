import ChatLive from './live/ChatLive';
import DocLive from './live/DocLive';
import MailLive from './live/MailLive';
import ProcessLive from './live/ProcessLive';
import ToolLive from './live/ToolLive';
import WatchLive from './live/WatchLive';
import WebLive from './live/WebLive';

/*
 * Vizuál každého systému: živá 3D scéna s oknem programu, ve kterém se přehraje
 * to, co systém reálně dělá. Čísla a jména jsou ukázková, ne reference klientů.
 */
const map: Record<string, () => React.ReactElement> = {
  poptavky: MailLive,
  dokumenty: DocLive,
  asistent: ChatLive,
  data: WatchLive,
  weby: WebLive,
  procesy: ProcessLive,
  nastroje: ToolLive,
};

export default function Artifact({ id, className = '' }: { id: string; className?: string }) {
  const C = map[id] ?? ProcessLive;
  return (
    <div className={`art art--${id}${className ? ` ${className}` : ''}`} data-ui aria-hidden="true">
      <C />
    </div>
  );
}
