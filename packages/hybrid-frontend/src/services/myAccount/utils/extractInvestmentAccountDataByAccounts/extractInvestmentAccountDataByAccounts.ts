import { InvestmentAccount, InvestmentAccountData } from '@tswdts/react-components';
import { ClientAccountItem, InvestmentSummary } from '../../types';
import { getEquityAndCashAllocation } from '../../api';

const extractInvestmentAccountDataByAccounts = async (
  investmentSummaryData: InvestmentSummary[],
  investmentClientAccounts: ClientAccountItem[],
  investmentAccounts: InvestmentAccount[] | undefined
): Promise<InvestmentAccountData[]> =>
  Promise.all(
    investmentSummaryData.map(
      async (account): Promise<InvestmentAccountData> => {
        const accountName =
          investmentClientAccounts.find((clientAccount) => clientAccount.id === account.id)?.name ||
          '';

        const { equityPercentage, cashPercentage } = await Promise.resolve(
          getEquityAndCashAllocation(account.id)
        );

        const monthlyInvestment =
          investmentAccounts?.find((item) => item.id === account.id)?.monthlyInvestment ?? 0;
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
