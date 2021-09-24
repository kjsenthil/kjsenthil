import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { API_ENDPOINTS } from '../../../config';
import { mockInvestmentAccountDetails } from '../mocks';
import getInvestmentAccountDetails from './getInvestmentAccountDetails';

const mockAxios = new MockAdapter(axios);

const accountId = 1234;
const isin = `GB00BH4HKS39`;

let url = `${API_ENDPOINTS.MYACCOUNT_ACCOUNT}`.replace(/\{id\}/, String(accountId));
url = `${url}?include=cash-position,asset-info&filter[asset-info.isin]=${isin}`;

describe('getInvestmentAccountDetails', () => {
  it(`makes a call to ${url}`, async () => {
    mockAxios.onGet(url).reply(200, mockInvestmentAccountDetails);

    const response = await getInvestmentAccountDetails({
      accountId,
      filter: { 'asset-info.isin': isin },
      include: ['cash-position', 'asset-info'],
    });

    expect(response).toStrictEqual(mockInvestmentAccountDetails);
  });
});
