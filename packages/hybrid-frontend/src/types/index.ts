// Goal
export interface CaptureGoalData {
  targetAmount: number;
  targetYear: number;
  upfrontInvestment: number;
  monthlyInvestment: number;
  riskAppetite: string;
}

export interface GoalDetails {
  id?: string;
  name?: string;
  description?: string;
}

// Projections
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

export interface PinLoginItem {
  position: number;
  value: number;
}

export interface TokenItem {
  application: string;
  accessToken: string;
  refreshToken: string;
  sessionId: string;
}
