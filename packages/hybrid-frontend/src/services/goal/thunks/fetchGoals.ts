import { createAsyncThunk } from '@reduxjs/toolkit';
import { getGoals } from '../api';
import { filterGoals } from '../utils';
import { GoalsApiResponse } from '../types';

const fetchGoals = createAsyncThunk<{ data: GoalsApiResponse[] }, void, {}>(
  'goal/fetchGoals',
  async () => {
    const goalsData = await getGoals();

    return {
      data: filterGoals(goalsData),
    };
  }
);

export default fetchGoals;
