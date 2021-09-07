import { ShareDealingContext, OrderDetails, MarketQuoteDetails } from '../../types';
import { postCreateShareOrder, getShareOrderStatus } from '../../../../api';
import tryGettingStatus from '../tryGettingStatus';

const placeOrder = async (ctx: ShareDealingContext): Promise<OrderDetails> => {
  const {
    data: {
      attributes: { orderId },
    },
  } = await postCreateShareOrder({
    accountId: ctx.accountId!,
    updatedBy: ctx.updatedBy!,
    quoteId: (ctx.quote as MarketQuoteDetails)?.quoteId,
    order: {
      isin: ctx.isin!,
      amount: ctx.orderShareAmount || 0,
      units: ctx.orderShareUnits || 0,
      orderSizeType: ctx.orderShareAmount !== null ? 'Amount' : 'Units',
      orderType: ctx.orderType || 'Buy',
      executionType: ctx.orderMethod ? ctx.orderMethod : 'market',
      limitOrderCalendarDaysToExpiry: ctx.limitOrderExpiryDays || 0,
      limitPrice: ctx.limitOrderChangeInPrice || 0,
    },
  });

  const response = await tryGettingStatus(() => getShareOrderStatus(orderId));

  return new Promise((resolve, reject) => {
    if (response.data.attributes.apiResourceStatus === 'Pending') {
      // eslint-disable-next-line prefer-promise-reject-errors
      reject({ placingOrder: 'Order is still pending' });
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
    });
  });
};

export default placeOrder;
