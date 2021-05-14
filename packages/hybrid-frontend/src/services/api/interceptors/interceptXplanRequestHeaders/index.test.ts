import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import interceptXplanRequestHeaders from '.';
import { XPLAN_APP_ID, XPLAN_ENDPOINTS, ACCESS_TOKEN_REQUIRED_ENDPOINTS } from '../../../../config';

const mockAxios = new MockAdapter(axios);

const INVALID_XPLAN_ENDPOINTS = Object.values(ACCESS_TOKEN_REQUIRED_ENDPOINTS);
const VALID_XPLAN_ENDPOINTS = Object.values(XPLAN_ENDPOINTS);

describe('interceptXplanRequestHeaders', () => {
  beforeAll(() => {
    axios.interceptors.request.use(interceptXplanRequestHeaders());
  });

  it.each(VALID_XPLAN_ENDPOINTS)(
    'sets headers with X-Xplan-App-Id and withCredentials on %p',
    async (url) => {
      mockAxios.onGet(url).replyOnce(200);
      const response = await axios.get(url);
      expect(response.config.withCredentials).toBe(true);
      expect(response.config.headers['X-Xplan-App-Id']).toStrictEqual(XPLAN_APP_ID);
    }
  );

  it.each(INVALID_XPLAN_ENDPOINTS)(
    'does not set headers with X-Xplan-App-Id and withCredentials on %p',
    async (url) => {
      mockAxios.onGet(url).replyOnce(200);
      const response = await axios.get(url);
      expect(response.config.withCredentials).toBeUndefined();
      expect(response.config.headers['X-Xplan-App-Id']).toBeUndefined();
    }
  );
});
