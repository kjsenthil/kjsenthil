import axios from 'axios';
import { expect } from 'chai';
import apiEndpoint from '../utils/apiBuilder';
import API_ENDPOINTS from '../utils/apiEndPoints';

describe.skip('Simulate projection summary negative scenarios', () => {
  let headers: object;

  before(() => {
    headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
    };
  });

  it('should lumpsum Date after the retirement date should throw error  ', async () => {
    // arrange
    const apiUrl = apiEndpoint.getBaseUrl().path(API_ENDPOINTS.SIMULATE_PROJECTIONS);

    const inboundPayload = {
      timeHorizonToProject: 564,
      monthlyContribution: 666.66,
      currentPortfolioValue: 76688.04,
      upfrontContribution: 0,
      currentNetContribution: 71166.6,
      includeGoal: true,
      preGoal: {
        expectedReturnPercentage: 2.2,
        volatilityPercentage: 5.75,
        ZScoreLowerBound: -1.31922585204014,
        ZScoreUpperBound: 1.29277810227829,
      },
      feesPercentage: 0.4,
      drawdownType: 'Retirement',
      drawdownRetirement: {
        startDate: '2033-01-01',
        endDate: '2043-01-01',
        regularDrawdown: 300,
        remainingAmount: 0.0,
        StatepensionAmount: 0.0,
        lumpSum: {
          amount: 5000,
          date: '2035-10-04',
        },
      },
    };

    try {
      // act
      const result = await axios.post(apiUrl, inboundPayload, {
        headers,
      });
      // assert
      expect(result).to.equal(400);
    } catch (e) {
      // Filling the empty block statement - to update
    }
  });

  it('should timehorizon 0 should not be accepted', async () => {
    // arrange
    const apiUrl = apiEndpoint.getBaseUrl().path(API_ENDPOINTS.SIMULATE_PROJECTIONS);

    const inboundPayload = {
      timeHorizonToProject: 0,
      monthlyContribution: 666.66,
      currentPortfolioValue: 76688.04,
      upfrontContribution: 400,
      currentNetContribution: 71166.6,
      includeGoal: true,
      preGoal: {
        expectedReturnPercentage: 2.2,
        volatilityPercentage: 5.75,
        ZScoreLowerBound: -1.31922585204014,
        ZScoreUpperBound: 1.29277810227829,
      },
      feesPercentage: 0.4,

      drawdownType: 'Retirement',
      drawdownRetirement: {
        startDate: '2033-01-01',
        endDate: '2043-01-01',
        regularDrawdown: 300,
        remainingAmount: 0.0,
        StatepensionAmount: 0.0,
        lumpSum: {
          amount: 0,
          date: '2035-10-04',
        },
      },
    };

    try {
      // act
      const result = await axios.post(apiUrl, inboundPayload, {
        headers,
      });
      // assert
      expect(result).to.equal(400);
    } catch (e) {
      // Filling the empty block statement - to update
    }
  });

  it('should lumpsum Date after the end of the retirement date should throw the error  ', async () => {
    // arrange
    const apiUrl = apiEndpoint.getBaseUrl().path(API_ENDPOINTS.SIMULATE_PROJECTIONS);

    const inboundPayload = {
      timeHorizonToProject: 564,
      monthlyContribution: 666.66,
      currentPortfolioValue: 76688.04,
      upfrontContribution: 0,
      currentNetContribution: 71166.6,
      includeGoal: true,
      preGoal: {
        expectedReturnPercentage: 2.2,
        volatilityPercentage: 5.75,
        ZScoreLowerBound: -1.31922585204014,
        ZScoreUpperBound: 1.29277810227829,
      },
      feesPercentage: 0.4,

      drawdownType: 'Retirement',
      drawdownRetirement: {
        startDate: '2033-01-01',
        endDate: '2043-01-01',
        regularDrawdown: 300,
        remainingAmount: 0.0,
        StatepensionAmount: 0.0,
        lumpSum: {
          amount: 0,
          date: '2045-10-04',
        },
      },
    };

    try {
      // act
      const result = await axios.post(apiUrl, inboundPayload, {
        headers,
      });
      // assert
      expect(result).to.equal(400);
    } catch (e) {
      // Filling the empty block statement  - to update
    }
  });

  it('should retirement End Date before the retirement start date should throw an error  ', async () => {
    // arrange
    const apiUrl = apiEndpoint.getBaseUrl().path(API_ENDPOINTS.SIMULATE_PROJECTIONS);

    const inboundPayload = {
      timeHorizonToProject: 564,
      monthlyContribution: 666.66,
      currentPortfolioValue: 76688.04,
      upfrontContribution: 0,
      currentNetContribution: 71166.6,
      includeGoal: true,
      preGoal: {
        expectedReturnPercentage: 2.2,
        volatilityPercentage: 5.75,
        ZScoreLowerBound: -1.31922585204014,
        ZScoreUpperBound: 1.29277810227829,
      },
      feesPercentage: 0.4,

      drawdownType: 'Retirement',
      drawdownRetirement: {
        startDate: '2033-01-01',
        endDate: '2023-01-01',
        regularDrawdown: 300,
        remainingAmount: 0.0,
        StatepensionAmount: 0.0,
        lumpSum: {
          amount: 0,
          date: '2043-10-04',
        },
      },
    };

    try {
      // act
      const result = await axios.post(apiUrl, inboundPayload, {
        headers,
      });
      // assert
      expect(result).to.equal(400);
    } catch (e) {
      // Filling the empty block statement - to update
    }
  });

  it('should Retirement start Date in the past should throw an error  ', async () => {
    // arrange
    const apiUrl = apiEndpoint.getBaseUrl().path(API_ENDPOINTS.SIMULATE_PROJECTIONS);

    const inboundPayload = {
      timeHorizonToProject: 564,
      monthlyContribution: 666.66,
      currentPortfolioValue: 76688.04,
      upfrontContribution: 0,
      currentNetContribution: 71166.6,
      includeGoal: true,
      preGoal: {
        expectedReturnPercentage: 2.2,
        volatilityPercentage: 5.75,
        ZScoreLowerBound: -1.31922585204014,
        ZScoreUpperBound: 1.29277810227829,
      },
      feesPercentage: 0.4,

      drawdownType: 'Retirement',
      drawdownRetirement: {
        startDate: '2013-01-01',
        endDate: '2043-01-01',
        regularDrawdown: 300,
        remainingAmount: 0.0,
        StatepensionAmount: 0.0,
        lumpSum: {
          amount: 0,
          date: '2043-10-04',
        },
      },
    };

    try {
      // act
      const result = await axios.post(apiUrl, inboundPayload, {
        headers,
      });
      // assert
      expect(result).to.equal(400);
    } catch (e) {
      // Filling the empty block statement - to update
    }
  });
});
