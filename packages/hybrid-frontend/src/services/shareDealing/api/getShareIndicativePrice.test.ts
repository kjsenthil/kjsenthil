import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { API_ENDPOINTS } from '../../../config';
import getShareIndicativePrice from './getShareIndicativePrice';
import { GetShareIndicativePriceResponse } from './types';

const mockAxios = new MockAdapter(axios);

const isin = 'GB00B019KW72';

const url = `${API_ENDPOINTS.GET_SHARE_INDICATIVE_PRICE}?isin=${isin}`;

describe('getShareIndicativePrice', () => {
  it(`makes a call to ${url}`, async () => {
    const responseData: GetShareIndicativePriceResponse = {
      data: {
        type: 'share-indicative-price',
        attributes: {
          assetId: '3988',
          assetName: 'J Sainsbury PLC',
          isin,
          sedol: 'B019KW7',
          epic: 'SBRY',
          price: '2.29500000',
          priceDateTime: '2019-12-17 11:40:00',
        },
      },
    };

    mockAxios.onGet(url).reply(200, responseData);

    const response = await getShareIndicativePrice(isin);

    expect(response).toStrictEqual(responseData);
  });
});
