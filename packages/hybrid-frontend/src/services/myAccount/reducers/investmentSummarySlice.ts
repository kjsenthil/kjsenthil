import { createSlice } from '@reduxjs/toolkit';
import { InvestmentSummaryState, InvestmentSummaryResponse } from '../types';
import { fetchInvestmentSummary } from '../thunks';
import commonActionReducerMapBuilder from '../../utils/commonActionReducerMapBuilder';

const initialState: InvestmentSummaryState = {
  status: 'idle',
};

const InvestmentSummarySlice = createSlice({
  name: 'investmentSummary',
  initialState,
  reducers: {},
  extraReducers: commonActionReducerMapBuilder<InvestmentSummaryResponse, InvestmentSummaryState>(
    fetchInvestmentSummary
  ),
});

export { fetchInvestmentSummary };

export default InvestmentSummarySlice.reducer;
