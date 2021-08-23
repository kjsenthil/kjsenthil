import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import {
  AnnualisedReturnsRequestPayload,
  AnnualisedReturnsResponse,
  postAnnualisedReturns,
} from '..';
import { API_ENDPOINTS } from '../../../config';

const mockAxios = new MockAdapter(axios);
const url = API_ENDPOINTS.RETURNS_ANNUALISED_RETURN;

describe('postAnnualisedReturns', () => {
  it(`makes a call to ${url}`, async () => {
    const params: AnnualisedReturnsRequestPayload = {
      firstPerformanceData: {
        date: '2015-01-01',
        firstPerformanceAmount: 1000,
      },
      netContributionData: [
        {
          date: '2015-01-01',
          netContributionsToDate: 1000,
        },
        {
          date: '2016-01-01',
          netContributionsToDate: 2500,
        },
        {
          date: '2017-01-01',
          netContributionsToDate: 1700,
        },
        {
          date: '2018-01-01',
          netContributionsToDate: 1200,
        },
        {
          date: '2019-01-01',
          netContributionsToDate: 2200,
        },
        {
          date: '2020-01-01',
          netContributionsToDate: 3400,
        },
        {
          date: '2021-01-01',
          netContributionsToDate: 4400,
        },
      ],
      currentPortfolioData: {
        date: '2021-07-21',
        currentPortfolioAmount: -9200,
      },
    };

    const data: AnnualisedReturnsResponse = {
      annualisedReturnValue: 20.77898137116826,
      transactionData: [
        {
          date: '2015-01-01',
          transactionAmount: 1000,
        },
        {
          date: '2016-01-01',
          transactionAmount: 1500,
        },
        {
          date: '2017-01-01',
          transactionAmount: -800,
        },
        {
          date: '2018-01-01',
          transactionAmount: -500,
        },
        {
          date: '2019-01-01',
          transactionAmount: 1000,
        },
        {
          date: '2020-01-01',
          transactionAmount: 1200,
        },
        {
          date: '2021-01-01',
          transactionAmount: 1000,
        },
        {
          date: '2021-07-21',
          transactionAmount: -9200,
        },
      ],
    };

    mockAxios
      .onPost(url, {
        ...params,
      })
      .reply(200, data);

    const response = await postAnnualisedReturns(params);

    expect(response).toStrictEqual(data);
  });
});
