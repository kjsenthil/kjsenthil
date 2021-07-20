import { AccountsHeaderCell } from '../components/organisms/AccountsTable/AccountsTable';

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

export const AccountsTableHeader = (
  labelReturn: string = 'LIFETIME RETURN'
): AccountsHeaderCell[] => [
  {
    value: 'ACCOUNT',
  },
  {
    value: 'TOTAL HOLDINGS',
    tooltip: 'Total Holdings = Investments plus Cash',
  },
  {
    value: 'NET CONTRIBUTIONS',
    tooltip: 'Total net contribution = Contributions minus Withdrawals',
  },
  {
    value: 'CASH',
  },
  {
    value: labelReturn,
    tooltip:
      'Lifetime return shows how well your investments have performed since you have held them on Bestinvest. This includes both growth and income returns.',
  },
];
