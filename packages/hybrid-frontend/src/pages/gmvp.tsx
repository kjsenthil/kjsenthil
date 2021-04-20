import React, { useEffect } from 'react';
import { Router, useLocation } from '@reach/router';
import LoginPage from './login';
import PrivateRoute from '../components/pages/PrivateRoute/PrivateRoute';
import SelectAccountsPage from '../components/pages/SelectAccountsPage/SelectAccountsPage';
import SelectGoalsPage from '../components/pages/SelectGoalsPage/SelectGoalsPage';
import SelectInputsPage from '../components/pages/SelectInputsPage/SelectInputsPage';
import SimulationPage from '../components/pages/SimulationPage/SimulationPage';
import { trackPageView } from '../services/tracking';

const App = () => {
  const location = useLocation();

  useEffect(() => {
    trackPageView(location.pathname);
  }, [location]);

  return (
    <Router basepath="/gmvp">
      <LoginPage path="/login" />
      <PrivateRoute path="/accounts" Component={SelectAccountsPage} />
      <PrivateRoute path="/goals" Component={SelectGoalsPage} />
      <PrivateRoute path="/inputs" Component={SelectInputsPage} />
      <PrivateRoute path="/sim" Component={SimulationPage} />
    </Router>
  );
};

export default App;
