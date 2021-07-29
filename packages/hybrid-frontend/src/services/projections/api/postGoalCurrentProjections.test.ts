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
      lumpSumDate: '2055-04-10',
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
      desiredOutflow: 245368.8,
      onTrackPercentage: 0.37483978271484375,
      affordableDrawdown: 347.0716516113281,
      affordableLumpSum: 0,
      affordableRemainingAmount: 0,
      affordableOutflow: 91973.98767700195,
      surplusOrShortfall: 153394.81232299804,
      valueAtRetirement: 0.07741928261073262,
      totalAffordableDrawdown: 91973.98767700195,
      projectedGoalAgeTotal: 73093.11048848694,
      possibleDrawdown: 347.0718785441286,
      marketUnderperform: {
        desiredOutflow: 245368.8,
        onTrackPercentage: 0.36944580078125,
        affordableDrawdown: 342.077255859375,
        affordableLumpSum: 0,
        affordableRemainingAmount: 0,
        affordableOutflow: 90650.47280273437,
        surplusOrShortfall: 154718.32719726564,
        valueAtRetirement: 0.25640099215629014,
        totalAffordableDrawdown: 90650.47280273437,
      },
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
