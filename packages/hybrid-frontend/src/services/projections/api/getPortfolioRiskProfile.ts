import api from '../../api';
import { API_ENDPOINTS } from '../../../config';
import { PortfolioRiskProfile, RiskProfileData } from '../types';

const getPortfolioRiskProfile = async (
  portfolioData: RiskProfileData
): Promise<PortfolioRiskProfile> => {
  const path = API_ENDPOINTS.PROJECTIONS_PORTFOLIO_RISK_PROFILE;

  const response = await api.post<PortfolioRiskProfile>(path, portfolioData);
  return response.data;
};

export default getPortfolioRiskProfile;
