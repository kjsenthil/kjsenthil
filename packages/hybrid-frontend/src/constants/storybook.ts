import {
  AccountsHeaderCell,
  AccountsFooterCell,
} from '../components/organisms/AccountsTable/AccountsTable';
import { Breakdown } from '../services/myAccount/types';

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
    value: 'LIFETIME RETURN',
    tooltip:
      'Lifetime return shows how well your investments have performed since you have held them on Bestinvest. This includes both growth and income returns.',
  },
];

export const mockAccountsTableData: Breakdown[] = [
  {
    id: '20499',
    accountType: 'accounts',
    accountName: 'Stocks and Shares ISA',
    accountTotalHoldings: 38382.29,
    accountTotalContribution: 31994.9,
    accountCash: 0.03,
    accountReturn: 6837.39,
    accountReturnPercentage: 1.761,
  },
  {
    id: '20500',
    accountType: 'accounts',
    accountName: 'General Investment Account',
    accountTotalHoldings: 29011.63,
    accountTotalContribution: 23629.62,
    accountCash: 563.21,
    accountReturn: 5382.01,
    accountReturnPercentage: 8.55,
  },
  {
    id: '20871',
    accountType: 'accounts',
    accountName: 'Self Invested Personal Pension',
    accountTotalHoldings: 80394.6,
    accountTotalContribution: 65101.86,
    accountCash: 0.0,
    accountReturn: 15292.74,
    accountReturnPercentage: 1.761,
  },
];

export const mockAccountsTableFooterData: AccountsFooterCell[] = [
  'TOTAL',
  '£150000',
  '$100000',
  '600%',
];
