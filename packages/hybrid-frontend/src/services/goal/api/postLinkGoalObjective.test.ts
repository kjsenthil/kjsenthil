import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { API_ENDPOINTS } from '../../../config';
import postLinkGoalObjective, { goalIDParse } from './postLinkGoalObjective';

const mockAxios = new MockAdapter(axios);
const goalIndex = 1;
const objectiveIndex = 1;
const url = API_ENDPOINTS.LINK_GOAL_TO_OBJECTIVE.replace(goalIDParse, String(goalIndex));

describe('postLinkGoalObjective', () => {
  it(`makes a call to ${url}`, async () => {
    const data = {
      index: 1,
      fields: { description: 'home objective' },
    };

    mockAxios.onPost(url, { objective_obj_index: objectiveIndex }).reply(200, data);

    const response = await postLinkGoalObjective({ goalIndex, objectiveIndex });

    expect(response).toStrictEqual(data);
  });
});
