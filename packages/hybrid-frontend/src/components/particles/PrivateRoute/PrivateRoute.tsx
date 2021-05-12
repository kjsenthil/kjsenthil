import React, { useEffect, ComponentType } from 'react';
import { navigate } from 'gatsby';
import { RouteComponentProps } from '@reach/router';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';

interface PrivateRouteProps extends RouteComponentProps {
  Component: ComponentType<RouteComponentProps>;
  authType?: 'XPLAN' | 'MY_ACCOUNT';
}

const PrivateRoute = ({ Component, authType = 'MY_ACCOUNT', ...rest }: PrivateRouteProps) => {
  const { isPinLoggedIn, isXplanLoggedIn } = useSelector((state: RootState) => state.auth);

  const loginPath = authType === 'MY_ACCOUNT' ? '/my-account/login' : '/my-account/xplogin';

  const isNotLoggedIn =
    (authType === 'MY_ACCOUNT' && !isPinLoggedIn) || (authType === 'XPLAN' && !isXplanLoggedIn);

  useEffect(() => {
    /* eslint-disable-next-line no-console */
    if (isNotLoggedIn && rest.location?.pathname !== loginPath) {
      navigate(loginPath);
    }
  }, [isNotLoggedIn]);

  return <Component {...rest} />;
};

export default PrivateRoute;
