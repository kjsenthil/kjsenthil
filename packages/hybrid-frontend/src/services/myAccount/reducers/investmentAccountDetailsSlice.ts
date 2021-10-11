import { createSlice } from '@reduxjs/toolkit';
import { commonActionReducerMapBuilder } from '../../utils';
import { InvestmentAccountDetailsState, InvestmentAccountDetailsResponse } from '../types';
import { fetchInvestmentAccountDetails } from '../thunks/fetchInvestmentAccountDetails';

const initialState: InvestmentAccountDetailsState = {
  status: 'idle',
};

const investmentAccountDetailsSlice = createSlice({
  name: 'investmentAccountDetails',
  initialState,
  reducers: {},
  extraReducers: commonActionReducerMapBuilder<
    InvestmentAccountDetailsResponse,
    InvestmentAccountDetailsState
  >(fetchInvestmentAccountDetails),
});

export { fetchInvestmentAccountDetails };
export default investmentAccountDetailsSlice.reducer;
