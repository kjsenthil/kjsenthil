import { createSlice } from '@reduxjs/toolkit';
import { commonActionReducerMapBuilder } from '../../utils';
import { fetchInvestmentAccounts } from '../thunks';
import { InvestmentAccount, InvestmentAccountsState } from '../types';

const initialState: InvestmentAccountsState = {
  status: 'idle',
};

const investmentAccountsSlice = createSlice({
  name: 'investmentAccounts',
  initialState,
  reducers: {},
  extraReducers: commonActionReducerMapBuilder<
    { data: Array<InvestmentAccount> },
    InvestmentAccountsState
  >(fetchInvestmentAccounts),
});

export { fetchInvestmentAccounts };

export default investmentAccountsSlice.reducer;
