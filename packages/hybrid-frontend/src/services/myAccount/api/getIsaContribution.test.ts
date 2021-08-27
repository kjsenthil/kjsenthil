import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { API_ENDPOINTS } from '../../../config';
import { mockIsaContribution } from '../mocks';
import getIsaContribution from './getIsaContribution';

const mockAxios = new MockAdapter(axios);

const mockContactId = 1234;
const url = `${API_ENDPOINTS.MYACCOUNT_ISA_CONTRIBUTIONS}`.replace(/\{id\}/, String(mockContactId));

describe('getIsaContribution', () => {
  it(`makes a call to ${url}`, async () => {
    mockAxios.onGet(url).reply(200, mockIsaContribution);

    const response = await getIsaContribution(mockContactId);

    expect(response).toStrictEqual(mockIsaContribution);
  });
});
