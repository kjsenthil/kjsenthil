export enum AccountType {
  ISA = 'isa',
  GIA = 'gia',
}

export enum FeatureFlagNames {
  EXP_FEATURE = 'expFeature',
  FEATURE_A = 'featureA',
  FEATURE_B = 'featureB',
}

export const TEALIUM_ENVIRONMENT = process.env.GATSBY_ACTIVE_ENV === 'production' ? 'prod' : 'dev';

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
