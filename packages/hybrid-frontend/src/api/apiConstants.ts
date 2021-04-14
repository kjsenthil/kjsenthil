import ENDPOINTS from './endpoints';

// API Config
export const xPlanBaseUrl = ENDPOINTS?.XPLAN_BASE_URL || 'https://tbigroupuat2.xplan.iress.co.uk';

export const XplanAppID = '65wshs01RpizdxEwCh6G';

export const postApiHeader = {
  'X-Xplan-App-Id': XplanAppID,
  'Content-Type': 'application/json',
};

// To Parse entity ID on APIM
export const entityIDParse = /\{entity-id\}/;

// Login
export const loginURL = ENDPOINTS['login-to-xplan'] || `${xPlanBaseUrl}/resourceful/site`;
export const loginPayload =
  'username={username}&password={password}&loginmode=client&force=1&domain=coa&site_type=full';

const currDate = new Date().toISOString().split('T')[0];

export const goalsPayLoad = {
  fields: {
    status: '2', // E.g from 4 options - Goal is unfulfilled
    category: 5, // Investment category (dependent on retirements vs savings)
    advice_type: 3, // Investment advice type (dependent on retirements vs savings)
    capture_date: {
      _val: currDate,
      _type: 'Date',
    },
    xpt_external_id: null, // To Check
    owner: 'client',
    description: 'Create goal MVP',
    frequency: '12', //  how often they will take the money out
  },
};

// Objective
export const objectivePayLoad = {
  fields: {
    capture_date: {
      _val: currDate,
      _type: 'Date',
    },
    owner: 'client',
    description: 'Create objective MVP',
  },
};
