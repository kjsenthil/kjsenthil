import { navigate } from 'gatsby';
import React from 'react';
import { Typography } from '../../atoms';
import { AccountTypeSelection } from '../../organisms';
import { MyAccountLayout } from '../../templates';

const SelectAccountsPage = () => (
  <MyAccountLayout>
    <Typography variant="h1">Select an account type</Typography>
    <AccountTypeSelection onSubmit={() => navigate('/my-account/goals')} />
  </MyAccountLayout>
);

export default SelectAccountsPage;
