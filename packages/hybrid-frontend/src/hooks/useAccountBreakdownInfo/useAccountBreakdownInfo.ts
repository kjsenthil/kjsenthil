import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import {
  BasicInvestmentSummary,
  Breakdown,
  calculateBasicInvestmentSummary,
  fetchAccountBreakdown,
  fetchClient,
  fetchInvestmentSummary,
} from '../../services/myAccount';
import useStateIsLoading from '../useStateIsLoading';
import useStateIsAvailable from '../useStateIsAvailable';

export interface AccountBreakdownInfoProps {
  accountsSummary: BasicInvestmentSummary;
  accountBreakdown?: Breakdown[];
}

const useAccountBreakdownInfo = (): AccountBreakdownInfoProps => {
  const { investmentSummary, accountBreakdown } = useSelector((state: RootState) => ({
    investmentSummary: state.investmentSummary.data,
    accountBreakdown: state.accountBreakdown.data,
  }));

  const isInvestmentSummaryLoading = useStateIsLoading('investmentSummary');
  const isClientAvailable = useStateIsAvailable('client');
  const isInvestmentSummaryAvailable = useStateIsAvailable('investmentSummary');
  const isAccountBreakdownAvailable = useStateIsAvailable('accountBreakdown');
  const isAccountBreakdowLoading = useStateIsLoading('accountBreakdown');

  const dispatch = useDispatch();

  useEffect(() => {
    if (!isClientAvailable) {
      dispatch(fetchClient());
    }
  }, []);

  useEffect(() => {
    if (isClientAvailable && !isInvestmentSummaryAvailable && !isInvestmentSummaryLoading) {
      dispatch(fetchInvestmentSummary());
    }
  }, [isClientAvailable, isInvestmentSummaryAvailable, isInvestmentSummaryLoading]);

  useEffect(() => {
    if (
      isClientAvailable &&
      isInvestmentSummaryAvailable &&
      !isAccountBreakdownAvailable &&
      !isAccountBreakdowLoading
    ) {
      dispatch(fetchAccountBreakdown());
    }
  }, [isClientAvailable, isInvestmentSummaryAvailable, isAccountBreakdowLoading]);

  const accountsSummary = calculateBasicInvestmentSummary(investmentSummary || []);

  return {
    accountsSummary,
    accountBreakdown,
  };
};

export default useAccountBreakdownInfo;
