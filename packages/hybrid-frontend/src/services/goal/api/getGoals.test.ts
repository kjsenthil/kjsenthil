import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { API_ENDPOINTS } from '../../../config';
import getGoals from './getGoals';
import mockSuccessResponse from '../mocks/get-goals-success-response.json';

const mockAxios = new MockAdapter(axios);
const baseUrl = API_ENDPOINTS.GET_GOALS;
const queryParams =
  'fields.0=description&fields.1=category&fields.2=status&fields.3=present_value&fields.4=target_amount';
const url = `${baseUrl}?${queryParams}`;

describe('getGoals', () => {
  mockAxios.onGet(url).reply(200, mockSuccessResponse);

  it(`makes a call to ${url}`, async () => {
    const response = await getGoals();

    expect(response).toEqual(mockSuccessResponse);
  });
});
