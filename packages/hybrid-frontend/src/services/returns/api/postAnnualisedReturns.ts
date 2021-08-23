import api from '../../api';
import { API_ENDPOINTS } from '../../../config';
import { AnnualisedReturnsRequestPayload, AnnualisedReturnsResponse } from '../types';

const postAnnualisedReturns = async (payload?: AnnualisedReturnsRequestPayload) => {
  const annualisedReturnsUrl = API_ENDPOINTS.RETURNS_ANNUALISED_RETURN;

  const response = await api.post<AnnualisedReturnsResponse>(annualisedReturnsUrl, payload);

  return response.data;
};

export default postAnnualisedReturns;
