import { createSlice } from '@reduxjs/toolkit';
import { AuthState } from '../types';
import {
  credLogin,
  pinLogin,
  xplanLogin,
  refreshToken,
  credLoginActionReducerMapBuilder,
  pinLoginActionReducerMapBuilder,
  xplanLoginActionReducerMapBuilder,
  refreshTokenActionReducerMapBuilder,
} from '../thunks';
import { ENTITY_ID } from '../../../config';

const initialState: AuthState = {
  status: 'idle',
  entityId: ENTITY_ID,
  accessTokens: [],
  isCredLoggedIn: false,
  isPinLoggedIn: false,
  isXplanLoggedIn: false,
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
    xplanLoginActionReducerMapBuilder(builder);
    refreshTokenActionReducerMapBuilder(builder);
  },
});

export { credLogin, pinLogin, xplanLogin, refreshToken };
export const { setAccessTokens, logout } = authSlice.actions;

export default authSlice.reducer;
