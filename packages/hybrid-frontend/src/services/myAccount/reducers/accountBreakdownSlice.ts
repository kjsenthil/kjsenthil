import { createSlice } from '@reduxjs/toolkit';
import { fetchAccountBreakdown, fetchAccountBreakdownActionReducerMapBuilder } from '../thunks';
import { BreakdownState } from '../types';

const initialState: BreakdownState = {
  status: 'idle',
  breakdownData: undefined,
};

const accountBreakdownSlice = createSlice({
  name: 'accountBreakdown',
  initialState,
  reducers: {
    setAccountBreakdown: (state, action) => {
      state.breakdownData = action.payload;
    },
  },
  extraReducers: (builder) => {
    fetchAccountBreakdownActionReducerMapBuilder(builder);
  },
});

export { fetchAccountBreakdown };
export const { setAccountBreakdown } = accountBreakdownSlice.actions;

export default accountBreakdownSlice.reducer;
