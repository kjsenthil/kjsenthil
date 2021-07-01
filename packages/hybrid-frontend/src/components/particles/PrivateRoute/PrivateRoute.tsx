import React, { useEffect, ComponentType } from 'react';
import { navigate } from 'gatsby';
import { RouteComponentProps } from '@reach/router';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { NavPaths } from '../../../config/paths';

interface PrivateRouteProps extends RouteComponentProps {
  Component: ComponentType<RouteComponentProps>;
}

const PrivateRoute = ({ Component, ...rest }: PrivateRouteProps) => {
  const { accessTokens } = useSelector((state: RootState) => state.auth);

  const loginPath = NavPaths.LOGIN_PAGE;
  const isNotLoggedIn = accessTokens.length === 0;

  useEffect(() => {
    /* eslint-disable-next-line no-console */
    if (isNotLoggedIn && rest.location?.pathname !== loginPath) {
      navigate(loginPath);
    }
  }, [isNotLoggedIn]);

  return <Component {...rest} />;
};

export default PrivateRoute;
