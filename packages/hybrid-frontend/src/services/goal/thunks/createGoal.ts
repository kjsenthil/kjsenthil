import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import { postGoalCreation } from '../api';
import {
  OnboardingGoalInputs,
  CreateGoalParams,
  GoalCreationState,
  RetirementInputs,
  GoalType,
} from '../types';

const createGoal = createAsyncThunk(
  'goal/createGoal',
  ({ inputs, goalType }: CreateGoalParams, { getState }) => {
    const {
      goalCreation: { goalDetails, goalCapture },
    } = getState() as { goalCreation: GoalCreationState };

    let goalInputs;

    if (goalType === GoalType.ONBOARDING) {
      if (!inputs) {
        goalInputs = { ...goalCapture } as OnboardingGoalInputs;
      } else {
        goalInputs = inputs as OnboardingGoalInputs;
      }
      goalInputs.description = goalDetails.description || goalDetails.name;
    } else if (goalType === GoalType.RETIREMENT) {
      goalInputs = inputs as RetirementInputs;
    } else {
      goalInputs = undefined;
    }

    return postGoalCreation({
      goalType,
      inputs: goalInputs,
    });
  }
);

export const goalCreationActionReducerMapBuilder = (
  builder: ActionReducerMapBuilder<GoalCreationState>
) => {
  builder
    .addCase(createGoal.pending, (state) => {
      state.status = 'loading';
      state.error = undefined;
    })
    .addCase(createGoal.fulfilled, (state) => {
      state.status = 'success';
      state.error = undefined;
    })
    .addCase(createGoal.rejected, (state, action) => {
      state.status = 'error';
      state.error = action.error.message;
    });
};

export default createGoal;
