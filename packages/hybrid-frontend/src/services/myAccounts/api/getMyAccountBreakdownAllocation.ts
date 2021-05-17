import api from '../../api';
import { API_ENDPOINTS } from '../../../config';
import { BreakDownAllocationResponse } from '../types';

export enum BreakdownAllocationErrors {
  NO_EQUITIES_ERROR = 'NO_EQUITIES_ERROR',
}

export default async (accountId: string): Promise<BreakDownAllocationResponse> => {
  const path = API_ENDPOINTS.MYACCOUNT_BREAKDOWN_ALLOCATION.replace(/\{id\}/, accountId);

  try {
    const response = await api.get<BreakDownAllocationResponse>(path);
    return response.data;
  } catch (error) {
    // this endpoint will return a 404 if the customer account has no equity holdings
    if (error.response.status === 404) {
      return Promise.reject(new Error(BreakdownAllocationErrors.NO_EQUITIES_ERROR));
    }
    throw error;
  }
};
