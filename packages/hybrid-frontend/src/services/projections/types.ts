export interface ProjectionRequest {
  upfrontInvestment: number;
  monthlyInvestment: number;
  investmentPeriod: number;
  riskModel: string;
  sedolCode: string;
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
