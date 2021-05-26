import { createAsyncThunk } from '@reduxjs/toolkit';
import { getClient } from '../api';
import { AuthState } from '../../auth';
import { ClientResponse } from '../types';

export const fetchClient = createAsyncThunk<ClientResponse>(
  'client/fetchClient',
  async (_, { getState }) => {
    const {
      auth: { contactId = '' },
    } = getState() as { auth: AuthState };
    return getClient(contactId);
  }
);

export default fetchClient;
