export enum FeatureFlagNames {
  EXP_FEATURE = 'expFeature',
  FEATURE_A = 'featureA',
  FEATURE_B = 'featureB',
}

export const TEALIUM_ENVIRONMENT = process.env.GATSBY_ACTIVE_ENV === 'production' ? 'prod' : 'dev';

export const UnauthorizedText = '401 Unauthorized';

export enum ApiAppName {
  myAccounts = 'MyAccountsApi',
  ois = 'OisApi',
  online = 'OnlineApi',
}

export enum DrawdownType {
  OneOff = 'One-off',
  Monthly = 'Monthly',
  Annual = 'Annual',
  Retirement = 'Retirement',
}
