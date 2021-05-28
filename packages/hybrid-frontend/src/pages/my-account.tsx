import React, { useEffect } from 'react';
import { Router, useLocation } from '@reach/router';
import { trackPageView } from '@tsw/tracking-util';
import LoginPage from '../components/pages/LoginPage/LoginPage';
import { PrivateRoute } from '../components/particles';
import SimulationPage from '../components/pages/SimulationPage/SimulationPage';
import DashPage from '../components/pages/DashPage/DashPage';
import TargetAmountsPage from '../components/pages/TargetAmountsPage/TargetAmountsPage';
import TargetDatePage from '../components/pages/TargetDatePage/TargetDatePage';
import UpfrontContributionPage from '../components/pages/UpfrontContributionPage/UpfrontContributionPage';
import SelectGoalsPage from '../components/pages/SelectGoalsPage/SelectGoalsPage';
import BIAccountsPage from '../components/pages/BIAccountsPage/BIAccountsPage';

const MyAccount = () => {
  const location = useLocation();

  useEffect(() => {
    trackPageView(location.pathname);
  }, [location]);

  return (
    <Router basepath="/my-account">
      <LoginPage path="/login" />
      <PrivateRoute path="/accounts" Component={BIAccountsPage} />
      <PrivateRoute path="/dash" Component={DashPage} />
      <PrivateRoute path="/goals" Component={SelectGoalsPage} />
      <PrivateRoute path="/target-amount" Component={TargetAmountsPage} />
      <PrivateRoute path="/target-date" Component={TargetDatePage} />
      <PrivateRoute path="/upfront-investment" Component={UpfrontContributionPage} />
      <PrivateRoute path="/sim" Component={SimulationPage} />
    </Router>
  );
};

export default MyAccount;
