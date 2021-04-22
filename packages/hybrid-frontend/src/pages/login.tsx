import React, { ChangeEvent, useEffect, useState } from 'react';
import { navigate } from 'gatsby';
import { trackLink } from '@tsw/tracking-util';
import { Grid, Typography, Box, TextField } from '../components/atoms';
import { LoginForm } from '../components/organisms';
import { LoginFormData } from '../components/organisms/LoginForm/LoginForm';
import login from '../api/postXPlanLogin';
import useGlobalContext from '../hooks/GlobalContextHooks/useGlobalContext';
import { handleLoginSession, logoutSession } from '../services/auth';

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

  useEffect(() => {
    /* eslint-disable-next-line no-console */
    logoutSession(() => console.log('logged out'));
  }, []);

  const { setIsLoggedIn, entityId, setEntityId } = useGlobalContext();

  const onLoginFormSubmit = async (loginFormValues: LoginFormData) => {
    try {
      await login(loginFormValues);

      setIsLoggedIn(true);

      handleLoginSession('HYBRID-LOGIN-SESSION');

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
      setIsLoggedIn(false);

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
        />

        <Box m={1}>
          <TextField label="Entity ID" type="number" value={entityId} onChange={onEntityHandler} />
        </Box>
      </Grid>
    </Grid>
  );
};

export default LoginPage;
