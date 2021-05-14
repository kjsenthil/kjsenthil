import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { navigate } from 'gatsby';
import { Grid, Typography } from '../components/atoms';
import { LoginForm } from '../components/organisms';
import { xplanLogin, LoginFormData, logout } from '../services/auth';
import { RootState } from '../store';

interface LoginPageProps {
  path: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const XplanLoginPage = (_: LoginPageProps) => {
  const { isXplanLoggedIn, xplanLoginError } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (isXplanLoggedIn) {
      navigate('/my-account/goals');
    }
  }, [isXplanLoggedIn]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(logout());
  }, []);
  const onLoginFormSubmit = async (loginFormValues: LoginFormData) => {
    dispatch(xplanLogin(loginFormValues));
  };

  return (
    <Grid container justify="center">
      <Grid item xs={6}>
        <Typography variant="h4" gutterBottom>
          Login Page
        </Typography>

        <LoginForm
          onSubmit={onLoginFormSubmit}
          errorMessage={xplanLoginError || ''}
          title="Xplan Login"
        />
      </Grid>
    </Grid>
  );
};

export default XplanLoginPage;
