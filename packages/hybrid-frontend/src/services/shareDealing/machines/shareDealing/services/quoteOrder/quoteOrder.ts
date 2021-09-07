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

const quoteOrder = async (ctx: ShareDealingContext): Promise<QuoteDetails> => {
  const payload: PostMarketQuoteRequest['data']['attributes'] = {
    accountId: ctx.accountId!,
    updatedBy: ctx.updatedBy!,
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
    | Pick<MarketQuoteDetails, 'quoteId' | 'quotedPrice' | 'quoteExpiryDateTime'>
    | {} = {};

  const limitDetails: Pick<LimitQuoteDetails, 'limitPrice' | 'limitOrderCalendarDaysToExpiry'> = {
    limitOrderCalendarDaysToExpiry: Number(ctx.limitOrderExpiryDays),
    limitPrice: Number(ctx.limitOrderChangeInPrice),
  };

  let isStillPending = false;

  if (ctx.orderMethod === 'limit') {
    response = await postLimitCost({
      ...payload,
      order: {
        ...payload.order,
        ...limitDetails,
      },
    });
  } else {
    const {
      data: {
        attributes: { quoteGuid },
      },
    } = await postCreateMarketQuote(payload);

    response = await tryGettingStatus<GetMarketQuoteStatusResponse>(() =>
      getMarketQuoteStatus(quoteGuid)
    );

    if (response.data.attributes.apiResourceStatus === 'Pending') {
      isStillPending = true;
    } else {
      const quoteResponse = response as GetMarketQuoteStatusResponse;

      quoteDetails = {
        quoteId: quoteGuid,
        quotedPrice: quoteResponse.data.attributes.order.quotedPrice,
        quoteExpiryDateTime: new Date(quoteResponse.data.attributes.order.quoteExpiryDateTime),
      };
    }
  }

  const { orderType, numberOfUnits, estimatedTotalOrder, cost } = response.data.attributes.order;

  return new Promise((resolve, reject) => {
    if (isStillPending) {
      // eslint-disable-next-line prefer-promise-reject-errors
      reject({ quotingOrder: 'Quote is still pending' });
      return;
    }

    resolve({
      isin: String(ctx.isin),
      orderType,
      numberOfUnits,
      estimatedTotalOrder,
      cost,
      ...quoteDetails,
      ...limitDetails,
    });
  });
};

export default quoteOrder;
