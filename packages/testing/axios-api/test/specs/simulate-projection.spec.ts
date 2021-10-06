import axios from 'axios';
import { expect } from 'chai';
import { assert, object, number, array } from 'superstruct';
import apiEndpoint from '../utils/apiBuilder';
import API_ENDPOINTS from '../utils/apiEndPoints';

describe('Simulate projection endpoint scenarios', () => {
  let headers: object;
  const expectedSchema = object({
    projectionData: array(
      object({
        monthNo: number(),
        lower: number(),
        average: number(),
        upper: number(),
      })
    ),
    contributionData: array(
      object({
        monthNo: number(),
        value: number(),
      })
    ),
    goal: object({
      onTrack: object({
        percentage: number(),
        monthlyContributionsToReach: number(),
        upfrontContributionsToReach: number(),
        targetProjectionData: array(
          object({
            monthNo: number(),
            value: number(),
          })
        ),
      }),
      desiredDiscountedOutflow: number(),
      affordableUnDiscountedOutflowAverage: number(),
      shortfallSurplusAverage: number(),
      affordableUndiscountedOutflowUnderperform: number(),
      shortfallSurplusUnderperform: number(),
      drawdownRetirement: object({
        affordable: object({
          drawdown: number(),
          lumpSum: number(),
          remainingAmount: number(),
          totalDrawdown: number(),
        }),
        underperform: object({
          drawdown: number(),
          lumpSum: number(),
          remainingAmount: number(),
          totalDrawdown: number(),
        }),
      }),
    }),
  });

  before(() => {
    headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
    };
  });

  it('should return successful response with expected schema', async () => {
    // arrange
    const apiUrl = apiEndpoint.getBaseUrl().path(API_ENDPOINTS.SIMULATE_PROJECTIONS);
    const inboundPayload = {
      timeHorizonToProject: 500,
      monthlyContribution: 500,
      currentPortfolioValue: 250000,
      upfrontContribution: 1000,
      currentNetContribution: 1000,
      includeGoal: true,
      preGoal: {
        expectedReturnPercentage: 4.3,
        volatilityPercentage: 16.37,
        ZScoreLowerBound: -1.350641417,
        ZScoreUpperBound: 1.26511912,
      },
      feesPercentage: 0.4,
      drawdownType: 'Retirement',
      drawdownRetirement: {
        startDate: '2055-04-10',
        endDate: '2076-04-10',
        regularDrawdown: 7500,
        remainingAmount: 100000,
        lumpSum: {
          amount: 100000,
          date: '2040-04-10',
        },
      },
    };

    // act
    const response = await axios.post(apiUrl, inboundPayload, {
      headers,
    });
    // assert
    expect(response.status).to.equal(200);
    assert(response.data, expectedSchema);
  });

  it('should return expected response when timeHorizonToProject is 900', async () => {
    // arrange
    const apiUrl = apiEndpoint.getBaseUrl().path(API_ENDPOINTS.SIMULATE_PROJECTIONS);
    const inboundPayload = {
      timeHorizonToProject: 900,
      monthlyContribution: 500,
      currentPortfolioValue: 250000,
      upfrontContribution: 1000,
      currentNetContribution: 1000,
      includeGoal: true,
      preGoal: {
        expectedReturnPercentage: 4.3,
        volatilityPercentage: 16.37,
        ZScoreLowerBound: -1.350641417,
        ZScoreUpperBound: 1.26511912,
      },
      feesPercentage: 0.4,
      drawdownType: 'Retirement',
      drawdownRetirement: {
        startDate: '2055-04-10',
        endDate: '2076-04-10',
        regularDrawdown: 7500,
        remainingAmount: 100000,
        lumpSum: {
          amount: 100000,
          date: '2040-04-10',
        },
      },
    };

    // act
    const response = await axios.post(apiUrl, inboundPayload, {
      headers,
    });
    // assert
    expect(response.status).to.equal(200);
    assert(response.data, expectedSchema);
  });

  it('should return expected response when feesPercentage is 0.4', async () => {
    // arange
    const apiUrl = apiEndpoint.getBaseUrl().path(API_ENDPOINTS.SIMULATE_PROJECTIONS);
    const inboundPayload = {
      timeHorizonToProject: 500,
      monthlyContribution: 500,
      currentPortfolioValue: 250000,
      upfrontContribution: 1000,
      currentNetContribution: 1000,
      includeGoal: true,
      preGoal: {
        expectedReturnPercentage: 4.3,
        volatilityPercentage: 16.37,
        ZScoreLowerBound: -1.350641417,
        ZScoreUpperBound: 1.26511912,
      },
      feesPercentage: 0.4,
      drawdownType: 'Retirement',
      drawdownRetirement: {
        startDate: '2055-04-10',
        endDate: '2076-04-10',
        regularDrawdown: 7500,
        remainingAmount: 100000,
        lumpSum: {
          amount: 100000,
          date: '2040-04-10',
        },
      },
    };
    // act
    const response = await axios.post(apiUrl, inboundPayload, {
      headers,
    });
    // assert
    expect(response.status).to.equal(200);
    assert(response.data, expectedSchema);
  });

  it('should return the expected response when upfrontContribution is 10000', async () => {
    // arrange
    const apiUrl = apiEndpoint.getBaseUrl().path(API_ENDPOINTS.SIMULATE_PROJECTIONS);
    const inboundPayload = {
      timeHorizonToProject: 500,
      monthlyContribution: 500,
      currentPortfolioValue: 250000,
      upfrontContribution: 10000,
      currentNetContribution: 1000,
      includeGoal: true,
      preGoal: {
        expectedReturnPercentage: 4.3,
        volatilityPercentage: 16.37,
        ZScoreLowerBound: -1.350641417,
        ZScoreUpperBound: 1.26511912,
      },
      feesPercentage: 0.4,
      drawdownType: 'Retirement',
      drawdownRetirement: {
        startDate: '2055-04-10',
        endDate: '2076-04-10',
        regularDrawdown: 7500,
        remainingAmount: 100000,
        lumpSum: {
          amount: 100000,
          date: '2040-04-10',
        },
      },
    };
    // act
    const response = await axios.post(apiUrl, inboundPayload, {
      headers,
    });
    // assert
    expect(response.status).to.equal(200);
    assert(response.data, expectedSchema);
  });

  it('should return expected response when monthlyContribution is 500', async () => {
    // arrange
    const apiUrl = apiEndpoint.getBaseUrl().path(API_ENDPOINTS.SIMULATE_PROJECTIONS);
    const inboundPayload = {
      timeHorizonToProject: 500,
      monthlyContribution: 500,
      currentPortfolioValue: 250000,
      upfrontContribution: 1000,
      currentNetContribution: 1000,
      includeGoal: true,
      preGoal: {
        expectedReturnPercentage: 4.3,
        volatilityPercentage: 16.37,
        ZScoreLowerBound: -1.350641417,
        ZScoreUpperBound: 1.26511912,
      },
      feesPercentage: 0.4,
      drawdownType: 'Retirement',
      drawdownRetirement: {
        startDate: '2055-04-10',
        endDate: '2076-04-10',
        regularDrawdown: 7500,
        remainingAmount: 100000,
        lumpSum: {
          amount: 100000,
          date: '2040-04-10',
        },
      },
    };
    // act
    const response = await axios.post(apiUrl, inboundPayload, {
      headers,
    });
    // assert
    expect(response.status).to.equal(200);
    assert(response.data, expectedSchema);
  });

  it('should return expected response when current net contributions is 71166.6', async () => {
    // arrange
    const apiUrl = apiEndpoint.getBaseUrl().path(API_ENDPOINTS.SIMULATE_PROJECTIONS);
    const inboundPayload = {
      timeHorizonToProject: 500,
      monthlyContribution: 500,
      currentPortfolioValue: 250000,
      upfrontContribution: 1000,
      currentNetContribution: 71166.6,
      includeGoal: true,
      preGoal: {
        expectedReturnPercentage: 4.3,
        volatilityPercentage: 16.37,
        ZScoreLowerBound: -1.350641417,
        ZScoreUpperBound: 1.26511912,
      },
      feesPercentage: 0.4,
      drawdownType: 'Retirement',
      drawdownRetirement: {
        startDate: '2055-04-10',
        endDate: '2076-04-10',
        regularDrawdown: 7500,
        remainingAmount: 100000,
        lumpSum: {
          amount: 100000,
          date: '2040-04-10',
        },
      },
    };
    // act
    const response = await axios.post(apiUrl, inboundPayload, {
      headers,
    });
    // assert
    expect(response.status).to.equal(200);
    assert(response.data, expectedSchema);
  });
});
