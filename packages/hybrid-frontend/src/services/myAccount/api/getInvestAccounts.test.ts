import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { API_ENDPOINTS } from '../../../config';
import { AccountData } from '../../types';
import { mockAccounts, mockInvestAccounts, mockInvestSummaryResponse } from '../mocks';
import getInvestAccounts from './getInvestAccounts';

const mockAxios = new MockAdapter(axios);

const mockAccountIds = ['12345', '23456', '34567'];
const url = `${
  API_ENDPOINTS.MYACCOUNT_INVESTMENT_SUMMARY_ACCOUNTS
}?filter[id]=${mockAccountIds.join(',')}`;

describe('getInvestAccounts', () => {
  const mockInvestAccountsResponse: AccountData[] = mockInvestAccounts;

  it(`makes a call to ${url}`, async () => {
    mockAxios.onGet(url).reply(200, mockInvestSummaryResponse);

    const response = await getInvestAccounts(mockAccounts);

    expect(response).toStrictEqual(mockInvestAccountsResponse);
  });
});
