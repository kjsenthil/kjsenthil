import { createSlice } from '@reduxjs/toolkit';
import { logoutSession } from '../utils';
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

const initialState: AuthState = {
  isCredLoggedIn: false,
  isPinLoggedIn: false,
  isXplanLoggedIn: false,
  accessTokens: [],
  status: 'idle',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: () => {
      logoutSession();
      return initialState;
    },
    setShouldRefreshTokens: (state) => {
      state.shouldRefreshTokens = true;
    },
    setEntityId: (state, action) => {
      state.entityId = action.payload;
    },
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
export const { setAccessTokens, setEntityId, setShouldRefreshTokens } = authSlice.actions;

export default authSlice.reducer;
