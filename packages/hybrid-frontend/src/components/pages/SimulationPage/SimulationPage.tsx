import React, { useState } from 'react';
import { Card, CardContent, Grid, Typography } from '../../atoms';
import getProjections from '../../../api/getProjection';
import useGlobalContext from '../../../hooks/GlobalContextHooks/useGlobalContext';
import { HeaderMenu, ProjectionsChart, ProjectionsGrid, SimulationForm } from '../../organisms';
import { ProjectionResponse, CustomProjectionRequestData } from '../../../types';

const SimulationPage = () => {
  const { goalCapture } = useGlobalContext();

  const [projections, setProjections] = useState<ProjectionResponse | undefined>(undefined);

  const onFormSubmit = async (formValues: CustomProjectionRequestData) => {
    const projectionsResponse = await getProjections(formValues);
    setProjections(projectionsResponse);
  };

  const goalValsFromState = {
    monthlyInvestment: goalCapture.monthlyInvestment,
    upfrontInvestment: goalCapture.upfrontInvestment,
    investmentPeriod: 30,
  };

  return (
    <>
      <HeaderMenu />

      <Card>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            Simulation Page
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12} sm={8}>
              {projections && (
                <>
                  <ProjectionsGrid projections={projections.projections} />
                  <ProjectionsChart projections={projections.projections} />
                </>
              )}
            </Grid>
            <Grid item xs={12} sm={4}>
              <SimulationForm onSubmit={onFormSubmit} projInputStateVals={goalValsFromState} />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
};

export default SimulationPage;
