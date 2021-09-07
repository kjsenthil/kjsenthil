import { getMarketOpen, getShareIndicativePrice } from '../../../../api';
import { ShareDealingContext } from '../../types';

const fetchShareDetails = async (
  ctx: ShareDealingContext
): Promise<
  Pick<
    ShareDealingContext,
    'indicativePrice' | 'indicativePriceDate' | 'isMarketOpen' | 'shareName'
  >
> => {
  const [marketOpenResponse, shareIndicativePriceResponse] = await Promise.all([
    getMarketOpen(),
    getShareIndicativePrice(String(ctx.isin)),
  ]);

  return {
    isMarketOpen: Boolean(marketOpenResponse.data.attributes.marketOpen),
    indicativePrice: Number(shareIndicativePriceResponse.data.attributes.price),
    indicativePriceDate: new Date(shareIndicativePriceResponse.data.attributes.priceDateTime),
    shareName: shareIndicativePriceResponse.data.attributes.assetName,
  };
};

export default fetchShareDetails;
