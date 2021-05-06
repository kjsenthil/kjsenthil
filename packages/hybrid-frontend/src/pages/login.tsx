import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from '@reach/router';
import { Grid, Typography } from '../components/atoms';
import { LoginForm } from '../components/organisms';
import PinLogin from '../components/organisms/PinLogin';
import { credLogin, pinLogin } from '../services/auth/reducers/authSlice';
import { RootState } from '../store';
import { LoginFormData, PinLoginItem } from '../services/auth/types';

interface LoginPageProps {
  path: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const LoginPage = (_: LoginPageProps) => {
  const {
    status,
    isCredLoggedIn,
    twoStepAuthCode,
    isPinLoggedIn,
    credLoginError,
    pinLoginError,
  } = useSelector((state: RootState) => state.auth);

  if (isPinLoggedIn) {
    return <Redirect to="/my-account/dash" />;
  }

  const dispatch = useDispatch();

  const onLoginFormSubmit = async (loginFormValues: LoginFormData) => {
    dispatch(credLogin(loginFormValues));
  };

  const onPinSubmit = async (pinFormValues: PinLoginItem[]) => {
    dispatch(pinLogin(pinFormValues));
  };

  return (
    <Grid container alignItems="center" spacing={3}>
      <Grid item sm={6}>
        <Typography variant="h4" gutterBottom>
          Login Page
        </Typography>

        <LoginForm
          onSubmit={onLoginFormSubmit}
          errorMessage={status === 'error' ? credLoginError : undefined}
          successMessage={isCredLoggedIn ? 'Success' : undefined}
        />
      </Grid>

      {twoStepAuthCode && (
        <Grid item sm={6}>
          <Typography variant="h4" gutterBottom>
            Pin Login
          </Typography>

          <PinLogin
            onPinSubmit={onPinSubmit}
            errorMessage={status === 'error' ? pinLoginError : undefined}
          />
        </Grid>
      )}
    </Grid>
  );
};

export default LoginPage;
