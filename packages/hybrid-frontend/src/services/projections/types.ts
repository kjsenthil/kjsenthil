import { CommonState, RiskModel, SedolCode } from '../types';
import { TimeSeriesDatum } from '../../utils/data';
import { ClientResponse, InvestmentSummary } from '../myAccount';
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

export interface SimulatedProjectionsState extends CommonState<ProjectionResponse> {}

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
export interface ProjectionsChartProjectionDatum {
  upperBound: number;
  lowerBound: number;
  netContributionsToDate: number;
  date: Date;
  value: number;
  metadata?: Record<string, unknown>;
}

// This kind of data is used by the projection. It's displayed only if the user
// is projected to not meet their goal.
export interface ProjectionsChartProjectionTargetDatum extends TimeSeriesDatum {
  metadata?: Record<string, unknown>;
}

export interface GoalValidationError {
  property: string;
  message: string;
  code: string;
}
export type GoalCurrentProjectionsState = CommonState<GoalCurrentProjectionsResponse>;

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
  lumpSumDate: string;
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

export interface GoalCurrentProjectionsScenarioData {
  affordableDrawdown: number;
  affordableLumpSum: number;
  affordableOutflow: number;
  affordableRemainingAmount: number;
  desiredOutflow: number;
  onTrackPercentage: number;
  surplusOrShortfall: number;
  totalAffordableDrawdown: number;
  valueAtRetirement: number;
}

export interface GoalCurrentProjectionsResponse extends GoalCurrentProjectionsScenarioData {
  possibleDrawdown: number;
  projectedGoalAgeTotal: number;
  marketUnderperform: GoalCurrentProjectionsScenarioData;
  projections: GoalCurrentProjectionMonth[];
}

export interface GoalCurrentProjectionMonth {
  month: number;
  lowerBound: number;
  upperBound: number;
  projectedValue: number;
  contributionLine: number;
}

export interface FetchGoalCurrentProjectionsParams
  extends Omit<CurrentProjectionsPrerequisitePayload, 'riskProfile'> {
  clientAge: number;
  monthlyIncome: number;
  drawdownStartDate: Date | null;
  drawdownEndDate: Date | null;
  shouldIncludeStatePension: boolean;
  lumpSum: number;
  lumpSumDate?: Date | null;
  laterLifeLeftOver: number;
  fees: number;
}

export type GoalTargetProjectionsState = CommonState<GoalTargetProjectionsResponse>;

export interface FetchGoalTargetProjectionsParams {
  clientAge: number;
  drawdownAmount: number;
  desiredValueAtEndOfDrawdown: number;
  drawdownStartDate: Date;
  drawdownEndDate: Date;
  shouldIncludeStatePension: boolean;
  fees: number;
  lumpSumDate: Date;
  goalLumpSum: number;
  investmentSummary?: InvestmentSummary[];
  includedClientAccounts?: ClientResponse['included'];
  fundData: AllAssets;
}

export interface GoalTargetProjectionsRequestPayload {
  timeToAge100: number;
  portfolioValue: number;
  upfrontContribution: number;
  feesPercentage: number;
  goalLumpSum: number;
  lumpSumDate: string;
  preGoalRiskModel: RiskModel;
  postGoalRiskModel: RiskModel;
  preGoalExpectedReturn: number;
  postGoalExpectedReturn: number;
  preGoalVolatility: number;
  postGoalVolatility: number;
  drawdownStartDate: string;
  drawdownEndDate: string;
  desiredMonthlyDrawdown: number;
  desiredValueAtEndOfDrawdown: number;
  includeStatePension: boolean;
  statePensionAmount: number;
}

export interface GoalTargetProjectionsResponse {
  targetGoalAmount: number;
  monthlyContributionsRequiredToFundDrawdown: number;
  projections: GoalTargetProjectionMonth[];
}

export interface GoalTargetProjectionMonth {
  month: number; // This starts from 0
  projectedValue: number;
}

export type CurrentProjectionsPrerequisitePayload = {
  portfolioCurrentValue: number;
  monthlyContributions: number;
  assetModel: AssetModelResponse;
  riskProfile: PortfolioRiskProfile;
  totalNetContributions: number;
};

export interface AssetModelResponse {
  id: number;
  riskModel: RiskModel;
  erValue: number;
  volatility: number;
  zScores: {
    moreLikelyLb: number;
    moreLikelyUb: number;
    lessLikleyLb: number; // TYPO to be corrected in Tilney DB first
    lessLikelyUb: number;
  };
}
