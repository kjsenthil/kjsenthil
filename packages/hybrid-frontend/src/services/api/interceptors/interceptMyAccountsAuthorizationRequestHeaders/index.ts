import Cookies from 'js-cookie';
import { AxiosRequestConfig } from 'axios';
import { AUTH_ENDPOINTS } from '../../../../config';
import { ApiAppName } from '../../../../constants';
import { AuthState } from '../../../auth';

const interceptMyAccountsAuthorizationRequestHeaders = (
  getState: () => { auth: AuthState }
) => async (req: AxiosRequestConfig) => {
  // This check is temperory until the APIM handles this
  const urlBasePart = req.url ?? '';

  if (!Object.values(AUTH_ENDPOINTS).includes(urlBasePart)) {
    let token: string;
    const myAccountsAccessToken = Cookies.get(ApiAppName.myAccounts);

    if (myAccountsAccessToken) {
      token = JSON.parse(myAccountsAccessToken)?.accessToken;
    } else {
      const {
        auth: { accessTokens },
      } = getState();
      token =
        accessTokens.find((accessToken) => accessToken.application === ApiAppName.myAccounts)
          ?.accessToken ?? '';
    }

    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }

    return req;
  }

  return req;
};

export default interceptMyAccountsAuthorizationRequestHeaders;
