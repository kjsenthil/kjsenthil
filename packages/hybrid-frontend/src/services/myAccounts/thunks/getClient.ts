import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import { ClientState } from '../types';
import { getMyAccountClient } from '../api';
import { AuthState } from '../../auth';

export const getClient = createAsyncThunk('client/getClient', async (_, { getState }) => {
  const {
    auth: { contactId = '' },
  } = getState() as { auth: AuthState };
  return getMyAccountClient(contactId);
});

export const getClientActionReducerMapBuilder = (builder: ActionReducerMapBuilder<ClientState>) => {
  builder
    .addCase(getClient.pending, (state) => {
      state.status = 'loading';
      state.getClientError = undefined;
    })
    .addCase(getClient.fulfilled, (state, { payload }) => {
      state.status = 'success';
      state.getClientError = undefined;
      state.client = payload;
    })
    .addCase(getClient.rejected, (state, action) => {
      state.status = 'error';
      state.getClientError = action.error.message;
    });
};

export default getClient;
