import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { GoalCurrentProjectionsState, GoalCurrentProjectionsResponse } from '../types';

const initialState: GoalCurrentProjectionsState = {
  status: 'idle',
};

const GoalCurrentProjectionsSlice = createSlice({
  name: 'goalCurrentProjections',
  initialState,
  reducers: {
    setGoalCurrentProjections: (state, action: PayloadAction<GoalCurrentProjectionsResponse>) => {
      state.data = action.payload;
    },
    setGoalCurrentProjectionsSuccess: (state) => {
      state.status = 'success';
      state.error = undefined;
    },
    setGoalCurrentProjectionsLoading: (state) => {
      state.status = 'loading';
      state.error = undefined;
    },
    setGoalCurrentProjectionsError: (state, action) => {
      state.status = 'error';
      state.error = action.payload.error;
    },
  },
});

export const {
  setGoalCurrentProjections,
  setGoalCurrentProjectionsSuccess,
  setGoalCurrentProjectionsLoading,
  setGoalCurrentProjectionsError,
} = GoalCurrentProjectionsSlice.actions;

export default GoalCurrentProjectionsSlice.reducer;
