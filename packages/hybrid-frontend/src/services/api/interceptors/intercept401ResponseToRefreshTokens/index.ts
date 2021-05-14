import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { API_ENDPOINTS } from '../../../../config';

type RefreshTokenCallback = () => Promise<unknown>;
type LogoutCallback = () => void;

const intercept401ResponseToRefreshToken = (
  refreshTokenCallback: RefreshTokenCallback,
  logoutCallback: LogoutCallback
) => async (error: {
  response: AxiosResponse;
  config: AxiosRequestConfig & { hasBeenRetried?: boolean };
}) => {
  const originalRequest = error.config;

  if (
    error?.response?.status === 401 &&
    !originalRequest.url?.includes(API_ENDPOINTS.IDENTITY_REFRESH_TOKEN)
  ) {
    if (!originalRequest.hasBeenRetried) {
      originalRequest.hasBeenRetried = true;
      await refreshTokenCallback();
      return axios(originalRequest);
    }
    return logoutCallback();
  }
  return Promise.reject(error);
};

export default intercept401ResponseToRefreshToken;
