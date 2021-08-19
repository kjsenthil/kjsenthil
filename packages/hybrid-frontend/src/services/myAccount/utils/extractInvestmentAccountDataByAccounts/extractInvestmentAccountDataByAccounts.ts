import { InvestmentAccountData } from '@tsw/react-components';
import { ClientAccountItem, InvestmentSummary } from '../../types';
import { getEquityAndCashAllocation, getMonthlySavingsAmount } from '../../api';

const extractInvestmentAccountDataByAccounts = async (
  investmentSummaryData: InvestmentSummary[],
  investmentAccounts: ClientAccountItem[]
): Promise<InvestmentAccountData[]> =>
  Promise.all(
    investmentSummaryData.map(
      async (account): Promise<InvestmentAccountData> => {
        const accountName =
          investmentAccounts.find((clientAccount) => clientAccount.id === account.id)?.name || '';

        const [{ equityPercentage, cashPercentage }, monthlyInvestment] = await Promise.all([
          getEquityAndCashAllocation(account.id),
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
          cashPercentage,
          monthlyInvestment,
        };
      }
    )
  );

export default extractInvestmentAccountDataByAccounts;
