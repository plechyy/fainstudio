import type { ComponentType } from 'react';
import Coach from './Coach';
import Contract from './Contract';
import Master from './Master';
import Meeting from './Meeting';
import Photo from './Photo';
import Realty from './Realty';

/* Tělo každého případu je napsané zvlášť, jiného tvaru i délky. Klíč je id případu. */
export const bodies: Record<string, ComponentType> = {
  reality: Realty,
  kouc: Coach,
  fotka: Photo,
  smlouvy: Contract,
  knowhow: Master,
  porady: Meeting,
};
