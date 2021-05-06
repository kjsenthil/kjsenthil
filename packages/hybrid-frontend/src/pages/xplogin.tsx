import React, { ChangeEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from '@reach/router';
import { Grid, Typography, Box, TextField } from '../components/atoms';
import { LoginForm } from '../components/organisms';
import { xplanLogin, setEntityId } from '../services/auth/reducers/authSlice';
import { LoginFormData } from '../services/auth/types';
import { RootState } from '../store';

interface LoginPageProps {
  path: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const XplanLoginPage = (_: LoginPageProps) => {
  const { isXplanLoggedIn, xplanLoginError, entityId } = useSelector(
    (state: RootState) => state.auth
  );

  if (isXplanLoggedIn) {
    return <Redirect to="/my-account/accounts" />;
  }

  const dispatch = useDispatch();

  const onLoginFormSubmit = async (loginFormValues: LoginFormData) => {
    dispatch(xplanLogin(loginFormValues));
  };

  const onEntityHandler = (evt: ChangeEvent<HTMLInputElement>) =>
    dispatch(setEntityId(evt.target.value));

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

        <Box m={1}>
          <TextField label="Entity ID" type="number" value={entityId} onChange={onEntityHandler} />
        </Box>
      </Grid>
    </Grid>
  );
};

export default XplanLoginPage;
