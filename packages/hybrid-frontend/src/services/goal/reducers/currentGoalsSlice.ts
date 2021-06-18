import { createSlice } from '@reduxjs/toolkit';
import { CurrentGoals, CurrentGoalsState } from '../types';
import { fetchGoals } from '../thunks';
import { commonActionReducerMapBuilder } from '../../utils';

const initialState: CurrentGoalsState = {
  status: 'idle',
};

const currentGoalsSlice = createSlice({
  name: 'currentGoals',
  initialState,
  reducers: {},
  extraReducers: commonActionReducerMapBuilder<
    { data: CurrentGoals; included: undefined },
    CurrentGoalsState
  >(fetchGoals),
});

export { fetchGoals };

export default currentGoalsSlice.reducer;
