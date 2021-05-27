import api from '../../api';
import { API_ENDPOINTS } from '../../../config';
import { GetPerformanceContactResponse } from '../types';

export interface GetPerformanceContactFetcherProps {
  contactId: string;
}

export default async function getPerformanceContactFetcher({
  contactId,
}: GetPerformanceContactFetcherProps): Promise<GetPerformanceContactResponse> {
  const urlPath = API_ENDPOINTS.MYACCOUNT_PERFORMANCE_CONTACT?.replace(/{id}/, contactId);
  const url = `${urlPath}?include=contributions`;

  const getPerformanceContactRes = await api.get<GetPerformanceContactResponse>(url);

  return getPerformanceContactRes.data;
}
