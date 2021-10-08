import { AccountsTableHeader } from '../../../../constants';
import { AccountsFooterCell, AccountsHeaderCell } from '../AccountsTable';

export const mockInvestmentAccountsTableHeader: AccountsHeaderCell[] = AccountsTableHeader(
  "5 years'"
);

const periodReturn = {
  '7d': {
    value: 100,
    percent: 10,
  },
  '1m': {
    value: 100,
    percent: 10,
  },
  '3m': {
    value: 100,
    percent: 10,
  },
  '6m': {
    value: 100,
    percent: 10,
  },
  '1y': {
    value: 100,
    percent: 10,
  },
  '5y': {
    value: 100,
    percent: 10,
  },
};

export const mockInvestmentAccountsTableData = [
  {
    id: '20499',
    accountType: 'accounts',
    accountName: 'Stocks and Shares ISA',
    accountTotalHoldings: 38382.29,
    accountTotalNetContribution: 31994.9,
    accountCash: 0.03,
    accountReturn: 6837.39,
    accountReturnPercentage: 1.761,
    accountInvestments: 123.23,
    accountLifetimeReturn: {
      value: 345.45,
      percent: 340,
    },
    periodReturn: {
      ...periodReturn,
      '5y': {
        value: 6837.39,
        percent: 1.761,
      },
    },
  },
  {
    id: '20500',
    accountType: 'accounts',
    accountName: 'General Investment Account',
    accountTotalHoldings: 29011.63,
    accountTotalNetContribution: 23629.62,
    accountCash: 563.21,
    accountReturn: 5382.01,
    accountReturnPercentage: 8.55,
    accountInvestments: 12.23,
    accountLifetimeReturn: {
      value: 34.45,
      percent: 34,
    },
    periodReturn: {
      ...periodReturn,
      '5y': {
        value: 5382.01,
        percent: 8.55,
      },
    },
  },
  {
    id: '20871',
    accountType: 'accounts',
    accountName: 'Self Invested Personal Pension',
    accountTotalHoldings: 80394.6,
    accountTotalNetContribution: 65101.86,
    accountCash: 0.0,
    accountReturn: 15292.74,
    accountReturnPercentage: 1.761,
    accountInvestments: 1.23,
    accountLifetimeReturn: {
      value: 3.45,
      percent: 3,
    },
    periodReturn: {
      ...periodReturn,
      '5y': {
        value: 15292.74,
        percent: 1.761,
      },
    },
  },
];

export const mockInvestmentAccountsTableFooterData: AccountsFooterCell[] = [
  'TOTAL',
  '£150000',
  '$100000',
  '600%',
];
