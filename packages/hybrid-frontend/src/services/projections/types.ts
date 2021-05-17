import { CommonState, RiskModel, SedolCode } from '../types';

export interface AccountData {
  id: string;
  accountName: string;
  accountValue: number;
  equityPercentage?: number;
}

export interface ProjectionRequest {
  upfrontInvestment: number;
  monthlyInvestment: number;
  investmentPeriod: number;
  riskModel?: RiskModel;
  sedolCode?: SedolCode;
}

export interface ProjectionYear {
  actual: number;
  high: number;
  low: number;
  medium: number;
  year: number;
}

export interface ProjectionResponse {
  contributions?: number;
  projections?: ProjectionYear[];
}

export interface ProjectionsState extends CommonState {
  projections: ProjectionResponse;
  postProjectionsError?: string;
}
