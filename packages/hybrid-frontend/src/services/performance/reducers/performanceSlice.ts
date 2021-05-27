import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GetPerformanceContactResponse, PerformanceState } from '../types';
import { getPerformanceContact, getPerformanceContactActionReducerMapBuilder } from '../thunks';
import { PerformanceDataPeriod } from '../constants';

const initialState: PerformanceState = {
  status: 'idle',
  performance: undefined,
  performanceError: undefined,
  performanceDataPeriod: PerformanceDataPeriod.ALL_TIME,
};

const performanceSlice = createSlice({
  name: 'performance',
  initialState,
  reducers: {
    setPerformance: (state, action: PayloadAction<GetPerformanceContactResponse>) => {
      state.performance = action.payload;
    },

    setPerformanceDataPeriod: (state, action: PayloadAction<PerformanceDataPeriod>) => {
      state.performanceDataPeriod = action.payload;
    },
  },
  extraReducers: (builder) => {
    getPerformanceContactActionReducerMapBuilder(builder);
  },
});

const performanceReducer = performanceSlice.reducer;

export { getPerformanceContact };
export const { setPerformance, setPerformanceDataPeriod } = performanceSlice.actions;

export default performanceReducer;
