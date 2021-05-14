import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import { AuthState } from '../../auth';
import { postGoalCreation } from '../api';
import { CaptureGoalData, GoalState } from '../types';

const createGoal = createAsyncThunk(
  'goal/createGoal',
  async ({ inputs }: { inputs?: CaptureGoalData } = {}, { getState }) => {
    const {
      auth: { entityId = 0 },
      goal: { goalDetails, goalCapture },
    } = getState() as { auth: AuthState; goal: GoalState };

    const response = await postGoalCreation({
      goalName: String(goalDetails.name),
      inputs: inputs || (goalCapture as CaptureGoalData),
      entityId,
    });
    return response;
  }
);

export const goalCreationActionReducerMapBuilder = (
  builder: ActionReducerMapBuilder<GoalState>
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
