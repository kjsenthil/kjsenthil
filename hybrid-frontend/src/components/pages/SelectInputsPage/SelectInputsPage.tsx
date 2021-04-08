import { navigate } from 'gatsby';
import React from 'react';
import { Grid, Card, CardContent, Typography } from '../../atoms';
import { CaptureGoal } from '../../organisms';
import { MyAccountLayout } from '../../templates';

const SelectInputsPage = () => (
  <MyAccountLayout stretch>
    <Grid item xs={12} sm={6}>
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
  </MyAccountLayout>
);

export default SelectInputsPage;
