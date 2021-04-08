import React from 'react';
import { navigate } from 'gatsby';
import { isLoggedInSession } from '../../../services/auth';

const PrivateRoute = ({ Component, location, ...rest }: any) => {
  if (!isLoggedInSession() && location.pathname !== '/gmvp/login') {
    navigate('/gmvp/login');
    return null;
  }

  return <Component {...rest} />;
};

export default PrivateRoute;
