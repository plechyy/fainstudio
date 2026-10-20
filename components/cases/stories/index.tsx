'use client';

import CoachStory from './CoachStory';
import ContractStory from './ContractStory';
import DunningStory from './DunningStory';
import MasterStory from './MasterStory';
import MeetingStory from './MeetingStory';
import PhotoStory from './PhotoStory';
import RealtyStory from './RealtyStory';

/*
 * Průběh spolupráce u každého případu. Každá studie je napsaná a postavená zvlášť:
 * jiný tvar (stopky, kapitoly, přepis, smlouva, rozhovory, krátký text, tabulka)
 * i jiná délka, protože každý případ má jiný příběh.
 */
export default function Story({ id, title }: { id: string; title: string }) {
  switch (id) {
    case 'reality':
      return <RealtyStory id={id} title={title} />;
    case 'kouc':
      return <CoachStory id={id} title={title} />;
    case 'fotka':
      return <PhotoStory id={id} title={title} />;
    case 'smlouvy':
      return <ContractStory id={id} title={title} />;
    case 'knowhow':
      return <MasterStory id={id} title={title} />;
    case 'porady':
      return <MeetingStory id={id} title={title} />;
    case 'upominky':
      return <DunningStory id={id} title={title} />;
    default:
      return null;
  }
}
