import React from 'react';
import { useSelector } from 'react-redux';
import { Grid, AccountSummaryPanel, AddCashCard, AddCashModal } from '@tswdts/react-components';
import { RootState } from '../../../store';
import { AccountDetailsLayout } from '../../templates';
import { useBasicInfo } from '../../../hooks';
import useInvestmentSummary from '../../../hooks/useInvestmentSummary';
import useIsaContribution from '../../../hooks/useIsaContribution';

const AddCashPage = () => {
  const basicInfo = useBasicInfo();
  const { investmentSummary } = useInvestmentSummary();
  const { isaContribution } = useIsaContribution();
  const { selectedAccount } = useSelector((state: RootState) => ({
    selectedAccount: state.selectedAccount.account,
  }));

  // TODO: replace this with actual values once confirmed for all account types and its mapping, 31/08/2021, ZEESHAN
  const addCashModalProps = {
    title: 'Add Cash',
    subTitle: 'STOCK & SHARE ISA',
    minAmount: 0,
  };
  const [addCashModalOpen, setAddCashModalOpen] = React.useState(false);
  const accountId = selectedAccount?.id;
  const account = investmentSummary?.find((item) => item.id === accountId)?.attributes;
  const selectedAccountType = selectedAccount?.accountName?.toLowerCase();

  const cash = account ? account?.cash : 0;
  const investment = account ? account?.funds + account?.shares : 0;
  const total = account ? account?.cash + account?.funds + account?.shares : 0;

  const isaContributions = isaContribution?.attributes;
  const totalAllowance = isaContributions?.allowance || 0;
  const contributions = isaContributions?.contributions || 0;
  const maxAmountAllowed = contributions - totalAllowance;

  const closeModalClickHandler = () => setAddCashModalOpen(false);
  return (
    <AccountDetailsLayout basicInfo={basicInfo}>
      <Grid container spacing={5}>
        <Grid item xs={12}>
          <AccountSummaryPanel
            cashValue={cash}
            investmentValue={investment}
            totalValue={total}
            isaTitle="ISA ALLOWANCE"
            accountType={selectedAccountType}
            isaAllowance={totalAllowance}
            isaContribution={contributions}
          />
        </Grid>
        <Grid item xs={12}>
          <AddCashCard
            selectedAccountName={selectedAccountType ?? ''}
            openModal={() => setAddCashModalOpen(true)}
          />
          <AddCashModal
            {...addCashModalProps}
            accountType={selectedAccountType}
            maxAmount={maxAmountAllowed}
            isOpen={addCashModalOpen}
            onClose={closeModalClickHandler}
          />
        </Grid>
      </Grid>
    </AccountDetailsLayout>
  );
};

export default AddCashPage;
