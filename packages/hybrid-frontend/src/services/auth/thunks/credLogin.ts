import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import { AuthState, LoginFormData } from '../types';
import { postLogin } from '../api';

const credLogin = createAsyncThunk('auth/credLogin', async (loginFormValues: LoginFormData) => {
  const response = await postLogin(loginFormValues);
  return response.data.attributes;
});

export const credLoginActionReducerMapBuilder = (builder: ActionReducerMapBuilder<AuthState>) => {
  builder
    .addCase(credLogin.pending, (state) => {
      state.status = 'loading';
      state.credLoginError = '';
    })
    .addCase(credLogin.fulfilled, (state, action) => {
      state.status = 'success';
      state.twoStepAuthCode = action.payload.twoStepAuthCode;
      state.isCredLoggedIn = true;
    })
    .addCase(credLogin.rejected, (state, action) => {
      state.status = 'error';
      state.credLoginError = action.error.message;
    });
};

export default credLogin;
