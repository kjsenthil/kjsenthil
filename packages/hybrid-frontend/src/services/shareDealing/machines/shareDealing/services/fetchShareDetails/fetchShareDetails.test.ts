import fetchShareDetails from './fetchShareDetails';
import defaultContext from '../../context';
import * as api from '../../../../api';
import { ShareDealingContext } from '../../types';
import { GetMarketOpenReponse, GetShareIndicativePriceResponse } from '../../../../api/types';

jest.mock('../../../../api', () => ({
  getMarketOpen: jest.fn(),
  getShareIndicativePrice: jest.fn(),
}));

const context: ShareDealingContext = {
  ...defaultContext,
  isin: 'IE00B42P0H75',
};

const mockGetMarketOpen = api.getMarketOpen as jest.Mock<Promise<GetMarketOpenReponse>>;
const mockGetShareIndicativePrice = api.getShareIndicativePrice as jest.Mock<
  Promise<GetShareIndicativePriceResponse>
>;

const priceDateTime = '2019-12-17 11:40:00';
const price = '2.29500000';
const assetName = 'J Sainsbury PLC';

const shareDetails = {
  isMarketOpen: true,
  indicativePrice: Number(price),
  indicativePriceDate: new Date(priceDateTime),
  shareName: assetName,
};

const shareIndicativePriceAttributes = {
  assetId: '3988',
  assetName,
  isin: 'GB00B019KW72',
  sedol: 'B019KW7',
  epic: 'SBRY',
  price,
  priceDateTime,
};

describe('fetchShareDetails', () => {
  let result: Pick<
    ShareDealingContext,
    'indicativePrice' | 'indicativePriceDate' | 'isMarketOpen' | 'shareName'
  >;

  beforeEach(async () => {
    mockGetMarketOpen.mockResolvedValue({ data: { attributes: { marketOpen: true } } });
    mockGetShareIndicativePrice.mockResolvedValue({
      data: { attributes: shareIndicativePriceAttributes },
    });

    result = await fetchShareDetails(context);
  });

  it('fetches market status and share indicative data', () => {
    expect(mockGetMarketOpen).toHaveBeenCalledTimes(1);
    expect(mockGetShareIndicativePrice).toHaveBeenCalledTimes(1);
  });

  it('returns shareDetails for context', () => {
    expect(result).toStrictEqual(shareDetails);
  });
});
