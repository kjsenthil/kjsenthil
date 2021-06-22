import { CommonState, RiskModel, SedolCode } from '../types';
import { TimeSeriesDatum } from '../../utils/data';

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

export interface ProjectionMonth {
  month: number;
  lowerBound: number;
  upperBound: number;
  projectedValue: number;
  contributionLine: number;
}

export type ProjectionTargetMonth = Omit<ProjectionMonth, 'contributionLine'>;

export interface ProjectionResponse {
  contributions?: number;
  projections?: ProjectionYear[];
}

export interface EquityFund {
  riskModel: RiskModel;
  sedol: SedolCode;
  equityProportion: number;
}

export interface RiskProfileData {
  portfolioEquityPercentage: number;
  equityFunds: EquityFund[];
}

export interface PortfolioRiskProfile {
  riskModel: RiskModel;
  sedol: SedolCode;
}

export interface ProjectionsState extends CommonState {
  projections: ProjectionResponse;
  postProjectionsError?: string;
}

// This kind of data is used by the projections (and its simplified version)
// chart
export interface ProjectionsChartMetadata {
  // The age of the user as of today. Used to calculate future ages.
  todayAge: number;

  // The number of years for which the investment should be projected
  investmentPeriod: number;
}

// This kind of data is used by the projections chart to draw the projected
// portfolio value. The upperBound and lowerBound is used to draw a band around
// the main projections line.
export interface ProjectionsChartProjectionDatum extends TimeSeriesDatum {
  upperBound: number;
  lowerBound: number;
  netContributionsToDate: number;

  metadata?: Record<string, unknown>;
}

// This kind of data is used by the projection. It's displayed only if the user
// is projected to not meet their goal.
export interface ProjectionsChartProjectionTargetDatum extends TimeSeriesDatum {
  metadata?: Record<string, unknown>;
}

// The response received when projecting based on a goal
export interface GoalProjectionResponse {
  projectedRetirementAgeTotal: number;
  possibleDrawdown: number;
  possibleDrawdownWithSP: number;
  projectedRetirementAgeTotalWhenMarketUnderperform: number;
  possibleDrawdownWhenMarketUnderperform: number;
  possibleDrawdownWhenMarketUnderperformWithSP: number;
  projections: ProjectionMonth[];
}
