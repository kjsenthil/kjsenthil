import axios from 'axios';
import { expect } from 'chai';
import apiEndpoint from '../utils/apiBuilder';
import API_ENDPOINTS from '../utils/apiEndPoints';

describe('Simulate projection summary endpoint scenarios', () => {
  let headers: object;

  before(() => {
    headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
    };
  });

  it('should return expected response for the summary validation with timehorizon 900', async () => {
    // arrange
    const apiUrl = apiEndpoint.getBaseUrl().path(API_ENDPOINTS.SIMULATE_PROJECTIONS);

    const inboundPayload = {
      timeHorizonToProject: 900,
      monthlyContribution: 624,
      currentPortfolioValue: 250000,
      upfrontContribution: 0,
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
    const result = await axios.post(apiUrl, inboundPayload, {
      headers,
    });
    // assert
    expect(result.status).to.equal(200);
    expect(result.data.goal.onTrack.percentage).to.be.closeTo(92.27783, 2);
    expect(result.data.goal.desiredDiscountedOutflow).to.be.closeTo(2097500, 2);
    expect(result.data.goal.affordableUnDiscountedOutflowAverage).to.be.closeTo(1935527.62, 2);
    expect(result.data.goal.drawdownRetirement.affordable.drawdown).to.be.closeTo(6920.837, 2);
    expect(result.data.goal.drawdownRetirement.affordable.lumpSum).to.be.closeTo(92277.83, 2);
    expect(result.data.projectionData.length).to.be.closeTo(901, 2);
    // underperform
    expect(result.data.goal.drawdownRetirement.underperform.drawdown).to.be.closeTo(3410.67, 2);
    expect(result.data.goal.drawdownRetirement.underperform.lumpSum).to.be.closeTo(45475.62, 2);
  });

  it('should return expected response for the summary validation with time horizon 500 and Monthly contribution 500', async () => {
    // arrange
    const apiUrl = apiEndpoint.getBaseUrl().path(API_ENDPOINTS.SIMULATE_PROJECTIONS);
    const inboundPayload = {
      timeHorizonToProject: 500,
      monthlyContribution: 500,
      currentPortfolioValue: 250000,
      upfrontContribution: 0,
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
    const result = await axios.post(apiUrl, inboundPayload, {
      headers,
    });
    // assert
    expect(result.status).to.equal(200);
    expect(result.data.goal.onTrack.percentage).to.be.closeTo(50, 2);
    expect(result.data.goal.desiredDiscountedOutflow).to.be.closeTo(2097500, 2);
    expect(result.data.goal.affordableUnDiscountedOutflowAverage).to.be.closeTo(1048750, 2);
    expect(result.data.goal.drawdownRetirement.affordable.drawdown).to.be.closeTo(3750, 2);
    expect(result.data.goal.drawdownRetirement.affordable.lumpSum).to.be.closeTo(50000, 2);
    expect(result.data.projectionData.length).to.be.closeTo(501, 2);
    // underperform
    expect(result.data.goal.drawdownRetirement.underperform.drawdown).to.be.closeTo(3750, 2);
    expect(result.data.goal.drawdownRetirement.underperform.lumpSum).to.be.closeTo(50000, 2);
  });

  it('should return expected response for the summary validation with time horizon 500 and current net contribution 0', async () => {
    // arrange
    const apiUrl = apiEndpoint.getBaseUrl().path(API_ENDPOINTS.SIMULATE_PROJECTIONS);
    const inboundPayload = {
      timeHorizonToProject: 500,
      monthlyContribution: 500,
      currentPortfolioValue: 250000,
      upfrontContribution: 0,
      currentNetContribution: 0,
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
    const result = await axios.post(apiUrl, inboundPayload, {
      headers,
    });
    // assert
    expect(result.status).to.equal(200);
    expect(result.data.goal.onTrack.percentage).to.be.closeTo(50, 2);
    expect(result.data.goal.desiredDiscountedOutflow).to.be.closeTo(2097500, 2);
    expect(result.data.goal.affordableUnDiscountedOutflowAverage).to.be.closeTo(1048750, 2);
    expect(result.data.goal.drawdownRetirement.affordable.drawdown).to.be.closeTo(3750, 2);
    expect(result.data.goal.drawdownRetirement.affordable.lumpSum).to.be.closeTo(50000, 2);
    expect(result.data.projectionData.length).to.be.closeTo(501, 2);
    // underperform
    expect(result.data.goal.drawdownRetirement.underperform.drawdown).to.be.closeTo(3750, 2);
    expect(result.data.goal.drawdownRetirement.underperform.lumpSum).to.be.closeTo(50000, 2);
  });

  it('should return expected response for the summary validation with time horizon 500 and upfront contribution 1000', async () => {
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
    const result = await axios.post(apiUrl, inboundPayload, {
      headers,
    });
    // assert
    expect(result.status).to.equal(200);
    expect(result.data.goal.onTrack.percentage).to.be.closeTo(50, 2);
    expect(result.data.goal.desiredDiscountedOutflow).to.be.closeTo(2097500, 2);
    expect(result.data.goal.affordableUnDiscountedOutflowAverage).to.be.closeTo(1048750, 2);
    expect(result.data.goal.drawdownRetirement.affordable.drawdown).to.be.closeTo(3750, 2);
    expect(result.data.goal.drawdownRetirement.affordable.lumpSum).to.be.closeTo(50000, 2);
    expect(result.data.projectionData.length).to.be.closeTo(501, 2);
    // underperform
    expect(result.data.goal.drawdownRetirement.underperform.drawdown).to.be.closeTo(3750, 2);
    expect(result.data.goal.drawdownRetirement.underperform.lumpSum).to.be.closeTo(50000.96, 2);
  });
});
