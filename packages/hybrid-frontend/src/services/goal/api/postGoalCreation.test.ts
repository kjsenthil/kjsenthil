import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { API_ENDPOINTS } from '../../../config';
import postGoalCreation, { createOnboardGoalsPayLoad } from './postGoalCreation';
import { RiskAppetites } from '../constants';
import { CaptureGoalData, GoalCategory, GoalsApiResponse, GoalStatus, GoalType } from '../types';

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

    const data: GoalsApiResponse = {
      index: 1,
      allowAssociates: true,
      allowMultipleAccountAssociates: true,
      fields: {
        description: 'home goal',
        status: GoalStatus.UNFULFILLED,
        category: GoalCategory.MORTGAGE,
      },
    };

    mockAxios.onPost(url, createOnboardGoalsPayLoad(inputs)).reply(201, data);

    const response = await postGoalCreation({
      inputs,
      goalType: GoalType.ONBOARDING,
    });

    expect(response).toStrictEqual(data);
  });
});
