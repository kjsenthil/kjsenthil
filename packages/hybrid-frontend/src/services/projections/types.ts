import { CommonState, RiskModel, SedolCode } from '../types';
import { TimeSeriesDatum } from '../../utils/data';

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

// This kind of data is used by the projections chart
export interface ProjectionsChartMetadata {
  // If the goal is not met, an orange line will be visible, indicating the
  // targeted goal line
  goalMet: boolean;

  // This is used to "hide" the portion of the value line after it hits zero
  // (all drawdowns made). This could be undefined in which case all points will
  // be defined
  zeroValueYear?: number | undefined;

  // The age of the user as of today. Used to calculate future ages.
  todayAge: number;

  // The number of years for which the investment should be projected
  investmentPeriod: number;
}

// This kind of data is used by the projections chart
export interface ProjectionsChartProjectionDatum extends TimeSeriesDatum {
  valueGood: number;
  valueBad: number;
  netContributionsToDate: number;

  // This is the datum for the orange "goals not met" line
  valueGoalNotMet?: number;

  metadata?: Record<string, unknown>;
}
