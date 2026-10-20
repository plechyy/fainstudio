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
export default function Story({ id }: { id: string }) {
  switch (id) {
    case 'reality':
      return <RealtyStory />;
    case 'kouc':
      return <CoachStory />;
    case 'fotka':
      return <PhotoStory />;
    case 'smlouvy':
      return <ContractStory />;
    case 'knowhow':
      return <MasterStory />;
    case 'porady':
      return <MeetingStory />;
    case 'upominky':
      return <DunningStory />;
    default:
      return null;
  }
}
