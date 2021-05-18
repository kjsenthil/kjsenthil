import axios from 'axios';
import { API_BASE_URL } from '../../config';
import {
  intercept401ResponseToRefreshTokens,
  interceptMyAccountsAuthorizationRequestHeaders,
  interceptResponseDataShape,
} from './interceptors';
import store from '../../store';
import { logout, refreshToken } from '../auth';

const { dispatch } = store;
const axiosSetUp = () => {
  axios.defaults.baseURL = API_BASE_URL;
  axios.interceptors.request.use(interceptMyAccountsAuthorizationRequestHeaders(store.getState));
  axios.interceptors.response.use(
    interceptResponseDataShape(),
    intercept401ResponseToRefreshTokens(
      () => dispatch(refreshToken()),
      () => dispatch(logout())
    )
  );
};

export default axiosSetUp;
