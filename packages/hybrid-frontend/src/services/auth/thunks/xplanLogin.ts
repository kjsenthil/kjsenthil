import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import { trackLink } from '@tsw/tracking-util';
import { AuthState, LoginFormData } from '../types';
import { postXplanLogin } from '../api';

// Temperory, to be removed once xplan is integrated with the myaccounts login api
export const xplanLogin = createAsyncThunk(
  'auth/xplanLogin',
  async (loginFormValues: LoginFormData) => {
    await postXplanLogin(loginFormValues);
    trackLink({
      eventCategory: 'Account',
      eventAction: 'Account_Login',
      eventLabel: 'Logged-in successfully',
      eventValue: 1,
    });
  }
);

export const xplanLoginActionReducerMapBuilder = (builder: ActionReducerMapBuilder<AuthState>) => {
  builder
    .addCase(xplanLogin.pending, (state) => {
      state.status = 'loading';
      state.xplanLoginError = '';
    })
    .addCase(xplanLogin.fulfilled, (state) => {
      state.status = 'success';
      state.isXplanLoggedIn = true;
    })
    .addCase(xplanLogin.rejected, (state, action) => {
      state.status = 'error';
      state.xplanLoginError = action.error.message;
    });
};

export default xplanLogin;
