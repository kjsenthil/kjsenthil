import React, { useEffect, useState } from 'react';
import { navigate } from 'gatsby';
import { Grid, Typography } from '../components/atoms';
import { LoginForm } from '../components/organisms';
import { LoginFormData } from '../components/organisms/LoginForm/LoginForm';
import login from '../api/postLogin';
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

  const { setIsLoggedIn } = useGlobalContext();

  const onLoginFormSubmit = async (loginFormValues: LoginFormData) => {
    try {
      await login(loginFormValues); // TODO response

      setIsLoggedIn(true);

      handleLoginSession('HYBRID-LOGIN-SESSION');

      setLoginMessages({
        error: '',
        success: 'Log in successful',
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
      </Grid>
    </Grid>
  );
};

export default LoginPage;
