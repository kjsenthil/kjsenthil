import { mockInvestSummaryResponse } from '../mocks';
import calculateBasicInvestmentSummary from './calculateBasicInvestmentSummary';

describe('calculateBasicInvestmentSummary', () => {
  it('calculates totalValue and totalGain/Losses', () => {
    const { attributes: account1 } = mockInvestSummaryResponse.data[0];
    const { attributes: account2 } = mockInvestSummaryResponse.data[1];
    const { attributes: account3 } = mockInvestSummaryResponse.data[2];

    expect(calculateBasicInvestmentSummary(mockInvestSummaryResponse.data)).toStrictEqual({
      totalInvested:
        account1.funds +
        account1.shares +
        account1.cash +
        account2.funds +
        account2.shares +
        account2.cash +
        account3.funds +
        account3.shares +
        account3.cash,
      totalCash: account1.cash + account2.cash + account3.cash,
      totalGainLoss: account1.gainLoss + account2.gainLoss + account3.gainLoss,
      totalGainLossPercentage:
        account1.gainLossPercent + account2.gainLossPercent + account3.gainLossPercent,
    });
  });
});
