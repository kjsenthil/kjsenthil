import { createAsyncThunk } from '@reduxjs/toolkit';
import { getClient } from '../api';
import { AuthState } from '../../auth';

export const fetchClient = createAsyncThunk('client/fetchClient', async (_, { getState }) => {
  const {
    auth: { contactId = 0 },
  } = getState() as { auth: AuthState };
  return getClient(contactId);
});

export default fetchClient;
