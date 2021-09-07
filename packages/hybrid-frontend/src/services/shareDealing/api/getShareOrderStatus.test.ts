import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { API_ENDPOINTS } from '../../../config';
import getShareOrderStatus from './getShareOrderStatus';
import { GetShareOrderStatusResponse } from './types';

const mockAxios = new MockAdapter(axios);

const orderId = '18994653';
const url = `${API_ENDPOINTS.GET_SHARE_ORDER_STATUS}?orderId=${orderId}`;

describe('getShareOrderStatus', () => {
  it(`makes a call to ${url}`, async () => {
    const responseData: GetShareOrderStatusResponse = {
      data: {
        type: 'share-order-execution-status',
        id: orderId,
        attributes: {
          orderId,
          apiResourceStatus: 'Completed',
          order: {
            isin: 'GB00BH4HKS39',
            orderPlacedDate: '2021-08-26T13:33:34.309',
            orderType: 'Buy',
            quotedPrice: 1.0,
            shareName: 'Tesla',
            epicCode: 'VOD',
            numberOfUnits: 1,
            orderStatus: 'New',
            estimatedTotalOrder: 8.5076,
            transactionTime: '2021-08-26T13:33:34.30',
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

    const response = await getShareOrderStatus(orderId);

    expect(response).toStrictEqual(responseData);
  });
});
