import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import { getPortfolioAssetAllocation, getPortfolioRiskProfile, postProjections } from '../api';
import { extractClientAccounts, ClientState, InvestmentSummaryResponse } from '../../myAccount';
import { ProjectionsState } from '../types';
import { AllAssets } from '../../assets';
import extractPercentageEquityAllocationsByAccounts from '../../utils/extractPercentageEquityAllocationsByAccounts';

const fetchProjections = createAsyncThunk(
  'projections/fetchProjections',
  async (params: { fundData: AllAssets; investmentPeriod: number }, { getState }) => {
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

    const accounts = extractClientAccounts(client.included);

    // get a percentage equity allocation for each account
    const accountTotals = await extractPercentageEquityAllocationsByAccounts(
      investmentSummary.data,
      accounts
    );

    // get the percentage equity allocation for the customer's entire portfolio
    const portfolioEquityPercentage = await getPortfolioAssetAllocation(accountTotals);

    // get the TAA that the client's portfolio is most aligned to
    const riskProfile = await getPortfolioRiskProfile({
      portfolioEquityPercentage,
      equityFunds: params.fundData.allAsset.nodes,
    });

    const portfolioTotal = accountTotals.reduce(
      (accumulator, account) => accumulator + (account.accountTotalHoldings || 0),
      0
    );
    const monthlyInvestmentTotal = accountTotals.reduce(
      (accumulator, account) => accumulator + (account.monthlyInvestment || 0),
      0
    );

    return postProjections({
      upfrontInvestment: portfolioTotal,
      monthlyInvestment: monthlyInvestmentTotal,
      investmentPeriod: params.investmentPeriod,
      sedolCode: riskProfile.sedol,
      riskModel: riskProfile.riskModel,
    });
  }
);

export const fetchProjectionsActionReducerMapBuilder = (
  builder: ActionReducerMapBuilder<ProjectionsState>
) => {
  builder
    .addCase(fetchProjections.pending, (state) => {
      state.status = 'loading';
      state.postProjectionsError = undefined;
    })
    .addCase(fetchProjections.fulfilled, (state, { payload }) => {
      state.status = 'success';
      state.postProjectionsError = undefined;
      state.projections = payload;
    })
    .addCase(fetchProjections.rejected, (state, action) => {
      state.status = 'error';
      state.postProjectionsError = action.error.message;
    });
};

export default fetchProjections;
