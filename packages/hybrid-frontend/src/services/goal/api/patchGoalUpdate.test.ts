import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { API_ENDPOINTS } from '../../../config';
import patchGoalUpdate from './patchGoalUpdate';
import { RetirementInputs, GoalCategory, GoalsApiResponse, GoalStatus, GoalType } from '../types';
import createRetirementPayload from '../utils/createRetirementPayload';

const mockAxios = new MockAdapter(axios);

const goalIndex = 123456789;
const goalsURL = API_ENDPOINTS.UPDATE_GOAL.replace('{goal-index}', String(goalIndex));

describe('patchGoalCreation', () => {
  it(`makes a call to ${goalsURL} with PATCH method`, async () => {
    const inputs: RetirementInputs = {
      drawdownEndAge: 80,
      drawdownStartAge: 56,
      regularDrawdown: 7000,
      lumpSumDate: new Date(2055, 1, 1).toISOString(),
    };

    const data: GoalsApiResponse = {
      index: goalIndex,
      allowAssociates: true,
      allowMultipleAccountAssociates: true,
      fields: {
        description: 'home goal',
        status: GoalStatus.UNFULFILLED,
        category: GoalCategory.MORTGAGE,
      },
    };

    mockAxios.onPatch(goalsURL, createRetirementPayload(inputs)).reply(201, data);

    const response = await patchGoalUpdate(goalIndex, {
      inputs,
      goalType: GoalType.RETIREMENT,
    });

    expect(response).toStrictEqual(data);
  });
});
