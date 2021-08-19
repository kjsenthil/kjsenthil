import React from 'react';
import { useSelector } from 'react-redux';
import { AccountSummaryPanel } from '@tsw/react-components';
import { RootState } from '../../../store';
import { AccountDetailsLayout } from '../../templates';
import { useBasicInfo } from '../../../hooks';
import useInvestmentSummary from '../../../hooks/useInvestmentSummary';

const AddCashPage = () => {
  const basicInfo = useBasicInfo();
  // TODO - select this dynamically
  const { investmentSummary } = useInvestmentSummary();
  const { investmentAccounts } = useSelector((state: RootState) => ({
    investmentAccounts: state.investmentAccounts.data,
  }));
  const accountId = investmentAccounts?.find((item) => item.id)?.id;
  const selectedAccount = investmentSummary?.find((item) => item.id === accountId)?.attributes;

  const cash = selectedAccount ? selectedAccount?.cash : 0;
  const investment = selectedAccount ? selectedAccount?.funds + selectedAccount?.shares : 0;
  const total = selectedAccount
    ? selectedAccount?.cash + selectedAccount?.funds + selectedAccount?.shares
    : 0;

  return (
    <AccountDetailsLayout basicInfo={basicInfo}>
      <AccountSummaryPanel cashValue={cash} investmentValue={investment} totalValue={total} />
    </AccountDetailsLayout>
  );
};

export default AddCashPage;
