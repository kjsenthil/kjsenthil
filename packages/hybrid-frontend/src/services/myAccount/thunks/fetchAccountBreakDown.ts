import { createAsyncThunk } from '@reduxjs/toolkit';
import { getContributions } from '../api';
import { Breakdown, ClientState, InvestmentSummary, InvestmentSummaryResponse } from '../types';
import { extractClientAccounts } from '../utils';

const fetchAccountBreakdown = createAsyncThunk(
  'client/fetchAccountBreakdown',
  async (_, { getState }): Promise<{ data: Array<Breakdown> }> => {
    const { client, investmentSummary } = getState() as {
      client: ClientState;
      investmentSummary: InvestmentSummaryResponse;
    };

    if (!client.included) {
      throw new Error('Could not find client data.');
    }

    if (!investmentSummary.data) {
      throw new Error('Could not find investment summary data.');
    }

    const extractedClientAccounts = extractClientAccounts(client.included);

    const investmentAccountsBreakdownPromises = investmentSummary.data.map(
      async (investSummaryItem: InvestmentSummary) => {
        const { name: accountName = '', type: accountType = '' } =
          extractedClientAccounts.find(
            (clientAccount) => clientAccount.id === investSummaryItem.id
          ) || {};

        const accountTotalHoldings =
          investSummaryItem.attributes.cash +
          investSummaryItem.attributes.funds +
          investSummaryItem.attributes.shares;

        const contributionResponse = await getContributions(investSummaryItem.id);

        return {
          id: investSummaryItem.id,
          accountName,
          accountType,
          accountTotalHoldings,
          accountTotalContribution: contributionResponse?.data?.attributes?.totalContributions || 0,
          accountCash: investSummaryItem.attributes.cash,
          accountReturn: investSummaryItem.attributes.gainLoss,
          accountReturnPercentage: investSummaryItem.attributes.gainLossPercent,
        };
      }
    );

    const investmentAccountsBreakdown = await Promise.all(investmentAccountsBreakdownPromises);

    return { data: investmentAccountsBreakdown };
  }
);

export default fetchAccountBreakdown;
