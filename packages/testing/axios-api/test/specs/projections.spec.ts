import axios from "axios";
import { expect } from "chai";
import {
  assert,
  object,
  number,
  string,
  array,
} from "superstruct";
import { apiEndpoint } from "../utils/apiBuilder";
import { API_ENDPOINTS } from "../utils/apiEndPoints";
import assetsPayload from '../payloads/projections/assets'
import portfolioRiskProfilePayload from '../payloads/projections/portfolioRiskProfile'
import portfolioAssetAllocationPayload from '../payloads/projections/portfolioAssetAllocation'

describe("test projections endpoints", () => {
  let headers: object;

  before(() => {
    headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
    };
  });

  it("asset projections", async () => {
    // Arrange
    const apiUrl = apiEndpoint
      .getBaseUrl()
      .path(API_ENDPOINTS.POST_PROJECTIONS);
    const expectedSchema = object({
      contributions: number(),
      projections: array(object({
        year: number(),
        low: number(),
        medium: number(),
        high: number(),
        actual: number()
      })),
    })
    // Act
    const response = await axios.post(apiUrl, assetsPayload, {
      headers
    });
    // Assert
    expect(response.status).to.equal(200);
    assert(response.data, expectedSchema);
  });

  it("portfolio risk profile", async () => {
    // Arrange
    const apiUrl = apiEndpoint
      .getBaseUrl()
      .path(API_ENDPOINTS.PROJECTIONS_PORTFOLIO_RISK_PROFILE);
    const expectedSchema = object({
      riskModel: string(),
      sedol: string(),
    })
    // Act
    const response = await axios.post(apiUrl, portfolioRiskProfilePayload, {
      headers
    });
    // Assert
    expect(response.status).to.equal(200);
    assert(response.data, expectedSchema);
  });

  it("tilney asset model", async () => {
    // Arrange
    const riskName = 'TAA7'
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
    })
    // Act
    const response = await axios.get(apiUrl, {
      headers
    });
    // Assert
    expect(response.status).to.equal(200);
    assert(response.data, expectedSchema);
  });

  it.skip("portfolio asset allocation", async () => {
    // Arrange
    const apiUrl = apiEndpoint
      .getBaseUrl()
      .path(API_ENDPOINTS.PROJECTIONS_PORTFOLIO_ASSET_ALLOCATION);
    const expectedSchema = object({
      portfolioEquityPercentage: number(),
      portfolioCashPercentage: number()
    })
    // Act
    const response = await axios.post(apiUrl, portfolioAssetAllocationPayload, {
      headers
    });
    // Assert
    expect(response.status).to.equal(200);
    assert(response.data, expectedSchema);
  });
});
