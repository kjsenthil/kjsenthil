import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { API_ENDPOINTS } from '../../../config';
import { mockClientResponse } from '../mocks';
import getClient from './getClient';

const mockAxios = new MockAdapter(axios);
const contactId = 12345678;
const url = `${API_ENDPOINTS.MYACCOUNT_CLIENTS.replace(
  /\{id\}/,
  String(contactId)
)}?include=accounts,linked-accounts`;

describe('getClient', () => {
  it(`makes a call to ${url}`, async () => {
    mockAxios.onGet(url).reply(200, mockClientResponse);

    const response = await getClient(contactId);

    expect(response).toStrictEqual(mockClientResponse);
  });
});
