import api from '../../api';
import { API_ENDPOINTS } from '../../../config';
import { GetPerformanceContactResponse } from '../types';

export interface GetPerformanceContactFetcherProps {
  contactId: number;
}

export default async function getPerformanceContact({
  contactId,
}: GetPerformanceContactFetcherProps): Promise<GetPerformanceContactResponse> {
  const urlPath = API_ENDPOINTS.MYACCOUNT_PERFORMANCE_CONTACT?.replace(/{id}/, String(contactId));
  const url = `${urlPath}?include=contributions`;

  const response = await api.get<GetPerformanceContactResponse>(url);

  return response.data;
}
