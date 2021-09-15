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
});

const isRequired = NODE_ENV !== 'test';

const defaultEndpoints = {
  MYACCOUNT_BREAKDOWN_ALLOCATION: '/myaccount/breakdown-allocation/{id}',
  MYACCOUNT_CLIENTS: '/myaccount/clients/{id}',
  MYACCOUNT_PERFORMANCE_CONTACT: '/myaccount/performance-contact/{id}',
  MYACCOUNT_PERFORMANCE_ACCOUNTS_AGGREGATED: '/myaccount/performance-accounts-aggregated',
  MYACCOUNT_NETCONTRIBUTION_ACCOUNTS_AGGREGATED: '/myaccount/netcontribution-accounts-aggregated',
  MYACCOUNT_INVESTMENT_SUMMARY_ACCOUNTS: '/myaccount/investment-summary-account',
  MYACCOUNT_ISA_CONTRIBUTIONS: '/myaccount/isa-contributions/{id}',
  MYACCOUNT_CONTRIBUTION: '/myaccount/contribution-account/{id}',
  MYACCOUNT_MONTHLY_SAVINGS: '/myaccount/accounts/{id}/monthly-savings',
  RETURNS_ANNUALISED_RETURN: '/returns/annualised-return',
  TILNEY_ASSET_MODEL: '/Assets/tilney-asset-model/{riskName}',
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
  UPDATE_GOAL: '/resourceful/entity/client-v4/goals/{goal-index}',
  UPDATE_OBJECTIVE: '/resourceful/entity/client-v4/objectives/{objective-index}',
  GET_GOALS: '/resourceful/entity/client-v4/goals',
  CREATE_GOAL_ADDITIONAL_FIELDS: '/resourceful/entity/client/goals',
  CREATE_GOAL_LESS_FIELDS: '/resourceful/entity/client-v4/goals',
  CREATE_OBJECTIVE: '/resourceful/entity/client-v4/objectives',
  LINK_GOAL_TO_OBJECTIVE: '/resourceful/entity/client-v4/goals/{objective-index}/objective_link',
  PROJECTIONS_SIMULATE_PROJECTION: '/projections/simulate-projection',
  MARKET_OPEN: '/market-open',
  CREATE_SHARE_QUOTE: '/share-quote',
  GET_SHARE_QUOTE_STATUS: '/share-quote-status',
  GET_LIMIT_COST: '/limit-cost',
  CREATE_SHARE_ORDER: '/share-order',
  GET_SHARE_ORDER_STATUS: '/share-order-status',
  GET_SHARE_INDICATIVE_PRICE: '/share-indicative-price',
};

export const API_BASE_URL = env.get('API_BASE_URL').required(isRequired).asUrlString();

export const MYACCOUNTS_HOME_URL = env
  .get('MYACCOUNTS_HOME_URL')
  .required(isRequired)
  .asUrlString();

export const API_ENDPOINTS = env
  .get('API_ENDPOINTS')
  .required(isRequired)
  .default(defaultEndpoints)
  .asJsonObject() as typeof defaultEndpoints;

export const GTM_AUTH = env.get('GTM_AUTH').required(isRequired).asString();

export const GTM_PREVIEW = env.get('GTM_PREVIEW').required(isRequired).asString();

export const AI_CONNECTION_STRING = env.get('AI_CONNECTION_STRING').required(isRequired).asString();

export const MY_ACCOUNTS_API_CLIENT_ID = 'myaccounts-spa';

export const AUTH_ENDPOINTS = [
  API_ENDPOINTS.IDENTITY_LOGIN,
  API_ENDPOINTS.IDENTITY_PIN,
  API_ENDPOINTS.IDENTITY_REFRESH_TOKEN,
];

export const ACCESS_TOKEN_REQUIRED_ENDPOINTS = [
  API_ENDPOINTS.MYACCOUNT_BREAKDOWN_ALLOCATION,
  API_ENDPOINTS.MYACCOUNT_CLIENTS,
  API_ENDPOINTS.MYACCOUNT_INVESTMENT_SUMMARY_ACCOUNTS,
  API_ENDPOINTS.MYACCOUNT_ISA_CONTRIBUTIONS,
  API_ENDPOINTS.MYACCOUNT_CONTRIBUTION,
  API_ENDPOINTS.MYACCOUNT_PERFORMANCE_CONTACT,
  API_ENDPOINTS.MYACCOUNT_PERFORMANCE_ACCOUNTS_AGGREGATED,
  API_ENDPOINTS.RETURNS_ANNUALISED_RETURN,
  API_ENDPOINTS.PROJECTIONS_PORTFOLIO_RISK_PROFILE,
  API_ENDPOINTS.PROJECTIONS_PORTFOLIO_ASSET_ALLOCATION,
  API_ENDPOINTS.POST_PROJECTIONS,
  API_ENDPOINTS.GET_RISK_PROFILE_QUESTIONS,
  API_ENDPOINTS.GET_ASSET_DETAILS,
  API_ENDPOINTS.TILNEY_ASSET_MODEL,
  API_ENDPOINTS.GET_ASSET_ALLOCATION_BREAKDOWN,
  API_ENDPOINTS.GET_STANDING_DATA,
  API_ENDPOINTS.GET_GOALS,
  API_ENDPOINTS.UPDATE_GOAL,
  API_ENDPOINTS.UPDATE_OBJECTIVE,
  API_ENDPOINTS.CREATE_OBJECTIVE,
  API_ENDPOINTS.CREATE_GOAL_LESS_FIELDS,
  API_ENDPOINTS.CREATE_GOAL_ADDITIONAL_FIELDS,
  API_ENDPOINTS.LINK_GOAL_TO_OBJECTIVE,
  API_ENDPOINTS.PROJECTIONS_SIMULATE_PROJECTION,
  API_ENDPOINTS.MARKET_OPEN,
  API_ENDPOINTS.CREATE_SHARE_QUOTE,
  API_ENDPOINTS.GET_SHARE_QUOTE_STATUS,
  API_ENDPOINTS.GET_LIMIT_COST,
  API_ENDPOINTS.CREATE_SHARE_ORDER,
  API_ENDPOINTS.GET_SHARE_ORDER_STATUS,
  API_ENDPOINTS.GET_SHARE_INDICATIVE_PRICE,
];
