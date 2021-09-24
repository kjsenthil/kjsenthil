import { assign, AssignAction } from 'xstate';
import { calculateRemainingTimeInMs } from '../../../../utils/date';
import {
  SetOrderDoneEvent,
  SetShareDetailsEvent,
  SetQuoteErrorsEvent,
  SetQuoteDoneEvent,
  ErrorKeys,
  SetSpecificAmountEvent,
  SetLimitOrderChangeInPriceEvent,
  SetLimitOrderExpiryDaysEvent,
  ShareDealingContext,
  ShareDealingEvents,
  SetNumOfUnitsEvent,
  MarketQuoteDetails,
} from './types';
import constants from './constants';

const omitError = (ctx: ShareDealingContext, key: ErrorKeys) => {
  Reflect.deleteProperty(ctx.errors, key);
  return ctx.errors;
};

const setShareDetails = assign<ShareDealingContext, SetShareDetailsEvent>((_, event) => ({
  ...event.data,
}));

const setBuyingOrder = assign<ShareDealingContext>({ orderType: 'Buy' });

const setNumOfUnits = assign<ShareDealingContext, SetNumOfUnitsEvent>((ctx, event) => ({
  orderShareAmount: null,
  orderShareUnits: event.payload.orderShareUnits,
  errors: omitError(ctx, 'orderShareUnits'),
}));

const setSpecificAmount = assign<ShareDealingContext, SetSpecificAmountEvent>((ctx, event) => ({
  orderShareUnits: null,
  orderShareAmount: event.payload.orderShareAmount,
  errors: omitError(ctx, 'orderShareAmount'),
}));

const setCanGetQuote = assign<ShareDealingContext>({
  canGetQuote: (ctx) => {
    const hasSelectedDesiredAmountOrUnits = !!ctx.orderShareAmount || !!ctx.orderShareUnits;

    const hasNoErrors =
      !ctx.errors.orderShareAmount &&
      !ctx.errors.orderShareUnits &&
      !ctx.errors.limitOrderChangeInPrice &&
      !ctx.errors.limitOrderExpiryDays;

    return (
      hasNoErrors &&
      ((ctx.executionType === 'market' && hasSelectedDesiredAmountOrUnits) ||
        (ctx.executionType === 'limit' &&
          hasSelectedDesiredAmountOrUnits &&
          !!ctx.limitOrderChangeInPrice &&
          !!ctx.limitOrderExpiryDays))
    );
  },
});

const setMarketOrder = assign<ShareDealingContext>({ executionType: 'market' });

const setLimitOrder = assign<ShareDealingContext>({ executionType: 'limit' });

const setLimitOrderChangeInPrice = assign<ShareDealingContext, SetLimitOrderChangeInPriceEvent>(
  (ctx, event) => ({
    limitOrderChangeInPrice: event.payload.limitOrderChangeInPrice,
    errors: omitError(ctx, 'limitOrderChangeInPrice'),
  })
);

const setLimitOrderExpiryDays = assign<ShareDealingContext, SetLimitOrderExpiryDaysEvent>(
  (ctx, event) => ({
    limitOrderExpiryDays: event.payload.limitOrderExpiryDays,
    errors: omitError(ctx, 'limitOrderExpiryDays'),
  })
);

const setQuoteDetails = assign<ShareDealingContext, SetQuoteDoneEvent>((_, event) => ({
  quote: event.data.quote,
}));

const setOrderDetails = assign<ShareDealingContext, SetOrderDoneEvent>((_, event) => ({
  order: event.data.order,
}));

const resetQuoteDetails = assign<ShareDealingContext>({ quote: null });

const calculateQuoteExpiryInMs = assign<ShareDealingContext>((ctx) => ({
  quoteExpiryInMs:
    ctx.quote && (ctx.quote as MarketQuoteDetails).adjustedExpiryTimeEpoch
      ? calculateRemainingTimeInMs((ctx.quote as MarketQuoteDetails).adjustedExpiryTimeEpoch)
      : constants.DEFAULT_QUOTE_EXPIRY_IN_MS,
}));

const setErrors = assign<ShareDealingContext, SetQuoteErrorsEvent>((ctx, event) => ({
  errors: { ...ctx.errors, ...event.data.errors },
}));

const resetErrors = assign({ errors: {} });

const clearFields = assign<ShareDealingContext>({
  limitOrderChangeInPrice: null,
  limitOrderExpiryDays: null,
  orderShareAmount: null,
  orderShareUnits: null,
  errors: {},
});

export default ({
  setShareDetails,
  setBuyingOrder,
  setNumOfUnits,
  setSpecificAmount,
  setCanGetQuote,
  setMarketOrder,
  setLimitOrder,
  setLimitOrderChangeInPrice,
  setLimitOrderExpiryDays,
  calculateQuoteExpiryInMs,
  setQuoteDetails,
  setOrderDetails,
  resetQuoteDetails,
  setErrors,
  resetErrors,
  clearFields,
} as unknown) as AssignAction<ShareDealingContext, ShareDealingEvents>;
