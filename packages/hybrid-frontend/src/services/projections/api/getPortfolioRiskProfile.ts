import api from '../../api';
import { API_ENDPOINTS } from '../../../config';
import { RiskModel, SedolCode } from '../../types';

interface EquityFund {
  riskModel: RiskModel;
  sedol: SedolCode;
  equityProportion: number;
}

interface RiskProfileData {
  portfolioEquityPercentage: number;
  equityFunds: EquityFund[];
}

interface PortfolioRiskProfile {
  riskModel: RiskModel;
  sedol: SedolCode;
}

export default async (portfolioData: RiskProfileData): Promise<PortfolioRiskProfile> => {
  const path = API_ENDPOINTS.PROJECTIONS_PORTFOLIO_RISK_PROFILE;

  const response = await api.post<PortfolioRiskProfile>(path, portfolioData);
  return response.data;
};
