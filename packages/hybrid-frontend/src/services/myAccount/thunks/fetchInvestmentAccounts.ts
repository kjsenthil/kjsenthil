import { createAsyncThunk } from '@reduxjs/toolkit';
import { InvestmentAccount } from '@tsw/react-components';
import { getPerformanceAccountsAggregated } from '../../performance';
import { ClientState, InvestmentSummary, InvestmentSummaryState } from '../types';
import { extractClientAccounts } from '../utils';
import calculateInvestmentReturnForAllPeriods from '../utils/calculateInvestmentReturnForAllPeriods';

const fetchInvestmentAccounts = createAsyncThunk(
  'client/fetchInvestmentAccounts',
  async (_, { getState }): Promise<{ data: Array<InvestmentAccount> }> => {
    const { client, investmentSummary } = getState() as {
      client: ClientState;
      investmentSummary: InvestmentSummaryState;
    };

    if (!client.included) {
      throw new Error('Could not find client data.');
    }

    if (!investmentSummary.data) {
      throw new Error('Could not find investment summary data.');
    }

    const extractedClientAccounts = extractClientAccounts(client.included);

    const investmentAccountsPromises = investmentSummary.data.map(
      async (investSummaryItem: InvestmentSummary) => {
        const { name: accountName = '', type: accountType = '' } =
          extractedClientAccounts.find(
            (clientAccount) => clientAccount.id === investSummaryItem.id
          ) || {};

        const accountTotalHoldings =
          investSummaryItem.attributes.cash +
          investSummaryItem.attributes.funds +
          investSummaryItem.attributes.shares;

        const performanceResponse = await getPerformanceAccountsAggregated(
          Number(investSummaryItem.id)
        );
        const netContributions = performanceResponse?.included[0]?.attributes?.netContributions;
        const netContributionToDate =
          netContributions && netContributions.length > 0
            ? netContributions[netContributions.length - 1].netContributionsToDate
            : 0;

        return {
          id: investSummaryItem.id,
          accountName,
          accountType,
          accountTotalHoldings,
          accountTotalNetContribution: netContributionToDate,
          accountCash: investSummaryItem.attributes.cash,
          accountReturn: investSummaryItem.attributes.gainLoss,
          accountReturnPercentage: investSummaryItem.attributes.gainLossPercent,
          periodReturn: calculateInvestmentReturnForAllPeriods(
            performanceResponse?.data.attributes.values ?? [],
            performanceResponse?.included[0].attributes.netContributions ?? []
          ),
        };
      }
    );

    const investmentAccounts = await Promise.all(investmentAccountsPromises);

    return { data: investmentAccounts };
  }
);

export default fetchInvestmentAccounts;
