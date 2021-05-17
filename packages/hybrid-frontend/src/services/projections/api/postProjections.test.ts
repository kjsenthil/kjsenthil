import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { API_ENDPOINTS } from '../../../config';
import postProjections from './postProjections';
import { projectionsDefaults } from '../constants';

const mockAxios = new MockAdapter(axios);
const url = API_ENDPOINTS.POST_PROJECTIONS;

describe('postProjections', () => {
  it(`makes a call to ${url}`, async () => {
    const params = {
      upfrontInvestment: 4000,
      monthlyInvestment: 200,
      investmentPeriod: 30,
    };
    const data = {
      contributions: 30,
      projections: [],
    };

    mockAxios
      .onPost(url, {
        ...params,
        ...projectionsDefaults,
      })
      .reply(200, data);

    const response = await postProjections(params);

    expect(response).toStrictEqual(data);
  });
});
