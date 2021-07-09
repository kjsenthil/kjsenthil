import { AccountsTableHeader } from '../../../../constants';
import { AccountsFooterCell, AccountsHeaderCell } from '../AccountsTable';

export const mockAccountsTableHeader: AccountsHeaderCell[] = AccountsTableHeader;

export const mockAccountsTableData = [
  {
    id: '20499',
    accountType: 'accounts',
    accountName: 'Stocks and Shares ISA',
    accountTotalHoldings: 38382.29,
    accountTotalNetContribution: 31994.9,
    accountCash: 0.03,
    accountReturn: 6837.39,
    accountReturnPercentage: 1.761,
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
  },
];

export const mockAccountsTableFooterData: AccountsFooterCell[] = [
  'TOTAL',
  '£150000',
  '$100000',
  '600%',
];
