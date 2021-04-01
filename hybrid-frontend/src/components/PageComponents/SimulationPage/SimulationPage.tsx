import { Grid, Typography } from '@material-ui/core';
import { Link } from 'gatsby';
import React, { useState } from 'react';
import { getProjections, ProjectionResponse } from '../../../api/getProjection';
import HeaderMenu from '../../HeaderMenu';
import ProjectionsChart from '../../ProjectionsChart';
import ProjectionsGrid from '../../ProjectionsGrid';
import SimulationForm from '../../SimulationForm';
import { SimulationFormData } from '../../SimulationForm/SimulationForm';

const SimulationPage = () => {
  const [projections, setProjections] = useState<ProjectionResponse | undefined>(undefined);

  const onFormSubmit = async (formValues: SimulationFormData) => {
    const projectionsResponse = await getProjections(formValues);
    setProjections(projectionsResponse);
  };

  return (
    <>
      <HeaderMenu />

      <Typography variant="h2" gutterBottom>
        SimulationPage
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

      <Link to="/gmvp/inputs">Back to Inputs</Link>
      <Link to="/gmvp/login">Back to Login</Link>
    </>
  );
};

export default SimulationPage;
