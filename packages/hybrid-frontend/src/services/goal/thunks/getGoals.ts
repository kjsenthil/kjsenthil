import { createAsyncThunk } from '@reduxjs/toolkit';
import { getGoalsFetcher } from '../api';

const getGoals = createAsyncThunk('goal/getGoals', async () => {
  const goalsData = await getGoalsFetcher();

  return {
    data: goalsData,
    included: undefined,
  };
});

export default getGoals;
