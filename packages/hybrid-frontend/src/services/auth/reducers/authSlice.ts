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
    logout: () => initialState,
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
export const { setAccessTokens, setEntityId, logout } = authSlice.actions;

export default authSlice.reducer;
