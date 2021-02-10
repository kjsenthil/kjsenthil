import { SimulationFormData } from '../components/SimulationForm/SimulationForm';

// TODO: move this to env file that can be shared with gatsby-node.js
const API_BASE_URL = 'https://digital-hybrid-mgmt.azure-api.net/digitalhybrid/Assets';

interface ProjectionRequest {
  monthlyInvestment: number;
  riskModel: string;
  sedolCode: string;
  investmentPeriod: number;
  upfrontInvestment: number;
}

interface ProjectionYear {
  year: number;
  low: number;
  medium: number;
  high: number;
  actual: number;
}

export interface ProjectionResponse {
  contributions: number;
  projections: ProjectionYear[];
}

export const getProjections = async (
  data: SimulationFormData
): Promise<ProjectionResponse | undefined> => {
  const requestData: ProjectionRequest = {
    ...data,
    riskModel: 'TAA5',
    sedolCode: 'BYX8KR5',
  };

  const response = await fetch(`${API_BASE_URL}/projections`, {
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
