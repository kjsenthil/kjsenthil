import { CustomProjectionRequestData, ProjectionRequest, ProjectionResponse } from '../types';
import { projectionsFixedParams } from './apiConstants';
import ENDPOINTS from './endpoints';

export default async (data: CustomProjectionRequestData): Promise<ProjectionResponse> => {
  const requestData: ProjectionRequest = {
    ...data,
    ...projectionsFixedParams,
  };

  const response = await fetch(ENDPOINTS['post-projections'], {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestData),
  });

  if (!response.ok) {
    return Promise.reject(new Error('Unable to fetch asset details'));
  }

  const resultData = await response.json();
  return resultData;
};
