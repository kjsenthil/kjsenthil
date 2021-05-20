import { createSlice } from '@reduxjs/toolkit';
import { ClientState } from '../types';
import { getClient, getClientActionReducerMapBuilder } from '../thunks';

const initialState: ClientState = {
  status: 'idle',
  client: undefined,
};

const clientSlice = createSlice({
  name: 'client',
  initialState,
  reducers: {
    setClient: (state, action) => {
      state.client = action.payload;
    },
  },
  extraReducers: (builder) => {
    getClientActionReducerMapBuilder(builder);
  },
});

export { getClient };
export const { setClient } = clientSlice.actions;

export default clientSlice.reducer;
