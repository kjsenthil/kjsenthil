import { createSlice } from '@reduxjs/toolkit';
import { GetCurrentGoals, CurrentGoalsState } from '../types';
import { getGoals } from '../thunks';
import { commonActionReducerMapBuilder } from '../../utils';

const initialState: CurrentGoalsState = {
  status: 'idle',
};

const currentGoalsSlice = createSlice({
  name: 'currentGoals',
  initialState,
  reducers: {},
  extraReducers: commonActionReducerMapBuilder<
    { data: GetCurrentGoals; included: undefined },
    CurrentGoalsState
  >(getGoals),
});

export { getGoals };

export default currentGoalsSlice.reducer;
