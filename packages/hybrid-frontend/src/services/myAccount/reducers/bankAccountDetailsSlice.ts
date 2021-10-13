import { createSlice } from '@reduxjs/toolkit';
import { BankAccountDetailsState, BankAccountDetailsResponse } from '../types';
import { fetchBankAccountDetails } from '../thunks/fetchBankAccountDetails';
import { commonActionReducerMapBuilder } from '../../utils';

const initialState: BankAccountDetailsState = {
  status: 'idle',
};

const bankAccountDetailsSlice = createSlice({
  name: 'bankAccountDetails',
  initialState,
  reducers: {},
  extraReducers: commonActionReducerMapBuilder<BankAccountDetailsResponse, BankAccountDetailsState>(
    fetchBankAccountDetails
  ),
});

export { fetchBankAccountDetails };
export default bankAccountDetailsSlice.reducer;
