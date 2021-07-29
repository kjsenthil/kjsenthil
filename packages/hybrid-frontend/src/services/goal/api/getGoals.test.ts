import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { API_ENDPOINTS } from '../../../config';
import getGoals from './getGoals';
import mockSuccessResponse from '../mocks/get-goals-success-response.json';

const mockAxios = new MockAdapter(axios);
const baseUrl = API_ENDPOINTS.GET_GOALS;
const queryParams = [
  'description',
  'category',
  'status',
  'present_value',
  'target_amount',
  'objective_frequency_start_age',
  'objective_frequency_end_age',
  'bi_state_pension_amount',
  'bi_retirement_lump_sum',
  'bi_retirement_lump_sum_date',
  'bi_retirement_remaining_amount',
  'target_date',
  'regular_drawdown',
]
  .map((fieldName, i) => `fields.${i}=${fieldName}`)
  .join('&');

const url = `${baseUrl}?${queryParams}`;

describe('getGoals', () => {
  mockAxios.onGet(url).reply(200, mockSuccessResponse);

  it(`makes a call to ${url}`, async () => {
    const response = await getGoals();

    expect(response).toEqual(mockSuccessResponse);
  });
});
