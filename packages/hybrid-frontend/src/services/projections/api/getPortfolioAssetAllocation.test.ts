import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { API_ENDPOINTS } from '../../../config';
import { mockInvestAccounts } from '../../myAccount/mocks';
import getPortfolioAssetAllocation from './getPortfolioAssetAllocation';

const mockAxios = new MockAdapter(axios);
const url = API_ENDPOINTS.PROJECTIONS_PORTFOLIO_ASSET_ALLOCATION;

describe('getPortfolioAssetAllocation', () => {
  it(`makes a call to ${url}`, async () => {
    const mockAllocation = {
      portfolioEquityPercentage: 40,
    };
    mockAxios.onPost(url, mockInvestAccounts).reply(200, mockAllocation);

    const response = await getPortfolioAssetAllocation(mockInvestAccounts);

    expect(response).toStrictEqual(mockAllocation.portfolioEquityPercentage);
  });
});
