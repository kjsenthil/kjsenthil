import { mockMonthlySavingsResponse } from '../mocks';
import getMonthlySavings, { MonthlySavingsErrors } from './getMonthlySavings';
import getMonthlySavingsAmount from './getMonthlySavingsAmount';

jest.mock('./getMonthlySavings');

const accountId = '12345678';

describe('getMonthlySavingsAmount', () => {
  it('returns the monthly savings amount', async () => {
    (getMonthlySavings as jest.Mock).mockResolvedValueOnce(mockMonthlySavingsResponse);
    const response = await getMonthlySavingsAmount(accountId);

    expect(response).toStrictEqual(mockMonthlySavingsResponse.data[0].attributes.amount);
  });

  it('returns a savings amount of 0 when the account has no monthly savings', async () => {
    (getMonthlySavings as jest.Mock).mockRejectedValueOnce(
      new Error(MonthlySavingsErrors.NO_SAVINGS_ERROR)
    );

    const response = await getMonthlySavingsAmount(accountId);

    expect(response).toStrictEqual(0);
  });

  it('throws errors that are not no savings errors', async () => {
    const mockError = new Error('Request failed with status code 401');
    (getMonthlySavings as jest.Mock).mockRejectedValueOnce(mockError);

    await expect(getMonthlySavingsAmount(accountId)).rejects.toEqual(mockError);
  });
});
