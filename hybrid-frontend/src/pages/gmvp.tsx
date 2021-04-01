import React from 'react';
import { Router } from '@reach/router';
import LoginPage from './login';
import PrivateRoute from '../components/PageComponents/PrivateRoute';
import SelectAccountsPage from '../components/PageComponents/SelectAccountsPage/SelectAccountsPage';
import SelectGoalsPage from '../components/PageComponents/SelectGoalsPage/SelectGoalsPage';
import SelectInputsPage from '../components/PageComponents/SelectInputsPage/SelectInputsPage';
import SimulationPage from '../components/PageComponents/SimulationPage/SimulationPage';

const App = () => (
  <Router basepath="/gmvp">
    <LoginPage path="/login" />
    <PrivateRoute path="/accounts" Component={SelectAccountsPage} />
    <PrivateRoute path="/goals" Component={SelectGoalsPage} />
    <PrivateRoute path="/inputs" Component={SelectInputsPage} />
    <PrivateRoute path="/sim" Component={SimulationPage} />
  </Router>
);
export default App;
