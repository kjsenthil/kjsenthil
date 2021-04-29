import './src/config';

export default {
  onCreateWebpackConfig: ({ actions }) => {
    actions.setWebpackConfig({
      node: {
        fs: 'empty', // Fixes an issue with dotenv when loadded in the browser https://github.com/motdotla/dotenv/issues/233
      },
    });
  },
};
