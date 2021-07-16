import { createSlice } from '@reduxjs/toolkit';
import { commonActionReducerMapBuilder } from '../../utils';
import { fetchInvestmentAccounts } from '../thunks';
import { InvestmentAccount, InvestmentAccountState } from '../types';

const initialState: InvestmentAccountState = {
  status: 'idle',
};

const investmentAccountsSlice = createSlice({
  name: 'investmentAccounts',
  initialState,
  reducers: {},
  extraReducers: commonActionReducerMapBuilder<
    { data: Array<InvestmentAccount> },
    InvestmentAccountState
  >(fetchInvestmentAccounts),
});

export { fetchInvestmentAccounts };

export default investmentAccountsSlice.reducer;
