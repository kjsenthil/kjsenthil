import api from '../../api';
import { API_ENDPOINTS } from '../../../config';
import { PostLimitCostRequest, PostLimitCostResponse } from './types';

const postLimitCost = async (params: PostLimitCostRequest['data']['attributes']) => {
  const url = API_ENDPOINTS.GET_LIMIT_COST;

  const payload = {
    data: {
      type: 'limit-cost',
      id: null,
      attributes: params,
    },
  };

  const response = await api.post<PostLimitCostResponse>(url, payload);

  return response.data;
};

export default postLimitCost;
