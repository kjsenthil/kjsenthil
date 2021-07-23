import { createSlice } from '@reduxjs/toolkit';
import { commonActionReducerMapBuilder } from '../../utils';
import fetchGoalCurrentProjections from '../thunks/fetchCurrentProjections';

import {
  GoalCurrentProjectionsState,
  GoalCurrentProjectionsResponse,
  GoalCurrentProjectionsRequestPayload,
} from '../types';

const initialState: GoalCurrentProjectionsState = {
  status: 'idle',
};

const GoalCurrentProjectionsSlice = createSlice({
  name: 'goalCurrentProjections',
  initialState,
  reducers: {},
  extraReducers: commonActionReducerMapBuilder<
    { data: GoalCurrentProjectionsResponse },
    GoalCurrentProjectionsState,
    GoalCurrentProjectionsRequestPayload
  >(fetchGoalCurrentProjections),
});

export { fetchGoalCurrentProjections };
export default GoalCurrentProjectionsSlice.reducer;
