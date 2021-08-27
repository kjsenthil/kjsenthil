import { ShareDealingContext } from './types';

const canGetQuote = (ctx: ShareDealingContext) => ctx.canGetQuote;

const hasQuote = (ctx: ShareDealingContext) => !!ctx.quote;

const isMarketOrder = (ctx: ShareDealingContext) => ctx.orderMethod === 'market';

const isMarketOpen = (ctx: ShareDealingContext) => ctx.isMarketOpen;

const guards = {
  canGetQuote,
  hasQuote,
  isMarketOrder,
  isMarketOpen,
};

export default guards;
