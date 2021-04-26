import { navigate } from 'gatsby';
import React, { useState } from 'react';
import postLogin from '../api/postLogin';
import postPin from '../api/postPin';
import { Grid, Typography } from '../components/atoms';
import { LoginForm } from '../components/organisms';
import { LoginFormData } from '../components/organisms/LoginForm/LoginForm';
import PinLogin from '../components/organisms/PinLogin';
import { sessionTokenValue } from '../constants';
import useGlobalContext from '../hooks/GlobalContextHooks/useGlobalContext';
import { handleLoginSession } from '../services/auth/auth';
import { PinLoginItem } from '../types';

interface LoginPageProps {
  path: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const LoginPage = ({ path }: LoginPageProps) => {
  const [loginMessages, setLoginMessages] = useState<{
    error: string;
    success: string;
  }>({
    error: '',
    success: '',
  });

  const [pinloginMessages, setpinLoginMessages] = useState<{
    error: string;
    success: string;
  }>({
    error: '',
    success: '',
  });

  const { twoStepAuthCode, setTwoStepAuthCode, setAccessTokens, setContactId } = useGlobalContext();

  const onLoginFormSubmit = async (loginFormValues: LoginFormData) => {
    try {
      const resp = await postLogin(loginFormValues);

      const twoStepVal = resp.data.attributes.twoStepAuthCode;

      setTwoStepAuthCode(twoStepVal);

      setLoginMessages({
        error: '',
        success: 'Log in successful',
      });
    } catch (e) {
      setLoginMessages({
        error: e.message,
        success: '',
      });
    }
  };

  const onPinSubmit = async (pinFormValues: PinLoginItem[]) => {
    try {
      const pinResp = await postPin(pinFormValues, twoStepAuthCode);

      handleLoginSession(sessionTokenValue);

      const { contactId } = pinResp.data.attributes;
      setContactId(contactId);

      const accessTokens = pinResp.data.attributes.tokens;
      setAccessTokens(accessTokens);

      setpinLoginMessages({
        error: '',
        success: 'Pin Log in successful',
      });

      navigate('/dacn/dash');
    } catch (e) {
      setpinLoginMessages({
        error: e.message,
        success: '',
      });
    }
  };

  return (
    <Grid container alignItems="center" spacing={3}>
      <Grid item sm={6}>
        <Typography variant="h4" gutterBottom>
          Login Page
        </Typography>

        <LoginForm
          onSubmit={onLoginFormSubmit}
          errorMessage={loginMessages.error}
          successMessage={loginMessages.success}
        />
      </Grid>

      {twoStepAuthCode && (
        <Grid item sm={6}>
          <Typography variant="h4" gutterBottom>
            Pin Login
          </Typography>

          <PinLogin
            onPinSubmit={onPinSubmit}
            errorMessage={pinloginMessages.error}
            successMessage={pinloginMessages.success}
          />
        </Grid>
      )}
    </Grid>
  );
};

export default LoginPage;
