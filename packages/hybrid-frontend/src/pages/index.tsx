import React from 'react';
import { Container, Typography } from '../components/atoms';
import LoginPage from '../components/pages/LoginPage/LoginPage';

const IndexPage = () => (
  <Container fixed>
    <Typography variant="h1" gutterBottom align="center">
      Digital Hybrid
    </Typography>
    <LoginPage path="" />
  </Container>
);

export default IndexPage;
