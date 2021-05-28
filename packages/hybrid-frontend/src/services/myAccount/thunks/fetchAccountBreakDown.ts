import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import { getContributions } from '../api';
import {
  Breakdown,
  BreakdownState,
  ClientState,
  InvestmentSummary,
  InvestmentSummaryResponse,
} from '../types';
import { extractClientAccounts } from '../utils';

const fetchAccountBreakdown = createAsyncThunk(
  'client/fetchAccountBreakdown',
  async (_, { getState }): Promise<Array<Breakdown>> => {
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

    return investmentAccountsBreakdown;
  }
);

export const fetchAccountBreakdownActionReducerMapBuilder = (
  builder: ActionReducerMapBuilder<BreakdownState>
) => {
  builder
    .addCase(fetchAccountBreakdown.pending, (state) => {
      state.status = 'loading';
      state.fetchAccountBreakdownError = undefined;
    })
    .addCase(fetchAccountBreakdown.fulfilled, (state, { payload }) => {
      state.status = 'success';
      state.fetchAccountBreakdownError = undefined;
      state.breakdownData = payload;
    })
    .addCase(fetchAccountBreakdown.rejected, (state, action) => {
      state.status = 'error';
      state.fetchAccountBreakdownError = action.error.message;
    });
};

export default fetchAccountBreakdown;
