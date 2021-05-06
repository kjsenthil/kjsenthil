import { navigate } from 'gatsby';
import React from 'react';
import { AccountTypeSelection } from '../../organisms';
import { MyAccountLayout } from '../../templates';

const SelectAccountsPage = () => (
  <MyAccountLayout pageTitle="Select an account type">
    <AccountTypeSelection onSubmit={() => navigate('/my-account/goals')} />
  </MyAccountLayout>
);

export default SelectAccountsPage;
