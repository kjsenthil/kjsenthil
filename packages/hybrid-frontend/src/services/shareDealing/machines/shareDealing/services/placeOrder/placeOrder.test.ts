import placeOrder from './placeOrder';
import * as api from '../../../../api';
import defaultContext from '../../context';
import { OrderDetails, ShareDealingContext, MarketQuoteDetails } from '../../types';
import { GetShareOrderStatusResponse, PostShareOrderResponse } from '../../../../api/types';

const quoteId = '236803ae-19f3-4f7c-a29c-66a6c0ad3bc3';
const context: ShareDealingContext = {
  ...defaultContext,
  isin: 'IE00B42P0H75',
  orderMethod: 'limit',
  orderType: 'Buy',
  accountId: 1111111,
  updatedBy: 'first name',
  orderShareAmount: 10000,
  orderShareUnits: 0,
  limitOrderChangeInPrice: 100,
  limitOrderExpiryDays: 25,
  quote: {
    quoteId,
  } as MarketQuoteDetails,
};

jest.mock('../tryGettingStatus', () => ({
  __esModule: true,
  default: (callback) => callback(),
}));

jest.mock('../../../../api', () => ({
  postCreateShareOrder: jest.fn(),
  getShareOrderStatus: jest.fn(),
}));

const mockPostCreateShareOrder = api.postCreateShareOrder as jest.Mock<
  Promise<PostShareOrderResponse>
>;
const postGetShareOrderStatus = api.getShareOrderStatus as jest.Mock<
  Promise<GetShareOrderStatusResponse>
>;

const date = '2021-08-26T13:33:34.309';

const orderDetails: OrderDetails = {
  isin: String(context.isin),
  orderPlacedDate: new Date(date),
  orderStatus: 'New',
  orderType: context.orderType!,
  numberOfUnits: Number(context.orderShareUnits),
  estimatedTotalOrder: 1000,
  orderId: '1231222',
  shareName: 'Polar Capital Biotechnology I GBP Inc',
  quotedPrice: 456.22,
  epicCode: 'VOD',
  transactionTime: new Date(date),
  cost: {
    commission: 1,
    ptmLevy: 0,
    stampDuty: 1,
  },
};

const orderStatusResponse: GetShareOrderStatusResponse = {
  data: {
    attributes: {
      apiResourceStatus: 'Completed',
      orderId: orderDetails.orderId,
      order: {
        ...orderDetails,
        transactionTime: date,
        orderPlacedDate: date,
      },
    },
  },
};

describe('placeOrder', () => {
  beforeEach(() => {
    mockPostCreateShareOrder.mockResolvedValue({
      data: { attributes: { orderId: orderDetails.orderId } },
    });
  });

  describe('when api resource is Complete', () => {
    let result: OrderDetails;

    beforeEach(async () => {
      postGetShareOrderStatus.mockResolvedValue(orderStatusResponse);
      result = await placeOrder(context);
    });

    it('places an order', () => {
      expect(mockPostCreateShareOrder).toHaveBeenNthCalledWith(1, {
        accountId: Number(context.accountId),
        updatedBy: String(context.updatedBy),
        quoteId,
        order: {
          isin: String(context.isin),
          amount: context.orderShareAmount || 0,
          units: context.orderShareUnits || 0,
          orderSizeType: 'Amount',
          orderType: context.orderType || 'Buy',
          executionType: context.orderMethod ? context.orderMethod : 'market',
          limitOrderCalendarDaysToExpiry: context.limitOrderExpiryDays || 0,
          limitPrice: context.limitOrderChangeInPrice || 0,
        },
      });
    });

    it('requests placed order status', () => {
      expect(postGetShareOrderStatus).toHaveBeenNthCalledWith(1, orderDetails.orderId);
    });

    it('returns normalised orderDetails', () => {
      expect(result).toStrictEqual(orderDetails);
    });
  });

  describe('when api resource is Pending', () => {
    it('rejects with an error', async () => {
      orderStatusResponse.data.attributes.apiResourceStatus = 'Pending';
      postGetShareOrderStatus.mockResolvedValue(orderStatusResponse);
      await expect(placeOrder(context)).rejects.toStrictEqual({
        placingOrder: 'Order is still pending',
      });
    });
  });
});
