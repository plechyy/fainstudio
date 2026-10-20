import { cases } from '@/lib/content';

type Item = (typeof cases.items)[number];

const L = cases.labels;

/* Výsledek Dřív → Teď: dva body na jedné ose, hodnoty pod nimi, popis pod tím. */
export default function Result({ c }: { c: Item }) {
  const { before, after, unit } = c.result;
  return (
    <div className="rs">
      <span className="rs-a__track" aria-hidden="true" />
      <p className="rs-a__pt rs-a__pt--before">
        <small>{L.before}</small>
        <s className="num">{before}</s>
      </p>
      <p className="rs-a__pt rs-a__pt--after">
        <small>{L.after}</small>
        <b className="num">{after}</b>
      </p>
      <p className="rs__unit">{unit}</p>
    </div>
  );
}
