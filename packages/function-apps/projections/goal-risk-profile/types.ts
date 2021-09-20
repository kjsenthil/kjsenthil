import { DrawdownType } from "../simulate-projection/types";

export interface ExpectedReturns {
  monthlyNetExpectedReturn: number;
  monthlyVolatility: number;
}

export enum RiskModel {
  TAA1 = "TAA1",
  TAA2 = "TAA2",
  TAA3 = "TAA3",
  TAA4 = "TAA4",
  TAA5 = "TAA5",
  TAA6 = "TAA6",
  TAA7 = "TAA7",
}

export interface AssetModel {
  id: number;
  riskModel: RiskModel;
  erValue: number;
  volatility: number;
  zScores: {
    MoreLikelyLB: number;
    MoreLikelyUB: number;
    LessLikelyLB: number;
    LessLikelyUB: number;
  };
}

export interface RequestPayload {
  assetModels: AssetModel[];

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
}
