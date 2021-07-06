import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GetPerformanceAccountsAggregatedResponse, PerformanceState } from '../types';
import { fetchPerformanceAccountsAggregated } from '../thunks';
import { PerformanceDataPeriod } from '../constants';
import { commonActionReducerMapBuilder } from '../../utils';

const initialState: PerformanceState = {
  status: 'idle',
  performanceDataPeriod: String(PerformanceDataPeriod['5Y']),
};

const performanceSlice = createSlice({
  name: 'performance',
  initialState,
  reducers: {
    setPerformanceDataPeriod: (state, action: PayloadAction<string>) => {
      state.performanceDataPeriod = action.payload;
    },
  },
  extraReducers: commonActionReducerMapBuilder<
    GetPerformanceAccountsAggregatedResponse,
    PerformanceState
  >(fetchPerformanceAccountsAggregated),
});

const performanceReducer = performanceSlice.reducer;

export { fetchPerformanceAccountsAggregated };
export const { setPerformanceDataPeriod } = performanceSlice.actions;

export default performanceReducer;
