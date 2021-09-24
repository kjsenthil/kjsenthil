import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { API_ENDPOINTS } from '../../../config';
import postCreateMarketOrderShareQuote from './postCreateMarketQuote';
import { PostMarketQuoteRequest, PostMarketQuoteResponse } from './types';

const mockAxios = new MockAdapter(axios);

const url = API_ENDPOINTS.CREATE_SHARE_QUOTE;

describe('postCreateMarketOrderShareQuote', () => {
  it(`makes a call to ${url}`, async () => {
    const requestPayload: PostMarketQuoteRequest = {
      data: {
        type: 'share-quote',
        id: null,
        attributes: {
          accountId: 12345678,
          order: {
            isin: 'GB00BH4HKS39',
            amount: 14676984,
            units: 0,
            orderType: 'Buy',
            orderSizeType: 'Amount',
          },
        },
      },
    };

    const responseData: PostMarketQuoteResponse = {
      data: {
        type: 'share-quote',
        id: null,
        attributes: {
          quoteRequestId: '236803ae-19f3-4f7c-a29c-66a6c0ad3bc3',
        },
        links: {
          self: 'https://localhost:44313/api/share-quote/',
        },
      },
    };

    mockAxios.onPost(url, requestPayload).reply(200, responseData);

    const response = await postCreateMarketOrderShareQuote(requestPayload.data.attributes);

    expect(response).toStrictEqual(responseData);
  });
});
