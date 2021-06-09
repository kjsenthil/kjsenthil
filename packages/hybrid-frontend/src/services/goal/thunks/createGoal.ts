import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import { postGoalCreation } from '../api';
import { CaptureGoalData, GoalRequestPayload, GoalCreationState } from '../types';

const createGoal = createAsyncThunk(
  'goal/createGoal',
  (
    { inputs, payload }: { inputs?: CaptureGoalData; payload?: GoalRequestPayload } = {},
    { getState }
  ) => {
    const {
      goalCreation: { goalDetails, goalCapture },
    } = getState() as { goalCreation: GoalCreationState };

    return postGoalCreation({
      onboardGoalCreationInputs: {
        goalDetails,
        inputs: inputs || (goalCapture as CaptureGoalData),
      },
      payload,
    });
  }
);

export const goalCreationActionReducerMapBuilder = (
  builder: ActionReducerMapBuilder<GoalCreationState>
) => {
  builder
    .addCase(createGoal.pending, (state) => {
      state.status = 'loading';
      state.goalCreationError = undefined;
    })
    .addCase(createGoal.fulfilled, (state) => {
      state.status = 'success';
      state.goalCreationError = undefined;
    })
    .addCase(createGoal.rejected, (state, action) => {
      state.status = 'error';
      state.goalCreationError = action.error.message;
    });
};

export default createGoal;
