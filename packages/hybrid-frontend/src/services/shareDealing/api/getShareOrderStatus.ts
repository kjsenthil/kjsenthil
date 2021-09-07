import api from '../../api';
import { API_ENDPOINTS } from '../../../config';
import { GetShareOrderStatusResponse } from './types';

const getShareOrderStatus = async (orderId: string) => {
  const url = `${API_ENDPOINTS.GET_SHARE_ORDER_STATUS}?orderId=${orderId}`;

  const response = await api.get<GetShareOrderStatusResponse>(url);

  return response.data;
};

export default getShareOrderStatus;
