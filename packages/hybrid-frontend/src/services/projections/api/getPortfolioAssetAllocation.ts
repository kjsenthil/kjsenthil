import api from '../../api';
import { API_ENDPOINTS } from '../../../config';
import { AccountData } from '../../types';

const getPortfolioAssetAllocation = async (accounts: AccountData[]): Promise<number> => {
  const path = API_ENDPOINTS.PROJECTIONS_PORTFOLIO_ASSET_ALLOCATION;

  const response = await api.post(path, accounts);

  return response.data.portfolioEquityPercentage;
};

export default getPortfolioAssetAllocation;
