import { systems } from '@/lib/content';
import Artifact from './Artifact';

/*
 * A — Výstupy. Žádné přepínání: všech šest je na stránce naráz, každý se svým výstupem.
 * Bloky nemají stejnou velikost ani stejné pořadí textu a obrázku, aby to nebyla mřížka karet.
 */

export default function VariantA() {
  return (
    <div className="sv-a">
      {systems.items.map((it) => (
        <article className="sv-a__cell reveal" key={it.id}>
          <div className="sv-a__copy">
            <h3 className="sv-a__name">{it.name}</h3>
            <p className="sv-a__text">{it.text}</p>
          </div>
          <Artifact id={it.id} className="sv-a__art" />
        </article>
      ))}
    </div>
  );
}
