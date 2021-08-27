import { createAsyncThunk } from '@reduxjs/toolkit';
import { getIsaContribution } from '../api';
import { AuthState } from '../../auth';

export const fetchIsaContribution = createAsyncThunk(
  'client/fetchIsaContribution',
  async (_, { getState }) => {
    const {
      auth: { contactId = 0 },
    } = getState() as { auth: AuthState };
    if (contactId) return getIsaContribution(contactId);

    throw new Error('No client data found in state');
  }
);

export default fetchIsaContribution;
