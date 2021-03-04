require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

const fetch = require('node-fetch');

const ASSET_NODE_TYPE = 'Asset';

// print a success message if the plugin loads
exports.onPreInit = () => console.log('\x1b[32m%s\x1b', 'success loaded assets-api-plugin');

exports.sourceNodes = async ({
  actions,
  createContentDigest,
  createNodeId,
}) => {
  const { createNode } = actions;

  const response = await fetch(`${process.env.ASSETS_API_BASE_URL}/readymade/standingdata`);

  if (!response.ok) {
    console.error('🚨 Unable to fetch assets API data');
    return;
  }

  const resultData = await response.json();

  resultData.tilneyStandingData.forEach((asset) => createNode({
    ...asset,
    id: createNodeId(`${ASSET_NODE_TYPE}-${asset.id}`),
    parent: null,
    children: [],
    internal: {
      type: ASSET_NODE_TYPE,
      content: JSON.stringify(asset),
      contentDigest: createContentDigest(asset),
    },
  }));
};
