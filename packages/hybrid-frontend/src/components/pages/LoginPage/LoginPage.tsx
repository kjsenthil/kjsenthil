import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { navigate } from 'gatsby';
import styled from 'styled-components';
import {
  Grid,
  Button,
  Icon,
  LoginForm,
  LoginFormData,
  PinLoginItem,
  PinLogin,
} from '@tswdts/react-components';
import Cookies from 'js-cookie';
import { credLogin, pinLogin } from '../../../services/auth';
import { RootState } from '../../../store';
import { LayoutContainer } from '../../templates';
import { NavPaths } from '../../../config/paths';
import { ApiAppName } from '../../../constants';

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

  const myAccountsAccessToken = Cookies.get(ApiAppName.myAccounts);
  const hasAccessTokens = accessTokens.length > 0 || myAccountsAccessToken;

  useEffect(() => {
    if (hasAccessTokens) {
      navigate(NavPaths.MY_ACCOUNT_BASE_URL);
    } else {
      navigate(NavPaths.ROOT_PAGE);
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
      <LoginGrid container justifyContent="center" alignItems="center" spacing={7}>
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
          <Grid container justifyContent="center">
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
