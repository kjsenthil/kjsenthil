import queryString from 'qs';
import api from '../../api';
import { API_ENDPOINTS } from '../../../config';
import { InvestmentAccountDetailsResponse } from '../types';

type FilterKey = 'asset-info.isin'; // Add more literal strings if more filters are required

type Filter = {
  [key in FilterKey]?: string;
};

export interface GetInvestmentAccountDetailsProps {
  accountId: number;
  filter?: Filter;
  include?: Array<'cash-position' | 'asset-info'>;
}

const getInvestmentAccountDetails = async ({
  accountId,
  filter,
  include,
}: GetInvestmentAccountDetailsProps): Promise<InvestmentAccountDetailsResponse> => {
  let path = API_ENDPOINTS.MYACCOUNT_ACCOUNT.replace(/\{id\}/, String(accountId));

  const params: Record<string, string> = {};

  if (include) {
    params.include = include.join(',');
  }

  if (filter) {
    Object.entries(filter).forEach(([key, value]) => {
      params[`filter[${key}]`] = value;
    });
  }

  path = `${path}?${queryString.stringify(params, { encode: false })}`;

  const response = await api.get<InvestmentAccountDetailsResponse>(path);

  return response.data;
};

export default getInvestmentAccountDetails;
