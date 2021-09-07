import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { API_ENDPOINTS } from '../../../config';
import postLimitCost from './postLimitCost';
import { PostLimitCostRequest, PostLimitCostResponse } from './types';

const mockAxios = new MockAdapter(axios);

const url = API_ENDPOINTS.GET_LIMIT_COST;

describe('postLimitCost', () => {
  it(`makes a call to ${url}`, async () => {
    const requestData: PostLimitCostRequest = {
      data: {
        type: 'limit-cost',
        id: null,
        attributes: {
          accountId: 20329,
          updatedBy: 'user-name',
          order: {
            isin: 'GB00BH4HKS39',
            amount: 0,
            units: 132,
            orderType: 'Sell',
            orderSizeType: 'Units',
            limitPrice: 1.32,
            limitOrderCalendarDaysToExpiry: 1,
          },
        },
      },
    };

    const responseData: PostLimitCostResponse = {
      data: {
        type: 'limit-cost',
        id: null,
        attributes: {
          accountId: 20329,
          updatedBy: 'first-name',
          order: {
            isin: 'GB00BH4HKS39',
            amount: 0.0,
            units: 132.0,
            orderType: 'Sell',
            orderSizeType: 'Amount',
            limitPrice: 1.32,
            limitOrderCalendarDaysToExpiry: 1,
            numberOfUnits: 132,
            estimatedTotalOrder: 166.74,
            cost: {
              commission: 7.5,
              ptmLevy: 0.0,
              stampDuty: 0.0,
            },
          },
        },
      },
    };

    mockAxios.onPost(url, requestData).reply(200, responseData);

    const response = await postLimitCost(requestData.data.attributes);

    expect(response).toStrictEqual(responseData);
  });
});
