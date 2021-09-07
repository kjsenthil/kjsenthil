import api from '../../api';
import { API_ENDPOINTS } from '../../../config';
import { PostShareOrderRequest, PostShareOrderResponse } from './types';

const postCreateShareOrder = async (params: PostShareOrderRequest['data']['attributes']) => {
  const createShareOrderUrl = API_ENDPOINTS.CREATE_SHARE_ORDER;

  const payload = {
    data: {
      type: 'share-order',
      id: null,
      attributes: params,
    },
  };

  const response = await api.post<PostShareOrderResponse>(createShareOrderUrl, payload);

  return response.data;
};

export default postCreateShareOrder;
