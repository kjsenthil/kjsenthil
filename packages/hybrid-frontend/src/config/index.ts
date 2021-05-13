import { from } from 'env-var';
import { ApiEndpoints } from './types';

const defaultEnv = from({
  NODE_ENV: process.env.NODE_ENV,
  GATSBY_ACTIVE_ENV: process.env.GATSBY_ACTIVE_ENV,
});

export const NODE_ENV = defaultEnv.get('NODE_ENV').default('development').asString();
export const ACTIVE_ENV = defaultEnv.get('GATSBY_ACTIVE_ENV').default(NODE_ENV).asString();
export const IS_SSR = typeof global.window === 'undefined';

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
  XPLAN_APP_ID: process.env.XPLAN_APP_ID,
});

const isRequired = NODE_ENV !== 'test';

const defaultEndpoints = {
  MYACCOUNT_CLIENTS: '/myaccount/clients/{id}',
  GET_ASSET_ALLOCATION_BREAKDOWN: '/Assets/assetallocation/{sedol}',
  GET_ASSET_DETAILS: '/Assets/assetdetail/{sedol}',
  GET_RISK_PROFILE_QUESTIONS: '/OxfordRisk/questions',
  GET_STANDING_DATA: '/Assets/readymade/standingdata',
  IDENTITY_LOGIN: '/login',
  IDENTITY_PIN: '/pin',
  IDENTITY_REFRESH_TOKEN: '/refresh-token',
  POST_PROJECTIONS: '/Assets/projections',
  PROJECTIONS_PORTFOLIO_ASSET_ALLOCATION: '/projections/portfolio-asset-allocation',
  PROJECTIONS_PORTFOLIO_RISK_PROFILE: '/projections/portfolio-risk-profile',
  LOGIN_TO_XPLAN: '/touch/web_login',
  UPDATE_GOAL: '/resourceful/entity/client-v4/{entity-id}/goals/{goal-index}',
  UPDATE_OBJECTIVE: '/resourceful/entity/client-v4/{entity-id}/objectives/{objective-index}',
  CREATE_GOAL_ADDITIONAL_FIELDS: '/resourceful/entity/client/{entity-id}/goals',
  CREATE_GOAL_LESS_FIELDS: '/resourceful/entity/client-v4/{entity-id}/goals',
  CREATE_OBJECTIVE: '/resourceful/entity/client-v4/{entity-id}/objectives',
  LINK_GOAL_TO_OBJECTIVE:
    '/resourceful/entity/client-v4/{entity-id}/goals/{objective-index}/objective_link',
};

export const API_BASE_URL = env.get('API_BASE_URL').required(isRequired).asUrlString();

export const API_ENDPOINTS = env
  .get('API_ENDPOINTS')
  .required(isRequired)
  .default(defaultEndpoints)
  .asJsonObject() as Record<ApiEndpoints, string>;

export const XPLAN_APP_ID = env.get('XPLAN_APP_ID').default('65wshs01RpizdxEwCh6G').asString();

export const MY_ACCOUNTS_API_CLIENT_ID = 'myaccounts-spa';

export const AUTH_ENDPOINTS = [
  API_ENDPOINTS.IDENTITY_LOGIN,
  API_ENDPOINTS.IDENTITY_PIN,
  API_ENDPOINTS.IDENTITY_REFRESH_TOKEN,
  API_ENDPOINTS.LOGIN_TO_XPLAN,
];

export const XPLAN_ENDPOINTS = [
  API_ENDPOINTS.UPDATE_GOAL,
  API_ENDPOINTS.UPDATE_OBJECTIVE,
  API_ENDPOINTS.CREATE_OBJECTIVE,
  API_ENDPOINTS.CREATE_GOAL_LESS_FIELDS,
  API_ENDPOINTS.CREATE_GOAL_ADDITIONAL_FIELDS,
  API_ENDPOINTS.LINK_GOAL_TO_OBJECTIVE,
];

export const ACCESS_TOKEN_REQUIRED_ENDPOINTS = [
  API_ENDPOINTS.MYACCOUNT_CLIENTS,
  API_ENDPOINTS.PROJECTIONS_PORTFOLIO_RISK_PROFILE,
  API_ENDPOINTS.PROJECTIONS_PORTFOLIO_ASSET_ALLOCATION,
  API_ENDPOINTS.POST_PROJECTIONS,
  API_ENDPOINTS.GET_RISK_PROFILE_QUESTIONS,
  API_ENDPOINTS.GET_ASSET_DETAILS,
  API_ENDPOINTS.GET_ASSET_ALLOCATION_BREAKDOWN,
  API_ENDPOINTS.GET_STANDING_DATA,
];
