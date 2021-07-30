import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { fetchClient, fetchInvestmentSummary, InvestmentSummary } from '../../services/myAccount';
import useStateIsLoading from '../useStateIsLoading';
import useStateIsAvailable from '../useStateIsAvailable';

export interface InvestmentAccountsProps {
  investmentSummary?: InvestmentSummary[];
}

const useInvestmentSummary = (
  { shouldDispatch }: { shouldDispatch: boolean } = { shouldDispatch: true }
): InvestmentAccountsProps => {
  const { investmentSummary } = useSelector((state: RootState) => ({
    investmentSummary: state.investmentSummary.data,
  }));

  const isInvestmentSummaryLoading = useStateIsLoading('investmentSummary');
  const isClientAvailable = useStateIsAvailable('client');
  const isInvestmentSummaryAvailable = useStateIsAvailable('investmentSummary');

  const dispatch = useDispatch();

  useEffect(() => {
    if (shouldDispatch && !isClientAvailable) {
      dispatch(fetchClient());
    }
  }, []);

  useEffect(() => {
    if (
      shouldDispatch &&
      isClientAvailable &&
      !isInvestmentSummaryAvailable &&
      !isInvestmentSummaryLoading
    ) {
      dispatch(fetchInvestmentSummary());
    }
  }, [isClientAvailable, isInvestmentSummaryAvailable, isInvestmentSummaryLoading]);

  return {
    investmentSummary,
  };
};

export default useInvestmentSummary;
