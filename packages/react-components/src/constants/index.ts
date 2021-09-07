import { AccountsHeaderCell } from '../components/organisms/AccountsTable/AccountsTable';
import { DataPeriodTooltip, StaticTooltips } from './tooltips';

export enum AccountType {
  ISA = 'isa',
  GIA = 'gia',
}

export const AccountsTableHeader = (humanizedDataPeriod: string): AccountsHeaderCell[] => [
  {
    value: 'ACCOUNT',
  },
  {
    value: 'INVESTMENTS',
    tooltip: StaticTooltips.investments,
  },
  {
    value: 'CASH',
  },
  {
    value: 'TOTAL VALUE',
    tooltip: StaticTooltips.totalValue,
  },
  {
    value: 'LIFETIME RETURN',
    tooltip: StaticTooltips.lifetimeReturn,
  },
  {
    value: 'ANNUALISED RETURN',
    tooltip: StaticTooltips.annualisedReturn,
  },
  {
    value: `LAST ${humanizedDataPeriod.toUpperCase()} RETURN`,
    tooltip: DataPeriodTooltip(humanizedDataPeriod),
  },
];
