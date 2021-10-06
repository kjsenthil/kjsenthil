import { apiBaseUrl } from '../environments/env';

let BASE_URL = '';
const apiEndpoint = {
  getBaseUrl: () => {
    BASE_URL = apiBaseUrl;
    return apiEndpoint;
  },

  path: (path) => `${BASE_URL}${path}`,
};

export { apiEndpoint as default };
