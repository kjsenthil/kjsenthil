import React, { useEffect, ChangeEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { navigate } from 'gatsby';
import { Grid, Typography, Box } from '../components/atoms';
import { LoginForm } from '../components/organisms';
import { xplanLogin, setEntityId } from '../services/auth/reducers/authSlice';
import { LoginFormData } from '../services/auth/types';
import { RootState } from '../store';
import { FormInput } from '../components/molecules';

interface LoginPageProps {
  path: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const XplanLoginPage = (_: LoginPageProps) => {
  const { isXplanLoggedIn, xplanLoginError, entityId } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    if (isXplanLoggedIn) {
      navigate('/my-account/goals');
    }
  }, [isXplanLoggedIn]);

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
          <FormInput label="Entity ID" type="number" value={entityId} onChange={onEntityHandler} />
        </Box>
      </Grid>
    </Grid>
  );
};

export default XplanLoginPage;
