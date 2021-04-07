import { Card, CardContent, Grid, Typography } from '@material-ui/core';
import { navigate } from 'gatsby';
import React from 'react';
import CaptureGoal from '../../CaptureGoal/CaptureGoal';
import HeaderMenu from '../../HeaderMenu';

const SelectInputsPage = () => (
  <>
    <HeaderMenu />
    <Grid container justify="center">
      <Typography variant="h4" gutterBottom>
        Inputs Page
      </Typography>

      <Grid item>
        <Card>
          <CardContent>
            <CaptureGoal onSubmit={() => navigate('/gmvp/sim')} />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  </>
);

export default SelectInputsPage;
