import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import { getPortfolioAssetAllocation, getPortfolioRiskProfile, postProjections } from '../api';
import {
  getMyAccountEquityAllocation,
  getMyAccountInvestAccounts,
  getMyAccountMonthlySavingsAmount,
  MyAccountItem,
} from '../../myAccounts';
import { ProjectionsState } from '../types';
import { AllAssets } from '../../assets';

const getProjections = createAsyncThunk(
  'projections/getProjections',
  async (params: { accounts: MyAccountItem[]; fundData: AllAssets }) => {
    // get an investment summary for all the customer's accounts
    const allAccountsData = await getMyAccountInvestAccounts(params.accounts);

    // get a percentage equity allocation for each account
    const accountTotals = await Promise.all(
      allAccountsData.map(async (account) => ({
        ...account,
        equityPercentage: await getMyAccountEquityAllocation(account.id),
        monthlyInvestment: await getMyAccountMonthlySavingsAmount(account.id),
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
      investmentPeriod: 50,
      sedolCode: riskProfile.sedol,
      riskModel: riskProfile.riskModel,
    });
  }
);

export const getProjectionsActionReducerMapBuilder = (
  builder: ActionReducerMapBuilder<ProjectionsState>
) => {
  builder
    .addCase(getProjections.pending, (state) => {
      state.status = 'loading';
      state.postProjectionsError = undefined;
    })
    .addCase(getProjections.fulfilled, (state, { payload }) => {
      state.status = 'success';
      state.postProjectionsError = undefined;
      state.projections = payload;
    })
    .addCase(getProjections.rejected, (state, action) => {
      state.status = 'error';
      state.postProjectionsError = action.error.message;
    });
};

export default getProjections;
