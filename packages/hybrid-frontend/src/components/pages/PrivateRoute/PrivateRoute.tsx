import React from 'react';
import { navigate } from 'gatsby';
import { isLoggedInSession } from '../../../services/auth/auth';

const PrivateRoute = ({ Component, location, ...rest }: any) => {
  if (!isLoggedInSession() && location.pathname !== '/dacn/login') {
    navigate('/dacn/login');
    return null;
  }

  return <Component {...rest} />;
};

export default PrivateRoute;
