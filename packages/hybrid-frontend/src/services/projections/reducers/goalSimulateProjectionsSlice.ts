import { createSlice } from '@reduxjs/toolkit';
import { commonActionReducerMapBuilder } from '../../utils';
import fetchGoalSimulateProjections from '../thunks/fetchSimulateProjections';

import {
  GoalSimulateProjectionsState,
  GoalSimulateProjectionsResponse,
  GoalSimulateProjectionsRequestPayload,
} from '../types';

const initialState: GoalSimulateProjectionsState = {
  status: 'idle',
};

const goalSimulateProjectionsSlice = createSlice({
  name: 'goalSimulateProjections',
  initialState,
  reducers: {
    cleanGoalSimulateProjections: () => initialState,
  },
  extraReducers: commonActionReducerMapBuilder<
    { data: GoalSimulateProjectionsResponse },
    GoalSimulateProjectionsState,
    GoalSimulateProjectionsRequestPayload
  >(fetchGoalSimulateProjections),
});

export { fetchGoalSimulateProjections };
export const { cleanGoalSimulateProjections } = goalSimulateProjectionsSlice.actions;

export default goalSimulateProjectionsSlice.reducer;
