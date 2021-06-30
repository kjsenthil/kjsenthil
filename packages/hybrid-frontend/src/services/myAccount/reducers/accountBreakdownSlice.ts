import { createSlice } from '@reduxjs/toolkit';
import { commonActionReducerMapBuilder } from '../../utils';
import { fetchAccountBreakdown } from '../thunks';
import { Breakdown, BreakdownState } from '../types';

const initialState: BreakdownState = {
  status: 'idle',
};

const accountBreakdownSlice = createSlice({
  name: 'accountBreakdown',
  initialState,
  reducers: {},
  extraReducers: commonActionReducerMapBuilder<{ data: Array<Breakdown> }, BreakdownState>(
    fetchAccountBreakdown
  ),
});

export { fetchAccountBreakdown };

export default accountBreakdownSlice.reducer;
