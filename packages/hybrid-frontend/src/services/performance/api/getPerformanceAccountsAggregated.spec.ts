import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import getPerformanceAccountsAggregated, {
  getPerformanceAccountsAggregatedUrl,
} from './getPerformanceAccountsAggregated';

const mockAxios = new MockAdapter(axios);

const mockAccountIds = [12345678, 87654321];

const url = getPerformanceAccountsAggregatedUrl({ accountIds: mockAccountIds });

describe('getPerformanceAccountsAggregated', () => {
  it(`makes a call to ${url}`, async () => {
    const data = {};

    mockAxios.onGet(url).reply(200, data);

    const response = await getPerformanceAccountsAggregated({ accountIds: mockAccountIds });

    expect(response).toEqual(data);
  });
});
