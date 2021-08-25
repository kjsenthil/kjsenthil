import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { API_ENDPOINTS } from '../../../config';
import { DrawdownType } from '../../../constants';
import { GoalSimulateProjectionsRequestPayload, GoalSimulateProjectionsResponse } from '../types';
import postGoalSimulateProjections from './postGoalSimulateProjections';

const mockAxios = new MockAdapter(axios);
const url = API_ENDPOINTS.PROJECTIONS_SIMULATE_PROJECTION;

describe('postGoalSimulateProjections', () => {
  it(`makes a call to ${url}`, async () => {
    const params: GoalSimulateProjectionsRequestPayload = {
      timeHorizonToProject: 900,
      monthlyContribution: 624,
      currentPortfolioValue: 250000,
      includeGoal: true,
      drawdownType: DrawdownType.Retirement,
      currentNetContribution: 1000,
      upfrontContribution: 0,
      feesPercentage: 0.4,
      drawdownRetirement: {
        startDate: '2055-04-10',
        endDate: '2076-04-10',
        regularDrawdown: 700,
        remainingAmount: 0,
        lumpSum: {
          amount: 0.1,
          date: '2055-04-10',
        },
      },
      preGoal: {
        expectedReturnPercentage: 4.3,
        volatilityPercentage: 16.37,
        ZScoreLowerBound: -1.350641417,
        ZScoreUpperBound: 1.26511912,
      },
      postGoal: {
        expectedReturnPercentage: 2.98,
        volatilityPercentage: 9.27,
        ZScoreLowerBound: -1.297734628,
        ZScoreUpperBound: 1.284789644,
      },
    };

    const data: GoalSimulateProjectionsResponse = {
      projectionData: [
        {
          monthNo: 0,
          average: 250000,
          lower: 250000,
          upper: 250000,
        },
        {
          monthNo: 1,
          average: 251422.32845197053,
          lower: 235465.81038991973,
          upper: 266368.48354157555,
        },
      ],
      contributionData: [
        {
          monthNo: 0,
          value: 1000,
        },
        {
          monthNo: 1,
          value: 1624,
        },
      ],
      goal: {
        onTrack: {
          percentage: 37.483978271484375,
          monthlyContributionsToReach: -806.8208820475061,
          upfrontContributionsToReach: 243017.1446264885,
          targetProjectionData: [
            {
              monthNo: 0,
              value: 250000,
            },
            {
              monthNo: 1,
              value: 249991.50756992304,
            },
            {
              monthNo: 2,
              value: 249982.9880208518,
            },
          ],
        },
        desiredDiscountedOutflow: 245368.8,
        affordableUnDiscountedOutflowAverage: 91973.98767700195,
        shortfallSurplusAverage: 153394.81232299804,
        affordableUndiscountedOutflowUnderperform: 90650.47280273437,
        shortfallSurplusUnderperform: 154718.32719726564,
        drawdownRetirement: {
          affordable: {
            lumpSum: 0,
            remainingAmount: 0,
            drawdown: 347.0716516113281,
            totalDrawdown: 91973.98767700195,
          },
          underperform: {
            lumpSum: 0,
            remainingAmount: 0,
            drawdown: 342.077255859375,
            totalDrawdown: 90650.47280273437,
          },
        },
      },
    };

    mockAxios
      .onPost(url, {
        ...params,
      })
      .reply(200, data);

    const response = await postGoalSimulateProjections(params);
    const expectedResponse = { ...data };
    expectedResponse.goal.onTrack.percentage /= 100;

    expect(response).toStrictEqual(expectedResponse);
  });
});
