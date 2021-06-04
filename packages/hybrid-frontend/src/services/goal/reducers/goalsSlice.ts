import { createSlice } from '@reduxjs/toolkit';
import { GetGoalsResponse, GoalsState } from '../types';
import { getGoals } from '../thunks';
import { commonActionReducerMapBuilder } from '../../utils';

const initialState: GoalsState = {
  status: 'idle',
};

const goalsSlice = createSlice({
  name: 'goals',
  initialState,
  reducers: {},
  extraReducers: commonActionReducerMapBuilder<
    { data: GetGoalsResponse; included: undefined },
    GoalsState
  >(getGoals),
});

export { getGoals };

export default goalsSlice.reducer;
