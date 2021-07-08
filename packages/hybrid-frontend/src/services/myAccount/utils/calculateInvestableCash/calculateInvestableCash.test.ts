import { mockAccountsBreakdown } from '../../mocks';
import calculateInvestableCash from './calculateInvestableCash';

describe('calculateInvestableCash', () => {
  it('returns the total amount of investable cash for accounts ignoring linked-accounts', () => {
    const cash =
      Number(mockAccountsBreakdown[0].accountCash) + Number(mockAccountsBreakdown[1].accountCash);

    expect(calculateInvestableCash(mockAccountsBreakdown)).toStrictEqual(cash);
  });
});
