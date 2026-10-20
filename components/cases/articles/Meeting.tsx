/* Proengineers: jednoduchá věc, krátký text. Nejdřív normálně řečeno, co to je. */
export default function Meeting() {
  return (
    <>
      <p className="ca-open">
        Je to program, který poslouchá poradu, po jejím skončení napíše zápis a každý úkol, který na ní zazněl, zapíše týmu do úkolníčku. Se jménem a termínem.
        Nikdo nic nepřepisuje.
      </p>

      <h2>Jak se k nám dostali</h2>
      <p>
        Projekční kancelář Proengineers se ozvala s tím, že se na poradách rozhoduje a po poradách ztrácí. Každý si pamatoval něco jiného a zápis psal ten, kdo se
        nestihl vymluvit. Úkoly zůstávaly v hlavách, nebo v e-mailech, které nikdo nečetl.
      </p>

      <h2>Jak to funguje</h2>
      <p>Systém poslouchá poradu na stole i online a pozná, kdo mluví. Po jejím konci pošle všem krátký zápis: co se rozhodlo a co zůstává otevřené. Každý úkol, který zazněl, zapíše do nástroje, který tým už používá, a přidá jméno a termín.</p>
      <p>
        První verzi jsme pustili na dvou poradách. Ukázalo se, že lidé říkají „já to zařídím“, aniž by řekli kdy. Systém se proto u každého úkolu bez termínu
        zeptá, kdy to má být hotové. Je to jediná otázka, kterou občas položí.
      </p>

      <h2>Na co si dát pozor</h2>
      <ul className="ca-list">
        <li>Poradu nahráváme jen se souhlasem všech zúčastněných.</li>
        <li>Citlivé porady se nenahrávají, stačí je vypnout jedním tlačítkem.</li>
        <li>Úkol bez jasného jména dostane značku „bez jména“ a systém se zeptá, komu patří.</li>
      </ul>

      <h2>Co to přineslo</h2>
      <p>
        Hned po poradě má každý v mobilu, co má dělat, a vedoucí vidí, co visí. Nikdo nepíše zápis, takže se přestalo stávat, že by poradu končilo „a kdo to
        napíše?“. Úkoly se neztrácejí, protože vznikají tam, kde je tým stejně řeší.
      </p>
    </>
  );
}
