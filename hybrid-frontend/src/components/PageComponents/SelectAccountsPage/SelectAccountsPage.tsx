import { Grid } from '@material-ui/core';
import { navigate } from 'gatsby';
import React from 'react';
import AccountTypeSelection from '../../AccountTypeSelection';
import HeaderMenu from '../../HeaderMenu';

const SelectAccountsPage = () => (
  <>
    <HeaderMenu />

    <Grid container justify="center">
      <Grid item xs={6}>
        <AccountTypeSelection onSubmit={() => navigate('/gmvp/goals')} />
      </Grid>
    </Grid>
  </>
);

export default SelectAccountsPage;
