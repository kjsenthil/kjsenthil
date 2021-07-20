import { createAsyncThunk } from '@reduxjs/toolkit';
import { getPerformanceAccountsAggregated } from '../../performance';
import {
  InvestmentAccount,
  ClientState,
  InvestmentSummary,
  InvestmentSummaryState,
} from '../types';
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

        return {
          id: investSummaryItem.id,
          accountName,
          accountType,
          accountTotalHoldings,
          accountTotalNetContribution:
            performanceResponse?.included[0]?.attributes?.totalContributions || 0,
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