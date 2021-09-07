import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { API_ENDPOINTS } from '../../../config';
import getAssetModel from './getAssetModel';

const mockAxios = new MockAdapter(axios);
const riskModelName = 'TAA2';
const url = API_ENDPOINTS.TILNEY_ASSET_MODEL.replace(/\{riskName\}/, riskModelName);

describe('getAssetModel', () => {
  it(`makes a call to ${url}`, async () => {
    const mockData = {
      id: 1,
      riskModel: 'TAA1',
      erValue: 0.0333,
      volatility: 0.0537,
      zScores: {
        moreLikelyLb: -0.037506582937548,
        moreLikelyUb: 0.101296240386098,
        lessLikleyLb: -0.065337942794282,
        lessLikelyUb: 0.119393261342225,
      },
    };

    mockAxios.onGet(url).reply(200, mockData);

    const response = await getAssetModel(riskModelName);

    expect(response).toEqual(mockData);
  });
});
