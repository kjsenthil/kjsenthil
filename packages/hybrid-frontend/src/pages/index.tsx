import React, { useState } from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import { Grid, Spacer } from '../components/atoms';
import {
  HomeFeatureCards,
  LoginForm,
  ProjectionsGrid,
  ProjectionsChart,
  SimulationForm,
} from '../components/organisms';
import {
  getProjections,
  ProjectionResponse,
  CustomProjectionRequestData,
} from '../api/getProjection';
import { LoginFormData } from '../components/organisms/LoginForm/LoginForm';
import login from '../api/postLogin';

import { MyAccountLayout } from '../components/templates';

const Container = styled((props) => <Grid container spacing={3} {...props} />)`
  padding: 16px;
`;

const IndexPage = () => {
  const [projections, setProjections] = useState<ProjectionResponse | undefined>(undefined);
  const [loginMessages, setLoginMessages] = useState<{
    error: string;
    success: string;
  }>({
    error: '',
    success: '',
  });

  const onFormSubmit = async (formValues: CustomProjectionRequestData): Promise<void> => {
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
          <LoginForm
            errorMessage={loginMessages.error}
            onSubmit={onLoginFormSubmit}
            successMessage={loginMessages.success}
          />
          <Spacer y={4} />
          <SimulationForm onSubmit={onFormSubmit} />
        </Grid>
      </Container>
      <Grid item xs={12}>
        <HomeFeatureCards />
      </Grid>
      <Grid item xs={12}>
        <Link to="/gmvp/login">Goto GMVP</Link>
      </Grid>
    </MyAccountLayout>
  );
};

export default IndexPage;
