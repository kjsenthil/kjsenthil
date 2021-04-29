import { from } from 'env-var';

const defaultEnv = from({
  NODE_ENV: process.env.NODE_ENV,
  GATSBY_ACTIVE_ENV: process.env.GATSBY_ACTIVE_ENV,
});

export const NODE_ENV = defaultEnv.get('NODE_ENV').default('development').asString();
export const ACTIVE_ENV = defaultEnv.get('GATSBY_ACTIVE_ENV').default(NODE_ENV).asString();

if (typeof global.window === 'undefined') {
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
  API_IDENTITY_LOGIN: process.env.API_IDENTITY_LOGIN,
  XPLAN_BASE_URL: process.env.XPLAN_BASE_URL,
});

const isRequired = NODE_ENV !== 'test';

export const API_ENDPOINTS = env.get('API_ENDPOINTS').required(isRequired).asJsonObject();
export const XPLAN_BASE_URL = env.get('XPLAN_BASE_URL').asUrlString();
