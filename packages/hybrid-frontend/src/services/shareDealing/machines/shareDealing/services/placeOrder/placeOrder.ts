/* eslint-disable prefer-promise-reject-errors */
import { ShareDealingContext, OrderDetails, MarketQuoteDetails } from '../../types';
import { postCreateShareOrder, getShareOrderStatus } from '../../../../api';
import tryGettingStatus from '../tryGettingStatus';

const placeOrder = async (ctx: ShareDealingContext): Promise<{ order: OrderDetails }> => {
  const {
    data: {
      attributes: { orderId },
    },
  } = await postCreateShareOrder({
    accountId: Number(ctx.accountId!),
    quoteRequestId: (ctx.quote as MarketQuoteDetails)?.quoteRequestId,
    quoteId: (ctx.quote as MarketQuoteDetails)?.quoteId,
    order: {
      isin: ctx.isin!,
      amount: ctx.orderShareAmount || 0,
      units: ctx.orderShareUnits || 0,
      orderSizeType: ctx.orderShareAmount !== null ? 'Amount' : 'Units',
      orderType: ctx.orderType || 'Buy',
      executionType: ctx.executionType === 'limit' ? 'limit' : 'quoteanddeal',
      limitOrderCalendarDaysToExpiry: ctx.limitOrderExpiryDays || 0,
      limitPrice: ctx.limitOrderChangeInPrice || 0,
    },
  });

  const response = await tryGettingStatus(() => getShareOrderStatus(orderId), {
    numOfAttempts: 30,
    delayInMs: 2000,
  });

  return new Promise((resolve, reject) => {
    if (response.data.attributes.apiResourceStatus === 'Pending') {
      reject({ errors: { placingOrder: 'Order is still pending' } });
      return;
    }

    const {
      orderType,
      orderPlacedDate,
      orderStatus,
      cost,
      transactionTime,
      shareName,
      epicCode,
      estimatedTotalOrder,
      numberOfUnits,
      quotedPrice,
    } = response.data.attributes.order;

    resolve({
      order: {
        isin: String(ctx.isin),
        orderType,
        numberOfUnits,
        estimatedTotalOrder,
        cost,
        orderPlacedDate: new Date(orderPlacedDate),
        orderStatus,
        quotedPrice,
        epicCode,
        shareName,
        transactionTime: new Date(transactionTime),
        orderId,
      },
    });
  });
};

export default placeOrder;
