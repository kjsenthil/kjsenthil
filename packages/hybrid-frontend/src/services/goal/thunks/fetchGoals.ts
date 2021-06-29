import { createAsyncThunk } from '@reduxjs/toolkit';
import { getGoals } from '../api';
import { filterGoals } from '../utils';

const fetchGoals = createAsyncThunk('goal/fetchGoals', async () => {
  const goalsData = await getGoals();

  return {
    data: filterGoals(goalsData),
  };
});

export default fetchGoals;
