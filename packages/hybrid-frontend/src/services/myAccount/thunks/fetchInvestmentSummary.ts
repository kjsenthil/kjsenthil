import { createAsyncThunk } from '@reduxjs/toolkit';
import { ClientState } from '../types';
import { getInvestmentSummary } from '../api';
import { extractClientAccounts } from '../utils';

export const fetchInvestmentSummary = createAsyncThunk(
  'client/fetchInvestmentSummary',
  async (_, { getState }) => {
    const { client } = getState() as { client: ClientState };

    if (client.included) {
      return getInvestmentSummary(extractClientAccounts(client.included));
    }

    throw new Error('No client data found in state');
  }
);

export default fetchInvestmentSummary;
