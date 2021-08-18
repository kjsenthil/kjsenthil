import { createAsyncThunk } from '@reduxjs/toolkit';
import { postGoalSimulateProjections } from '../api';
import { GoalSimulateProjectionsRequestPayload } from '../types';

const fetchGoalSimulateProjections = createAsyncThunk(
  'projections/fetchGoalSimulateProjections',
  async (payload: GoalSimulateProjectionsRequestPayload) => ({
    data: await postGoalSimulateProjections(payload),
  })
);

export default fetchGoalSimulateProjections;
