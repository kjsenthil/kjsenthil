import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CurrentGoals, CurrentGoalsState, GoalCategory, GoalsApiResponse } from '../types';
import { fetchGoals } from '../thunks';
import { commonActionReducerMapBuilder } from '../../utils';

const initialState: CurrentGoalsState = {
  status: 'idle',
};

const currentGoalsSlice = createSlice({
  name: 'currentGoals',
  initialState,
  reducers: {
    setBiRetirementLumpSumDate: (state, action: PayloadAction<string>) => {
      if (state.data) {
        const goalsData: GoalsApiResponse[] = [...state.data];

        const updatedGoalIndex = goalsData.findIndex(
          ({ fields: { category } }) => category === GoalCategory.RETIREMENT
        );

        if (updatedGoalIndex !== undefined) {
          const goalToUpdate = goalsData[updatedGoalIndex];

          if (goalToUpdate && goalToUpdate.fields.biRetirementLumpSumDate) {
            goalToUpdate.fields.biRetirementLumpSumDate.val = action.payload;

            goalsData[updatedGoalIndex] = goalToUpdate;

            state.data = goalsData;
          }
        }
      }
    },
  },
  extraReducers: commonActionReducerMapBuilder<{ data: CurrentGoals }, CurrentGoalsState>(
    fetchGoals
  ),
});

export { fetchGoals };

export const { setBiRetirementLumpSumDate } = currentGoalsSlice.actions;

export default currentGoalsSlice.reducer;
