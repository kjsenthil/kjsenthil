import React, { useEffect } from 'react';
import { Router, useLocation } from '@reach/router';
import { trackPageView } from '@tsw/tracking-util';
import LoginPage from './login';
import XplanLoginPage from './xplogin';
import { PrivateRoute } from '../components/particles';
import SelectAccountsPage from '../components/pages/SelectAccountsPage/SelectAccountsPage';
import SelectGoalsPage from '../components/pages/SelectGoalsPage/SelectGoalsPage';
import SelectInputsPage from '../components/pages/SelectInputsPage/SelectInputsPage';
import SimulationPage from '../components/pages/SimulationPage/SimulationPage';
import DashPage from '../components/pages/DashPage/DashPage';

const MyAccount = () => {
  const location = useLocation();

  useEffect(() => {
    trackPageView(location.pathname);
  }, [location]);

  return (
    <Router basepath="/my-account">
      <LoginPage path="/login" />
      <XplanLoginPage path="/xplogin" />
      <PrivateRoute path="/dash" Component={DashPage} />
      <PrivateRoute authType="XPLAN" path="/accounts" Component={SelectAccountsPage} />
      <PrivateRoute authType="XPLAN" path="/goals" Component={SelectGoalsPage} />
      <PrivateRoute authType="XPLAN" path="/inputs" Component={SelectInputsPage} />
      <PrivateRoute authType="XPLAN" path="/sim" Component={SimulationPage} />
    </Router>
  );
};

export default MyAccount;
