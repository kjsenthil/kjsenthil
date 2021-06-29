import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import calculateAgeToday from '../../utils/date/calculateAgeToday/index';
import {
  calculateBasicInvestmentSummary,
  fetchClient,
  fetchInvestmentSummary,
} from '../../services/myAccount';

export interface BasicInfo {
  totalInvested: number;
  totalGainLoss: number;
  dateOfBirth: string;
  clientAge: number;
  firstName: string;
  lastName: string;
  isLoading: boolean;
}

const useBasicInfo = (): BasicInfo => {
  const { client, investmentSummary, clientStatus, investmentStatus } = useSelector(
    (state: RootState) => ({
      client: state.client.data,
      clientStatus: state.client.status,
      investmentSummary: state.investmentSummary.data,
      investmentStatus: state.investmentSummary.status,
    })
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (client && !investmentSummary) {
      dispatch(fetchInvestmentSummary());
    }
  }, [client, investmentSummary]);

  useEffect(() => {
    if (!client) {
      dispatch(fetchClient());
    }
  }, []);

  const isBasicInfoLoading = clientStatus === 'loading' || investmentStatus === 'loading';

  if (!client || !investmentSummary) {
    return {
      totalGainLoss: 0,
      totalInvested: 0,
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      clientAge: 31,
      isLoading: isBasicInfoLoading,
    };
  }

  const { totalInvested, totalGainLoss } = calculateBasicInvestmentSummary(investmentSummary);

  return {
    totalInvested,
    totalGainLoss,
    firstName: client.attributes.firstName,
    lastName: client.attributes.lastName,
    dateOfBirth: client.attributes.dateOfBirth,
    clientAge: calculateAgeToday(new Date(client.attributes.dateOfBirth)),
    isLoading: isBasicInfoLoading,
  };
};

export default useBasicInfo;
