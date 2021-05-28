import { BasicInvestmentSummary, InvestmentSummary } from '../types';

const calculateBasicInvestmentSummary = (
  accountsInvestmentSummary: InvestmentSummary[]
): BasicInvestmentSummary => {
  const summaryData = accountsInvestmentSummary.reduce(
    (acc, account) => ({
      totalInvested:
        acc.totalInvested +
        account.attributes.cash +
        account.attributes.funds +
        account.attributes.shares,
      totalCash: acc.totalCash + account.attributes.cash,
      totalGainLoss: acc.totalGainLoss + account.attributes.gainLoss,
      totalGainLossPercentage: acc.totalGainLossPercentage + account.attributes.gainLossPercent,
    }),
    { totalInvested: 0, totalCash: 0, totalGainLoss: 0, totalGainLossPercentage: 0 }
  );
  return summaryData;
};

export default calculateBasicInvestmentSummary;
