import { from } from 'env-var';

const defaultEnv = from({
  NODE_ENV: process.env.NODE_ENV,
  GATSBY_ACTIVE_ENV: process.env.GATSBY_ACTIVE_ENV,
});

export const NODE_ENV = defaultEnv.get('NODE_ENV').default('development').asString();
export const ACTIVE_ENV = defaultEnv.get('GATSBY_ACTIVE_ENV').default(NODE_ENV).asString();
export const IS_SSR = typeof global.window === 'undefined';
export const IS_PRODUCTION = ACTIVE_ENV === 'production';
export const COOKIE_DOMAIN = IS_PRODUCTION ? '.bestinvest.co.uk' : undefined;
export const CALENDLY_URL = IS_PRODUCTION
  ? 'https://calendly.com/best-invest/coaching-session'
  : 'https://calendly.com/best-invest-staging/coaching-session';

export const BESTINVEST_PLUS_URL = 'https://online.bestinvest.co.uk/bestinvest-plus#/';

if (IS_SSR) {
  /* eslint-disable-next-line global-require */
  const dotenv = require('dotenv');
  dotenv.config({
    path: `.env.${ACTIVE_ENV}`,
  });
}

/**
 * Webpack uses DefinePlugin to create global constants out of env vars prefixed with process.env.
 * This means, process.env on its own is empty, but seeking the full chain `process.env.API_ENDPOINTS`
 * will give you the value defined for API_ENDPOINTS in .env.
 * On the other hand, env-var uses `process.env` by default as the container to get keys on the object, which is empty.
 * Hence, it is important to redefine the container for env-var.
 * While this is not a problem on the server side whenre process.env would be a ligimate object containing the env vars,
 * this is needed particularly for env-vars to work in the browser.
 * Please add each env var that you need for the browser to this object.
 * */
const env = from({
  API_ENDPOINTS: process.env.API_ENDPOINTS,
  API_BASE_URL: process.env.API_BASE_URL,
  MYACCOUNTS_HOME_URL: process.env.MYACCOUNTS_HOME_URL,
  GTM_AUTH: process.env.GTM_AUTH,
  GTM_PREVIEW: process.env.GTM_PREVIEW,
  AI_CONNECTION_STRING: process.env.AI_CONNECTION_STRING,
  INSPECT_XSTATE: process.env.INSPECT_XSTATE,
});

const isRequired = NODE_ENV !== 'test';

export const API_BASE_URL = env.get('API_BASE_URL').required(isRequired).asUrlString();

export const MYACCOUNTS_HOME_URL = env
  .get('MYACCOUNTS_HOME_URL')
  .required(isRequired)
  .asUrlString();

export const INSPECT_XSTATE = env.get('INSPECT_XSTATE').default('false').asBool();

export const GTM_AUTH = env.get('GTM_AUTH').required(isRequired).asString();

export const GTM_PREVIEW = env.get('GTM_PREVIEW').required(isRequired).asString();

export const AI_CONNECTION_STRING = env.get('AI_CONNECTION_STRING').required(isRequired).asString();

export const MY_ACCOUNTS_API_CLIENT_ID = 'myaccounts-spa';
