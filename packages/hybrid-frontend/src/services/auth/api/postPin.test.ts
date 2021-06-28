import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { API_ENDPOINTS, MY_ACCOUNTS_API_CLIENT_ID } from '../../../config';
import postPin from './postPin';
import { tokens } from '../mocks';
import { PinLoginRequest, PinLoginResponse } from '../types';

const mockAxios = new MockAdapter(axios);
const url = API_ENDPOINTS.IDENTITY_PIN;

describe('postPin', () => {
  it(`makes a call to ${url}`, async () => {
    const pin = [
      { position: 1, value: 9 },
      { position: 2, value: 3 },
      { position: 3, value: 5 },
    ];

    const twoStepAuthCode = 'twoStepAuthCode';

    const payload: PinLoginRequest = {
      data: {
        attributes: {
          apiClientId: MY_ACCOUNTS_API_CLIENT_ID,
          pin,
          twoStepAuthCode,
        },
      },
    };

    const data: PinLoginResponse = {
      data: {
        attributes: {
          tokens,
          contactId: 1234567,
        },
      },
    };

    mockAxios.onPost(url, payload).reply(200, data);

    const response = await postPin(pin, twoStepAuthCode);

    expect(response).toStrictEqual(data);
  });
});
