import axios from 'axios';
import { expect } from 'chai';
import apiEndpoint from '../utils/apiBuilder';
import API_ENDPOINTS from '../utils/apiEndPoints';

// simulation tests are fixed beause the date defaults to current and hence the tests are failing 
describe.skip('Simulate projection months endpoint scenarios', () => {
  let headers: object;

  before(() => {
    headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
    };
  });

  it.skip('should return expected response for the summary validation', async () => {
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
      postGoal: {
        expectedReturnPercentage: 2.98,
        volatilityPercentage: 9.27,
        ZScoreLowerBound: -1.297734628,
        ZScoreUpperBound: 1.284789644,
      },
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

    expect(result.data.projectionData[0]).to.eql({
      monthNo: 0,
      lower: 250000,
      average: 250000,
      upper: 250000,
    });

    expect(result.data.contributionData[0]).to.eql({
      monthNo: 0,
      value: 1000,
    });

    expect(result.data.projectionData[407]).to.eql({
      monthNo: 407,
      lower: 609247.6550393509,
      average: 1265253.7812876487,
      upper: 1988139.4335948436,
    });

    expect(result.data.contributionData[407]).to.eql({
      monthNo: 407,
      value: 150811.5327796936,
    });

    expect(result.data.projectionData[900]).to.eql({
      monthNo: 900,
      upper: 765330.010170457,
      lower: 0,
      average: 0,
    });

    expect(result.data.contributionData[900]).to.eql({
      monthNo: 900,
      value: -1498264.57138443,
    });
  });

  it('should portfolio current value matches the total value of the accounts projected', async () => {
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
      postGoal: {
        expectedReturnPercentage: 2.98,
        volatilityPercentage: 9.27,
        ZScoreLowerBound: -1.297734628,
        ZScoreUpperBound: 1.284789644,
      },
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

    expect(result.data.projectionData[0].average).to.equal(inboundPayload.currentPortfolioValue);
  });

  it('should current net contributions matches the value for accounts projected', async () => {
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
      postGoal: {
        expectedReturnPercentage: 2.98,
        volatilityPercentage: 9.27,
        ZScoreLowerBound: -1.297734628,
        ZScoreUpperBound: 1.284789644,
      },
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

    expect(result.data.contributionData[0].value).to.equal(inboundPayload.currentNetContribution);
  });

  it('should projection with state pension', async () => {
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
      postGoal: {
        expectedReturnPercentage: 2.98,
        volatilityPercentage: 9.27,
        ZScoreLowerBound: -1.297734628,
        ZScoreUpperBound: 1.284789644,
      },
      drawdownType: 'Retirement',
      drawdownRetirement: {
        startDate: '2055-04-10',
        endDate: '2076-04-10',
        regularDrawdown: 7500,
        remainingAmount: 100000,
        statePensionAmount: 10000,
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

    expect(result.data.goal.onTrack.percentage).to.equal(91.33524894714355);
  });

  it('should projection with no state pension', async () => {
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
      postGoal: {
        expectedReturnPercentage: 2.98,
        volatilityPercentage: 9.27,
        ZScoreLowerBound: -1.297734628,
        ZScoreUpperBound: 1.284789644,
      },
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

    expect(result.data.goal.onTrack.percentage).to.equal(82.5937032699585);
  });
});
