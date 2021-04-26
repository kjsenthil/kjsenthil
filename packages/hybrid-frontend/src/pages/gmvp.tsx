import React, { useEffect } from 'react';
import { Router, useLocation } from '@reach/router';
import { trackPageView } from '@tsw/tracking-util';
import XplanLoginPage from './xplogin';
import XplanPrivateRoute from '../components/pages/XplanPrivateRoute/XplanPrivateRoute';
import SelectAccountsPage from '../components/pages/SelectAccountsPage/SelectAccountsPage';
import SelectGoalsPage from '../components/pages/SelectGoalsPage/SelectGoalsPage';
import SelectInputsPage from '../components/pages/SelectInputsPage/SelectInputsPage';
import SimulationPage from '../components/pages/SimulationPage/SimulationPage';

const GMVP = () => {
  const location = useLocation();

  useEffect(() => {
    trackPageView(location.pathname);
  }, [location]);

  return (
    <Router basepath="/gmvp">
      <XplanLoginPage path="/xplogin" />
      <XplanPrivateRoute path="/accounts" Component={SelectAccountsPage} />
      <XplanPrivateRoute path="/goals" Component={SelectGoalsPage} />
      <XplanPrivateRoute path="/inputs" Component={SelectInputsPage} />
      <XplanPrivateRoute path="/sim" Component={SimulationPage} />
    </Router>
  );
};

export default GMVP;
