import { getMarketOpen } from '../../../../api';
import {
  AssetInfoResponse,
  CashPositionResponse,
  getInvestmentAccountDetails,
} from '../../../../../myAccount';

import { ShareDealingContext } from '../../types';

const fetchShareDetails = async (
  ctx: ShareDealingContext
): Promise<
  Pick<
    ShareDealingContext,
    | 'indicativePrice'
    | 'indicativePriceDate'
    | 'isMarketOpen'
    | 'shareName'
    | 'availableCash'
    | 'accountName'
  >
> => {
  const [marketOpenResponse, investmentAccountDetails] = await Promise.all([
    getMarketOpen(),
    getInvestmentAccountDetails({
      accountId: ctx.accountId!,
      include: ['cash-position', 'asset-info'],
      filter: { 'asset-info.isin': ctx.isin! },
    }),
  ]);

  const cashPosition = investmentAccountDetails?.included?.find(
    (data) => data.type === 'cash-position'
  ) as CashPositionResponse;
  const assetInfo = investmentAccountDetails?.included?.find(
    (data) => data.type === 'asset-info'
  ) as AssetInfoResponse;

  return {
    isMarketOpen: Boolean(marketOpenResponse.data.attributes.marketOpen),
    indicativePrice: Number(assetInfo?.attributes.price),
    indicativePriceDate: new Date(assetInfo?.attributes.priceDateTime),
    shareName: assetInfo?.attributes.assetName,
    accountName: investmentAccountDetails?.data?.attributes?.bestInvestAccount,
    availableCash: Number(cashPosition?.attributes.cashAvailableToInvest),
  };
};
export default fetchShareDetails;
