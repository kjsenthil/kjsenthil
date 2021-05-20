import api from '../../api';
import { API_ENDPOINTS } from '../../../config';
import { AccountData, InvestmentSummaryAccountsResponse, MyAccountItem } from '../types';

export default async (clientAccounts: MyAccountItem[]): Promise<AccountData[]> => {
  const accountIds = clientAccounts.map((account) => account.id);

  const path = `${API_ENDPOINTS.MYACCOUNT_INVESTMENT_SUMMARY_ACCOUNTS}?filter[id]=${accountIds.join(
    ','
  )}`;

  const response = await api.get<InvestmentSummaryAccountsResponse>(path);

  // sum the cash, funds and shares values to calculate an overall value for each account
  return response.data.data.map((account) => {
    const accountName =
      clientAccounts.find((clientAccount) => clientAccount.id === account.id)?.name || '';
    return {
      id: account.id,
      accountName,
      accountValue: account.attributes.cash + account.attributes.funds + account.attributes.shares,
    };
  });
};
