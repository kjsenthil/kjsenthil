import { RiskModel, SedolCode } from '@tswdts/react-components';
import { CommonState } from '../types';
import { DrawdownType } from '../../constants';

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

export interface GoalValidationError {
  property: string;
  message: string;
  code: string;
}

export interface FetchGoalSimulateProjectionsParams
  extends Omit<SimulateProjectionsPrerequisitePayload, 'riskProfile'> {
  clientAge: number;
  monthlyIncome: number;
  drawdownStartDate: Date | null;
  drawdownEndDate: Date | null;
  shouldIncludeStatePension: boolean;
  lumpSum: number;
  lumpSumDate?: Date | null;
  laterLifeLeftOver: number;
  fees: number;
  additionalMonthlyContributions?: number;
  upfrontContribution?: number;
}

export type SimulateProjectionsPrerequisitePayload = {
  upfrontContributionRequiredToFundDrawdown: number;
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

export interface PortfolioAssetAllocationResponse {
  // These figures can be null if the 'accountValue' parameter is omitted
  portfolioEquityPercentage: number | null;
  portfolioCashPercentage: number | null;
}

export type GoalSimulateProjectionsState = CommonState<GoalSimulateProjectionsResponse>;

export interface GoalSimulateProjectionsRequestPayload {
  timeHorizonToProject: number;
  feesPercentage?: number;
  upfrontContribution?: number;
  monthlyContribution: number;
  currentNetContribution: number;
  currentPortfolioValue: number;
  includeGoal: boolean;
  drawdownType?: DrawdownType;
  drawdownOneOff?: {
    targetAmount: number;
    targetDate: string;
  };
  drawdownMonthly?: {
    amount: number;
    startDate: string;
    endDate: string;
  };
  drawdownAnnually?: {
    amount: number;
    startDate: string;
    endDate: string;
  };
  drawdownRetirement?: {
    regularDrawdown: number;
    startDate: string;
    endDate: string;
    lumpSum?: {
      amount?: number;
      date?: string;
    };
    remainingAmount?: number;
    statePensionAmount?: number;
  };
  preGoal: {
    expectedReturnPercentage: number;
    volatilityPercentage: number;
    ZScoreLowerBound: number;
    ZScoreUpperBound: number;
  };
  postGoal?: {
    expectedReturnPercentage: number;
    volatilityPercentage: number;
    ZScoreLowerBound: number;
    ZScoreUpperBound: number;
  };
}

export interface GoalSimulateProjectionsResponse {
  projectionData: SimulateProjectionMonth[];
  contributionData: SimulateContributionMonth[];
  goal: {
    onTrack: {
      percentage: number;
      monthlyContributionsToReach?: number;
      upfrontContributionsToReach?: number;
      targetProjectionData?: TargetProjectionMonth[];
    };
    desiredDiscountedOutflow: number;
    affordableUnDiscountedOutflowAverage: number;
    shortfallSurplusAverage: number;
    affordableUndiscountedOutflowUnderperform: number;
    shortfallSurplusUnderperform: number;
    drawdownOneOff?: {
      affordable: number;
      affordableUnderperform: number;
    };
    drawdownMonthly?: {
      affordable: number;
      affordableUnderperform: number;
    };
    drawdownAnnual?: {
      affordable: number;
      affordableUnderperform: number;
    };
    drawdownRetirement?: {
      affordable: {
        lumpSum: number;
        remainingAmount: number;
        drawdown: number;
        totalDrawdown: number;
      };
      underperform: {
        lumpSum: number;
        remainingAmount: number;
        drawdown: number;
        totalDrawdown: number;
      };
    };
  };
}

export interface SimulateProjectionMonth {
  monthNo: number;
  lower: number;
  upper: number;
  average: number;
}

export interface SimulateContributionMonth {
  monthNo: number;
  value: number;
}

export interface TargetProjectionMonth {
  monthNo: number;
  value: number;
}
