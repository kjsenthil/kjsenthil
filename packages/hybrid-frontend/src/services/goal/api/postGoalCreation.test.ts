import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import postGoalCreation from './postGoalCreation';
import { RetirementInputs, GoalCategory, GoalsApiResponse, GoalStatus, GoalType } from '../types';
import { createRetirementPayload } from '../utils';
import { API_ENDPOINTS } from '../../../config';

const mockAxios = new MockAdapter(axios);
const url = API_ENDPOINTS.CREATE_GOAL_LESS_FIELDS;

describe('postGoalCreation', () => {
  it(`makes a call to ${url}  with POST method`, async () => {
    const inputs: RetirementInputs = {
      drawdownEndAge: 80,
      drawdownStartAge: 56,
      regularDrawdown: 7000,
      lumpSumDate: new Date(2055, 1, 1).toISOString(),
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

    mockAxios.onPost(url, createRetirementPayload(inputs)).reply(201, data);

    const response = await postGoalCreation<GoalType.RETIREMENT>({
      inputs,
      goalType: GoalType.RETIREMENT,
    });

    expect(response).toStrictEqual(data);
  });
});
