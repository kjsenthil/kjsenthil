import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { API_ENDPOINTS } from '../../../config';
import getPerformanceContact from './getPerformanceContact';

const mockAxios = new MockAdapter(axios);
const contactId = 12345678;
const url = `${API_ENDPOINTS.MYACCOUNT_PERFORMANCE_CONTACT?.replace(
  /{id}/,
  String(contactId)
)}?include=contributions`;

describe('getPerformanceContact', () => {
  it(`makes a call to ${url}`, async () => {
    const data = {};

    mockAxios.onGet(url).reply(200, data);

    const response = await getPerformanceContact({ contactId });

    expect(response).toEqual(data);
  });
});
