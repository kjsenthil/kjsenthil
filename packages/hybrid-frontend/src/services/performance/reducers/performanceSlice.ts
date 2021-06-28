import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GetPerformanceContactResponse, PerformanceState } from '../types';
import { fetchPerformanceContact } from '../thunks';
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
  extraReducers: commonActionReducerMapBuilder<GetPerformanceContactResponse, PerformanceState>(
    fetchPerformanceContact
  ),
});

const performanceReducer = performanceSlice.reducer;

export { fetchPerformanceContact };
export const { setPerformanceDataPeriod } = performanceSlice.actions;

export default performanceReducer;
