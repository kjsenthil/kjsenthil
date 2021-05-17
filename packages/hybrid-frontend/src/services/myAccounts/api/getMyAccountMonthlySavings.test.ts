import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { API_ENDPOINTS } from '../../../config';
import { mockMonthlySavingsResponse } from '../mocks';
import getMyAccountMonthlySavings, { MonthlySavingsErrors } from './getMyAccountMonthlySavings';

const mockAxios = new MockAdapter(axios);
const accountId = '12345678';
const url = API_ENDPOINTS.MYACCOUNT_MONTHLY_SAVINGS.replace(/\{id\}/, accountId);

describe('getMyAccountMonthlySavings', () => {
  it(`makes a call to ${url}`, async () => {
    mockAxios.onGet(url).reply(200, mockMonthlySavingsResponse);

    const response = await getMyAccountMonthlySavings(accountId);

    expect(response).toStrictEqual(mockMonthlySavingsResponse);
  });

  it('throws a no savings error when it receives a 404 error', async () => {
    mockAxios.onGet(url).reply(404);

    await expect(getMyAccountMonthlySavings(accountId)).rejects.toEqual(
      new Error(MonthlySavingsErrors.NO_SAVINGS_ERROR)
    );
  });

  it('throws non-404 errors', async () => {
    mockAxios.onGet(url).reply(401);

    await expect(getMyAccountMonthlySavings(accountId)).rejects.toEqual(
      new Error('Request failed with status code 401')
    );
  });
});
