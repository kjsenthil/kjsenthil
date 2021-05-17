import { ProjectionRequest, ProjectionResponse } from '../types';
import api from '../../api';
import { API_ENDPOINTS } from '../../../config';
import { projectionsDefaults } from '../constants';

const postProjections = async (data: ProjectionRequest): Promise<ProjectionResponse> => {
  const requestData: ProjectionRequest = {
    ...projectionsDefaults,
    ...data,
  };

  const path = API_ENDPOINTS.POST_PROJECTIONS;
  const response = await api.post<ProjectionResponse>(path, requestData);

  return response.data;
};

export default postProjections;
