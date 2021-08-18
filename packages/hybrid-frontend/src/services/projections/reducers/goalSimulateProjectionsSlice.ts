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

const GoalSimulateProjectionsSlice = createSlice({
  name: 'goalSimulateProjections',
  initialState,
  reducers: {},
  extraReducers: commonActionReducerMapBuilder<
    { data: GoalSimulateProjectionsResponse },
    GoalSimulateProjectionsState,
    GoalSimulateProjectionsRequestPayload
  >(fetchGoalSimulateProjections),
});

export { fetchGoalSimulateProjections };
export default GoalSimulateProjectionsSlice.reducer;
