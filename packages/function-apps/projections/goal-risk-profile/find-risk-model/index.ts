import { RiskModel } from "../types";
import { FindRiskModelProps } from "./types";
import {
  calculateExpectedReturn,
  calculateHoldingsWithOnTrackPercentage,
} from "../../shared-code/simulation/goal-retirement/goal-retirement";

/**
 * Given these parameters:
 * - All available asset models (erValue, volatility values related to a risk
 *   model denoted "TAAn")
 * - Details of a user's retirement goal
 *
 * Return the least risky risk model (denoted "TAAn") that can achieve 100%
 * on-track percentage for the goal, OR return the riskiest risk model that can
 * achieve the highest on-track percentage (along with this highest on-track
 * percentage).
 */
export default function findRiskModel({
  assetModels,
  feesPercentage,
  timeHorizon,
  lumpSumAmount,
  desiredAmount,
  desiredMonthlyDrawdown,
  contributionPeriodUptoLumpSum,
  contributionPeriodFromLumpSumAndDrawdown,
  goalDrawdownPeriod,
  goalTargetMonth,
  monthlyContributions,
  portfolioCurrentValue,
  upfrontContribution,
  statePensionAmount,
}: FindRiskModelProps): {
  maxOnTrackPercentage: number;
  maxOnTrackPercentageRiskModel: RiskModel;
} {
  let maxOnTrackPercentage = -Infinity;
  let maxOnTrackPercentageRiskModel = RiskModel.TAA1;

  // Sort the assetModels array in ascending order (TAA1 is always less risky
  // than TAA2)
  assetModels.sort(({ riskModel: riskModelA }, { riskModel: riskModelB }) => {
    if (riskModelA < riskModelB) return -1;
    if (riskModelA > riskModelB) return 1;
    return 0;
  });

  for (const assetModel of assetModels) {
    const { riskModel, erValue, volatility } = assetModel;

    maxOnTrackPercentageRiskModel = riskModel;

    // ----- Calculate expected returns ----- //

    const preGoalExpectedReturn = calculateExpectedReturn(
      erValue,
      feesPercentage,
      volatility
    );
    const postGoalExpectedReturn = calculateExpectedReturn(
      erValue,
      feesPercentage,
      volatility
    );

    // ----- Calculate on-track percentage ----- //

    const stats = calculateHoldingsWithOnTrackPercentage(
      timeHorizon,
      lumpSumAmount,
      desiredAmount,
      desiredMonthlyDrawdown,
      contributionPeriodUptoLumpSum,
      contributionPeriodFromLumpSumAndDrawdown,
      goalDrawdownPeriod,
      goalTargetMonth,
      monthlyContributions,
      portfolioCurrentValue,
      upfrontContribution,
      preGoalExpectedReturn,
      postGoalExpectedReturn,
      0,
      0,
      statePensionAmount
    );

    maxOnTrackPercentage = stats.onTrackPercentage;

    if (maxOnTrackPercentage >= 1) {
      break;
    }
  }

  // At this point, we have either gone through all asset models, or found an
  // asset model that gives an on-track percentage that is >= 100%.

  return {
    maxOnTrackPercentage,
    maxOnTrackPercentageRiskModel,
  };
}
