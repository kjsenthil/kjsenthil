import { ShareDealingContext } from './types';

const canGetQuote = (ctx: ShareDealingContext) => ctx.canGetQuote;

const hasQuote = (ctx: ShareDealingContext) => !!ctx.quote;

const isMarketOrder = (ctx: ShareDealingContext) => ctx.executionType === 'market';

const isMarketOpen = (ctx: ShareDealingContext) => ctx.isMarketOpen;

const isFatalError = (ctx: ShareDealingContext) => !!ctx.errors.fatal;

const guards = {
  canGetQuote,
  hasQuote,
  isMarketOrder,
  isMarketOpen,
  isFatalError,
};

export default guards;
