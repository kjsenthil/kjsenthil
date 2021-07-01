import { createAsyncThunk } from '@reduxjs/toolkit';
import { postGoalTargetProjectionsFetcher } from '../api';
import { GoalTargetProjectionsRequestPayload } from '../types';

const fetchTargetProjections = createAsyncThunk(
  'projections/fetchTargetProjections',
  async (payload: GoalTargetProjectionsRequestPayload) => ({
    data: await postGoalTargetProjectionsFetcher(payload),
  })
);

export default fetchTargetProjections;
