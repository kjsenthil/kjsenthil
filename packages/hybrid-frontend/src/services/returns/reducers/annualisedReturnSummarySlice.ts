import { createSlice } from '@reduxjs/toolkit';

import { AnnualisedReturnSummaryState } from '../types';
import { commonActionReducerMapBuilder } from '../../utils';
import { fetchAnnualisedReturnSummary } from '../thunks';

const initialState: AnnualisedReturnSummaryState = {
  status: 'idle',
};

const AnnualisedReturnSummarySlice = createSlice({
  name: 'annualisedReturnSummary',
  initialState,
  reducers: {},
  extraReducers: commonActionReducerMapBuilder(fetchAnnualisedReturnSummary),
});

export { fetchAnnualisedReturnSummary };
export default AnnualisedReturnSummarySlice.reducer;
