import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { API_ENDPOINTS, MY_ACCOUNTS_API_CLIENT_ID } from '../../../config';
import postRefreshToken from './postRefreshToken';
import { tokens } from '../mocks';

const mockAxios = new MockAdapter(axios);
const url = API_ENDPOINTS.IDENTITY_REFRESH_TOKEN;

describe('postRefreshToken', () => {
  it(`makes a call to ${url}`, async () => {
    const data = {
      Data: {
        Attributes: {
          NewTokens: tokens,
        },
      },
    };

    mockAxios
      .onPost(url, {
        data: {
          type: 'refresh-token',
          id: null,
          attributes: {
            apiClientId: MY_ACCOUNTS_API_CLIENT_ID,
            tokens,
          },
        },
      })
      .reply(200, data);

    const response = await postRefreshToken(tokens);

    expect(response).toStrictEqual(data);
  });
});
