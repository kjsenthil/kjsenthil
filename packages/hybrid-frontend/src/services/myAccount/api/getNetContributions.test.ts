import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { API_ENDPOINTS } from '../../../config';
import { mockNetContributions } from '../mocks';
import getNetContributions from './getNetContributions';

const mockAxios = new MockAdapter(axios);

const itMakesACallTo = (url: string, accountIds: number | number[]) => {
  it(`makes a call to ${url}`, async () => {
    mockAxios.onGet(url).reply(200, mockNetContributions);

    const response = await getNetContributions(accountIds);

    expect(response).toStrictEqual(mockNetContributions);
  });

  it(`returns undefined when api returns 404 on ${url}`, async () => {
    mockAxios.onGet(url).reply(404);

    const response = await getNetContributions(accountIds);

    expect(response).toBeUndefined();
  });

  it(`throws an error if 500 ${url}`, async () => {
    mockAxios.onGet(url).reply(500);

    await expect(getNetContributions(accountIds)).rejects.toThrow();
  });
};

describe('getNetContributions', () => {
  describe('when multiple IDs are provided', () => {
    const accountIds = [43752, 45672];
    const url = `${
      API_ENDPOINTS.MYACCOUNT_NETCONTRIBUTION_ACCOUNTS_AGGREGATED
    }?filter[id]=${accountIds.join(',')}`;

    itMakesACallTo(url, accountIds);
  });

  describe('when only one ID is provided', () => {
    const accountId = 43733;

    const url = `${API_ENDPOINTS.MYACCOUNT_NETCONTRIBUTION_ACCOUNTS_AGGREGATED}?filter[id]=${accountId}`;

    itMakesACallTo(url, accountId);
  });
});
