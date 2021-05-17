import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { API_ENDPOINTS } from '../../../config';
import { mockClientResponse } from '../mocks';
import getMyAccountClient from './getMyAccountClient';

const mockAxios = new MockAdapter(axios);
const contactId = '12345678';
const url = `${API_ENDPOINTS.MYACCOUNT_CLIENTS.replace(/\{id\}/, contactId)}?include=accounts`;

describe('getMyAccountClient', () => {
  it(`makes a call to ${url}`, async () => {
    mockAxios.onGet(url).reply(200, mockClientResponse);

    const response = await getMyAccountClient(contactId);

    expect(response).toStrictEqual(mockClientResponse);
  });
});
