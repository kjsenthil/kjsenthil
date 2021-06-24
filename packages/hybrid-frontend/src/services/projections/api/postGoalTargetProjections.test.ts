import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { API_ENDPOINTS } from '../../../config';
import { GoalTargetProjectionsRequestPayload, GoalTargetProjectionsResponse } from '../types';
import { RiskModel } from '../../types';
import postGoalTargetProjections from './postGoalTargetProjections';

const mockAxios = new MockAdapter(axios);
const url = API_ENDPOINTS.PROJECTIONS_TARGET_PROJECTION;

describe('postGoalTargetProjections', () => {
  it(`makes a call to ${url}`, async () => {
    const params: GoalTargetProjectionsRequestPayload = {
      timeToAge100: 900,
      preGoalRiskModel: RiskModel.TAA1,
      portfolioValue: 250000,
      desiredMonthlyDrawdown: 700,
      drawdownStartDate: '2055-04-10',
      drawdownEndDate: '2076-04-10',
      upfrontContribution: 0,
      preGoalExpectedReturn: 0.043,
      preGoalVolatility: 0.1637,
      feesPercentage: 0.004,
      postGoalRiskModel: RiskModel.TAA3,
      postGoalExpectedReturn: 0.0298,
      postGoalVolatility: 0.0927,
      goalLumpSum: 100000,
      lumpSumDate: '2079-01-01',
      statePensionAmount: 0,
      desiredValueAtEndOfDrawdown: 10000,
      includeStatePension: true,
    };

    const data: GoalTargetProjectionsResponse = {
      targetGoalAmount: 243017.1446264885,
      monthlyContributionsRequiredToFundDrawdown: -806.8208820475061,
      projections: [
        {
          month: 0,
          projectedValue: 250000,
        },
        {
          month: 1,
          projectedValue: 249991.50756992304,
        },
        {
          month: 2,
          projectedValue: 249982.9880208518,
        },
      ],
    };

    mockAxios
      .onPost(url, {
        ...params,
      })
      .reply(200, data);

    const response = await postGoalTargetProjections(params);

    expect(response).toStrictEqual(data);
  });
});
