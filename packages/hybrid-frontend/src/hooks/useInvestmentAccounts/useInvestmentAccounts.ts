import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { InvestmentAccount } from '@tsw/react-components';
import { RootState } from '../../store';
import {
  BasicInvestmentSummary,
  fetchInvestmentAccounts,
  fetchClient,
} from '../../services/myAccount';
import useStateIsLoading from '../useStateIsLoading';
import useStateIsAvailable from '../useStateIsAvailable';
import { fetchPerformanceAccountsAggregated } from '../../services/performance';

export interface InvestmentAccountsProps {
  accountsSummary: BasicInvestmentSummary;
  investmentAccounts?: InvestmentAccount[];
}

const useInvestmentAccounts = (
  { shouldDispatch }: { shouldDispatch: boolean } = { shouldDispatch: true }
): InvestmentAccountsProps => {
  const { contactId, investmentAccounts, performance } = useSelector((state: RootState) => ({
    contactId: state.auth.contactId,
    investmentAccounts: state.investmentAccounts.data,
    performance: state.performance.data?.attributes,
  }));

  const isPerformanceLoading = useStateIsLoading('performance');
  const isPerformanceAvailable = useStateIsAvailable('performance');
  const isClientAvailable = useStateIsAvailable('client');
  const areAccountsAvailable = useStateIsAvailable('investmentAccounts');
  const areAccountsLoading = useStateIsLoading('investmentAccounts');

  const dispatch = useDispatch();

  useEffect(() => {
    if (shouldDispatch && !isClientAvailable && contactId) {
      dispatch(fetchClient());
    }
  }, [shouldDispatch, isClientAvailable, contactId]);

  useEffect(() => {
    if (shouldDispatch && isClientAvailable && !isPerformanceAvailable && !isPerformanceLoading) {
      dispatch(fetchPerformanceAccountsAggregated());
    }
  }, [isClientAvailable, isPerformanceAvailable, isPerformanceLoading]);

  useEffect(() => {
    if (
      shouldDispatch &&
      isClientAvailable &&
      isPerformanceAvailable &&
      !areAccountsAvailable &&
      !areAccountsLoading
    ) {
      dispatch(fetchInvestmentAccounts());
    }
  }, [isClientAvailable, isPerformanceAvailable, areAccountsLoading]);

  const accountsSummary = {
    totalInvested: performance?.accountValue || 0,
    totalGainLoss: performance?.performance.value || 0,
    totalGainLossPercentage: performance?.performance.percentage || 0,
  };

  return {
    accountsSummary,
    investmentAccounts,
  };
};

export default useInvestmentAccounts;
