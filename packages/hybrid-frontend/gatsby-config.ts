import dotenv from 'dotenv';

const activeEnv = process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV || 'development';

dotenv.config({
  path: `.env.${activeEnv}`,
});

const env = activeEnv === 'production' ? 'prod' : 'dev';

export default {
  plugins: [
    {
      resolve: 'gatsby-plugin-material-ui',
      options: {
        stylesProvider: {
          injectFirst: true,
        },
      },
    },
    {
      resolve: 'gatsby-plugin-create-client-paths',
      options: { prefixes: ['/gmvp/*'] },
    },
    'gatsby-plugin-styled-components',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-transformer-json',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'data',
        path: `${__dirname}/src/data/${env}/features`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/assets/img/`,
      },
    },

    // Custom plugins
    'assets-api-plugin',
  ],
};
