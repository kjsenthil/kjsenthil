import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PerformanceDataPeriod } from '@tsw/react-components';
import { PerformanceAccountsAggregatedResponse, PerformanceState } from '../types';
import { fetchPerformanceAccountsAggregated } from '../thunks';
import { commonActionReducerMapBuilder } from '../../utils';

const initialState: PerformanceState = {
  status: 'idle',
  performanceDataPeriod: PerformanceDataPeriod['5Y'],
};

const performanceSlice = createSlice({
  name: 'performance',
  initialState,
  reducers: {
    setPerformanceDataPeriod: (state, action: PayloadAction<PerformanceDataPeriod>) => {
      state.performanceDataPeriod = action.payload;
    },
  },
  extraReducers: commonActionReducerMapBuilder<
    PerformanceAccountsAggregatedResponse | undefined,
    PerformanceState
  >(fetchPerformanceAccountsAggregated),
});

const performanceReducer = performanceSlice.reducer;

export { fetchPerformanceAccountsAggregated };
export const { setPerformanceDataPeriod } = performanceSlice.actions;

export default performanceReducer;
