import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { API_ENDPOINTS } from '../../../config';
import { mockBreakdownAllocation } from '../mocks';
import getBreakdownAllocation, { BreakdownAllocationErrors } from './getBreakdownAllocation';

const mockAxios = new MockAdapter(axios);
const accountId = '12345';
const url = API_ENDPOINTS.MYACCOUNT_BREAKDOWN_ALLOCATION.replace(/\{id\}/, accountId);

describe('getBreakdownAllocation', () => {
  it(`makes a call to ${url}`, async () => {
    mockAxios.onGet(url).reply(200, mockBreakdownAllocation);

    const response = await getBreakdownAllocation(accountId);

    expect(response).toStrictEqual(mockBreakdownAllocation);
  });

  it('throws a no equities error when it receives a 404 error', async () => {
    mockAxios.onGet(url).reply(404);

    await expect(getBreakdownAllocation(accountId)).rejects.toEqual(
      new Error(BreakdownAllocationErrors.NO_EQUITIES_ERROR)
    );
  });

  it('throws non-404 errors', async () => {
    mockAxios.onGet(url).reply(401);

    await expect(getBreakdownAllocation(accountId)).rejects.toEqual(
      new Error('Request failed with status code 401')
    );
  });
});
