import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { API_ENDPOINTS } from '../../../config';
import postGoalCreation, { createGoalsPayLoad } from './postGoalCreation';
import { entityIDParse, Goals, RiskAppetites } from '../constants';
import { CaptureGoalData, GoalsObjectiveApiResponse } from '../types';

const mockAxios = new MockAdapter(axios);
const entityId = 1234567;
const url = API_ENDPOINTS.CREATE_GOAL_LESS_FIELDS.replace(entityIDParse, String(entityId));

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

    const goalName = Goals.HOUSE;

    const data: GoalsObjectiveApiResponse = {
      index: '1',
      fields: { description: 'home goal' },
    };

    mockAxios.onPost(url, createGoalsPayLoad(goalName, inputs)).reply(200, data);

    const response = await postGoalCreation({ goalName, inputs, entityId });

    expect(response).toStrictEqual(data);
  });
});
