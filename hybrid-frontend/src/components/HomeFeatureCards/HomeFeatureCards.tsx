import React from 'react';
import Img from 'gatsby-image';
import { useStaticQuery, graphql } from 'gatsby';
import { Grid } from '@material-ui/core';

const homeFeatureImagesQuery = graphql`
  query AssetsPhotos {
    thumbnail1: file(relativePath: { eq: "homeFeature/01-beach-huts.jpg" }) {
      childImageSharp {
        fluid(maxHeight: 500, quality: 100) {
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }
    thumbnail2: file(relativePath: { eq: "homeFeature/02-pineapple-field.jpg" }) {
      childImageSharp {
        fluid(maxHeight: 500, quality: 100) {
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }
    thumbnail3: file(relativePath: { eq: "homeFeature/03-donuts-in-a-box.jpg" }) {
      childImageSharp {
        fluid(maxHeight: 500, quality: 100) {
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }
  }
`;

interface ChildImage {
  childImageSharp: {
    fluid: {
      aspectRatio: number;
      src: string;
      srcSet: string;
      sizes: string;
    };
  };
}

interface FeatureImageResponse {
  thumbnail1: ChildImage;
  thumbnail2: ChildImage;
  thumbnail3: ChildImage;
}

const HomeFeatureCards = () => {
  const data: FeatureImageResponse = useStaticQuery(homeFeatureImagesQuery);
  return (
    <Grid container>
      <Grid container justify="space-evenly" alignItems="center" item xs={12}>
        <Grid item xs={4}>
          <Img fluid={data.thumbnail1.childImageSharp.fluid} />
        </Grid>
        <Grid item xs={4}>
          <Img fluid={data.thumbnail2.childImageSharp.fluid} />
        </Grid>
        <Grid item xs={4}>
          <Img fluid={data.thumbnail3.childImageSharp.fluid} />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default HomeFeatureCards;
