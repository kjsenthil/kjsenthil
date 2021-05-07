import React, { useEffect } from 'react';
import { Router, useLocation } from '@reach/router';
import { trackPageView } from '@tsw/tracking-util';
import LoginPage from './login';
import XplanLoginPage from './xplogin';
import { PrivateRoute } from '../components/particles';
import SimulationPage from '../components/pages/SimulationPage/SimulationPage';
import DashPage from '../components/pages/DashPage/DashPage';
import TargetAmountsPage from '../components/pages/TargetAmountsPage/TargetAmountsPage';
import TargetDatePage from '../components/pages/TargetDatePage/TargetDatePage';
import UpfrontContributionPage from '../components/pages/UpfrontContributionPage/UpfrontContributionPage';
import SelectGoalsPage from '../components/pages/SelectGoalsPage/SelectGoalsPage';

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
      <PrivateRoute authType="XPLAN" path="/goals" Component={SelectGoalsPage} />
      <PrivateRoute authType="XPLAN" path="/targetamount" Component={TargetAmountsPage} />
      <PrivateRoute authType="XPLAN" path="/targetdate" Component={TargetDatePage} />
      <PrivateRoute authType="XPLAN" path="/upfront" Component={UpfrontContributionPage} />
      <PrivateRoute authType="XPLAN" path="/sim" Component={SimulationPage} />
    </Router>
  );
};

export default MyAccount;
