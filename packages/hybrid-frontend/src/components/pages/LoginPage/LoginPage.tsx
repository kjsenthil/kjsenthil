import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { navigate } from 'gatsby';
import styled from 'styled-components';
import { Grid, Button, Icon } from '../../atoms';
import { LoginForm } from '../../organisms';
import PinLogin from '../../organisms/PinLogin';
import { LoginFormData, PinLoginItem, credLogin, pinLogin } from '../../../services/auth';
import { RootState } from '../../../store';
import { LayoutContainer } from '../../templates';
import { NavPaths } from '../../../config/paths';

export const LoginGrid = styled(Grid)`
  padding-top: 10rem;
`;

interface LoginPageProps {
  path?: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const LoginPage = (_: LoginPageProps) => {
  const {
    status,
    isCredLoggedIn,
    accessTokens,
    twoStepAuthCode,
    credLoginError,
    pinLoginError,
  } = useSelector((state: RootState) => state.auth);

  const hasAccessTokens = accessTokens.length > 0;

  useEffect(() => {
    if (hasAccessTokens) {
      navigate(NavPaths.HOME_PAGE);
    }
  }, [hasAccessTokens]);

  const dispatch = useDispatch();

  const onLoginFormSubmit = async (loginFormValues: LoginFormData) => {
    dispatch(credLogin(loginFormValues));
  };

  const onPinSubmit = async (pinFormValues: PinLoginItem[]) => {
    dispatch(pinLogin(pinFormValues));
  };

  return !hasAccessTokens ? (
    <LayoutContainer maxWidth={false} disableGutters>
      <LoginGrid container justify="center" alignItems="center" spacing={7}>
        <Grid item xs={12}>
          <LoginForm
            onSubmit={onLoginFormSubmit}
            errorMessage={
              status === 'error' && credLoginError ? 'Incorrect username or password' : undefined
            }
            successMessage={status === 'success' && isCredLoggedIn ? 'Success' : undefined}
          />
        </Grid>

        {twoStepAuthCode && (
          <Grid item xs={12}>
            <PinLogin
              onPinSubmit={onPinSubmit}
              errorMessage={
                status === 'error' && pinLoginError ? 'Incorrect pin digits' : undefined
              }
            />
          </Grid>
        )}

        <Grid item>
          <Grid container justify="center">
            <Button
              color="primary"
              startIcon={<Icon name="arrowHeadLeft" fontSize="large" />}
              variant={undefined}
            >
              Back to Bestinvest
            </Button>
          </Grid>
        </Grid>
      </LoginGrid>
    </LayoutContainer>
  ) : null; // TODO: display loading?
};

export default LoginPage;
