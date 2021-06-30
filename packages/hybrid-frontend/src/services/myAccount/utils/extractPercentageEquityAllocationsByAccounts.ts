import { ClientAccountItem, InvestmentSummary } from '../types';
import { getEquityAllocation, getMonthlySavingsAmount } from '../api';

const extractPercentageEquityAllocationsByAccounts = async (
  investmentSummaryData: InvestmentSummary[],
  accounts: ClientAccountItem[]
) => {
  const resultPromises = await Promise.all(
    investmentSummaryData.map(async (account) => {
      const accountName =
        accounts.find((clientAccount) => clientAccount.id === account.id)?.name || '';

      const [equityPercentage, monthlyInvestment] = await Promise.all([
        getEquityAllocation(account.id),
        getMonthlySavingsAmount(account.id),
      ]);

      return {
        id: account.id,
        accountName,
        accountTotalHoldings:
          account.attributes.cash + account.attributes.funds + account.attributes.shares,
        accountCash: account.attributes.cash,
        accountReturn: account.attributes.gainLoss,
        accountReturnPercentage: account.attributes.gainLossPercent,
        equityPercentage,
        monthlyInvestment,
      };
    })
  );
  return resultPromises;
};

export default extractPercentageEquityAllocationsByAccounts;
