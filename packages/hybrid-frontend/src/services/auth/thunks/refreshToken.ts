import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import { AuthState } from '../types';
import { postRefreshToken } from '../api';
import { COOKIE_DOMAIN } from '../../../config';
import { setTokensInCookies } from '../../utils';

export const refreshToken = createAsyncThunk('auth/refreshToken', async (_, { getState }) => {
  const {
    auth: { accessTokens },
  } = getState() as { auth: AuthState };
  const response = await postRefreshToken(accessTokens);
  const tokens = response.data.attributes.newTokens;
  return { tokens };
});

export const refreshTokenActionReducerMapBuilder = (
  builder: ActionReducerMapBuilder<AuthState>
) => {
  builder
    .addCase(refreshToken.pending, (state) => {
      state.status = 'loading';
    })
    .addCase(refreshToken.fulfilled, (state, { payload: { tokens } }) => {
      // store API tokens in cookie
      setTokensInCookies(tokens, { cookieDomain: COOKIE_DOMAIN });
      state.status = 'success';
      state.accessTokens = tokens;
    })
    .addCase(refreshToken.rejected, (state, action) => {
      state.status = 'error';
      state.isPinLoggedIn = false;
      state.isCredLoggedIn = false;
      state.refreshTokenError = action.error.message;
    });
};

export default refreshToken;
