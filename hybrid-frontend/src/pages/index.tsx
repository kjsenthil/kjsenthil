import React, { useState } from 'react';
import { Link } from 'gatsby';

import { Grid, makeStyles } from '@material-ui/core';
import HeaderMenu from '../components/HeaderMenu';
import HomeFeatureCards from '../components/HomeFeatureCards';
import SimulationForm, { SimulationFormData } from '../components/SimulationForm/SimulationForm';
import { getProjections, ProjectionResponse } from '../api/getProjection';
import ProjectionsChart from '../components/ProjectionsChart';
import ProjectionsGrid from '../components/ProjectionsGrid';
import LoginForm from '../components/LoginForm';
import { LoginFormData } from '../components/LoginForm/LoginForm';
import login from '../api/postLogin';

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
  const [loginMessages, setLoginMessages] = useState<{
    error: string;
    success: string;
  }>({
    error: '',
    success: '',
  });

  const onFormSubmit = async (formValues: SimulationFormData) => {
    const projectionsResponse = await getProjections(formValues);
    setProjections(projectionsResponse);
  };

  const onLoginFormSubmit = async (loginFormValues: LoginFormData) => {
    try {
      await login(loginFormValues);
      setLoginMessages({
        error: '',
        success: 'Log in successful',
      });
    } catch (e) {
      setLoginMessages({
        error: e.message,
        success: '',
      });
    }
  };

  return (
    <>
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
          <LoginForm
            errorMessage={loginMessages.error}
            onSubmit={onLoginFormSubmit}
            successMessage={loginMessages.success}
          />
          <SimulationForm onSubmit={onFormSubmit} />
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <HomeFeatureCards />
      </Grid>
      <Grid item xs={12}>
        <Link to="/gmvp/login">Goto GMVP</Link>
      </Grid>
    </>
  );
};

export default IndexPage;
