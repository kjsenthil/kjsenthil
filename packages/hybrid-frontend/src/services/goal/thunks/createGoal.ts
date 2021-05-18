import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import { postGoalCreation } from '../api';
import { CaptureGoalData, GoalState } from '../types';

const createGoal = createAsyncThunk(
  'goal/createGoal',
  async ({ inputs }: { inputs?: CaptureGoalData } = {}, { getState }) => {
    const {
      goal: { goalDetails, goalCapture },
    } = getState() as { goal: GoalState };

    const response = await postGoalCreation({
      goalName: String(goalDetails.name),
      inputs: inputs || (goalCapture as CaptureGoalData),
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
