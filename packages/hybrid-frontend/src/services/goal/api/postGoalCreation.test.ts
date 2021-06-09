import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { API_ENDPOINTS } from '../../../config';
import postGoalCreation, { createOnboardGoalsPayLoad } from './postGoalCreation';
import { Goals, RiskAppetites } from '../constants';
import { CaptureGoalData, GoalDetails, GoalsObjectiveApiResponse } from '../types';

const mockAxios = new MockAdapter(axios);
const url = API_ENDPOINTS.CREATE_GOAL_LESS_FIELDS;

describe('postGoalCreation', () => {
  it(`makes a call to ${url}`, async () => {
    const inputs: CaptureGoalData = {
      targetDate: '2100-11-11',
      targetAmount: 1000000,
      targetYear: 2100,
      upfrontInvestment: 4000,
      monthlyInvestment: 100,
      riskAppetite: RiskAppetites.CAUTIOUS,
    };

    const goalDetails: GoalDetails = { name: Goals.HOUSE };

    const data: GoalsObjectiveApiResponse = {
      index: '1',
      fields: { description: 'home goal' },
    };

    const onboardGoalCreationInputs = { goalDetails, inputs };

    mockAxios.onPost(url, createOnboardGoalsPayLoad(onboardGoalCreationInputs)).reply(200, data);

    const response = await postGoalCreation({ onboardGoalCreationInputs });

    expect(response).toStrictEqual(data);
  });
});
