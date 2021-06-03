import React from 'react';
import { graphql, navigate, useStaticQuery } from 'gatsby';
import Img from 'gatsby-image';
import { Box, Button, Container, Grid, Typography } from '../../atoms';
import { ChildImage } from '../../../types';

const sideImagesQuery = graphql`
  query SideImages {
    thumbnail1: file(relativePath: { eq: "homeFeature/01-beach-huts.jpg" }) {
      childImageSharp {
        fluid(maxHeight: 500, quality: 100) {
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }
  }
`;

interface FeatureImageResponse {
  thumbnail1: ChildImage;
}

interface OnBoardLayoutProps {
  children: React.ReactNode;
  titleText: string;
  titleSubText: string;
  onSubmitHandler: () => void;
  disableCondition: boolean;
}

const OnBoardLayout = ({
  children,
  titleText,
  titleSubText,
  onSubmitHandler,
  disableCondition,
}: OnBoardLayoutProps) => {
  const data: FeatureImageResponse = useStaticQuery(sideImagesQuery);

  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={false} sm={4}>
          {data?.thumbnail1 && (
            <Img
              fluid={data.thumbnail1.childImageSharp.fluid}
              alt="Beach huts"
              style={{ height: '100vh' }}
            />
          )}
        </Grid>
        <Grid item xs={12} sm={8}>
          <Box m={2}>
            <Grid container spacing={3} alignContent="center" style={{ height: '100vh' }}>
              <Typography variant="h2" align="center" gutterBottom>
                {titleText}
              </Typography>
              <Typography component="h5" align="center" gutterBottom>
                {titleSubText}
              </Typography>
              <Grid item xs={12}>
                {children}
              </Grid>
              <Grid item xs={12}>
                <Grid container justify="space-between">
                  <Grid item xs={3}>
                    <Button variant="outlined" color="primary" onClick={() => navigate(-1)}>
                      Back
                    </Button>
                  </Grid>
                  <Grid item xs={9}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={onSubmitHandler}
                      disabled={disableCondition}
                    >
                      Continue
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default OnBoardLayout;
