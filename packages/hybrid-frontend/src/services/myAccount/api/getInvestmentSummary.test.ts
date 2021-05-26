import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { API_ENDPOINTS } from '../../../config';
import { mockAccounts, mockInvestSummaryResponse } from '../mocks';
import getInvestmentSummary from './getInvestmentSummary';

const mockAxios = new MockAdapter(axios);

const mockAccountIds = ['12345', '23456', '34567'];
const url = `${
  API_ENDPOINTS.MYACCOUNT_INVESTMENT_SUMMARY_ACCOUNTS
}?filter[id]=${mockAccountIds.join(',')}`;

describe('getInvestmentSummary', () => {
  it(`makes a call to ${url}`, async () => {
    mockAxios.onGet(url).reply(200, mockInvestSummaryResponse);

    const response = await getInvestmentSummary(mockAccounts);

    expect(response).toStrictEqual(mockInvestSummaryResponse);
  });
});
