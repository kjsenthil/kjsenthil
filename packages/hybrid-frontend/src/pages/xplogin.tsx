import React, { ChangeEvent, useEffect, useState } from 'react';
import { navigate } from 'gatsby';
import { trackLink } from '@tsw/tracking-util';
import { Grid, Typography, Box, TextField } from '../components/atoms';
import { LoginForm } from '../components/organisms';
import login from '../api/postXPlanLogin';
import useGlobalContext from '../hooks/GlobalContextHooks/useGlobalContext';

import { xplanSessionTokenValue } from '../constants';
import { xplanlogoutSession, handleXplanLoginSession } from '../services/xplanAuth/xplanAuth';
import { LoginFormData } from '../services/auth/types';

interface LoginPageProps {
  path: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const XplanLoginPage = ({ path }: LoginPageProps) => {
  const [loginMessages, setLoginMessages] = useState<{
    error: string;
    success: string;
  }>({
    error: '',
    success: '',
  });

  useEffect(() => {
    xplanlogoutSession(() => {});
  }, []);

  const { entityId, setEntityId } = useGlobalContext();

  const onLoginFormSubmit = async (loginFormValues: LoginFormData) => {
    try {
      await login(loginFormValues);

      handleXplanLoginSession(xplanSessionTokenValue);

      setLoginMessages({
        error: '',
        success: 'Log in successful',
      });

      trackLink({
        eventCategory: 'Account',
        eventAction: 'Account_Login',
        eventLabel: 'Logged-in successfully',
        eventValue: 1,
      });

      navigate('/gmvp/accounts');
    } catch (e) {
      setLoginMessages({
        error: e.message,
        success: '',
      });
    }
  };

  const onEntityHandler = (evt: ChangeEvent<HTMLInputElement>) => setEntityId(evt.target.value);

  return (
    <Grid container justify="center">
      <Grid item xs={6}>
        <Typography variant="h4" gutterBottom>
          Login Page
        </Typography>

        <LoginForm
          onSubmit={onLoginFormSubmit}
          errorMessage={loginMessages.error}
          successMessage={loginMessages.success}
          title="Xplan Login"
        />

        <Box m={1}>
          <TextField label="Entity ID" type="number" value={entityId} onChange={onEntityHandler} />
        </Box>
      </Grid>
    </Grid>
  );
};

export default XplanLoginPage;
