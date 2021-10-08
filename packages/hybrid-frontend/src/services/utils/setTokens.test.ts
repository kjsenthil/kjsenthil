import Cookies from 'js-cookie';
import { TokenItem } from '../auth';
import { ApiAppName } from '../../constants';
import setTokensInCookies from './setTokens';

let mockSetCookie: jest.Mock;
jest.mock('js-cookie', () => ({
  __esModule: true, // mock the exports
  default: {
    set: jest.fn().mockImplementation((...args) => {
      mockSetCookie(...args);
    }),
  },
}));

describe('setTokensInCookies', () => {
  beforeAll(() => {
    mockSetCookie = Cookies.set as jest.Mock;
  });
  it('Sets token in cookie ', () => {
    const domain: string = 'bestinvest.com';
    const tokens: TokenItem[] = [
      {
        application: 'MyAccountsApi',
        accessToken:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoibmFtZSIsInJvbGUiOiJyb2xlIiwic3ViIjoic3ViamVjdCIsImFwaV9jbGllbnRfaWQiOiJteWFjY291bnRzLXNwYSIsInNlc3Npb24iOiIyMTkwNzZiMy1iYzdkLTQ5MzQtYTNlOC02NmU5MDg5NGUxZTgiLCJjb250YWN0IjoiMjgzNzMyIiwiYWNjb3VudHMiOiIyMDQ5OSwyMDUwMCwyMDg3MSIsImxpbmthY2NvdW50cyI6IiIsImF1ZCI6Im15YWNjb3VudHNhcGkuYmVzdGludmVzdC5jby51ayIsImV4cCI6MTYyMDEzMzUxNiwiaXNzIjoiaWRlbnRpdHlhcGkuYmVzdGludmVzdC5jby51ayJ9.uw73xvkWWOQ7NgII4swOvpvKZTEuD2FQKPQn5llAU4o',
        refreshToken: 'b4b19eb4-b7b6-4499-9284-2c86ae770128',
        sessionId: '219076b3-bc7d-4934-a3e8-66e90894e1e8',
      },
      {
        application: 'OisApi',
        accessToken:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoibmFtZSIsInJvbGUiOiJyb2xlIiwic3ViIjoic3ViamVjdCIsImFwaV9jbGllbnRfaWQiOiJteWFjY291bnRzLXNwYSIsInNlc3Npb24iOiIyMTkwNzZiMy1iYzdkLTQ5MzQtYTNlOC02NmU5MDg5NGUxZTgiLCJjb250YWN0IjoiMjgzNzMyIiwiYWNjb3VudHMiOiIyMDQ5OSwyMDUwMCwyMDg3MSIsImxpbmthY2NvdW50cyI6IisImF1ZCI6Im9pc2FwaS5iZXN0aW52ZXN0LmNvLnVrIiwiZXhwIjoxNjIwMTMzNTE2LCJpc3MiOiJpZGVudGl0eWFwaS5iZXN0aW52ZXN0LmNvLnVrIn0.khk9W85PR3E83MQeC9Vpqz4LHEcDmwm_DLtLpKKv6oE',
        refreshToken: '14dbdb50-6eab-45eb-a1c9-a72f67f45468',
        sessionId: '219076b3-bc7d-4934-a3e8-66e90894e1e8',
      },
      {
        application: 'OnlineApi',
        accessToken:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ8.eyJuYW1lIjoibmFtZSIsInJvbGUiOiJyb2xlIiwic3ViIjoic3ViamVjdCIsImFwaV9jbGllbnRfaWQiOiJteWFjY291bnRzLXNwYSIsInNlc3Npb24iOiIyMTkwNzZiMy1iYzdkLTQ5MzQtYTNlOC02NmU5MDg5NGUxZTgiLCJjb250YWN0IjoiMjgzNzMyIiwiYWNjb3VudHMiOiIyMDQ5OSwyMDUwMCwyMDg3MSIsImxpbmthY2NvdW50cyI6IisImF1ZCI6Im9pc2FwaS5iZXN0aW52ZXN0LmNvLnVrIiwiZXhwIjoxNjIwMTMzNTE2LCJpc3MiOiJpZGVudGl0eWFwaS5iZXN0aW52ZXN0LmNvLnVrIn0.khk9W85PR3E83MQeC9Vpqz4LHEcDmwm_DLtLpKKv6oE',
        refreshToken: '14dbdb50-6eab-45eb-a1c9-a72f67f45468',
        sessionId: '219076b3-bc7d-4934-a3e8-66e90894e1e8',
      },
    ];
    setTokensInCookies(tokens, { cookieDomain: domain });

    expect(mockSetCookie).toHaveBeenCalledWith(
      ApiAppName.myAccounts,
      JSON.stringify({ accessToken: tokens[0].accessToken, refreshToken: tokens[0].refreshToken }),
      {
        expires: jasmine.any(Object),
        domain,
      }
    );
    expect(mockSetCookie).toHaveBeenCalledWith(
      ApiAppName.ois,
      JSON.stringify({ accessToken: tokens[1].accessToken, refreshToken: tokens[1].refreshToken }),
      {
        expires: jasmine.any(Object),
        domain,
      }
    );
    expect(mockSetCookie).toHaveBeenCalledWith(
      ApiAppName.online,
      JSON.stringify({ accessToken: tokens[2].accessToken, refreshToken: tokens[2].refreshToken }),
      {
        expires: jasmine.any(Object),
        domain,
      }
    );
    expect(mockSetCookie).toBeCalledTimes(3);
  });
});
