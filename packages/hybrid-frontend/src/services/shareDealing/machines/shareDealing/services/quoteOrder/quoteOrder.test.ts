import quoteOrder from './quoteOrder';
import * as api from '../../../../api';
import defaultContext from '../../context';
import { QuoteDetails, ShareDealingContext } from '../../types';
import {
  PostMarketQuoteResponse,
  PostLimitCostResponse,
  GetMarketQuoteStatusResponse,
} from '../../../../api/types';

jest.mock('../tryGettingStatus', () => ({
  __esModule: true,
  default: (callback) => callback(),
}));

jest.mock('../../../../api', () => ({
  postLimitCost: jest.fn(),
  getMarketQuoteStatus: jest.fn(),
  postCreateMarketQuote: jest.fn(),
}));

const context: ShareDealingContext = {
  ...defaultContext,
  isin: 'IE00B42P0H75',
  executionType: 'limit',
  orderType: 'Buy',
  accountId: 1111111,
  orderShareAmount: 10000,
  orderShareUnits: 0,
  limitOrderChangeInPrice: 100,
  limitOrderExpiryDays: 25,
};

const mockPostLimitCost = api.postLimitCost as jest.Mock<Promise<PostLimitCostResponse>>;

const mockPostCreateMarketQuote = api.postCreateMarketQuote as jest.Mock<
  Promise<PostMarketQuoteResponse>
>;

const mockGetMarketQuoteStatus = api.getMarketQuoteStatus as jest.Mock<
  Promise<GetMarketQuoteStatusResponse>
>;

const date = '2021-08-26T13:33:34.309';
const quoteId = '236803ae-19f3-4f7c-a29c-66a6c0ad3bc3';
const quoteRequestId = '236803ae-19f3-4f7c-a29c-66a6c0ad3bc2';

const limitSpecificDetails = {
  limitOrderCalendarDaysToExpiry: Number(context.limitOrderExpiryDays),
  limitPrice: Number(context.limitOrderChangeInPrice),
};

const quoteSpecificDetails = {
  quotedPrice: 10,
  quoteId,
  quoteRequestId,
  quoteExpiryDateTime: new Date(date),
  adjustedExpiryTimeEpoch: new Date(date).getTime(),
};

const commonDetails: Omit<QuoteDetails, 'quotedPrice' | 'quoteId' | 'quoteExpiryDateTime'> = {
  isin: String(context.isin),
  orderType: context.orderType!,
  numberOfUnits: context.orderShareUnits!,
  estimatedTotalOrder: 1000,
  cost: {
    commission: 1,
    ptmLevy: 0,
    stampDuty: 1,
  },
};

const quoteStatusResponse: GetMarketQuoteStatusResponse = {
  data: {
    attributes: {
      apiResourceStatus: 'Completed',
      quoteId,
      quoteRequestId,
      quoteRejectReason: 0,
      quoteRejectReasonText: null,
      order: {
        ...commonDetails,
        ...quoteSpecificDetails,
        quoteExpiryDateTime: date,
      },
    },
  },
};

describe('placeOrder', () => {
  describe('when creating a limit order', () => {
    let result: { quote: QuoteDetails };

    beforeEach(async () => {
      mockPostLimitCost.mockResolvedValue({
        data: {
          attributes: {
            accountId: Number(context.accountId),
            order: {
              ...commonDetails,
              orderSizeType: 'Amount',
              units: Number(context.orderShareUnits),
              amount: Number(context.orderShareAmount),
              limitOrderCalendarDaysToExpiry: Number(context.limitOrderExpiryDays),
              limitPrice: Number(context.limitOrderChangeInPrice),
            },
          },
        },
      });
      result = await quoteOrder({ ...context, executionType: 'limit' });
    });

    it('creates a quote', () => {
      expect(mockPostLimitCost).toHaveBeenCalledTimes(1);
      expect(mockPostLimitCost).toHaveBeenCalledWith({
        accountId: Number(context.accountId),
        order: {
          isin: context.isin,
          amount: context.orderShareAmount,
          units: context.orderShareUnits,
          orderSizeType: 'Amount',
          orderType: context.orderType,
          limitOrderCalendarDaysToExpiry: Number(context.limitOrderExpiryDays),
          limitPrice: Number(context.limitOrderChangeInPrice),
        },
      });
    });

    it('does not call postCreateMarketQuote or getMarketQuoteStatus', () => {
      expect(mockPostCreateMarketQuote).toHaveBeenCalledTimes(0);
      expect(mockGetMarketQuoteStatus).toHaveBeenCalledTimes(0);
    });

    it('returns normalised limit cost details', () => {
      expect(result).toStrictEqual({ quote: { ...commonDetails, ...limitSpecificDetails } });
    });
  });

  describe('when creating a market order', () => {
    let result: { quote: QuoteDetails };

    beforeEach(() => {
      mockPostCreateMarketQuote.mockResolvedValue({
        data: { attributes: { quoteRequestId } },
      });
    });

    describe('when api resource is Complete', () => {
      beforeEach(async () => {
        mockGetMarketQuoteStatus.mockResolvedValue(quoteStatusResponse);

        result = await quoteOrder({
          ...context,
          executionType: 'market',
          limitOrderChangeInPrice: null,
          limitOrderExpiryDays: null,
        });
      });

      it('creates a quote request', () => {
        expect(mockPostCreateMarketQuote).toHaveBeenNthCalledWith(1, {
          accountId: Number(context.accountId),
          order: {
            isin: String(context.isin),
            amount: context.orderShareAmount || 0,
            units: context.orderShareUnits || 0,
            orderSizeType: 'Amount',
            orderType: context.orderType || 'Buy',
          },
        });
      });

      it('requests quote status', () => {
        expect(mockGetMarketQuoteStatus).toHaveBeenNthCalledWith(1, quoteRequestId);
      });

      it('returns normalised quote details', () => {
        expect(result).toStrictEqual({
          quote: {
            ...commonDetails,
            ...quoteSpecificDetails,
            limitOrderCalendarDaysToExpiry: 0,
            limitPrice: 0,
          },
        });
      });
    });

    describe('when api resource is Pending', () => {
      it('rejects with an error', async () => {
        quoteStatusResponse.data.attributes.apiResourceStatus = 'Pending';
        mockGetMarketQuoteStatus.mockResolvedValue(quoteStatusResponse);

        await expect(quoteOrder({ ...context, executionType: 'market' })).rejects.toStrictEqual({
          errors: { quotingOrder: 'Quote is still pending' },
        });
      });
    });
  });
});
