import React, { useState } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import Typography from '@material-ui/core/Typography';
import AssetSelector, { Asset } from '../components/AssetSelector';
import Layout from '../components/Layout';
import { Grid } from '@material-ui/core';

interface AssetResponse {
  allAsset: {
    edges: {
      node: Asset;
    }[]
  }
}

const AVAILABLE_ASSETS_QUERY = graphql`
  query {
    allAsset {
      edges {
        node {
          id
          category
          investmentCodeName
          sedol
        }
      }
    }
  }
`;

const IndexPage = () => {
  const data: AssetResponse = useStaticQuery(AVAILABLE_ASSETS_QUERY);
  const [selectedAsset, setSelectedAsset] = useState('');

  return (
    <Layout>
      <Typography variant="h2" component="h1" gutterBottom data-testid="home-title">Digital Hybrid Demo</Typography>
      <Grid xs={12} sm={6}>
        {data.allAsset.edges && <AssetSelector assets={data.allAsset.edges} onChange={(newAsset) => setSelectedAsset(newAsset)} value={selectedAsset} />}
      </Grid>
    </Layout>
  );
};

export default IndexPage;
