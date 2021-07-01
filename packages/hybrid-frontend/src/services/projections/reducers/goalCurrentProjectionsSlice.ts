import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { commonActionReducerMapBuilder, setLoadingAction } from '../../utils';
import fetchGoalCurrentProjections from '../thunks/fetchCurrentProjections';
import setDataAction from '../../utils/setDataAction';
import setErrorAction from '../../utils/setErrorAction';

import {
  GoalCurrentProjectionsState,
  GoalCurrentProjectionsResponse,
  GoalCurrentProjectionsRequestPayload,
} from '../types';

const initialState: GoalCurrentProjectionsState = {
  status: 'idle',
};

const GoalCurrentProjectionsSlice = createSlice({
  name: 'goalCurrentProjections',
  initialState,
  reducers: {
    setGoalCurrentProjectionsSuccess: setDataAction(),
    setGoalCurrentProjectionsLoading: setLoadingAction,
    setGoalCurrentProjectionsError: (...props) => setErrorAction<PayloadAction>(...props),
  },
  extraReducers: commonActionReducerMapBuilder<
    GoalCurrentProjectionsResponse,
    GoalCurrentProjectionsState,
    GoalCurrentProjectionsRequestPayload
  >(fetchGoalCurrentProjections),
});

export const {
  setGoalCurrentProjectionsSuccess,
  setGoalCurrentProjectionsLoading,
  setGoalCurrentProjectionsError,
} = GoalCurrentProjectionsSlice.actions;

export { fetchGoalCurrentProjections };
export default GoalCurrentProjectionsSlice.reducer;
