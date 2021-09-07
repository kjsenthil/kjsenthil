import { ShareDealingContext } from './types';
import constants from './constants';

const context: ShareDealingContext = {
  accountId: null,
  updatedBy: null,
  isin: null,
  shareName: null,
  indicativePrice: 0,
  indicativePriceDate: null,
  availableCash: 0,
  quoteExpiryInMs: constants.DEFAULT_QUOTE_EXPIRY_IN_MS,
  isMarketOpen: false,
  orderType: null,
  orderMethod: null,
  orderShareUnits: null,
  orderShareAmount: null,
  limitOrderChangeInPrice: null,
  limitOrderExpiryDays: null,
  canGetQuote: false,
  errors: {},
  order: null,
  quote: null,
};

export default context;
