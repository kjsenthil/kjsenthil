import React from 'react';
import { useSelector } from 'react-redux';
import { AccountSummaryPanel } from '@tswdts/react-components';
import { RootState } from '../../../store';
import { AccountDetailsLayout } from '../../templates';
import { useBasicInfo } from '../../../hooks';
import useInvestmentSummary from '../../../hooks/useInvestmentSummary';

const AddCashPage = () => {
  const basicInfo = useBasicInfo();
  const { investmentSummary } = useInvestmentSummary();
  const { selectedAccount } = useSelector((state: RootState) => ({
    selectedAccount: state.selectedAccount.account,
  }));
  const accountId = selectedAccount?.id;
  const account = investmentSummary?.find((item) => item.id === accountId)?.attributes;

  const cash = account ? account?.cash : 0;
  const investment = account ? account?.funds + account?.shares : 0;
  const total = account ? account?.cash + account?.funds + account?.shares : 0;

  return (
    <AccountDetailsLayout basicInfo={basicInfo}>
      <AccountSummaryPanel cashValue={cash} investmentValue={investment} totalValue={total} />
    </AccountDetailsLayout>
  );
};

export default AddCashPage;
