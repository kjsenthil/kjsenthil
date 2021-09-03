import { AccountsHeaderCell } from '../components/organisms/AccountsTable/AccountsTable';

export enum AccountType {
  ISA = 'isa',
  GIA = 'gia',
}

export const AccountsTableHeader = (
  labelReturn: string = 'LAST 5 YEARS RETURN'
): AccountsHeaderCell[] => [
  {
    value: 'ACCOUNT',
  },
  {
    value: 'INVESTMENTS',
    tooltip: 'The total current value of your investments.',
  },
  {
    value: 'CASH',
    tooltip: 'How much cash you have on account.',
  },
  {
    value: 'TOTAL HOLDINGS',
    tooltip: 'The total current value of your investments and cash.',
  },
  {
    value: 'LIFETIME RETURN',
    tooltip:
      'Lifetime return shows how well your investments have performed since you first held them on BestInvest. This includes both growth and income returns.',
  },
  {
    value: 'ANNUALISED RETURN',
    tooltip:
      'Return figure relates to the gain or loss over the specified period including the impact of fees',
  },
  {
    value: labelReturn,
    tooltip: 'The profit or loss you made last year, minus any fees.',
  },
];
