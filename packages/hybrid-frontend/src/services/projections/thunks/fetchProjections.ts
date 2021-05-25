import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import { getPortfolioAssetAllocation, getPortfolioRiskProfile, postProjections } from '../api';
import {
  getEquityAllocation,
  getInvestAccounts,
  getMonthlySavingsAmount,
  MyAccountItem,
} from '../../myAccount';
import { ProjectionsState } from '../types';
import { AllAssets } from '../../assets';

const fetchProjections = createAsyncThunk(
  'projections/fetchProjections',
  async (params: { accounts: MyAccountItem[]; fundData: AllAssets; investmentPeriod: number }) => {
    // get an investment summary for all the customer's accounts
    const allAccountsData = await getInvestAccounts(params.accounts);

    // get a percentage equity allocation for each account
    const accountTotals = await Promise.all(
      allAccountsData.map(async (account) => ({
        ...account,
        equityPercentage: await getEquityAllocation(account.id),
        monthlyInvestment: await getMonthlySavingsAmount(account.id),
      }))
    );

    // get the percentage equity allocation for the customer's entire portfolio
    const portfolioEquityPercentage = await getPortfolioAssetAllocation(accountTotals);

    // get the TAA that the client's portfolio is most aligned to
    const riskProfile = await getPortfolioRiskProfile({
      portfolioEquityPercentage,
      equityFunds: params.fundData.allAsset.nodes,
    });

    const portfolioTotal = accountTotals.reduce(
      (accumulator, account) => accumulator + account.accountValue,
      0
    );
    const monthlyInvestmentTotal = accountTotals.reduce(
      (accumulator, account) => accumulator + account.monthlyInvestment,
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
