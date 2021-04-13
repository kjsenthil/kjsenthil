const fetch = require('node-fetch');

const ASSET_NODE_TYPE = 'Asset';

// TODO: remove when finished debugging
const getEndpoints = () => {
  try {
    if (process.env.API_ENDPOINTS) {
      return JSON.parse(process.env.API_ENDPOINTS);
    }
    throw new Error('process.env.API_ENDPOINTS is missing');
  } catch (e) {
    console.log('🚨 API_ENDPOINTS', process.env.API_ENDPOINTS);
    throw new Error('Unable to parse API endpoints', e);
  }
};

// print a success message if the plugin loads
exports.onPreInit = () => console.log('\x1b[32m%s\x1b', 'success loaded assets-api-plugin');

exports.sourceNodes = async ({ actions, createContentDigest, createNodeId }) => {
  const { createNode } = actions;

  const ENDPOINTS = { ...getEndpoints() };
  const response = await fetch(`${ENDPOINTS['get-standing-data']}`);

  if (!response.ok) {
    console.error(`🚨 Unable to fetch assets API data from ${response.url}`);
    console.log(`${response.status} - ${response.statusText}`);
    return;
  }

  const resultData = await response.json();

  resultData.tilneyStandingData.forEach((asset) =>
    createNode({
      ...asset,
      id: createNodeId(`${ASSET_NODE_TYPE}-${asset.id}`),
      parent: null,
      children: [],
      internal: {
        type: ASSET_NODE_TYPE,
        content: JSON.stringify(asset),
        contentDigest: createContentDigest(asset)
      }
    })
  );
};
