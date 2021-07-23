import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import { postGoalCreation } from '../api';
import { GoalCreationState, GoalType, PostGoalParams } from '../types';
import fetchGoals from './fetchGoals';

const createGoal = createAsyncThunk(
  'goal/createGoal',
  async (params: PostGoalParams<GoalType>, { dispatch }) => {
    const result = await postGoalCreation<GoalType>(params);

    dispatch(fetchGoals());
    return result;
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
