import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import AssetSelector, { Asset } from '../components/AssetSelector/AssetSelector';

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

  return (
    <div>
      <h1 data-testid="home-title">Digital Hybrid Demo</h1>
      {data.allAsset.edges && <AssetSelector assets={data.allAsset.edges} />}
    </div>
  );
};

export default IndexPage;
