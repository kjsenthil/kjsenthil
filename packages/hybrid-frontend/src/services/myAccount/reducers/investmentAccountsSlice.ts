import { createSlice } from '@reduxjs/toolkit';
import { InvestmentAccount } from '@tsw/react-components';
import { commonActionReducerMapBuilder } from '../../utils';
import { fetchInvestmentAccounts } from '../thunks';
import { InvestmentAccountsState } from '../types';

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
