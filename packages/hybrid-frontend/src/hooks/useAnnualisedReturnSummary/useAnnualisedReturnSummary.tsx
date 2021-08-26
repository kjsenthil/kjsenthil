import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { fetchClient, fetchInvestmentSummary } from '../../services/myAccount';
import useStateIsLoading from '../useStateIsLoading';
import useStateIsAvailable from '../useStateIsAvailable';
import { AnnualisedReturnsResponse } from '../../services/returns';
import { fetchAnnualisedReturnSummary } from '../../services/returns/thunks';

export interface AnnualisedReturnsProps {
  annualisedReturnSummary?: AnnualisedReturnsResponse;
}

const useAnnualisedReturnSummary = (
  { shouldDispatch }: { shouldDispatch: boolean } = { shouldDispatch: true }
): AnnualisedReturnsProps => {
  const { annualisedReturnSummary } = useSelector((state: RootState) => ({
    annualisedReturnSummary: state.annualisedReturnSummary?.data,
  }));

  const isInvestmentSummaryLoading = useStateIsLoading('investmentSummary');
  const isAnnualisedReturnSummaryLoading = useStateIsLoading('annualisedReturnSummary');
  const isClientAvailable = useStateIsAvailable('client');
  const isInvestmentSummaryAvailable = useStateIsAvailable('investmentSummary');
  const isAnnualisedReturnSummaryAvailable = useStateIsAvailable('annualisedReturnSummary');

  const dispatch = useDispatch();

  useEffect(() => {
    if (shouldDispatch && !isClientAvailable) {
      dispatch(fetchClient());
    }
  }, [shouldDispatch && isClientAvailable]);

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
      !isAnnualisedReturnSummaryAvailable &&
      !isAnnualisedReturnSummaryLoading
    ) {
      dispatch(fetchAnnualisedReturnSummary());
    }
  }, [
    shouldDispatch,
    isClientAvailable,
    isInvestmentSummaryAvailable,
    isAnnualisedReturnSummaryAvailable,
  ]); // not adding isAnnualisedReturnSummaryLoading to avoid infinite call in case of API validation errors

  return { annualisedReturnSummary };
};

export default useAnnualisedReturnSummary;
