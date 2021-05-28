import api from '../../api';
import { API_ENDPOINTS } from '../../../config';
import { ClientAccountItem, InvestmentSummaryResponse } from '../types';

const getInvestmentSummary = async (clientAccounts: ClientAccountItem[]) => {
  const accountIds = clientAccounts.map((account) => account.id);

  const path = `${API_ENDPOINTS.MYACCOUNT_INVESTMENT_SUMMARY_ACCOUNTS}?filter[id]=${accountIds.join(
    ','
  )}`;

  const response = await api.get<InvestmentSummaryResponse>(path);

  return response.data;
};

export default getInvestmentSummary;
