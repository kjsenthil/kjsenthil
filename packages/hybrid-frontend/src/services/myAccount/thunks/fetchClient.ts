import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import { MyAccountState } from '../types';
import { getClient } from '../api';
import { AuthState } from '../../auth';

export const fetchClient = createAsyncThunk('client/fetchClient', async (_, { getState }) => {
  const {
    auth: { contactId = '' },
  } = getState() as { auth: AuthState };
  return getClient(contactId);
});

export const getClientActionReducerMapBuilder = (
  builder: ActionReducerMapBuilder<MyAccountState>
) => {
  builder
    .addCase(fetchClient.pending, (state) => {
      state.status = 'loading';
      state.getClientError = undefined;
    })
    .addCase(fetchClient.fulfilled, (state, { payload }) => {
      state.status = 'success';
      state.getClientError = undefined;
      state.client = payload;
    })
    .addCase(fetchClient.rejected, (state, action) => {
      state.status = 'error';
      state.getClientError = action.error.message;
    });
};

export default fetchClient;
