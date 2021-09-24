import { ShareDealingContext } from './types';

const ADDITIONAL_BUFFER = 100;
const setQuoteExpiry = (ctx: ShareDealingContext) => ctx.quoteExpiryInMs + ADDITIONAL_BUFFER;

export default {
  QUOTE_EXPIRY: setQuoteExpiry,
};
