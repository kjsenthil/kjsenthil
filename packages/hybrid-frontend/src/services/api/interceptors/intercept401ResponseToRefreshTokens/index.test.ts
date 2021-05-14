import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import intercept401ResponseToRefreshTokens from '.';
import { API_ENDPOINTS } from '../../../../config';

const mockAxios = new MockAdapter(axios);

describe('intercept401ResponseToRefreshToken', () => {
  let refreshTokenCallback: jest.Mock;
  let logoutCallback: jest.Mock;
  let onFulfilled: jest.Mock;

  beforeAll(() => {
    refreshTokenCallback = jest.fn().mockResolvedValue({});
    logoutCallback = jest.fn();
    onFulfilled = jest.fn();
    axios.interceptors.response.use((res) => {
      onFulfilled(res);
      return res;
    }, intercept401ResponseToRefreshTokens(refreshTokenCallback, logoutCallback));
  });

  afterEach(() => {
    refreshTokenCallback.mockClear();
    logoutCallback.mockClear();
    onFulfilled.mockClear();
  });

  describe('when refresh token is needed and repeat success', () => {
    beforeEach(async () => {
      mockAxios.onGet('/protected-path').replyOnce(401);
      mockAxios.onGet('/protected-path').replyOnce(200);
      mockAxios.onPost(API_ENDPOINTS.IDENTITY_REFRESH_TOKEN).reply(200);
      await axios.get('/protected-path');
    });

    it('calls refresh token once', () => {
      expect(refreshTokenCallback).toHaveBeenCalledTimes(1);
    });

    it('does not logout', () => {
      expect(logoutCallback).toHaveBeenCalledTimes(0);
    });

    it('repeats the original request', () => {
      expect(onFulfilled).toHaveBeenCalledTimes(1);
      expect(onFulfilled).toHaveBeenCalledAfter(refreshTokenCallback);
      expect(onFulfilled).toHaveBeenCalledWith(
        expect.objectContaining({ config: expect.objectContaining({ hasBeenRetried: true }) })
      );
    });
  });

  describe('when refresh token is needed twice', () => {
    beforeEach(async () => {
      mockAxios.onGet('/protected-path').replyOnce(401);
      mockAxios.onGet('/protected-path').replyOnce(401);
      mockAxios.onPost(API_ENDPOINTS.IDENTITY_REFRESH_TOKEN).reply(200);
      await axios.get('/protected-path');
    });

    it('calls refresh token once', () => {
      expect(refreshTokenCallback).toHaveBeenCalledTimes(1);
    });

    it('logs out', () => {
      expect(logoutCallback).toHaveBeenCalledTimes(1);
    });

    it('repeats the original request', () => {
      expect(onFulfilled).toHaveBeenCalledTimes(0);
    });
  });
});
