import React from 'react';
import { Grid, makeStyles, Typography } from '@material-ui/core';
import Layout from '../components/Layout';
import HeaderMenu from '../components/HeaderMenu';
import HomeFeatureCards from '../components/HomeFeatureCards';
import SimulationForm from '../components/SimulationForm/SimulationForm';

const useStyles = makeStyles(() => ({
  gridItem: {
    margin: '2rem 0',
  },
}));

const IndexPage = () => {
  const classes = useStyles();

  return (
    <Layout>
      <HeaderMenu />
      <Grid container spacing={3}>
        <Grid className={classes.gridItem} item xs={12} sm={8}>
          <Typography>Stocks &amp; Shares ISA</Typography>
          <Typography>Bring tomorrow forwards</Typography>
        </Grid>
        <Grid className={classes.gridItem} item xs={12} sm={4}>
          <SimulationForm />
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <HomeFeatureCards />
      </Grid>
    </Layout>
  );
};

export default IndexPage;
