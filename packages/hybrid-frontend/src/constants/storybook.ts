import {
  AccountsHeaderCell,
  AccountsRowCell,
} from '../components/organisms/AccountsTable/AccountsTable';

/* eslint-disable import/prefer-default-export */
export const mockAccountsTableHeader: AccountsHeaderCell[] = [
  {
    value: 'ACCOUNT',
  },
  {
    value: 'TOTAL HOLDINGS',
    tooltip: 'Total Holdings = Investments Plus Cash',
  },
  {
    value: 'TOTAL CONTRIBUTIONS',
    tooltip: 'Total contribution = Contributions Minus Withdrawals',
  },
  {
    value: 'CASH',
  },
  {
    value: 'TOTAL RETURN',
    tooltip:
      'Lifetime return shows how well your investments have performed since you have held them on Bestinvest. This includes both growth and income returns.',
  },
];

export const mockAccountsTableData: AccountsRowCell[] = [
  {
    accountName: 'Stocks and Shares ISA',
    totalHoldings: 38382.29,
    totalContributions: 31994.9,
    cashValue: 0.03,
    totalReturn: 6837.39,
    totalReturnPct: 1.761,
  },
  {
    accountName: 'General Investment Account',
    totalHoldings: 29011.63,
    totalContributions: 23629.62,
    cashValue: 563.21,
    totalReturn: 5382.01,
    totalReturnPct: 8.55,
  },
  {
    accountName: 'Self Invested Personal Pension',
    totalHoldings: 80394.6,
    totalContributions: 65101.86,
    cashValue: 0.0,
    totalReturn: 15292.74,
    totalReturnPct: 1.761,
  },
];

export const mockProjectionResponse = {
  contributions: 74000.0,
  projections: [
    { year: 0, low: 2000.0, medium: 2000.0, high: 2000.0, actual: 2000.0 },
    { year: 1, low: 4099.872949574888, medium: 4468.0, high: 4819.92012729036, actual: 4400.0 },
    {
      year: 2,
      low: 6176.1690105491589880761165105,
      medium: 7019.912,
      high: 7791.3037220995442103325157998,
      actual: 6800.0,
    },
    {
      year: 3,
      low: 8234.216737667016817101837966,
      medium: 9658.589008,
      high: 10930.166047517421815041854989,
      actual: 9200.0,
    },
    {
      year: 4,
      low: 10296.841095398955887566732078,
      medium: 12386.981034272,
      high: 14223.210672545497854737034604,
      actual: 11600.0,
    },
    {
      year: 5,
      low: 12381.155383090810302097648194,
      medium: 15208.138389436957647058823529,
      high: 17662.661884453163813881737249,
      actual: 14000.0,
    },
    {
      year: 6,
      low: 14501.061059763807867433559124,
      medium: 18125.215094678229411764705882,
      high: 21243.860848576236670426424309,
      actual: 16400.0,
    },
  ],
};
