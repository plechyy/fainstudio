export default function SectionHead({
  index,
  name,
  title,
  lead,
  id,
}: {
  index: string;
  name: string;
  title: string;
  lead?: string;
  id: string;
}) {
  return (
    <header className="shead reveal">
      <p className="shead__index label" aria-hidden="true">
        <b>{index}</b>
        {name}
      </p>
      <h2 className="h2" id={id}>
        {title}
      </h2>
      {lead && <p className="lead shead__lead">{lead}</p>}
    </header>
  );
}
