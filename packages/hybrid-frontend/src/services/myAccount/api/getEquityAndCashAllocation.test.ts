import { mockBreakdownAllocation } from '../mocks';
import getBreakdownAllocation, { BreakdownAllocationErrors } from './getBreakdownAllocation';
import getEquityAndCashAllocation from './getEquityAndCashAllocation';

jest.mock('./getBreakdownAllocation');

const accountId = '12345';

describe('getEquityAllocation', () => {
  it('returns an equity allocation', async () => {
    (getBreakdownAllocation as jest.Mock).mockResolvedValue(mockBreakdownAllocation);
    const response = await getEquityAndCashAllocation(accountId);

    expect(response).toEqual({
      equityPercentage: 48,
      cashPercentage: 49,
    });
  });

  it('returns an allocation of 0 when it receives a no equities error', async () => {
    (getBreakdownAllocation as jest.Mock).mockRejectedValueOnce(
      new Error(BreakdownAllocationErrors.NO_EQUITIES_ERROR)
    );

    const response = await getEquityAndCashAllocation(accountId);
    expect(response).toStrictEqual({
      equityPercentage: 0,
      cashPercentage: 0,
    });
  });

  it('throws errors that are not no equities errors', async () => {
    const mockError = new Error('Request failed with status code 401');
    (getBreakdownAllocation as jest.Mock).mockRejectedValueOnce(mockError);

    await expect(getEquityAndCashAllocation(accountId)).rejects.toEqual(mockError);
  });
});
