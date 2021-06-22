import { createSlice } from '@reduxjs/toolkit';
import { ClientState, ClientResponse } from '../types';
import { fetchClient } from '../thunks';
import commonActionReducerMapBuilder from '../../utils/commonActionReducerMapBuilder';

const initialState: ClientState = {
  status: 'idle',
};

const clientSlice = createSlice({
  name: 'client',
  initialState,
  reducers: {},
  extraReducers: commonActionReducerMapBuilder<ClientResponse, ClientState>(fetchClient),
});

export { fetchClient };

export default clientSlice.reducer;
