import api from '../../api';
import { API_ENDPOINTS } from '../../../config';
import { BankAccountDetailsResponse } from '../types';

const getBankAccountDetails = async (contactId: number): Promise<BankAccountDetailsResponse> => {
  let path = API_ENDPOINTS.MYACCOUNT_BANK_DETAILS.replace(/\{id\}/, String(contactId));

  const response = await api.get<BankAccountDetailsResponse>(path);

  return response.data;
};

export default getBankAccountDetails;
