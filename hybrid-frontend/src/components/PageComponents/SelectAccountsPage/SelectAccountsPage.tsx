import { Typography } from '@material-ui/core';
import { Link } from 'gatsby';
import React from 'react';
import HeaderMenu from '../../HeaderMenu';

const SelectAccountsPage = () => (
  <>
    <HeaderMenu />

    <Typography variant="h2" gutterBottom>
      SelectAccountsPage
    </Typography>

    <Link to="/gmvp/login">Back to Login</Link>

    <Link to="/gmvp/goals">Goto Goal</Link>
  </>
);

export default SelectAccountsPage;
