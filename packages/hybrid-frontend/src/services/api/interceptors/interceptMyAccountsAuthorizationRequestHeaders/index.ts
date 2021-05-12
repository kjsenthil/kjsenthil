import { AxiosRequestConfig } from 'axios';
import { ApiAppName } from '../../../../constants';
import { AuthState } from '../../../auth';

const interceptMyAccountsAuthorizationRequestHeaders = (
  getState: () => { auth: AuthState }
) => async (req: AxiosRequestConfig) => {
  // This check is temperory until the APIM handles this
  const urlBasePart = (req.url && req.url.split('/')[1]) ?? '';
  if (['myaccount', 'Assets', 'OxfordRisk', 'projections'].includes(urlBasePart)) {
    const {
      auth: { accessTokens },
    } = getState();

    const token = accessTokens.find(
      (accessToken) => accessToken.application === ApiAppName.myAccounts
    );

    if (token) {
      req.headers.Authorization = `Bearer ${token.accessToken}`;
    }
  }

  return req;
};

export default interceptMyAccountsAuthorizationRequestHeaders;
