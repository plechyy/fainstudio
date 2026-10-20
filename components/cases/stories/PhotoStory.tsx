import { StoryEnd } from './parts';

/* Aquaform: příběh je rozhovor zákazníka s webem, tak je to přepis; vedle poznámky. */
const chat = [
  { w: 'z', x: 'Nahraje tři fotky a napíše: „Chci sprchový kout místo vany, obklad nechám.“' },
  { w: 'a', x: 'Vidím vanu, obklad kolem 14 m², umyvadlo a baterii. Je vedení vody ve zdi u vany? A chcete odtok v podlaze?' },
  { w: 'z', x: 'Voda je ve zdi. Odtok v podlaze ano.' },
  { w: 'a', x: 'Předběžně 148 až 172 tisíc korun. Přesná cena bude po krátké obhlídce. Mám domluvit termín?' },
];

export default function PhotoStory() {
  return (
    <article className="st st--split st--chat">
      <div className="st-main">
        <h3 className="st-h">Jedna poptávka od fotky po cenu</h3>
        <ol className="st-bubbles">
          {chat.map((c, i) => (
            <li className={c.w === 'z' ? 'is-z' : 'is-a'} key={i}>
              <small>{c.w === 'z' ? 'Zákazník' : 'Asistent webu'}</small>
              {c.x}
            </li>
          ))}
        </ol>
      </div>
      <div className="st-side">
        <h3 className="st-h">Kdo za kým přišel</h3>
        <p>
          Majitel Aquaformu nám řekl, že polovina poptávek skončí obhlídkou, která nikam nevede. Technik ztratí půl dne a zákazník mezitím poptá
          další firmu. Chtěl cenu, která přijde dřív, než stihne zavolat jinam.
        </p>
        <h3 className="st-h">Proč rozpětí, ne jedna cena</h3>
        <p>
          Odhad vychází z ceníku firmy a z fotek. Co se pozná jen na místě, do něj nepatří. Raději poctivé rozpětí než slib, který se pak mění.
        </p>
        <h3 className="st-h">Jak jsme učili odhad</h3>
        <p>Systém prošel dřívější zakázky firmy i s konečnými cenami. První odhady byly o něco nižší než skutečnost, tak jsme je doladili.</p>
        <h3 className="st-h">Co zůstalo na technicích</h3>
        <p>Obhlídka u vážných zájemců a závazná cena.</p>
      </div>
      <StoryEnd />
    </article>
  );
}
