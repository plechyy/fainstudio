import { StoryEnd, StoryHead } from './parts';

/* Aquaform: příběh je rozhovor zákazníka s webem, tak je to přepis. Vedle poznámka, proč rozpětí. */
const chat = [
  { w: 'zakaznik', x: 'Nahraje tři fotky koupelny a napíše: „Chci sprchový kout místo vany, obklad nechám.“' },
  { w: 'asistent', x: 'Vidím vanu, obklad kolem 14 m², umyvadlo a baterii. Dvě otázky: je vedení vody ve zdi u vany, a chcete odtok v podlaze?' },
  { w: 'zakaznik', x: 'Voda je ve zdi. Odtok v podlaze ano.' },
  { w: 'asistent', x: 'Předběžně 148 až 172 tisíc korun. Přesná cena bude po krátké obhlídce. Mám domluvit termín?' },
];

export default function PhotoStory({ id, title }: { id: string; title: string }) {
  return (
    <article className="st st--chat">
      <StoryHead id={id} title={title} />

      <p className="st-lead">
        Majitel Aquaformu nám řekl, že polovina poptávek skončí obhlídkou, která nikam nevede. Technik ztratí půl dne a zákazník
        mezitím poptá další firmu. Chtěl cenu, která zákazníkovi přijde dřív, než stihne zavolat jinam.
      </p>

      <div className="st-chat__grid">
        <section aria-labelledby="st-chat-h">
          <h3 className="st-h" id="st-chat-h">
            Jedna poptávka od fotky po cenu
          </h3>
          <ol className="st-bubbles">
            {chat.map((c, i) => (
              <li className={`is-${c.w}`} key={i}>
                <small>{c.w === 'zakaznik' ? 'Zákazník' : 'Asistent webu'}</small>
                {c.x}
              </li>
            ))}
          </ol>
        </section>

        <aside className="st-note">
          <h3 className="st-h">Proč rozpětí, ne jedna cena</h3>
          <p>
            Odhad vychází z ceníku firmy a z toho, co asistent na fotkách pozná. Co se dá poznat jen na místě (stav zdi, rozvody), do
            něj nezahrnuje. Raději poctivé rozpětí než slib, který se pak mění.
          </p>
          <h3 className="st-h">Jak jsme učili odhad</h3>
          <p>
            Nechali jsme systém projít dřívější zakázky firmy i s konečnými cenami, aby poznal, kolik stojí běžné úpravy. První
            odhady byly o něco nižší než skutečnost, tak jsme je doladili.
          </p>
        </aside>
      </div>

      <section>
        <h3 className="st-h">Co zůstalo na technicích</h3>
        <p>
          Obhlídka u zákazníků, kteří to myslí vážně, a závazná cena. Technici už nejezdí všude, jen tam, kde z toho bude zakázka.
        </p>
      </section>

      <StoryEnd />
    </article>
  );
}
