import { Grid } from '@material-ui/core';
import { navigate } from 'gatsby';
import React from 'react';
import GoalSelection from '../../GoalSelection';
import HeaderMenu from '../../HeaderMenu';

const SelectGoalsPage = () => (
  <>
    <HeaderMenu />

    <Grid container justify="center">
      <Grid item>
        <GoalSelection onSubmit={() => navigate('/gmvp/inputs')} />
      </Grid>
    </Grid>
  </>
);

export default SelectGoalsPage;
