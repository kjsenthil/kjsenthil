import React, { useEffect } from 'react';
import { Router, useLocation } from '@reach/router';
import { trackPageView } from '@tsw/tracking-util';
import { PrivateRoute } from '../components/particles';
import NotFoundPage from '../components/pages/NotFoundPage';
import LoginPage from '../components/pages/LoginPage';
import LogoutPage from '../components/pages/LogoutPage';
import BIAccountsPage from '../components/pages/BIAccountsPage';
import LifePlanPage from '../components/pages/LifePlanPage';
import LifePlanManagementPage from '../components/pages/LifePlanManagementPage';
import AddCashPage from '../components/pages/AddCashPage';
import { useFeatureFlagToggle } from '../hooks';
import { FeatureFlagNames } from '../constants';
import { NavPaths } from '../config/paths';

const MyAccount = () => {
  const location = useLocation();

  useEffect(() => {
    trackPageView(location.pathname);
  }, [location]);

  const experimentalFeature = useFeatureFlagToggle(FeatureFlagNames.EXP_FEATURE);
  const experimentalFeatureEnabled = !!experimentalFeature?.isEnabled;

  const getBasePath = (path: NavPaths) => path.replace(NavPaths.ROOT_PAGE, '');

  return (
    <Router basepath={NavPaths.ROOT_PAGE}>
      <LoginPage path={getBasePath(NavPaths.LOGIN_PAGE)} />
      <LogoutPage path={getBasePath(NavPaths.LOGOUT_PAGE)} />

      <PrivateRoute path={getBasePath(NavPaths.HOME_PAGE)} Component={BIAccountsPage} />
      <PrivateRoute path={getBasePath(NavPaths.ACCOUNTS_PAGE)} Component={BIAccountsPage} />
      <PrivateRoute path={getBasePath(NavPaths.LIFE_PLAN_PAGE)} Component={LifePlanPage} />
      <PrivateRoute
        path={`${getBasePath(NavPaths.LIFE_PLAN_MANAGEMENT)}/*`}
        Component={LifePlanManagementPage}
      />
      {experimentalFeatureEnabled && (
        <PrivateRoute path={getBasePath(NavPaths.ADD_CASH_PAGE)} Component={AddCashPage} />
      )}
      <NotFoundPage default />
    </Router>
  );
};

export default MyAccount;
