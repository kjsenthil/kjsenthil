import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { API_ENDPOINTS } from '../../../config';
import { mockBankAccountDetailsResponse } from '../mocks';
import getBankAccountDetails from './getBankAccountDetails';

const mockAxios = new MockAdapter(axios);

const contactId = 1234;

let url = `${API_ENDPOINTS.MYACCOUNT_BANK_DETAILS}`.replace(/\{id\}/, String(contactId));

describe('getBankAccountDetails', () => {
  it(`makes a call to ${url}`, async () => {
    mockAxios.onGet(url).reply(200, mockBankAccountDetailsResponse);

    const response = await getBankAccountDetails(contactId);
    expect(response).toStrictEqual(mockBankAccountDetailsResponse);
  });
});
