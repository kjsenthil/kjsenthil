import { includePlugins } from 'gatsby-plugin-ts-config';
import { ACTIVE_ENV, GTM_AUTH, GTM_PREVIEW } from './src/config';

const env = ACTIVE_ENV === 'production' ? 'prod' : 'dev';

includePlugins(['assets-api-plugin']);

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
      options: { prefixes: ['/my-account/*'] },
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
    {
      resolve: 'gatsby-plugin-google-tagmanager',
      options: {
        id: 'GTM-NPWTSD3',
        includeInDevelopment: false,
        defaultDataLayer: { platform: 'gatsby' },
        enableWebVitalsTracking: true,
        gtmAuth: GTM_AUTH,
        gtmPreview: GTM_PREVIEW,
      },
    },
  ],
};
