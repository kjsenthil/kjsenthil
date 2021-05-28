import api from '../../api';
import { API_ENDPOINTS } from '../../../config';
import { InvestmentSummaryResponse, ClientAccountItem } from '../types';
import { AccountData } from '../../types';

const getInvestAccounts = async (clientAccounts: ClientAccountItem[]): Promise<AccountData[]> => {
  const accountIds = clientAccounts.map((account) => account.id);

  const path = `${API_ENDPOINTS.MYACCOUNT_INVESTMENT_SUMMARY_ACCOUNTS}?filter[id]=${accountIds.join(
    ','
  )}`;

  const response = await api.get<InvestmentSummaryResponse>(path);

  // sum the cash, funds and shares values to calculate an overall value for each account
  return response.data.data.map((account) => {
    const accountName =
      clientAccounts.find((clientAccount) => clientAccount.id === account.id)?.name || '';
    return {
      id: account.id,
      accountName,
      accountCash: account.attributes.cash,
      accountTotalHoldings:
        account.attributes.cash + account.attributes.funds + account.attributes.shares,
      accountReturn: account.attributes.gainLoss,
      accountReturnPercentage: account.attributes.gainLossPercent,
    };
  });
};

export default getInvestAccounts;
