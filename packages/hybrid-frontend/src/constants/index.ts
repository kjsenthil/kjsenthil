export enum Goals {
  HOUSE = 'house',
  BABY = 'baby',
  HOLIDAY = 'holiday',
  UNIVERSITY = 'university',
}

export enum AccountType {
  ISA = 'isa',
  GIA = 'gia',
}

export enum FeatureFlags {
  FEATURE_A = 'featureA',
  FEATURE_B = 'featureB',
}

export { mockProjectionResponse } from './storybook';

export const TEALIUM_ENVIRONMENT = process.env.GATSBY_ACTIVE_ENV === 'production' ? 'prod' : 'dev';
