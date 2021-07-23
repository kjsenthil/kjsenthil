import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { API_ENDPOINTS } from '../../../config';
import deleteGoal from './deleteGoal';
import { GoalCategory, GoalsApiResponse, GoalStatus } from '../types';

const mockAxios = new MockAdapter(axios);
const goalIndex = 123456789;

const goalsURL = API_ENDPOINTS.UPDATE_GOAL.replace('{goal-index}', String(goalIndex));

describe('deleteGoal', () => {
  it(`makes a call to ${goalsURL} with DELETE method`, async () => {
    const data: GoalsApiResponse = {
      index: 1,
      allowAssociates: true,
      allowMultipleAccountAssociates: true,
      fields: {
        description: 'home goal',
        status: GoalStatus.CANCELLED,
        category: GoalCategory.MORTGAGE,
      },
    };

    mockAxios.onDelete(goalsURL).reply(201, data);

    const response = await deleteGoal(goalIndex);

    expect(response).toStrictEqual(data);
  });
});
