import React, { useEffect } from 'react';
import { Router, useLocation } from '@reach/router';
import { trackPageView } from '@tsw/tracking-util';
import { PrivateRoute } from '../components/particles';
import NotFoundPage from '../components/pages/NotFoundPage';
import LoginPage from '../components/pages/LoginPage';
import HomePage from '../components/pages/HomePage';
import TargetAmountsPage from '../components/pages/TargetAmountsPage';
import TargetDatePage from '../components/pages/TargetDatePage';
import UpfrontContributionPage from '../components/pages/UpfrontContributionPage';
import SelectGoalsPage from '../components/pages/SelectGoalsPage';
import BIAccountsPage from '../components/pages/BIAccountsPage';
import LifePlanPage from '../components/pages/LifePlanPage';
import LifePlanManagementPage from '../components/pages/LifePlanManagementPage';

const MyAccount = () => {
  const location = useLocation();

  useEffect(() => {
    trackPageView(location.pathname);
  }, [location]);

  return (
    <Router basepath="/my-account">
      <LoginPage path="/login" />
      <PrivateRoute path="/accounts" Component={BIAccountsPage} />
      <PrivateRoute path="/" Component={HomePage} />
      <PrivateRoute path="/goals" Component={SelectGoalsPage} />
      <PrivateRoute path="/life-plan" Component={LifePlanPage} />
      <PrivateRoute path="/target-amount" Component={TargetAmountsPage} />
      <PrivateRoute path="/target-date" Component={TargetDatePage} />
      <PrivateRoute path="/upfront-investment" Component={UpfrontContributionPage} />
      <PrivateRoute path="/life-plan-management" Component={LifePlanManagementPage} />
      <NotFoundPage default />
    </Router>
  );
};

export default MyAccount;
