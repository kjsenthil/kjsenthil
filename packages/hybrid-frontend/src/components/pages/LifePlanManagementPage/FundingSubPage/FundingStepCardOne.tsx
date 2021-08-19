import * as React from 'react';
import { AccountsTable, AccountsTableProps, StepCard } from '@tsw/react-components';

export interface FundingStepCardOneProps {
  accountsTableProps: AccountsTableProps;
}

const FundingStepCardOne = React.forwardRef(
  ({ accountsTableProps }: FundingStepCardOneProps, ref) => (
    <StepCard
      ref={ref}
      step={1}
      title="Which accounts would you like to contribute to your retirement pot?"
      childrenFullWidth
    >
      <AccountsTable {...accountsTableProps} />
    </StepCard>
  )
);

export default FundingStepCardOne;
