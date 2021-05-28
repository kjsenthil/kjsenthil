import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { API_ENDPOINTS } from '../../../config';
import { mockContributions } from '../mocks';
import getContributions from './getContributions';

const mockAxios = new MockAdapter(axios);
const accountId = '43752';
const url = API_ENDPOINTS.MYACCOUNT_CONTRIBUTION.replace(/\{id\}/, accountId);

describe('getContributions', () => {
  it(`makes a call to ${url}`, async () => {
    mockAxios.onGet(url).reply(200, mockContributions);

    const response = await getContributions(accountId);

    expect(response).toStrictEqual(mockContributions);
  });
});
