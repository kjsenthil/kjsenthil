import { createSlice } from '@reduxjs/toolkit';
import { AuthState } from '../types';
import {
  credLogin,
  pinLogin,
  refreshToken,
  credLoginActionReducerMapBuilder,
  pinLoginActionReducerMapBuilder,
  refreshTokenActionReducerMapBuilder,
} from '../thunks';

const initialState: AuthState = {
  status: 'idle',
  accessTokens: [],
  isCredLoggedIn: false,
  isPinLoggedIn: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: () => initialState,
    setAccessTokens: (state, action) => {
      state.accessTokens = action.payload;
    },
  },
  extraReducers: (builder) => {
    credLoginActionReducerMapBuilder(builder);
    pinLoginActionReducerMapBuilder(builder);
    refreshTokenActionReducerMapBuilder(builder);
  },
});

export { credLogin, pinLogin, refreshToken };
export const { setAccessTokens, logout } = authSlice.actions;

export default authSlice.reducer;
