import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import interceptResponseDataShape from '.';

const mockAxios = new MockAdapter(axios);

describe('interceptResponseDataShape', () => {
  beforeAll(() => {
    axios.interceptors.response.use(interceptResponseDataShape());
  });

  it('converts response data object to camelcase', async () => {
    mockAxios.onGet('/path').reply(200, {
      Data: { Type: 'some-type', id: 'id', Attributes: { BestInvestAccount: 'ISA' } },
    });

    const response = await axios.get('/path');

    expect(response.data).toStrictEqual({
      data: { type: 'some-type', id: 'id', attributes: { bestInvestAccount: 'ISA' } },
    });
  });
});
