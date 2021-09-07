import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { API_ENDPOINTS } from '../../../config';
import postCreateShareOrder from './postCreateShareOrder';
import { PostShareOrderRequest, PostShareOrderResponse } from './types';

const mockAxios = new MockAdapter(axios);

const url = API_ENDPOINTS.CREATE_SHARE_ORDER;
const quoteId = '236803ae-19f3-4f7c-a29c-66a6c0ad3bc3';

describe('postCreateShareOrder', () => {
  it(`makes a call to ${url}`, async () => {
    const requestPayload: PostShareOrderRequest = {
      data: {
        type: 'share-order',
        id: null,
        attributes: {
          accountId: 12345678,
          updatedBy: 'First name',
          quoteId,
          order: {
            isin: 'GB00BH4HKS39',
            amount: 14676984,
            units: 0,
            orderType: 'Buy',
            orderSizeType: 'Amount',
            executionType: 'limit',
            limitPrice: 1.32,
            limitOrderCalendarDaysToExpiry: 25,
          },
        },
      },
    };

    const responseData: PostShareOrderResponse = {
      data: {
        type: 'share-order',
        id: null,
        attributes: {
          orderId: '18994653',
        },
        links: {
          self: 'https://localhost:44313/api/share-order/',
        },
      },
    };

    mockAxios.onPost(url, requestPayload).reply(200, responseData);

    const response = await postCreateShareOrder(requestPayload.data.attributes);

    expect(response).toStrictEqual(responseData);
  });
});
