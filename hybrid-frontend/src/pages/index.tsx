import React, { useState } from 'react';
import { Grid, makeStyles, Typography } from '@material-ui/core';
import Layout from '../components/Layout';
import HeaderMenu from '../components/HeaderMenu';
import HomeFeatureCards from '../components/HomeFeatureCards';
import SimulationForm, { SimulationFormData } from '../components/SimulationForm/SimulationForm';
import { getProjections, ProjectionResponse } from '../api/getProjection';
import ProjectionsChart from '../components/ProjectionsChart/ProjectionsChart';

const useStyles = makeStyles(() => ({
  gridItem: {
    margin: '2rem 0',
  },
}));

const IndexPage = () => {
  const classes = useStyles();
  const [projections, setProjections] = useState<ProjectionResponse | undefined>(undefined);

  const onFormSubmit = async (formValues: SimulationFormData) => {
    const projectionsResponse = await getProjections(formValues);
    setProjections(projectionsResponse);
  };

  return (
    <Layout>
      <HeaderMenu />
      <Grid container spacing={3}>
        <Grid className={classes.gridItem} item xs={12} sm={8}>
          <Typography>Stocks &amp; Shares ISA</Typography>
          <Typography gutterBottom>Bring tomorrow forwards</Typography>
          {projections && <ProjectionsChart projections={projections.projections} />}
        </Grid>
        <Grid className={classes.gridItem} item xs={12} sm={4}>
          <SimulationForm onSubmit={onFormSubmit} />
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <HomeFeatureCards />
      </Grid>
    </Layout>
  );
};

export default IndexPage;
