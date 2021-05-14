import axios from 'axios';
import { API_BASE_URL } from '../../config';
import {
  intercept401ResponseToRefreshTokens,
  interceptMyAccountsAuthorizationRequestHeaders,
  interceptXplanRequestHeaders,
  interceptResponseDataShape,
} from './interceptors';
import store from '../../store';
import { logout, refreshToken } from '../auth';

const { dispatch } = store;
const axiosSetUp = () => {
  axios.defaults.baseURL = API_BASE_URL;
  // This interceptor is temperory until the APIM handles Xplan specific headers
  axios.interceptors.request.use(interceptXplanRequestHeaders());
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
