import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { API_ENDPOINTS } from '../../../config';
import { mockAccounts, mockInvestSummary } from '../mocks';
import { AccountData } from '../types';
import getInvestAccounts from './getInvestAccounts';

const mockAxios = new MockAdapter(axios);

const mockAccountIds = ['12345', '23456', '34567'];
const url = `${
  API_ENDPOINTS.MYACCOUNT_INVESTMENT_SUMMARY_ACCOUNTS
}?filter[id]=${mockAccountIds.join(',')}`;

describe('getInvestAccounts', () => {
  const mockInvestAccountsResponse: AccountData[] = [
    {
      id: '12345',
      accountName: 'Investment Account ',
      accountValue: 100,
    },
    {
      id: '23456',
      accountName: 'ISA ',
      accountValue: 545908.9554399999,
    },
    {
      id: '34567',
      accountName: 'SIPP ',
      accountValue: 89367.174679,
    },
  ];

  it(`makes a call to ${url}`, async () => {
    mockAxios.onGet(url).reply(200, mockInvestSummary);

    const response = await getInvestAccounts(mockAccounts);

    expect(response).toStrictEqual(mockInvestAccountsResponse);
  });
});
