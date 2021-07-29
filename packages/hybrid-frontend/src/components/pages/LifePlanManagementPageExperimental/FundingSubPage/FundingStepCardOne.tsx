import * as React from 'react';
import StepCardExperimental from '../../../organisms/StepCardExperimental';
import AccountsTable from '../../../organisms/AccountsTable';
import { AccountsTableProps } from '../../../organisms/AccountsTable/AccountsTable';

export interface FundingStepCardOneProps {
  accountsTableProps: AccountsTableProps;
}

const FundingStepCardOne = React.forwardRef(
  ({ accountsTableProps }: FundingStepCardOneProps, ref) => (
    <StepCardExperimental
      ref={ref}
      step={1}
      title="Which accounts would you like to contribute to your retirement pot?"
      childrenFullWidth
    >
      <AccountsTable {...accountsTableProps} />
    </StepCardExperimental>
  )
);

export default FundingStepCardOne;
