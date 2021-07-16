import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import {
  BasicInvestmentSummary,
  InvestmentAccount,
  calculateBasicInvestmentSummary,
  fetchInvestmentAccounts,
  fetchClient,
  fetchInvestmentSummary,
} from '../../services/myAccount';
import useStateIsLoading from '../useStateIsLoading';
import useStateIsAvailable from '../useStateIsAvailable';

export interface InvestmentAccountsProps {
  accountsSummary: BasicInvestmentSummary;
  investmentAccounts?: InvestmentAccount[];
}

const useInvestmentAccounts = (): InvestmentAccountsProps => {
  const { investmentSummary, investmentAccounts } = useSelector((state: RootState) => ({
    investmentSummary: state.investmentSummary.data,
    investmentAccounts: state.investmentAccounts.data,
  }));

  const isInvestmentSummaryLoading = useStateIsLoading('investmentSummary');
  const isClientAvailable = useStateIsAvailable('client');
  const isInvestmentSummaryAvailable = useStateIsAvailable('investmentSummary');
  const areAccountsAvailable = useStateIsAvailable('investmentAccounts');
  const areAccountsLoading = useStateIsLoading('investmentAccounts');

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
      !areAccountsAvailable &&
      !areAccountsLoading
    ) {
      dispatch(fetchInvestmentAccounts());
    }
  }, [isClientAvailable, isInvestmentSummaryAvailable, areAccountsLoading]);

  const accountsSummary = calculateBasicInvestmentSummary(investmentSummary || []);

  return {
    accountsSummary,
    investmentAccounts,
  };
};

export default useInvestmentAccounts;
