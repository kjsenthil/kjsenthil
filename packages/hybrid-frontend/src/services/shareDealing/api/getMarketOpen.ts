import api from '../../api';
import { API_ENDPOINTS } from '../../../config';
import { GetMarketOpenReponse } from './types';

const getMarketOpen = async () => {
  const marketOpenUrl = API_ENDPOINTS.MARKET_OPEN;

  const response = await api.get<GetMarketOpenReponse>(marketOpenUrl);

  return response.data;
};

export default getMarketOpen;
