import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { API_ENDPOINTS } from '../../../config';
import { mockMonthlySavingsResponse } from '../mocks';
import getMonthlySavings, { MonthlySavingsErrors } from './getMonthlySavings';

const mockAxios = new MockAdapter(axios);
const accountId = '12345678';
const url = API_ENDPOINTS.MYACCOUNT_MONTHLY_SAVINGS.replace(/\{id\}/, accountId);

describe('getMonthlySavings', () => {
  it(`makes a call to ${url}`, async () => {
    mockAxios.onGet(url).reply(200, mockMonthlySavingsResponse);

    const response = await getMonthlySavings(accountId);

    expect(response).toStrictEqual(mockMonthlySavingsResponse);
  });

  it('throws a no savings error when it receives a 404 error', async () => {
    mockAxios.onGet(url).reply(404);

    await expect(getMonthlySavings(accountId)).rejects.toEqual(
      new Error(MonthlySavingsErrors.NO_SAVINGS_ERROR)
    );
  });

  it('throws non-404 errors', async () => {
    mockAxios.onGet(url).reply(401);

    await expect(getMonthlySavings(accountId)).rejects.toEqual(
      new Error('Request failed with status code 401')
    );
  });
});
