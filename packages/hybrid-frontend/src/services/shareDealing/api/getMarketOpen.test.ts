import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { API_ENDPOINTS } from '../../../config';
import getMarketOpen from './getMarketOpen';

const mockAxios = new MockAdapter(axios);
const url = API_ENDPOINTS.MARKET_OPEN;

describe('getMarketOpen', () => {
  it(`makes a call to ${url}`, async () => {
    const data = {
      data: { attribbutes: { marketOpen: true } },
    };
    mockAxios.onGet(url).reply(200, data);

    const response = await getMarketOpen();

    expect(response).toStrictEqual(data);
  });
});
