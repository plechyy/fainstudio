import logo from '@/scripts/brand/logo.json';
import { LOGO_DEFAULT, LOGO_VERSIONS } from '@/lib/logoVersions';

/*
 * Logo FaiN Studio (výchozí: čtyřlístek a „fain studio“), písmo na křivky, žádný webfont.
 * Barvy řídí CSS: text dědí barvu písma (currentColor), tvary a „ai“ jsou v primární (.lg-p),
 * druhá barva loga (.lg-s) je --logo-2. Zdroj tvarů: scripts/brand/logo.json.
 * Na localhostu se vykreslí všechny verze a Brand lab přepíná, která je vidět (html[data-logo]);
 * na ostrém webu jen výchozí.
 */
const DEV = process.env.NODE_ENV !== 'production';
const versions = logo.versions as Record<string, { svg: string; box: number[] }>;

export default function Logo({ mark = false, className = '' }: { mark?: boolean; className?: string }) {
  const cls = `logo-svg${className ? ` ${className}` : ''}`;
  if (mark) {
    const [x, y, w, h] = logo.mark.box;
    return <svg className={cls} viewBox={`${x} ${y} ${w} ${h}`} role="img" aria-label="FaiN Studio" dangerouslySetInnerHTML={{ __html: logo.mark.svg }} />;
  }
  const ids = DEV ? LOGO_VERSIONS.map((v) => v.id as string) : [LOGO_DEFAULT as string];
  return (
    <>
      {ids.map((id) => {
        const [x, y, w, h] = versions[id].box;
        return <svg key={id} className={cls} data-v={id} viewBox={`${x} ${y} ${w} ${h}`} role="img" aria-label="FaiN Studio" dangerouslySetInnerHTML={{ __html: versions[id].svg }} />;
      })}
    </>
  );
}
