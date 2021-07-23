import { createAsyncThunk } from '@reduxjs/toolkit';
import { postGoalCurrentProjections } from '../api';
import { GoalCurrentProjectionsRequestPayload } from '../types';

const fetchGoalCurrentProjections = createAsyncThunk(
  'projections/fetchGoalCurrentProjections',
  async (payload: GoalCurrentProjectionsRequestPayload) => ({
    data: await postGoalCurrentProjections(payload),
  })
);

export default fetchGoalCurrentProjections;
