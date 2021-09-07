import api from '../../api';
import { API_ENDPOINTS } from '../../../config';
import { PostMarketQuoteRequest, PostMarketQuoteResponse } from './types';

const postCreateMarketQuote = async (params: PostMarketQuoteRequest['data']['attributes']) => {
  const createShareQuoteUrl = API_ENDPOINTS.CREATE_SHARE_QUOTE;

  const payload = {
    data: {
      type: 'share-quote',
      id: null,
      attributes: params,
    },
  };

  const response = await api.post<PostMarketQuoteResponse>(createShareQuoteUrl, payload);

  return response.data;
};

export default postCreateMarketQuote;
