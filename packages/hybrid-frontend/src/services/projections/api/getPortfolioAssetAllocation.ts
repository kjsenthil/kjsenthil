import api from '../../api';
import { API_ENDPOINTS } from '../../../config';
import { InvestmentAccountData } from '../../types';

const getPortfolioAssetAllocation = async (
  investmentAccounts: InvestmentAccountData[]
): Promise<number> => {
  const path = API_ENDPOINTS.PROJECTIONS_PORTFOLIO_ASSET_ALLOCATION;

  const response = await api.post(path, investmentAccounts);

  return response.data.portfolioEquityPercentage;
};

export default getPortfolioAssetAllocation;
