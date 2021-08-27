import { createSlice } from '@reduxjs/toolkit';
import { IsaContributionState, IsaContributionResponse } from '../types';
import { fetchIsaContribution } from '../thunks';
import commonActionReducerMapBuilder from '../../utils/commonActionReducerMapBuilder';

const initialState: IsaContributionState = {
  status: 'idle',
};

const isaContributionSlice = createSlice({
  name: 'isaContribution',
  initialState,
  reducers: {},
  extraReducers: commonActionReducerMapBuilder<IsaContributionResponse, IsaContributionState>(
    fetchIsaContribution
  ),
});

export { fetchIsaContribution };

export default isaContributionSlice.reducer;
