import axios from 'axios';
import handleErrors from './handleErrors';

jest.mock('axios', () => ({
  isAxiosError: jest.fn(),
}));

const mockIsAxiosError = (axios.isAxiosError as unknown) as jest.Mock;

describe('handleErrors', () => {
  const service = jest.fn();

  it('returns the response from service if service resovles', async () => {
    const result = { data: { type: 'success' } };
    service.mockResolvedValue(result);

    const { response, errors } = await handleErrors(service);

    expect(errors).toBeUndefined();

    expect(response).toStrictEqual(result);
  });

  it('returns errors from the API assigned to specific object keys', async () => {
    mockIsAxiosError.mockReturnValue(true);

    const resultErrors = {
      response: {
        status: 400,
        data: {
          Errors: [
            {
              Code: 'Invalid_LimitPrice',
              Detail: 'Invalid limit price',
            },
            {
              Code: 'Invalid_LimitOrder_CalendarDaysToExpiry',
              Detail: 'Invalid limit order calendar days to expire',
            },
            {
              Code: 'Amount_GreaterThanAvailable',
              Detail: 'Amount greater than available',
            },
            {
              Code: 'Units_GreaterThanAvailable',
              Detail: 'Units greater than available',
            },
            {
              Code: 'Quote_Expired',
              Detail: 'Quote expired',
            },
          ],
        },
      },
    };
    service.mockRejectedValue(resultErrors);

    const { response, errors } = await handleErrors(service);

    expect(response).toBeUndefined();

    expect(errors).toStrictEqual({
      orderShareAmount: 'Amount_GreaterThanAvailable',
      orderShareUnits: 'Units_GreaterThanAvailable',
      limitOrderExpiryDays: 'Invalid_LimitOrder_CalendarDaysToExpiry',
      limitOrderChangeInPrice: 'Invalid_LimitPrice',
      quotingOrder: 'Quote_Expired',
      original: {
        Invalid_LimitPrice: 'Invalid limit price',
        Invalid_LimitOrder_CalendarDaysToExpiry: 'Invalid limit order calendar days to expire',
        Amount_GreaterThanAvailable: 'Amount greater than available',
        Units_GreaterThanAvailable: 'Units greater than available',
        Quote_Expired: 'Quote expired',
      },
    });
  });
});
