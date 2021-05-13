import { CustomProjectionRequestData, ProjectionRequest, ProjectionResponse } from '../types';
import api from '../../api';
import { API_ENDPOINTS } from '../../../config';

export const projectionsFixedParams = { riskModel: 'TAA6', sedolCode: 'BYX8KW0' };

const getProjections = async (data: CustomProjectionRequestData): Promise<ProjectionResponse> => {
  const requestData: ProjectionRequest = {
    ...data,
    ...projectionsFixedParams,
  };

  const response = await api.post(API_ENDPOINTS.POST_PROJECTIONS, requestData);

  return response.data;
};

export default getProjections;
