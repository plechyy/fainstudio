import { StoryEnd } from './parts';

/* Aquaform: příběh je rozhovor zákazníka s webem, tak je to přepis. */
const chat = [
  { w: 'z', x: 'Nahraje tři fotky a napíše: „Chci sprchový kout místo vany, obklad nechám.“' },
  { w: 'a', x: 'Vidím vanu, obklad kolem 14 m², umyvadlo a baterii. Je vedení vody ve zdi u vany? A chcete odtok v podlaze?' },
  { w: 'z', x: 'Voda je ve zdi. Odtok v podlaze ano.' },
  { w: 'a', x: 'Předběžně 148 až 172 tisíc korun. Přesná cena bude po krátké obhlídce. Mám domluvit termín?' },
];

export default function PhotoStory() {
  return (
    <article className="st st--chat">
      <p className="st-lead">
        <b>Kdo za kým přišel.</b> Majitel Aquaformu nám řekl, že polovina poptávek skončí obhlídkou, která nikam nevede. Chtěl cenu, která přijde
        zákazníkovi dřív, než stihne zavolat jinam.
      </p>
      <ol className="st-bubbles">
        {chat.map((c, i) => (
          <li className={c.w === 'z' ? 'is-z' : 'is-a'} key={i}>
            <small>{c.w === 'z' ? 'Zákazník' : 'Asistent webu'}</small>
            {c.x}
          </li>
        ))}
      </ol>
      <p>
        <b>Proč rozpětí.</b> Odhad vychází z ceníku firmy a z fotek. Co se pozná jen na místě, do něj nepatří. Raději poctivé rozpětí než slib, který se
        mění. První odhady byly o něco nižší než skutečnost, tak jsme je doladili na dřívějších zakázkách.
      </p>
      <p>
        <b>Co zůstalo na technicích.</b> Obhlídka u vážných zájemců a závazná cena.
      </p>
      <StoryEnd />
    </article>
  );
}
