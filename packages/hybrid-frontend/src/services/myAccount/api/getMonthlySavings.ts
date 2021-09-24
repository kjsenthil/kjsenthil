import api from '../../api';
import { API_ENDPOINTS } from '../../../config';
import { MonthlySavingsResponse } from '../types';

export enum MonthlySavingsErrors {
  NO_SAVINGS_ERROR = 'NO_SAVINGS_ERROR',
}

const getMonthlySavings = async (accountId: string): Promise<MonthlySavingsResponse> => {
  const path = API_ENDPOINTS.MYACCOUNT_MONTHLY_SAVINGS.replace(/\{id\}/, accountId);

  try {
    const response = await api.get<MonthlySavingsResponse>(path);
    return response.data;
  } catch (error) {
    // this endpoint will return a 404 if the customer account has no monthly savings
    if (error.response.status === 404) {
      return Promise.reject(new Error(MonthlySavingsErrors.NO_SAVINGS_ERROR));
    }
    throw error;
  }
};

export default getMonthlySavings;
