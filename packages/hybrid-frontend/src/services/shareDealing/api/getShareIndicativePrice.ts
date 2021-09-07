import api from '../../api';
import { API_ENDPOINTS } from '../../../config';
import { GetShareIndicativePriceResponse } from './types';

const getShareIndicativePrice = async (isin: string) => {
  const url = `${API_ENDPOINTS.GET_SHARE_INDICATIVE_PRICE}?isin=${isin}`;

  const response = await api.get<GetShareIndicativePriceResponse>(url);

  return response.data;
};

export default getShareIndicativePrice;
