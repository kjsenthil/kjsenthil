import { Card, CardContent, Grid, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { getProjections, ProjectionResponse } from '../../../api/getProjection';
import useGlobalContext from '../../../hooks/GlobalContextHooks/useGlobalContext';
import {
  HeaderMenu,
  ProjectionsChart,
  ProjectionsGrid,
  SimulationForm,
  SimulationFormData,
} from '../../organisms';

const SimulationPage = () => {
  const { goalCapture } = useGlobalContext();

  const [projections, setProjections] = useState<ProjectionResponse | undefined>(undefined);

  const onFormSubmit = async (formValues: SimulationFormData) => {
    const projectionsResponse = await getProjections(formValues);
    setProjections(projectionsResponse);
  };

  useEffect(() => {
    /* eslint-disable-next-line no-console */
    console.log('Captured goal inputs in state', goalCapture);
  }, [goalCapture]);

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
              <SimulationForm onSubmit={onFormSubmit} />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
};

export default SimulationPage;
