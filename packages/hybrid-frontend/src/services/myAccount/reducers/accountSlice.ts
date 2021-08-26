import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  account: {},
};

const accountSlice = createSlice({
  name: 'selectedAccount',
  initialState,
  reducers: {
    setSelectedAccount: (state, action) => {
      state.account = action.payload;
    },
  },
});

export const { setSelectedAccount } = accountSlice.actions;

export default accountSlice.reducer;
