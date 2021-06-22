import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { API_ENDPOINTS } from '../../../config';
import { GoalCurrentProjectionsRequestPayload, GoalCurrentProjectionsResponse } from '../types';
import postGoalCurrentProjections from './postGoalCurrentProjections';

const mockAxios = new MockAdapter(axios);
const url = API_ENDPOINTS.PROJECTIONS_CURRENT_PROJECTION;

describe('postGoalCurrentProjections', () => {
  it(`makes a call to ${url}`, async () => {
    const params: GoalCurrentProjectionsRequestPayload = {
      timeHorizon: 900,
      preGoalRiskModel: 'TAA1',
      monthlyContributions: 624,
      portfolioCurrentValue: 250000,
      desiredMonthlyDrawdown: 700,
      drawdownStartDate: '2055-04-10',
      drawdownEndDate: '2076-04-10',
      upfrontContribution: 0,
      preGoalExpectedReturn: 0.043,
      preGoalExpectedVolatility: 0.1637,
      preGoalZScoreLowerBound: -1.350641417,
      preGoalZScoreUpperBound: 1.26511912,
      feesPercentage: 0.004,
      postGoalRiskModel: 'TAA3',
      lumpSumAmount: 0.1,
      statePensionAmount: 0,
      desiredAmount: 0,
      postGoalExpectedReturn: 0.0298,
      postGoalExpectedVolatility: 0.0927,
      postGoalZScoreLowerBound: -1.297734628,
      postGoalZScoreUpperBound: 1.284789644,
      netContribution: 1000,
      isConeGraph: true,
      includeStatePension: true,
    };
    const data: GoalCurrentProjectionsResponse = {
      projectedGoalAgeTotal: 1419501.989856692,
      possibleDrawdown: 7243.810933644129,
      possibleDrawdownWithSP: 7243.810933644129,
      projectedGoalAgeTotalWhenMarketUnderperform: 982902.528604863,
      possibleDrawdownWhenMarketUnderperform: 4530.7805232810715,
      possibleDrawdownWhenMarketUnderperformWithSP: 4530.7805232810715,
      projections: [
        {
          month: 0,
          projectedValue: 250000,
          contributionLine: 1000,
          lowerBound: 250000,
          upperBound: 250000,
        },
        {
          month: 1,
          projectedValue: 251422.32845197053,
          contributionLine: 1624,
          lowerBound: 235465.81038991973,
          upperBound: 266368.48354157555,
        },
      ],
    };

    mockAxios
      .onPost(url, {
        ...params,
      })
      .reply(200, data);

    const response = await postGoalCurrentProjections(params);

    expect(response).toStrictEqual(data);
  });
});
