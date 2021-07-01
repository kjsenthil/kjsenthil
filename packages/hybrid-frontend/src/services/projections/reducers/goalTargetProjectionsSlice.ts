import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GoalTargetProjectionsState } from '../types';
import {
  commonActionReducerMapBuilder,
  setDataAction,
  setErrorAction,
  setLoadingAction,
} from '../../utils';
import { fetchTargetProjections } from '../thunks';

const initialState: GoalTargetProjectionsState = {
  status: 'idle',
};

const goalTargetProjectionsSlice = createSlice({
  name: 'goalTargetProjections',
  initialState,
  reducers: {
    setGoalTargetProjectionsSuccess: setDataAction(),
    setGoalTargetProjectionsLoading: setLoadingAction,
    setGoalTargetProjectionsError: (...props) => setErrorAction<PayloadAction>(...props),
  },
  extraReducers: commonActionReducerMapBuilder(fetchTargetProjections),
});

export { fetchTargetProjections };
export const {
  setGoalTargetProjectionsSuccess,
  setGoalTargetProjectionsLoading,
  setGoalTargetProjectionsError,
} = goalTargetProjectionsSlice.actions;

export default goalTargetProjectionsSlice.reducer;
