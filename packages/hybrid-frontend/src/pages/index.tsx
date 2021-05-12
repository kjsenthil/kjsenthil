import React, { useState, useEffect } from 'react';
import { navigate, Link } from 'gatsby';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { Grid, Spacer } from '../components/atoms';
import {
  HomeFeatureCards,
  LoginForm,
  ProjectionsGrid,
  ProjectionsChart,
  SimulationForm,
} from '../components/organisms';
import getProjections from '../api/getProjection';

import { MyAccountLayout } from '../components/templates';
import { ProjectionResponse, CustomProjectionRequestData } from '../types';
import { LoginFormData } from '../services/auth';
import { xplanLogin } from '../services/auth/reducers/authSlice';
import { RootState } from '../store';

const Container = styled((props) => <Grid container spacing={3} {...props} />)`
  padding: 16px;
`;

const IndexPage = () => {
  const { isXplanLoggedIn, xplanLoginError } = useSelector((state: RootState) => state.auth);

  const dispatch = useDispatch();

  const [projections, setProjections] = useState<ProjectionResponse | undefined>(undefined);

  const onFormSubmit = async (formValues: CustomProjectionRequestData): Promise<void> => {
    const projectionsResponse = await getProjections(formValues);
    setProjections(projectionsResponse);
  };

  const onLoginFormSubmit = async (loginFormValues: LoginFormData) => {
    dispatch(xplanLogin(loginFormValues));
  };

  useEffect(() => {
    if (isXplanLoggedIn) {
      navigate('/my-account/goals');
    }
  }, [isXplanLoggedIn]);

  return (
    <MyAccountLayout stretch>
      <Container>
        <Grid item xs={12} sm={8}>
          {projections && (
            <>
              <Spacer y={2} />
              <ProjectionsGrid projections={projections.projections} />
              <ProjectionsChart projections={projections.projections} />
            </>
          )}
        </Grid>
        <Grid item xs={12} sm={4}>
          <LoginForm onSubmit={onLoginFormSubmit} errorMessage={xplanLoginError} title="Login" />
          <Spacer y={4} />
          <SimulationForm onSubmit={onFormSubmit} />
        </Grid>
      </Container>
      <Grid item xs={12}>
        <HomeFeatureCards />
      </Grid>

      <Grid item xs={12}>
        <Link to="/my-account/xplogin">Goto XPlan Login</Link>
      </Grid>

      <Spacer y={4} />

      <Grid item xs={12}>
        <Link to="/my-account/login">Goto Login</Link>
      </Grid>
    </MyAccountLayout>
  );
};

export default IndexPage;
