import {
  AccountsHeaderCell,
  AccountsRowCell,
} from '../components/organisms/AccountsTable/AccountsTable';

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
