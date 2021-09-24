import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { API_ENDPOINTS } from '../../../config';
import getMarketQuoteStatus from './getMarketQuoteStatus';
import { GetMarketQuoteStatusResponse } from './types';

const mockAxios = new MockAdapter(axios);

const quoteRequestId = '236803ae-19f3-4f7c-a29c-66a6c0ad3bc3';
const quoteId = '236803ae-19f3-4f7c-a29c-66a6c0ad3bc2';

const url = `${API_ENDPOINTS.GET_SHARE_QUOTE_STATUS}?quoteRequestId=${quoteRequestId}`;

describe('getMarketQuoteStatus', () => {
  it(`makes a call to ${url}`, async () => {
    const responseData: GetMarketQuoteStatusResponse = {
      data: {
        type: 'share-quote-status',
        id: quoteRequestId,
        attributes: {
          quoteId,
          quoteRequestId,
          apiResourceStatus: 'Completed',
          quoteRejectReason: 0,
          quoteRejectReasonText: null,
          order: {
            isin: 'GB00BH4HKS39',
            quoteExpiryDateTime: '2021-08-26T13:33:34.309',
            adjustedExpiryTimeEpoch: new Date('2021-08-26T13:33:34.309').getTime(),
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

    const response = await getMarketQuoteStatus(quoteRequestId);

    expect(response).toStrictEqual(responseData);
  });
});
