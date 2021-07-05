import APIhelper from '../helper/apihelper';

import {
  CLIENT_ID,
  MYACCOUNTS_PASSWORD,
  MYACCOUNTS_USERNAME,
  API_BASE_URL,
  API_ENDPOINTS,
} from '../config';

let payload: string;
let twoStepAuthCode: string;
let xplanObjectiveIndex: string;
let linkobjectiveUrl: string;
let myAccountAccessToken: string;
let goalIndex: string;
jest.setTimeout(15000);

test('POST call for Xplan login and fetching two step auth code', async () => {
  payload = JSON.stringify({
    data: {
      attributes: {
        apiClientId: CLIENT_ID,
        password: MYACCOUNTS_PASSWORD,
        username: MYACCOUNTS_USERNAME,
      },
    },
  });
  const response = await APIhelper.postWithoutAuth({
    payload,
    base_url: API_BASE_URL,
    api_endpoint: API_ENDPOINTS.IDENTITY_LOGIN,
  });
  const {
    status,
    data: {
      data: { attributes },
    },
  } = response;

  expect(status).toStrictEqual(200);
  expect(attributes.twoStepAuthCode).not.toBe(null);
  twoStepAuthCode = attributes.twoStepAuthCode;
});

test('POST call for generating 3-digit pin', async () => {
  payload = JSON.stringify({
    data: {
      attributes: {
        apiClientId: CLIENT_ID,
        pin: [
          {
            position: 2,
            value: 2,
          },
          {
            position: 4,
            value: 4,
          },
          {
            position: 6,
            value: 6,
          },
        ],
        twoStepAuthCode,
      },
    },
  });
  const response = await APIhelper.postWithAuth({
    payload,
    base_url: API_BASE_URL,
    api_endpoint: API_ENDPOINTS.IDENTITY_PIN,
    token: twoStepAuthCode,
  });
  const {
    status,
    data: {
      data: { attributes },
    },
  } = response;

  expect(status).toBe(200);
  expect(attributes.contactId).not.toBe(null);
  expect(attributes.tokens.length).toBeGreaterThanOrEqual(2);
  const myAccountsApiToken = attributes.tokens.find(
    (token) => token.application === 'MyAccountsApi'
  );
  expect(myAccountsApiToken).not.toBe(null);
  expect(myAccountsApiToken.accessToken).not.toBe(null);
  myAccountAccessToken = myAccountsApiToken.accessToken;
  const oisApiToken = attributes.tokens.find((token) => token.application === 'OisApi');
  expect(oisApiToken.accessToken).not.toBe(null);
});

test('POST call to create a goal with less fields', async () => {
  payload = JSON.stringify({
    fields: {
      status: '2',
      category: 5,
      capture_date: {
        _val: '2021-02-15',
        _type: 'Date',
      },
      advice_type: 3,
      xpt_external_id: null,
      owner: 'client',
    },
  });

  const response = await APIhelper.postWithAuth({
    token: myAccountAccessToken,
    base_url: API_BASE_URL,
    payload,
    api_endpoint: API_ENDPOINTS.CREATE_GOAL_LESS_FIELDS,
  });

  const { status, data } = response;

  expect(status).toStrictEqual(201);
  expect(data.fields).not.toBe(null);
  expect(data.index).not.toBe(null);
  const xplanGoalIndex = response.data.index;
  expect(xplanGoalIndex).not.toBe(null);
});

test('POST call to create a goal with additional fields', async () => {
  payload = JSON.stringify({
    fields: {
      status: '2',
      category: 5,
      description: 'Retirement1',
      capture_date: {
        _val: '2021-06-03',
        _type: 'Date',
      },
      advice_type: 5,
      regular_drawdown: {
        _val: {
          code: 'GBP',
          value: {
            _val: 233,
            _type: 'BigDecimal',
          },
        },
        _type: 'Currency',
      },
      objective_frequency_start_age: 65,
      objective_frequency_end_age: 67,
      drawdown_frequency: 12,
      owner: 'client',
    },
  });

  const response = await APIhelper.postWithAuth({
    payload,
    base_url: API_BASE_URL,
    token: myAccountAccessToken,
    api_endpoint: API_ENDPOINTS.CREATE_GOAL_ADDITIONAL_FIELDS,
  });

  const { status, data } = response;

  expect(status).toStrictEqual(201);
  expect(data.fields).not.toBe(null);
  expect(data.index).not.toBe(null);
  goalIndex = data.index;
});

test('PATCH call to update a goal', async () => {
  payload = JSON.stringify({
    fields: {
      status: '2',
      category: 5,
      description: 'Patch retirement goal',
      capture_date: {
        _val: '2021-06-03',
        _type: 'Date',
      },
      advice_type: 5,
      regular_drawdown: {
        _val: {
          code: 'GBP',
          value: {
            _val: 5000,
            _type: 'BigDecimal',
          },
        },
        _type: 'Currency',
      },
      objective_frequency_start_age: 65,
      objective_frequency_end_age: 67,
      drawdown_frequency: 12,
      owner: 'client',
    },
  });
  const updateGoalUrl = API_ENDPOINTS.UPDATE_GOAL.replace('{goal-index}', goalIndex);
  const response = await APIhelper.patch({
    token: myAccountAccessToken,
    base_url: API_BASE_URL,
    api_endpoint: updateGoalUrl,
    payload,
  });
  const { status, data } = response;
  expect(status).toStrictEqual(200);
  expect(data.fields).not.toBe(null);
  expect(data.index).not.toBe(null);
});

test('GET call to fetch all goals created for the username', async () => {
  const queryParams = new Map<string, string>();
  queryParams.set('fields.0', 'description');
  queryParams.set('fields.1', 'category');
  queryParams.set('fields.2', 'present_value');
  queryParams.set('fields.3', 'target_amount');

  const response = await APIhelper.get({
    token: myAccountAccessToken,
    base_url: API_BASE_URL,
    api_endpoint: API_ENDPOINTS.GET_GOALS,
    query_params: queryParams,
  });
  const { status, data } = response;

  expect(status).toStrictEqual(200);
  expect(data.fields).not.toBe(null);
  expect(data.index).not.toBe(null);
});

test('POST call to create an objective', async () => {
  payload = JSON.stringify({
    fields: {
      description: 'Goal Objective',
      owner: 'client',
      target_amount: {
        _val: {
          code: 'GBP',
          value: {
            _val: '10000',
            _type: 'BigDecimal',
          },
        },
        _type: 'Currency',
      },
      capture_date: {
        _val: '2021-02-19',
        _type: 'Date',
      },
    },
  });

  const response = await APIhelper.postWithAuth({
    payload,
    base_url: API_BASE_URL,
    token: myAccountAccessToken,
    api_endpoint: API_ENDPOINTS.CREATE_OBJECTIVE,
  });
  const { status, data } = response;

  expect(status).toStrictEqual(201);
  expect(data.index).not.toBe(null);
  xplanObjectiveIndex = response.data.index;
});

test('PATCH call to update an objective', async () => {
  payload = JSON.stringify({
    fields: {
      description: 'Goal Objective 2',
      owner: 'client',
      target_amount: {
        _val: {
          code: 'GBP',
          value: {
            _val: '10000',
            _type: 'BigDecimal',
          },
        },
        _type: 'Currency',
      },
      capture_date: {
        _val: '2021-02-19',
        _type: 'Date',
      },
    },
  });
  const updateObjUrl = API_ENDPOINTS.UPDATE_OBJECTIVE.replace(
    '{objective-index}',
    xplanObjectiveIndex
  );
  const response = await APIhelper.patch({
    token: myAccountAccessToken,
    base_url: API_BASE_URL,
    api_endpoint: updateObjUrl,
    payload,
  });
  const { status, data } = response;

  expect(status).toStrictEqual(200);
  expect(data.fields).not.toBe(null);
  expect(data.index).not.toBe(null);
});

test('POST call to link goal with an objective using objective index', async () => {
  payload = JSON.stringify({
    objective_obj_index: +xplanObjectiveIndex,
  });
  linkobjectiveUrl = API_ENDPOINTS.LINK_GOAL_TO_OBJECTIVE.replace(
    '{objective-index}',
    xplanObjectiveIndex
  );
  const response = await APIhelper.postWithAuth({
    payload,
    base_url: API_BASE_URL,
    token: myAccountAccessToken,
    api_endpoint: linkobjectiveUrl,
  });
  const { status, data } = response;

  expect(status).toStrictEqual(201);
  expect(data.entity_id).not.toBe(null);
  expect(data.list_obj_index).toStrictEqual(xplanObjectiveIndex);
});
