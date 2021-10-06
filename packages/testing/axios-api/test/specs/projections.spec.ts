import axios from 'axios';
import { expect } from 'chai';
import { assert, object, number, string, array, any } from 'superstruct';
import apiEndpoint from '../utils/apiBuilder';
import API_ENDPOINTS from '../utils/apiEndPoints';
import assetsPayload from '../payloads/projections/assets';
import portfolioRiskProfilePayload from '../payloads/projections/portfolioRiskProfile';
import portfolioAssetAllocationPayload from '../payloads/projections/portfolioAssetAllocation';

describe('Projections endpoints scenarios', () => {
  let headers: object;

  before(() => {
    headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
    };
  });

  it('should return the expected schema for asset projections', async () => {
    // arrange
    const apiUrl = apiEndpoint.getBaseUrl().path(API_ENDPOINTS.POST_PROJECTIONS);
    const expectedSchema = object({
      contributions: number(),
      projections: array(
        object({
          year: number(),
          low: number(),
          medium: number(),
          high: number(),
          actual: number(),
        })
      ),
    });
    // act
    const response = await axios.post(apiUrl, assetsPayload, {
      headers,
    });
    // assert
    expect(response.status).to.equal(200);
    assert(response.data, expectedSchema);
  });

  it('should return the expected schema for portfolio risk profile', async () => {
    // arrange
    const apiUrl = apiEndpoint.getBaseUrl().path(API_ENDPOINTS.PROJECTIONS_PORTFOLIO_RISK_PROFILE);
    const expectedSchema = object({
      riskModel: string(),
      sedol: string(),
    });
    // act
    const response = await axios.post(apiUrl, portfolioRiskProfilePayload, {
      headers,
    });
    // assert
    expect(response.status).to.equal(200);
    assert(response.data, expectedSchema);
  });

  it('should return the expected schema for tilney asset model', async () => {
    // arrange
    const riskName = 'TAA7';
    const apiUrl = apiEndpoint
      .getBaseUrl()
      .path(API_ENDPOINTS.TILNEY_ASSET_MODEL.replace('{riskName}', riskName));
    const expectedSchema = object({
      id: number(),
      riskModel: string(),
      erValue: number(),
      volatility: number(),
      zScores: object({
        MoreLikelyLB: number(),
        MoreLikelyUB: number(),
        LessLikleyLB: number(),
        LessLikelyUB: number(),
      }),
    });
    // act
    const response = await axios.get(apiUrl, {
      headers,
    });
    // assert
    expect(response.status).to.equal(200);
    assert(response.data, expectedSchema);
  });

  it('should return the expected schema for portfolio asset allocation', async () => {
    // arrange
    const apiUrl = apiEndpoint
      .getBaseUrl()
      .path(API_ENDPOINTS.PROJECTIONS_PORTFOLIO_ASSET_ALLOCATION);
    const expectedSchema = object({
      portfolioEquityPercentage: number(),
      portfolioCashPercentage: number(),
    });
    // act
    const response = await axios.post(apiUrl, portfolioAssetAllocationPayload, {
      headers,
    });
    // assert
    expect(response.status).to.equal(200);
    assert(response.data, expectedSchema);
  });

  it('should return the expected schema for standing data', async () => {
    // arrange
    const apiUrl = apiEndpoint.getBaseUrl().path(API_ENDPOINTS.GET_STANDING_DATA);
    const expectedSchema = object({
      tilneyStandingData: array(
        object({
          id: number(),
          sedol: string(),
          category: string(),
          taamodel: string(),
          unitType: string(),
          investmentCodeName: string(),
          minimumInvestmentAmount: number(),
        })
      ),
      contributionsSettings: array(
        object({
          name: string(),
          value: string(),
        })
      ),
    });
    // act
    const response = await axios.get(apiUrl, {
      headers,
    });
    // assert
    expect(response.status).to.equal(200);
    assert(response.data, expectedSchema);
  });

  it('should return the expected schema for Asset Allocation', async () => {
    // arrange
    const sedol = 'BYX8KL9';
    const apiUrl = apiEndpoint
      .getBaseUrl()
      .path(API_ENDPOINTS.GET_ASSET_ALLOCATION_BREAKDOWN.replace('{sedol}', sedol));

    const expectedSchema = array(
      object({
        assetallocation: array(
          object({
            name: string(),
            proportion: number(),
          })
        ),
        toptenholdings: any(),
        performance: object({
          year1: number(),
          year2: number(),
          year3: number(),
          year4: number(),
          year5: any(),
        }),
      })
    );
    // act
    const response = await axios.get(apiUrl, {
      headers,
    });
    // assert
    expect(response.status).to.equal(200);
    assert(response.data, expectedSchema);
  });
});
