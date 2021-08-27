import { ShareDealingContext } from './types';

const setQuoteExpiry = (ctx: ShareDealingContext) => ctx.quoteExpiryInMs;

export default {
  QUOTE_EXPIRY: setQuoteExpiry,
};
