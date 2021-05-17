import axios, { AxiosResponse } from 'axios';
import { GatsbyNode, SourceNodesArgs } from 'gatsby';
import { API_ENDPOINTS, API_BASE_URL } from '../../src/config';
import {
  AssetAllocation,
  AssetAllocationResponse,
  AssetAllocationTypes,
  GetStandingDataResponse,
} from './types';

const api = axios.create({ baseURL: API_BASE_URL });

// print a success message if the plugin loads
export const onPreInit = () => console.log('\x1b[32m%s\x1b', 'success loaded assets-api-plugin');

const getAssetAllocation = async (sedol: string): Promise<AssetAllocation[]> => {
  const path = API_ENDPOINTS.GET_ASSET_ALLOCATION_BREAKDOWN.replace(/\{sedol\}/, sedol);
  const response: AxiosResponse<AssetAllocationResponse> = await api.get(path);

  return response.data[0].assetallocation;
};

export const sourceNodes: GatsbyNode['sourceNodes'] = async ({
  actions,
  createContentDigest,
  createNodeId,
}: SourceNodesArgs) => {
  const { createNode } = actions;

  try {
    const response: AxiosResponse<GetStandingDataResponse> = await api.get(
      API_ENDPOINTS.GET_STANDING_DATA
    );

    const standingDataWithEquity = await Promise.all(
      response.data.tilneyStandingData.map(async (fundItem) => {
        const assetAllocation = await getAssetAllocation(fundItem.sedol);

        const equityProportion = assetAllocation.find(
          (allocation) => allocation.name === AssetAllocationTypes.EQUITY
        )?.proportion;
        return {
          ...fundItem,
          equityProportion,
        };
      })
    );

    const ASSET_NODE_TYPE = 'Asset';

    standingDataWithEquity.forEach((asset) =>
      createNode({
        ...asset,
        id: createNodeId(`${ASSET_NODE_TYPE}-${asset.id}`),
        parent: null,
        children: [],
        internal: {
          type: ASSET_NODE_TYPE,
          content: JSON.stringify(asset),
          contentDigest: createContentDigest(asset),
        },
      })
    );
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        `🚨 Unable to fetch assets API data from ${error.config.baseURL}${error.config.url}`
      );
    }
    console.error(error.message);
  }
};
