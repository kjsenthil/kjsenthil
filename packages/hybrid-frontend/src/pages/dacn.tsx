import React, { useEffect } from 'react';
import { Router, useLocation } from '@reach/router';
import { trackPageView } from '@tsw/tracking-util';
import LoginPage from './login';
import DashPage from '../components/pages/DashPage/DashPage';
import PrivateRoute from '../components/pages/PrivateRoute/PrivateRoute';

const DACN = () => {
  const location = useLocation();

  useEffect(() => {
    trackPageView(location.pathname);
  }, [location]);

  return (
    <Router basepath="/dacn">
      <LoginPage path="/login" />
      <PrivateRoute path="/dash" Component={DashPage} />
    </Router>
  );
};

export default DACN;
