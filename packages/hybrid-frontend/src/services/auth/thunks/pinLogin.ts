import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import { PinLoginItem } from '@tswdts/react-components';
import { AuthState } from '../types';
import { postPin } from '../api';
import { COOKIE_DOMAIN } from '../../../config';
import { setTokensInCookies } from '../../utils';

export const pinLogin = createAsyncThunk(
  'auth/pinLogin',
  async (pinFormValues: PinLoginItem[], { getState }) => {
    const {
      auth: { twoStepAuthCode },
    } = getState() as { auth: AuthState };
    const response = await postPin(pinFormValues, twoStepAuthCode as string);
    return response.data.attributes;
  }
);

export const pinLoginActionReducerMapBuilder = (builder: ActionReducerMapBuilder<AuthState>) => {
  builder
    .addCase(pinLogin.pending, (state) => {
      state.status = 'loading';
      state.pinLoginError = '';
    })
    .addCase(pinLogin.fulfilled, (state, { payload: { tokens, contactId } }) => {
      // store API tokens in cookie
      setTokensInCookies(tokens, { cookieDomain: COOKIE_DOMAIN });
      state.status = 'success';
      state.accessTokens = tokens;
      state.contactId = contactId;
      state.isPinLoggedIn = true;
    })
    .addCase(pinLogin.rejected, (state, action) => {
      state.status = 'error';
      state.pinLoginError = action.error.message;
    });
};

export default pinLogin;
