import React, { useEffect, ComponentType } from 'react';
import { Redirect, RouteComponentProps } from '@reach/router';
import { useSelector, useDispatch } from 'react-redux';
import { AuthType, isLoggedInSession } from '../../../services/auth';
import { RootState } from '../../../store';
import { refreshToken } from '../../../services/auth/reducers';

interface PrivateRouteProps extends RouteComponentProps {
  Component: ComponentType<RouteComponentProps>;
  authType?: AuthType;
}

const PrivateRoute = ({ Component, authType = 'MY_ACCOUNT', ...rest }: PrivateRouteProps) => {
  const { isPinLoggedIn, isXplanLoggedIn, shouldRefreshTokens } = useSelector(
    (state: RootState) => state.auth
  );

  const dispatch = useDispatch();

  const loginPath = authType === 'MY_ACCOUNT' ? '/my-account/login' : '/my-account/xplogin';

  const hasNoLogginSession = !isLoggedInSession(authType);

  useEffect(() => {
    if (shouldRefreshTokens) {
      dispatch(refreshToken());
    }
  }, [shouldRefreshTokens]);

  const hasNotLoggedIn =
    (authType === 'MY_ACCOUNT' && !isPinLoggedIn) || (authType === 'XPLAN' && !isXplanLoggedIn);

  if ((hasNoLogginSession || hasNotLoggedIn) && rest.location?.pathname !== loginPath) {
    return <Redirect to={loginPath} />;
  }

  return <Component {...rest} />;
};

export default PrivateRoute;
