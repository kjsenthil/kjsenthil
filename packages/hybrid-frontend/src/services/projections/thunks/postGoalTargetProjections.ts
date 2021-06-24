import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import { postGoalTargetProjectionsFetcher } from '../api';
import { GoalTargetProjectionsRequestPayload, GoalTargetProjectionsState } from '../types';

type PostGoalTargetProjectionsPayloadCreatorProps = GoalTargetProjectionsRequestPayload;

const postGoalTargetProjections = createAsyncThunk(
  'projections/postGoalTargetProjections',
  async (payload: PostGoalTargetProjectionsPayloadCreatorProps) =>
    postGoalTargetProjectionsFetcher(payload)
);

export const postGoalTargetProjectionsActionReducerMapBuilder = (
  builder: ActionReducerMapBuilder<GoalTargetProjectionsState>
) => {
  builder
    .addCase(postGoalTargetProjections.pending, (state) => {
      state.status = 'loading';
      state.error = undefined;
    })
    .addCase(postGoalTargetProjections.fulfilled, (state, { payload }) => {
      state.status = 'success';
      state.error = undefined;
      state.data = payload;
    })
    .addCase(postGoalTargetProjections.rejected, (state, action) => {
      state.status = 'error';
      state.error = action.error.message;
    });
};

export default postGoalTargetProjections;
