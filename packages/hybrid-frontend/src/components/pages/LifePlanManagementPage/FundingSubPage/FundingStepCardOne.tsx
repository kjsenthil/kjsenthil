import * as React from 'react';
import { AccountsTable, AccountsTableProps, StepCard } from '@tswdts/react-components';

export interface FundingStepCardOneProps {
  accountsTableProps: AccountsTableProps;
}

const FundingStepCardOne = React.forwardRef(
  ({ accountsTableProps }: FundingStepCardOneProps, ref) => (
    <StepCard
      ref={ref}
      step={1}
      title="The following accounts will fund your retirement pot"
      childrenFullWidth
    >
      <AccountsTable {...accountsTableProps} />
    </StepCard>
  )
);

export default FundingStepCardOne;
