import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GoalTargetProjectionsResponse, GoalTargetProjectionsState } from '../types';
import {
  postGoalTargetProjections,
  postGoalTargetProjectionsActionReducerMapBuilder,
} from '../thunks';

const initialState: GoalTargetProjectionsState = {
  status: 'idle',
};

const goalTargetProjectionsSlice = createSlice({
  name: 'goalTargetProjections',
  initialState,
  reducers: {
    setGoalTargetProjections: (state, action: PayloadAction<GoalTargetProjectionsResponse>) => {
      state.data = action.payload;
    },

    setGoalTargetProjectionsSuccess: (state) => {
      state.status = 'success';
      state.error = undefined;
    },

    setGoalTargetProjectionsLoading: (state) => {
      state.status = 'loading';
      state.error = undefined;
    },

    setGoalTargetProjectionsError: (
      state,
      action: PayloadAction<GoalTargetProjectionsState['error']>
    ) => {
      state.status = 'error';
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    postGoalTargetProjectionsActionReducerMapBuilder(builder);
  },
});

export { postGoalTargetProjections };
export const {
  setGoalTargetProjections,
  setGoalTargetProjectionsSuccess,
  setGoalTargetProjectionsLoading,
  setGoalTargetProjectionsError,
} = goalTargetProjectionsSlice.actions;

export default goalTargetProjectionsSlice.reducer;
