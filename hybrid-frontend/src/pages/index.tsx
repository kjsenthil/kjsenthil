import React, { useState } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { Grid } from '@material-ui/core';
import AssetSelector, { Asset } from '../components/AssetSelector';
import Layout from '../components/Layout';
import { AssetData, getAssetDetail } from '../api/getAssetDetail';
import AssetDetails from '../components/AssetDetails';
import HeaderMenu from '../components/HeaderMenu';
import HomeFeatureCards from '../components/HomeFeatureCards';

interface AssetResponse {
  allAsset: {
    edges: {
      node: Asset;
    }[];
  };
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
  const [assetDetails, setAssetDetails] = useState<AssetData | undefined>(undefined);

  const onAssetChange = async (assetSedol: string) => {
    setSelectedAsset(assetSedol);
    const details = await getAssetDetail(assetSedol);
    setAssetDetails(details);
  };

  return (
    <Layout>
      <HeaderMenu />
      <Grid item xs={12}>
        {data.allAsset.edges && (
          <AssetSelector
            assets={data.allAsset.edges}
            onChange={(newAsset) => onAssetChange(newAsset)}
            value={selectedAsset}
          />
        )}
        {assetDetails && <AssetDetails data={assetDetails} />}
        <HomeFeatureCards />
      </Grid>
    </Layout>
  );
};

export default IndexPage;
