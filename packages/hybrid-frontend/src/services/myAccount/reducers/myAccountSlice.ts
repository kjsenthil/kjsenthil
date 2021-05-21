import { createSlice } from '@reduxjs/toolkit';
import { MyAccountState } from '../types';
import { fetchClient, getClientActionReducerMapBuilder } from '../thunks';

const initialState: MyAccountState = {
  status: 'idle',
  client: undefined,
};

const myAccountSlice = createSlice({
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

export { fetchClient };
export const { setClient } = myAccountSlice.actions;

export default myAccountSlice.reducer;
