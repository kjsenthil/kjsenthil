import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { API_ENDPOINTS } from '../../../config';
import getProjections, { projectionsFixedParams } from './getProjections';

const mockAxios = new MockAdapter(axios);
const url = API_ENDPOINTS.POST_PROJECTIONS;

describe('getProjections', () => {
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
        ...projectionsFixedParams,
      })
      .reply(200, data);

    const response = await getProjections(params);

    expect(response).toStrictEqual(data);
  });
});
