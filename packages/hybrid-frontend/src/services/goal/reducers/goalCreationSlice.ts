import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GoalDetails, CaptureGoalData, GoalCreationState } from '../types';
import { createGoal, goalCreationActionReducerMapBuilder } from '../thunks';
import { calcRegularSavings } from '../utils';

const initialState: GoalCreationState = {
  status: 'idle',
  goalCapture: {},
  goalDetails: {},
  error: undefined,
};

const goalCreationSlice = createSlice({
  name: 'goalCreation',
  initialState,
  reducers: {
    reset: () => initialState,
    setGoalCapture: (state, action: PayloadAction<Partial<CaptureGoalData>>) => {
      const goalCapture = { ...state.goalCapture, ...action.payload };
      if (goalCapture.targetAmount && goalCapture.upfrontInvestment && goalCapture.targetDate) {
        goalCapture.monthlyInvestment = calcRegularSavings(goalCapture as CaptureGoalData);
      }
      state.goalCapture = { ...goalCapture };
    },
    setGoalDetails: (state, action: PayloadAction<GoalDetails>) => {
      state.goalDetails = action.payload;
    },
  },
  extraReducers: (builder) => {
    goalCreationActionReducerMapBuilder(builder);
  },
});

export { createGoal };
export const { setGoalCapture, setGoalDetails, reset } = goalCreationSlice.actions;

export default goalCreationSlice.reducer;
