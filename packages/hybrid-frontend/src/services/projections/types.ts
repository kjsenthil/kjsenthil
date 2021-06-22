import { CommonState, RiskModel, SedolCode } from '../types';
import { TimeSeriesDatum } from '../../utils/data';
import { Breakdown, ClientResponse, InvestmentSummary } from '../myAccount';
import { AllAssets } from '../assets';

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

export interface GoalCurrentProjectionsState extends CommonState<GoalCurrentProjectionsResponse> {}

export interface GoalCurrentProjectionsRequestPayload {
  timeHorizon: number;
  preGoalRiskModel: string;
  monthlyContributions: number;
  portfolioCurrentValue: number;
  desiredMonthlyDrawdown: number;
  drawdownStartDate: string;
  drawdownEndDate: string;
  upfrontContribution: number;
  preGoalExpectedReturn: number;
  preGoalExpectedVolatility: number;
  preGoalZScoreLowerBound: number;
  preGoalZScoreUpperBound: number;
  feesPercentage: number;
  postGoalRiskModel: string;
  lumpSumAmount: number;
  statePensionAmount: number;
  desiredAmount: number;
  postGoalExpectedReturn: number;
  postGoalExpectedVolatility: number;
  postGoalZScoreLowerBound: number;
  postGoalZScoreUpperBound: number;
  netContribution: number;
  isConeGraph: boolean;
  includeStatePension: boolean;
}
export interface GoalCurrentProjectionsResponse {
  projectedGoalAgeTotal: number;
  possibleDrawdown: number;
  possibleDrawdownWithSP: number;
  projectedGoalAgeTotalWhenMarketUnderperform: number;
  possibleDrawdownWhenMarketUnderperform: number;
  possibleDrawdownWhenMarketUnderperformWithSP: number;
  projections: GoalCurrentProjectionMonth[];
}
export interface GoalCurrentProjectionMonth {
  month: number;
  lowerBound: number;
  upperBound: number;
  projectedValue: number;
  contributionLine: number;
}
export interface GoalCurrentValidationError {
  property: string;
  message: string;
  code: string;
}

export interface FetchGoalCurrentProjectionsParams {
  clientAge: number;
  drawdownAmount: number;
  drawdownStartDate: Date | null;
  drawdownEndDate: Date | null;
  shouldIncludeStatePension: boolean;
  fees: number;
  accountBreakdown?: Breakdown[];
  investmentSummary?: InvestmentSummary[];
  includedClientAccounts?: ClientResponse['included'];
  fundData: AllAssets;
}

export interface AssetModelResponse {
  id: number;
  riskModel: string;
  erValue: number;
  volatility: number;
  zScores: {
    MoreLikelyLB: number;
    MoreLikelyUB: number;
    LessLikelyLB: number;
    LessLikelyUB: number;
  };
}
