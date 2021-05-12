import { AxiosRequestConfig } from 'axios';
import { XPLAN_APP_ID } from '../../../../config';

const interceptXplanRequestHeaders = () => async (req: AxiosRequestConfig) => {
  const urlBasePart = (req.url && req.url.split('/')[1]) ?? '';
  if (['resourceful'].includes(urlBasePart)) {
    req.headers['X-Xplan-App-Id'] = XPLAN_APP_ID;
    req.withCredentials = true;
  }

  return req;
};

export default interceptXplanRequestHeaders;
