import fetchShareDetails from './fetchShareDetails';
import defaultContext from '../../context';
import * as api from '../../../../api';
import * as myAccountApi from '../../../../../myAccount';
import { mockInvestmentAccountDetails } from '../../../../../myAccount/mocks';

import { ShareDealingContext } from '../../types';
import { GetMarketOpenReponse } from '../../../../api/types';

jest.mock('../../../../api', () => ({
  getMarketOpen: jest.fn(),
}));

jest.mock('../../../../../myAccount', () => ({
  getInvestmentAccountDetails: jest.fn(),
}));

const context: ShareDealingContext = {
  ...defaultContext,
  isin: 'IE00B42P0H75',
};

const mockGetMarketOpen = api.getMarketOpen as jest.Mock<Promise<GetMarketOpenReponse>>;
const mockGetInvestmentAccountDetails = myAccountApi.getInvestmentAccountDetails as jest.Mock;

const shareDetails = {
  isMarketOpen: true,
  indicativePrice: 1.4832,
  indicativePriceDate: new Date('2021-08-26T13:33:34.309'),
  shareName: 'VODAFONE GROUP',
  accountName: 'ISA',
  availableCash: 2288.86,
};

describe('fetchShareDetails', () => {
  let result: Pick<
    ShareDealingContext,
    'indicativePrice' | 'indicativePriceDate' | 'isMarketOpen' | 'shareName'
  >;

  beforeEach(async () => {
    mockGetMarketOpen.mockResolvedValue({ data: { attributes: { marketOpen: true } } });
    mockGetInvestmentAccountDetails.mockResolvedValue(mockInvestmentAccountDetails);

    result = await fetchShareDetails(context);
  });

  it('fetches market status and share indicative data', () => {
    expect(mockGetMarketOpen).toHaveBeenCalledTimes(1);
    expect(mockGetInvestmentAccountDetails).toHaveBeenCalledTimes(1);
  });

  it('returns shareDetails for context', () => {
    expect(result).toStrictEqual(shareDetails);
  });
});
