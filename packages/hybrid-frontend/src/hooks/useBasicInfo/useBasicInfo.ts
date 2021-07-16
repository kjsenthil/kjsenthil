import { useSelector } from 'react-redux';
import { calculateInvestableCash } from '../../services/myAccount/utils';
import { RootState } from '../../store';
import calculateAgeToday from '../../utils/date/calculateAgeToday';
import useInvestmentAccounts from '../useInvestmentAccounts';
import useStateIsAvailable from '../useStateIsAvailable';

export interface BasicInfo {
  totalInvested: number;
  totalGainLoss: number;
  totalInvestableCash: number;
  dateOfBirth: string;
  clientAge: number;
  firstName: string;
  lastName: string;
  isLoading: boolean;
}

const useBasicInfo = (): BasicInfo => {
  const { client } = useSelector((state: RootState) => ({
    client: state.client.data,
    investmentSummary: state.investmentSummary.data,
  }));

  const isBasicInfoLoading = !useStateIsAvailable([
    'client',
    'investmentSummary',
    'investmentAccounts',
  ]);
  const { accountsSummary, investmentAccounts } = useInvestmentAccounts();

  if (!client || !investmentAccounts) {
    return {
      totalGainLoss: 0,
      totalInvested: 0,
      totalInvestableCash: 0,
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      clientAge: 31,
      isLoading: isBasicInfoLoading,
    };
  }

  const totalInvestableCash = calculateInvestableCash(investmentAccounts || []);

  return {
    totalGainLoss: accountsSummary.totalGainLoss,
    totalInvested: accountsSummary.totalInvested,
    totalInvestableCash,
    firstName: client.attributes.firstName,
    lastName: client.attributes.lastName,
    dateOfBirth: client.attributes.dateOfBirth,
    clientAge: calculateAgeToday(new Date(client.attributes.dateOfBirth)),
    isLoading: false,
  };
};

export default useBasicInfo;
