import React from 'react';
import {
  AccountSummaryPanel,
  AccountType,
  Spacer,
  WithDrawCashCard,
} from '@tswdts/react-components';
import { useSelector } from 'react-redux';
import { AccountDetailsLayout } from '../../templates';
import { useBasicInfo } from '../../../hooks';
import { RootState } from '../../../store';
import useInvestmentSummary from '../../../hooks/useInvestmentSummary';

const WithDrawCashPage = () => {
  const basicInfo = useBasicInfo();
  // TODO - select this dynamically
  const { investmentSummary } = useInvestmentSummary();
  const { investmentAccounts } = useSelector((state: RootState) => ({
    investmentAccounts: state.investmentAccounts.data,
  }));

  const { clientAccounts } = useSelector((state: RootState) => ({
    clientAccounts: state.client.included,
  }));

  const hasMoreThanOneAccount: boolean = !!investmentAccounts && investmentAccounts.length > 1;
  const hasGIAAccount = !!clientAccounts?.some(
    (item) => item.attributes.bestInvestAccount.toLowerCase() === AccountType.GIA
  );
  const canTransferCash: boolean = hasMoreThanOneAccount && hasGIAAccount;
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
      <Spacer y={2} />
      <WithDrawCashCard canTransferCash={canTransferCash} />
    </AccountDetailsLayout>
  );
};

export default WithDrawCashPage;
