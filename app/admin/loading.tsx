/* Zobrazí se okamžitě po kliknutí v navigaci, než server dopočítá stránku. */
export default function Loading() {
  return (
    <div aria-busy="true" aria-label="Načítám">
      <div className="sk" style={{ width: 200, height: 34, marginBottom: 10 }} />
      <div className="sk" style={{ width: 280, height: 16, marginBottom: 26 }} />
      <div className="adm__stats">
        <div className="sk" style={{ height: 84, borderRadius: 18 }} />
        <div className="sk" style={{ height: 84, borderRadius: 18 }} />
        <div className="sk" style={{ height: 84, borderRadius: 18 }} />
      </div>
      <div className="sk" style={{ height: 260, borderRadius: 18 }} />
    </div>
  );
}
