import { InvestmentAccountData } from '@tswdts/react-components';
import api from '../../api';
import { API_ENDPOINTS } from '../../../config';
import { PortfolioAssetAllocationResponse } from '../types';

const getPortfolioAssetAllocation = async (
  investmentAccounts: InvestmentAccountData[]
): Promise<number> => {
  const path = API_ENDPOINTS.PROJECTIONS_PORTFOLIO_ASSET_ALLOCATION;

  const response = await api.post<PortfolioAssetAllocationResponse>(
    path,
    investmentAccounts.map((investmentAccount) => ({
      ...investmentAccount,

      // The API requires the total holdings field to be called 'accountValue':
      accountValue: investmentAccount.accountTotalHoldings,
    }))
  );

  return response.data.portfolioEquityPercentage ?? 0;
};

export default getPortfolioAssetAllocation;
