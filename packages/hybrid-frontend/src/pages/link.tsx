import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import { Grid, Spacer, Typography } from '../components/atoms';

const Container = styled((props) => <Grid container spacing={3} {...props} />)`
  padding: 16px;
`;

// Placeholder until we have an integrated goals flow
const LinkPage = () => (
  <Container>
    <Grid container spacing={3}>
      <Typography variant="h1">Digital Hybrid Nav Links</Typography>

      <Spacer y={4} />

      <Grid item xs={12}>
        <Link to="/my-account/goals">Goto Goals </Link>
      </Grid>
    </Grid>
  </Container>
);

export default LinkPage;
