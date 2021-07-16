import { mockInvestmentAccounts } from '../../mocks';
import calculateInvestableCash from './calculateInvestableCash';

describe('calculateInvestableCash', () => {
  it('returns the total amount of investable cash for accounts ignoring linked-accounts', () => {
    const cash =
      Number(mockInvestmentAccounts[0].accountCash) + Number(mockInvestmentAccounts[1].accountCash);

    expect(calculateInvestableCash(mockInvestmentAccounts)).toStrictEqual(cash);
  });
});
