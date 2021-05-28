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

export interface AccountBreakdownInfoProps {
  accountsSummary: BasicInvestmentSummary;
  accountBreakdown?: Breakdown[];
}

const useAccountBreakdownInfo = (): AccountBreakdownInfoProps => {
  const { client, investmentSummary = undefined, accountBreakdown = undefined } = useSelector(
    (state: RootState) => ({
      client: state.client.data,
      investmentSummary: state.investmentSummary.data,
      accountBreakdown: state.accountBreakdown.breakdownData,
    })
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (!client) {
      dispatch(fetchClient());
    }
  }, []);

  useEffect(() => {
    if (client && !investmentSummary) {
      dispatch(fetchInvestmentSummary());
    }
  }, [client, investmentSummary]);

  useEffect(() => {
    if (client && investmentSummary && (!accountBreakdown || accountBreakdown.length <= 0)) {
      dispatch(fetchAccountBreakdown());
    }
  }, [client, investmentSummary, accountBreakdown]);

  const accountsSummary = calculateBasicInvestmentSummary(investmentSummary || []);

  return {
    accountsSummary,
    accountBreakdown,
  };
};

export default useAccountBreakdownInfo;
