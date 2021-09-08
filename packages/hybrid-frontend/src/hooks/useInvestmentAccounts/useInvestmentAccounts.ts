import { AccountFilterSelection, InvestmentAccount } from '@tswdts/react-components';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  BasicInvestmentSummary,
  fetchClient,
  fetchInvestmentAccounts,
  fetchInvestmentSummary,
} from '../../services/myAccount';
import { fetchPerformanceAccountsAggregated } from '../../services/performance';
import { fetchAnnualisedReturnSummary } from '../../services/returns/thunks';
import { RootState } from '../../store';
import useStateIsAvailable from '../useStateIsAvailable';
import useStateIsLoading from '../useStateIsLoading';
import filterAccounts from './filterAccounts';

export interface InvestmentAccounts {
  accountsSummary: BasicInvestmentSummary;
  investmentAccounts?: InvestmentAccount[];
  hasLinkedAccounts: boolean;
}

const useInvestmentAccounts = (
  { shouldDispatch }: { shouldDispatch: boolean } = {
    shouldDispatch: false,
  },
  selectedFilter: AccountFilterSelection = AccountFilterSelection.ALL_ACCOUNTS
): InvestmentAccounts => {
  const { contactId, investmentAccounts, performanceData } = useSelector((state: RootState) => ({
    contactId: state.auth.contactId,
    investmentAccounts: state.investmentAccounts.data,
    performanceData: state.performance.data?.attributes,
  }));

  const isPerformanceLoading = useStateIsLoading('performance');
  const isPerformanceAvailable = useStateIsAvailable('performance');
  const isInvestmentSummaryLoading = useStateIsLoading('investmentSummary');
  const isInvestmentSummaryAvailable = useStateIsAvailable('investmentSummary');
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
  }, [shouldDispatch, isClientAvailable, isPerformanceAvailable, isPerformanceLoading]);

  useEffect(() => {
    if (
      shouldDispatch &&
      isClientAvailable &&
      !isInvestmentSummaryAvailable &&
      !isInvestmentSummaryLoading
    ) {
      dispatch(fetchInvestmentSummary());
    }
  }, [shouldDispatch, isClientAvailable, isInvestmentSummaryAvailable, isInvestmentSummaryLoading]);

  useEffect(() => {
    if (
      shouldDispatch &&
      isClientAvailable &&
      isInvestmentSummaryAvailable &&
      !areAccountsAvailable &&
      !areAccountsLoading
    ) {
      dispatch(fetchInvestmentAccounts());
    }
  }, [
    shouldDispatch,
    isClientAvailable,
    isInvestmentSummaryAvailable,
    areAccountsAvailable,
    areAccountsLoading,
  ]);

  const accountsSummary = {
    totalInvested: performanceData?.accountValue || 0,
    totalGainLoss: performanceData?.performance.value || 0,
    totalGainLossPercentage: performanceData?.performance.percentage || 0,
  };

  const filteredAccounts = filterAccounts(selectedFilter, investmentAccounts);

  const hasLinkedAccounts =
    (investmentAccounts?.filter((account) => account.accountType === 'linked-accounts')?.length ??
      0) > 0;

  useEffect(() => {
    if (filteredAccounts) {
      const filteredAccountIds = filteredAccounts
        .filter((account) => !!account.id)
        .map((account) => Number(account.id!!));
      (async () => {
        await dispatch(fetchPerformanceAccountsAggregated(filteredAccountIds));
        await dispatch(fetchAnnualisedReturnSummary(filteredAccountIds));
      })();
    }
  }, [selectedFilter]);

  return {
    accountsSummary,
    investmentAccounts: filteredAccounts,
    hasLinkedAccounts,
  };
};

export default useInvestmentAccounts;
