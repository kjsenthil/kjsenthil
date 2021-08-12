import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { API_ENDPOINTS } from '../../../config';
import { mockInvestmentAccountsData } from '../../myAccount/mocks';
import getPortfolioAssetAllocation from './getPortfolioAssetAllocation';

const mockAxios = new MockAdapter(axios);
const url = API_ENDPOINTS.PROJECTIONS_PORTFOLIO_ASSET_ALLOCATION;

describe('getPortfolioAssetAllocation', () => {
  it(`makes a call to ${url}`, async () => {
    const mockAllocation = {
      portfolioEquityPercentage: 40,
      portfolioCashPercentage: 20,
    };
    mockAxios
      .onPost(
        url,
        mockInvestmentAccountsData.map((investmentAccountData) => ({
          ...investmentAccountData,
          accountValue: investmentAccountData.accountTotalHoldings,
        }))
      )
      .reply(200, mockAllocation);

    const response = await getPortfolioAssetAllocation(mockInvestmentAccountsData);

    expect(response).toStrictEqual(mockAllocation.portfolioEquityPercentage);
  });
});
