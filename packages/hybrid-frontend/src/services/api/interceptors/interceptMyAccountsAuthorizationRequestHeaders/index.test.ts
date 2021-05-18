import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import interceptMyAccountsAuthorizationRequestHeaders from '.';
import { ACCESS_TOKEN_REQUIRED_ENDPOINTS, AUTH_ENDPOINTS } from '../../../../config';
import { AuthState } from '../../../auth';

const mockAxios = new MockAdapter(axios);

const accessTokens = [
  {
    application: 'MyAccountsApi',
    accessToken:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoibmFtZSIsInJvbGUiOiJyb2xlIiwic3ViIjoic3ViamVjdCIsImFwaV9jbGllbnRfaWQiOiJteWFjY291bnRzLXNwYSIsInNlc3Npb24iOiIwYzdjMDIzMS03OGY2LTQwZDgtOTY4ZS0zNWIzZjYwMTAxOGIiLCJjb250YWN0IjoiMjgzNzMyIiwiYWNjb3VudHMiOiIyMDQ5OSwyMDUwMCwyMDg3MSIsImxpbmthY2NvdW50cyI6IiIsImF1ZCI6Im15YWNjb3VudHNhcGkuYmVzdGludmVzdC5jby51ayIsImV4cCI6MTYyMDY1ODIwMywiaXNzIjoiaWRlbnRpdHlhcGkuYmVzdGludmVzdC5jby51ayJ9.UBhkWGvW6zfCuF8CiyF36DampiMpxXmf2w9KL4ORIJM',
    refreshToken: 'ab5e12a2-c15c-4b35-995c-645811b760f7',
    sessionId: '0c7c0231-78f6-40d8-968e-35b3f601018b',
  },
  {
    application: 'OisApi',
    accessToken:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoibmFtZSIsInJvbGUiOiJyb2xlIiwic3ViIjoic3ViamVjdCIsImFwaV9jbGllbnRfaWQiOiJteWFjY291bnRzLXNwYSIsInNlc3Npb24iOiIwYzdjMDIzMS03OGY2LTQwZDgtOTY4ZS0zNWIzZjYwMTAxOGIiLCJjb250YWN0IjoiMjgzNzMyIiwiYWNjb3VudHMiOiIyMDQ5OSwyMDUwMCwyMDg3MSIsImxpbmthY2NvdW50cyI6IiIsImF1ZCI6Im9pc2FwaS5iZXN0aW52ZXN0LmNvLnVrIiwiZXhwIjoxNjIwNjU4MjAzLCJpc3MiOiJpZGVudGl0eWFwaS5iZXN0aW52ZXN0LmNvLnVrIn0._HPnoRyibnkbp8cq3gN4AVu2BjG-uD50tHvCD-1yEM4',
    refreshToken: 'b4e59a82-7e64-498d-8329-3a8230e6216a',
    sessionId: '0c7c0231-78f6-40d8-968e-35b3f601018b',
  },
];

const getState = () => ({ auth: { accessTokens } as AuthState });

const URLS_NOT_NEEDING_AUTHORIZATION = [...Object.values(AUTH_ENDPOINTS)];

const URLS_NEEDING_AUTHORIZATION = Object.values(ACCESS_TOKEN_REQUIRED_ENDPOINTS);

describe('interceptMyAccountsAuthorizationRequestHeaders', () => {
  beforeAll(() => {
    axios.interceptors.request.use(interceptMyAccountsAuthorizationRequestHeaders(getState));
  });

  it.each(URLS_NOT_NEEDING_AUTHORIZATION)('does not set Authorization for %p', async (url) => {
    mockAxios.onGet(url).replyOnce(200);
    const response = await axios.get(url);
    expect(response.config.headers.Authorization).toBeUndefined();
  });

  it.each(URLS_NEEDING_AUTHORIZATION)('sets Authorization for %p', async (url) => {
    mockAxios.onGet(url).replyOnce(200);
    const response = await axios.get(url);
    expect(response.config.headers.Authorization).toStrictEqual(
      `Bearer ${accessTokens[0].accessToken}`
    );
  });
});
