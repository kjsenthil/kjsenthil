import React from 'react';
import { navigate } from 'gatsby';
import { isXplanLoggedInSession } from '../../../services/xplanAuth/xplanAuth';

const XplanPrivateRoute = ({ Component, location, ...rest }: any) => {
  if (!isXplanLoggedInSession() && location.pathname !== '/gmvp/xplogin') {
    navigate('/gmvp/xplogin');
    return null;
  }

  return <Component {...rest} />;
};

export default XplanPrivateRoute;
