import * as React from 'react';
import StepCardExperimental from '../../../organisms/StepCardExperimental';
import AccountsTable from '../../../organisms/AccountsTable';
import { AccountsTableProps } from '../../../organisms/AccountsTable/AccountsTable';

export interface FundingStepCardOneProps {
  accountsTableProps: AccountsTableProps;
}

export default function FundingStepCardOne({ accountsTableProps }: FundingStepCardOneProps) {
  return (
    <StepCardExperimental
      step={1}
      title="Which accounts would you like to contribute to your retirement pot?"
      childrenFullWidth
    >
      <AccountsTable {...accountsTableProps} />
    </StepCardExperimental>
  );
}
