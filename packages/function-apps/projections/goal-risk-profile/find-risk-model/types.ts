import { AssetModel } from "../types";

export interface FindRiskModelProps {
  assetModels: AssetModel[];

  feesPercentage: number;

  timeHorizon: number;
  lumpSumAmount: number;
  desiredAmount: number;
  desiredMonthlyDrawdown: number;
  contributionPeriodUptoLumpSum: number;
  contributionPeriodFromLumpSumAndDrawdown: number;
  goalDrawdownPeriod: number;
  goalTargetMonth: number;
  monthlyContributions: number;
  portfolioCurrentValue: number;
  upfrontContribution: number;
  statePensionAmount: number;
}
