import { AccountsHeaderCell } from '../components/organisms/AccountsTable/AccountsTable';

export enum AccountType {
  ISA = 'isa',
  GIA = 'gia',
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
    value: 'ANNUALISED RETURN',
    tooltip:
      'Return figure relates to the gain or loss over the specified period including the impact of fees',
  },
  {
    value: labelReturn,
    tooltip:
      'Lifetime return shows how well your investments have performed since you have held them on Bestinvest. This includes both growth and income returns.',
  },
];
