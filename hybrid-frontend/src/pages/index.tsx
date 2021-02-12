import React, { useState } from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import Layout from '../components/Layout';
import HeaderMenu from '../components/HeaderMenu';
import HomeFeatureCards from '../components/HomeFeatureCards';
import SimulationForm, { SimulationFormData } from '../components/SimulationForm/SimulationForm';
import { getProjections, ProjectionResponse } from '../api/getProjection';
import ProjectionsChart from '../components/ProjectionsChart';
import ProjectionsGrid from '../components/ProjectionsGrid';

const useStyles = makeStyles(() => ({
  gridContainer: {
    marginBottom: '2rem',
  },
  leftGridItem: {
    paddingLeft: '36px !important',
    paddingRight: '36px !important',
  },
  rightGridItem: {
    paddingRight: '36px !important',
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
      <Grid container spacing={3} className={classes.gridContainer}>
        <Grid className={classes.leftGridItem} item xs={12} sm={8}>
          {projections && (
            <>
              <ProjectionsGrid projections={projections.projections} />
              <ProjectionsChart projections={projections.projections} />
            </>
          )}
        </Grid>
        <Grid className={classes.rightGridItem} item xs={12} sm={4}>
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
