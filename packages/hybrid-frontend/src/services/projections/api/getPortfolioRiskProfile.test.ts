import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { API_ENDPOINTS } from '../../../config';
import { RiskModel, SedolCode } from '../../types';
import { PortfolioRiskProfile, RiskProfileData } from '../types';
import getPortfolioRiskProfile from './getPortfolioRiskProfile';

const mockAxios = new MockAdapter(axios);
const url = API_ENDPOINTS.PROJECTIONS_PORTFOLIO_RISK_PROFILE;

describe('getPortfolioRiskProfile', () => {
  it(`makes a call to ${url}`, async () => {
    const mockProfileData: RiskProfileData = {
      portfolioEquityPercentage: 40,
      equityFunds: [
        {
          riskModel: RiskModel.TAA1,
          sedol: SedolCode.BFY1N37,
          equityProportion: 10,
        },
        {
          riskModel: RiskModel.TAA3,
          sedol: SedolCode.BFY1NH1,
          equityProportion: 20,
        },
      ],
    };

    const mockRiskProfileResponse: PortfolioRiskProfile = {
      riskModel: RiskModel.TAA1,
      sedol: SedolCode.BFY1N37,
    };

    mockAxios.onPost(url, mockProfileData).reply(200, mockRiskProfileResponse);

    const response = await getPortfolioRiskProfile(mockProfileData);

    expect(response).toStrictEqual(mockRiskProfileResponse);
  });
});
