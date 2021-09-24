import api from '../../api';
import { API_ENDPOINTS } from '../../../config';
import { GetMarketQuoteStatusResponse } from './types';

const getMarketQuoteStatus = async (
  quoteRequestId: string
): Promise<GetMarketQuoteStatusResponse> => {
  const url = `${API_ENDPOINTS.GET_SHARE_QUOTE_STATUS}?quoteRequestId=${quoteRequestId}`;

  const response = await api.get<GetMarketQuoteStatusResponse>(url);

  return response.data;
};

export default getMarketQuoteStatus;
