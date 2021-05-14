import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GoalDetails, CaptureGoalData, GoalState } from '../types';
import { createGoal, goalCreationActionReducerMapBuilder } from '../thunks';
import { calcRegularSavings } from '../utils';

const initialState: GoalState = {
  status: 'idle',
  goalCapture: {},
  goalDetails: {},
};

const goalSlice = createSlice({
  name: 'goals',
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
export const { setGoalCapture, setGoalDetails, reset } = goalSlice.actions;

export default goalSlice.reducer;
