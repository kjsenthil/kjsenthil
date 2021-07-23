import { createSlice } from '@reduxjs/toolkit';
import { GoalTargetProjectionsState } from '../types';
import { commonActionReducerMapBuilder } from '../../utils';
import { fetchTargetProjections } from '../thunks';

const initialState: GoalTargetProjectionsState = {
  status: 'idle',
};

const goalTargetProjectionsSlice = createSlice({
  name: 'goalTargetProjections',
  initialState,
  reducers: {},
  extraReducers: commonActionReducerMapBuilder(fetchTargetProjections),
});

export { fetchTargetProjections };
export default goalTargetProjectionsSlice.reducer;
