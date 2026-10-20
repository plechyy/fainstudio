'use client';

import type { cases } from '@/lib/content';
import CoachLive from './CoachLive';
import ContractLive from './ContractLive';
import DunningLive from './DunningLive';
import MasterLive from './MasterLive';
import MeetingLive from './MeetingLive';
import PhotoLive from './PhotoLive';
import RealtyLive from './RealtyLive';

type Item = (typeof cases.items)[number];

/* živá scéna případu: stejný 3D styl jako v sekci 2, každá ukazuje, co systém u té firmy dělá */
export default function Live({ v }: { v: Item['visual'] }) {
  switch (v.type) {
    case 'feed':
      return <RealtyLive v={v} />;
    case 'score':
      return <CoachLive v={v} />;
    case 'photo':
      return <PhotoLive v={v} />;
    case 'contract':
      return <ContractLive v={v} />;
    case 'brain':
      return <MasterLive v={v} />;
    case 'meeting':
      return <MeetingLive v={v} />;
    case 'dunning':
      return <DunningLive v={v} />;
  }
}
