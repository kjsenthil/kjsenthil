import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { API_ENDPOINTS } from '../../../config';
import postObjectiveCreation, { createObjectivePayLoad } from './postObjectiveCreation';
import { Goals } from '../constants';

const mockAxios = new MockAdapter(axios);
const url = API_ENDPOINTS.CREATE_OBJECTIVE;

describe('postObjectiveCreation', () => {
  it(`makes a call to ${url}`, async () => {
    const goalName = Goals.HOUSE;

    const data = {
      index: 1,
      fields: { description: 'home objective' },
    };

    mockAxios.onPost(url, createObjectivePayLoad(goalName)).reply(200, data);

    const response = await postObjectiveCreation({ goalName });

    expect(response).toStrictEqual(data);
  });
});
