import { sendEvent } from '@tsw/tracking-util';
import { PinLoginItem } from '@tsw/react-components';
import api from '../../api';
import { MY_ACCOUNTS_API_CLIENT_ID, API_ENDPOINTS } from '../../../config';
import { PinLoginRequest, PinLoginResponse } from '../types';

const postPin = async (pinLoginVals: PinLoginItem[], twoStepAuthCode: string) => {
  const payload: PinLoginRequest = {
    data: {
      attributes: {
        apiClientId: MY_ACCOUNTS_API_CLIENT_ID,
        pin: pinLoginVals,
        twoStepAuthCode,
      },
    },
  };

  const response = await api.post<PinLoginResponse>(API_ENDPOINTS.IDENTITY_PIN, payload);

  sendEvent({
    event: 'login',
  });

  return response.data;
};

export default postPin;
