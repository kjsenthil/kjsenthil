import { createAsyncThunk } from '@reduxjs/toolkit';
import { postProjections } from '../api';
import { PortfolioRiskProfile } from '../types';

const fetchSimulatedProjections = createAsyncThunk(
  'projections/fetchSimulatedProjections',
  async ({
    investmentPeriod,
    upfrontInvestment,
    monthlyInvestment,
    riskProfile,
  }: {
    investmentPeriod: number;
    upfrontInvestment: number;
    monthlyInvestment: number;
    riskProfile: PortfolioRiskProfile;
  }) => ({
    data: await postProjections({
      upfrontInvestment,
      monthlyInvestment,
      investmentPeriod,
      sedolCode: riskProfile.sedol,
      riskModel: riskProfile.riskModel,
    }),
  })
);

export default fetchSimulatedProjections;
