import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { API_ENDPOINTS } from '../../../config';
import getMarketQuoteStatus from './getMarketQuoteStatus';
import { GetMarketQuoteStatusResponse } from './types';

const mockAxios = new MockAdapter(axios);

const quoteId = '236803ae-19f3-4f7c-a29c-66a6c0ad3bc3';
const url = `${API_ENDPOINTS.GET_SHARE_QUOTE_STATUS}?quoteGuid=${quoteId}`;

describe('getMarketQuoteStatus', () => {
  it(`makes a call to ${url}`, async () => {
    const responseData: GetMarketQuoteStatusResponse = {
      data: {
        type: 'share-quote-status',
        id: '236803ae-19f3-4f7c-a29c-66a6c0ad3bc3',
        attributes: {
          quoteId,
          apiResourceStatus: 'Completed',
          quoteRejectReason: 0,
          quoteRejectReasonText: null,
          order: {
            isin: 'GB00BH4HKS39',
            quoteExpiryDateTime: '2021-08-26T13:33:34.309',
            orderType: 'Buy',
            quotedPrice: 1.0,
            numberOfUnits: 1,
            estimatedTotalOrder: 8.5076,
            cost: {
              commission: 7.5,
              ptmLevy: 0.0,
              stampDuty: 0.0076,
            },
          },
        },
      },
    };

    mockAxios.onGet(url).reply(200, responseData);

    const response = await getMarketQuoteStatus(quoteId);

    expect(response).toStrictEqual(responseData);
  });
});
