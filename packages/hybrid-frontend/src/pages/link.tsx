import React, { useEffect } from 'react';
import { navigate, Link } from 'gatsby';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { Grid, Spacer, Typography } from '../components/atoms';
import { RootState } from '../store';

const Container = styled((props) => <Grid container spacing={3} {...props} />)`
  padding: 16px;
`;

// Placeholder until we have an integrated goals flow
const LinkPage = () => {
  const { isXplanLoggedIn } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (isXplanLoggedIn) {
      navigate('/my-account/goals');
    }
  }, [isXplanLoggedIn]);

  return (
    <Container>
      <Grid container spacing={3}>
        <Typography variant="h1">Digital Hybrid Nav Links</Typography>

        <Grid item xs={12}>
          <Link to="/my-account/xplogin">Goto XPlan Login</Link>
        </Grid>

        <Spacer y={4} />

        <Grid item xs={12}>
          <Link to="/my-account/login">Goto Login</Link>
        </Grid>
      </Grid>
    </Container>
  );
};

export default LinkPage;
