import { RequestPayload } from "../types";
import { FindRiskModelProps } from "../find-risk-model/types";
import { monthsDiff, parseDate } from "../../shared-code/date-helpers/helpers";

/**
 * Mutate the inbound payload object with default values.
 */
export default function prepareInputValuesDrawdownRetirement(
  inboundPayload: RequestPayload
): FindRiskModelProps {
  const today = new Date();

  // ----- Lump sum ----- //

  let startDate = inboundPayload.drawdownRetirement?.startDate
    ? parseDate(inboundPayload.drawdownRetirement.startDate)
    : today;
  let endDate = inboundPayload.drawdownRetirement?.endDate
    ? parseDate(inboundPayload.drawdownRetirement.endDate)
    : today;
  let lumpSumDate = inboundPayload.drawdownRetirement?.lumpSum?.date
    ? parseDate(inboundPayload.drawdownRetirement.lumpSum.date)
    : null;
  if (lumpSumDate === null) lumpSumDate = startDate;

  let contributionPeriodUptoLumpSum = monthsDiff(today, lumpSumDate) - 1;
  // If lump sum date is in the past then lump sum is considered as zero
  let lumpSum = inboundPayload.drawdownRetirement?.lumpSum?.amount ?? 0;
  if (contributionPeriodUptoLumpSum < 0) {
    lumpSum = 0;
  }

  let goalContributingPeriod = monthsDiff(today, startDate) - 1;
  goalContributingPeriod =
    goalContributingPeriod < 0 ? 0 : goalContributingPeriod;

  const contributionPeriodFromLumpSumAndDrawdown =
    contributionPeriodUptoLumpSum === 0
      ? goalContributingPeriod
      : monthsDiff(lumpSumDate, startDate);

  const goalDrawdownPeriod =
    goalContributingPeriod === 0
      ? monthsDiff(today, endDate)
      : monthsDiff(startDate, endDate) + 1;

  const goalTargetMonth = goalContributingPeriod + goalDrawdownPeriod + 1;

  return {
    assetModels: inboundPayload.assetModels,
    timeHorizon: inboundPayload.timeHorizonToProject,
    lumpSumAmount: lumpSum,
    desiredAmount: inboundPayload.drawdownRetirement?.remainingAmount ?? 0,
    desiredMonthlyDrawdown:
      inboundPayload.drawdownRetirement?.regularDrawdown ?? 0,
    contributionPeriodUptoLumpSum,
    contributionPeriodFromLumpSumAndDrawdown,
    goalDrawdownPeriod,
    goalTargetMonth,
    monthlyContributions: inboundPayload.monthlyContribution,
    portfolioCurrentValue: inboundPayload.currentPortfolioValue,
    upfrontContribution: inboundPayload.upfrontContribution ?? 0,
    feesPercentage: inboundPayload.feesPercentage ?? 0,
    statePensionAmount:
      inboundPayload.drawdownRetirement?.statePensionAmount ?? 0,
  };
}
