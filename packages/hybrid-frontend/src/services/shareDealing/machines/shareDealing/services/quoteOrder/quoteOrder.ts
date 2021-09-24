/* eslint-disable prefer-promise-reject-errors */
import {
  ShareDealingContext,
  MarketQuoteDetails,
  LimitQuoteDetails,
  QuoteDetails,
} from '../../types';
import {
  PostMarketQuoteRequest,
  GetMarketQuoteStatusResponse,
  PostLimitCostResponse,
} from '../../../../api/types';
import { postLimitCost, getMarketQuoteStatus, postCreateMarketQuote } from '../../../../api';
import tryGettingStatus from '../tryGettingStatus';
import handleErrors from '../handleErrors';

const quoteOrder = async (ctx: ShareDealingContext): Promise<{ quote: QuoteDetails }> => {
  const payload: PostMarketQuoteRequest['data']['attributes'] = {
    accountId: Number(ctx.accountId!),
    order: {
      isin: ctx.isin!,
      amount: ctx.orderShareAmount || 0,
      units: ctx.orderShareUnits || 0,
      orderSizeType: ctx.orderShareAmount !== null ? 'Amount' : 'Units',
      orderType: ctx.orderType || 'Buy',
    },
  };

  let response: GetMarketQuoteStatusResponse | PostLimitCostResponse;
  let quoteDetails:
    | Pick<
        MarketQuoteDetails,
        'quoteId' | 'quotedPrice' | 'quoteExpiryDateTime' | 'adjustedExpiryTimeEpoch'
      >
    | {} = {};

  const limitDetails: Pick<LimitQuoteDetails, 'limitPrice' | 'limitOrderCalendarDaysToExpiry'> = {
    limitOrderCalendarDaysToExpiry: Number(ctx.limitOrderExpiryDays),
    limitPrice: Number(ctx.limitOrderChangeInPrice),
  };

  let isStillPending = false;

  if (ctx.executionType === 'limit') {
    const limitCostResult = await handleErrors(() =>
      postLimitCost({
        ...payload,
        order: {
          ...payload.order,
          ...limitDetails,
        },
      })
    );

    if (!limitCostResult.response && limitCostResult.errors) {
      return Promise.reject({ errors: limitCostResult.errors });
    }

    response = limitCostResult.response;
  } else {
    const marketQuoteResponse = await handleErrors(() => postCreateMarketQuote(payload));

    if (!marketQuoteResponse.response && marketQuoteResponse.errors) {
      return Promise.reject({ errors: marketQuoteResponse.errors });
    }

    response = await tryGettingStatus<GetMarketQuoteStatusResponse>(() =>
      getMarketQuoteStatus(marketQuoteResponse.response.data.attributes.quoteRequestId)
    );

    if (response.data.attributes.apiResourceStatus === 'Pending') {
      isStillPending = true;
    } else {
      const quoteResponse = response as GetMarketQuoteStatusResponse;

      quoteDetails = {
        quoteId: quoteResponse.data.attributes.quoteId,
        quoteRequestId: quoteResponse.data.attributes.quoteRequestId,
        quotedPrice: quoteResponse.data.attributes.order.quotedPrice,
        quoteExpiryDateTime: new Date(quoteResponse.data.attributes.order.quoteExpiryDateTime),
        adjustedExpiryTimeEpoch: quoteResponse.data.attributes.order.adjustedExpiryTimeEpoch,
      };
    }
  }

  const { orderType, numberOfUnits, estimatedTotalOrder, cost } = response.data.attributes.order;

  if (isStillPending) {
    return Promise.reject({ errors: { quotingOrder: 'Quote is still pending' } });
  }

  return Promise.resolve({
    quote: {
      isin: String(ctx.isin),
      orderType,
      numberOfUnits,
      estimatedTotalOrder,
      cost,
      ...quoteDetails,
      ...limitDetails,
    },
  });
};

export default quoteOrder;
