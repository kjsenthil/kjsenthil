import ENDPOINTS from './endpoints';

interface ProjectionRequest {
  investmentPeriod: number;
  monthlyInvestment: number;
  riskModel: string;
  sedolCode: string;
  upfrontInvestment: number;
}

export interface ProjectionYear {
  actual: number;
  high: number;
  low: number;
  medium: number;
  year: number;
}

export interface ProjectionResponse {
  contributions: number;
  projections: ProjectionYear[];
}

export type CustomProjectionRequestData = Omit<ProjectionRequest, 'riskModel' | 'sedolCode'>;

export const getProjections = async (
  data: CustomProjectionRequestData
): Promise<ProjectionResponse> => {
  const requestData: ProjectionRequest = {
    ...data,
    riskModel: 'TAA6',
    sedolCode: 'BYX8KW0',
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
