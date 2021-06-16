import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { API_ENDPOINTS } from '../../../config';
import postGoalCreation, { createOnboardGoalsPayLoad } from './postGoalCreation';
import { RiskAppetites } from '../constants';
import { CaptureGoalData, GoalsObjectiveApiResponse, GoalType } from '../types';

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

    const data: GoalsObjectiveApiResponse = {
      index: '1',
      fields: { description: 'home goal' },
    };

    mockAxios.onPost(url, createOnboardGoalsPayLoad(inputs)).reply(201, data);

    const response = await postGoalCreation({
      inputs,
      goalType: GoalType.ONBOARDING,
    });

    expect(response).toStrictEqual(data);
  });
});
