const axios = require('axios');
const { API_ENDPOINTS, API_BASE_URL } = require('../../src/config');

const ASSET_NODE_TYPE = 'Asset';
const api = axios.create({ baseURL: API_BASE_URL });
// print a success message if the plugin loads
exports.onPreInit = () => console.log('\x1b[32m%s\x1b', 'success loaded assets-api-plugin');

exports.sourceNodes = async ({ actions, createContentDigest, createNodeId }) => {
  const { createNode } = actions;

  try {
    const response = await api.get(API_ENDPOINTS['GET_STANDING_DATA']);
    response.data.tilneyStandingData.forEach((asset) =>
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
    console.error(
      `🚨 Unable to fetch assets API data from ${error.config.baseURL}${error.config.url}`
    );

    console.error(error.message);
  }
};
