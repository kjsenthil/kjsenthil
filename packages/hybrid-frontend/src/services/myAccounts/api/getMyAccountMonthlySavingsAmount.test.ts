import { mockMonthlySavingsResponse } from '../mocks';
import getMyAccountMonthlySavings, { MonthlySavingsErrors } from './getMyAccountMonthlySavings';
import getMyAccountMonthlySavingsAmount from './getMyAccountMonthlySavingsAmount';

jest.mock('./getMyAccountMonthlySavings');

const accountId = '12345678';

describe('getMyAccountMonthlySavingsAmount', () => {
  it('returns the monthly savings amount', async () => {
    (getMyAccountMonthlySavings as jest.Mock).mockResolvedValueOnce(mockMonthlySavingsResponse);
    const response = await getMyAccountMonthlySavingsAmount(accountId);

    expect(response).toStrictEqual(mockMonthlySavingsResponse.data[0].attributes.amount);
  });

  it('returns a savings amount of 0 when the account has no monthly savings', async () => {
    (getMyAccountMonthlySavings as jest.Mock).mockRejectedValueOnce(
      new Error(MonthlySavingsErrors.NO_SAVINGS_ERROR)
    );

    const response = await getMyAccountMonthlySavingsAmount(accountId);

    expect(response).toStrictEqual(0);
  });
});
