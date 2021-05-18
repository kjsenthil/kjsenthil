import React, { useEffect, ComponentType } from 'react';
import { navigate } from 'gatsby';
import { RouteComponentProps } from '@reach/router';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';

interface PrivateRouteProps extends RouteComponentProps {
  Component: ComponentType<RouteComponentProps>;
}

const PrivateRoute = ({ Component, ...rest }: PrivateRouteProps) => {
  const { isPinLoggedIn: isLoggedIn } = useSelector((state: RootState) => state.auth);

  const loginPath = '/my-account/login';
  const isNotLoggedIn = !isLoggedIn;

  useEffect(() => {
    /* eslint-disable-next-line no-console */
    if (isNotLoggedIn && rest.location?.pathname !== loginPath) {
      navigate(loginPath);
    }
  }, [isNotLoggedIn]);

  return <Component {...rest} />;
};

export default PrivateRoute;
