import { createSlice, createAction } from '@reduxjs/toolkit';
import jwt_decode from 'jwt-decode';
import { AuthState, TokenItem } from '../types';
import { ApiAppName } from '../../../constants';
import {
  credLogin,
  pinLogin,
  refreshToken,
  credLoginActionReducerMapBuilder,
  pinLoginActionReducerMapBuilder,
  refreshTokenActionReducerMapBuilder,
} from '../thunks';

export const initialState: AuthState = {
  status: 'idle',
  accessTokens: [],
  isCredLoggedIn: false,
  isPinLoggedIn: false,
};

interface JwtPayload {
  contact: number;
  accounts: string;
}

const logout = createAction('auth/logout');

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAccessTokens: (state, action) => {
      state.accessTokens = action.payload;
    },
    setAccessTokensFromCookie: (
      state,
      action: {
        type: string;
        payload: { myAccounts: TokenItem; ois: TokenItem; online: TokenItem };
      }
    ) => {
      state.accessTokens = [
        { ...action.payload.myAccounts, application: ApiAppName.myAccounts },
        { ...action.payload.ois, application: ApiAppName.ois },
        { ...action.payload.online, application: ApiAppName.online },
      ];
      const jwtDecoded = jwt_decode(action.payload.myAccounts.accessToken) as JwtPayload;
      state.contactId = jwtDecoded.contact;
    },
  },
  extraReducers: (builder) => {
    credLoginActionReducerMapBuilder(builder);
    pinLoginActionReducerMapBuilder(builder);
    refreshTokenActionReducerMapBuilder(builder);
  },
});

export { credLogin, pinLogin, refreshToken, logout };
export const { setAccessTokens, setAccessTokensFromCookie } = authSlice.actions;

export default authSlice.reducer;
