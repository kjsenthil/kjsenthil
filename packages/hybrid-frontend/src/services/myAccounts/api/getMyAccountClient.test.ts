import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { API_ENDPOINTS } from '../../../config';
import getMyAccountClient from './getMyAccountClient';

const mockAxios = new MockAdapter(axios);
const contactId = '12345678';
const url = API_ENDPOINTS.MYACCOUNT_CLIENTS.replace(/\{id\}/, contactId);

describe('getMyAccountClient', () => {
  it(`makes a call to ${url}`, async () => {
    const data = {};

    mockAxios.onGet(url).reply(200, data);

    const response = await getMyAccountClient(contactId);

    expect(response).toStrictEqual(data);
  });
});
