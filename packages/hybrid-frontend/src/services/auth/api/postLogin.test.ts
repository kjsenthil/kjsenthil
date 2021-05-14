import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { API_ENDPOINTS, MY_ACCOUNTS_API_CLIENT_ID } from '../../../config';
import { CredLoginRequest, CredLoginResponse } from '../types';
import postLogin from './postLogin';

const mockAxios = new MockAdapter(axios);
const url = API_ENDPOINTS.IDENTITY_LOGIN;

describe('postLogin', () => {
  it(`makes a call to ${url}`, async () => {
    const params = { username: 'username', password: 'password' };

    const data: CredLoginResponse = {
      data: {
        attributes: {
          twoStepAuthCode: '1234567',
        },
      },
    };
    const payload: CredLoginRequest = {
      data: {
        attributes: {
          apiClientId: MY_ACCOUNTS_API_CLIENT_ID,
          ...params,
        },
      },
    };
    mockAxios.onPost(url, payload).reply(200, data);

    const response = await postLogin(params);

    expect(response).toStrictEqual(data);
  });
});
