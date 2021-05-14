import { AxiosResponse } from 'axios';
import camelcaseKeys from 'camelcase-keys';

const interceptResponseDataShape = () => async (response: AxiosResponse) => {
  if (response.status === 200) {
    const transformedResponseData = camelcaseKeys(response.data, { deep: true });
    return { ...response, data: transformedResponseData };
  }
  return response;
};

export default interceptResponseDataShape;
