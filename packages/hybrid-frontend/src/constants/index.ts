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

export const sessionTokenValue = 'HYBRID-LOGIN-SESSION';
export const xplanSessionTokenValue = 'XPLAN-HYBRID-LOGIN-SESSION';

export const initStatePins = [
  {
    position: 2,
    value: 2,
  },
  {
    position: 4,
    value: 4,
  },
  {
    position: 6,
    value: 6,
  },
];

export const UnauthorizedText = '401 Unauthorized';

export enum ApiAppName {
  myAccounts = 'MyAccountsApi',
  ois = 'OisApi',
}
