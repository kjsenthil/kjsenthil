import api from '../../api';
import { API_ENDPOINTS } from '../../../config';
import { GetMarketQuoteStatusResponse } from './types';

const getMarketQuoteStatus = async (quoteId: string) => {
  const url = `${API_ENDPOINTS.GET_SHARE_QUOTE_STATUS}?quoteGuid=${quoteId}`;

  const response = await api.get<GetMarketQuoteStatusResponse>(url);

  return response.data;
};

export default getMarketQuoteStatus;
