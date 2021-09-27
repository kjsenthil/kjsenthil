import React, { useEffect } from 'react';
import { inspect } from '@xstate/inspect';
import { Router, useLocation } from '@reach/router';
import { trackPageView } from '@tsw/tracking-util';
import { IS_PRODUCTION, INSPECT_XSTATE, NavPaths } from '../config';
import { PrivateRoute } from '../components/particles';
import NotFoundPage from '../components/pages/NotFoundPage';
import LogoutPage from '../components/pages/LogoutPage';
import BIAccountsPage from '../components/pages/BIAccountsPage';
import LifePlanPageV1 from '../components/pages/LifePlanPageV1';
import LifePlanManagementPage from '../components/pages/LifePlanManagementPage';
import AddCashPage from '../components/pages/AddCashPage';
import ShareDealingPage from '../components/pages/ShareDealingPage';
import WithDrawCashPage from '../components/pages/WithDrawCashPage';
import { useFeatureFlagToggle } from '../hooks';
import { FeatureFlagNames } from '../constants';
import LifePlanPage from '../components/pages/LifePlanPage';

if (typeof window !== 'undefined' && !IS_PRODUCTION && INSPECT_XSTATE) {
  inspect({
    iframe: false,
  });
}

const MyAccount = () => {
  const location = useLocation();

  useEffect(() => {
    trackPageView(location.pathname);
  }, [location]);

  const experimentalFeature = useFeatureFlagToggle(FeatureFlagNames.EXP_FEATURE);
  const experimentalFeatureEnabled = !!experimentalFeature?.isEnabled;

  const getBasePath = (path: NavPaths) => path.replace(NavPaths.MY_ACCOUNT_BASE_URL, '');

  return (
    <Router basepath={NavPaths.MY_ACCOUNT_BASE_URL}>
      <LogoutPage path={getBasePath(NavPaths.LOGOUT_PAGE)} />
      <PrivateRoute path="/" Component={BIAccountsPage} />
      <PrivateRoute
        path={`${getBasePath(NavPaths.SHARE_DEALING_PAGE)}/:orderType/:accountId/:isin`}
        Component={ShareDealingPage}
      />
      {experimentalFeatureEnabled ? (
        <PrivateRoute path={getBasePath(NavPaths.LIFE_PLAN_PAGE)} Component={LifePlanPage} />
      ) : (
        <PrivateRoute path={getBasePath(NavPaths.LIFE_PLAN_PAGE)} Component={LifePlanPageV1} />
      )}
      <PrivateRoute
        path={`${getBasePath(NavPaths.LIFE_PLAN_MANAGEMENT)}/*`}
        Component={LifePlanManagementPage}
      />
      {experimentalFeatureEnabled && (
        <>
          <PrivateRoute path={getBasePath(NavPaths.ADD_CASH_PAGE)} Component={AddCashPage} />
          <PrivateRoute
            path={getBasePath(NavPaths.WITHDRAW_CASH_PAGE)}
            Component={WithDrawCashPage}
          />
        </>
      )}
      <NotFoundPage default />
    </Router>
  );
};

export default MyAccount;
