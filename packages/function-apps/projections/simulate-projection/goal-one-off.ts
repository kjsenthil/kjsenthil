import { monthsDiff, parseDate } from "./helpers";
import { RequestPayload } from "./types";

function calculateOnTrackPercentage(inboundPayload: RequestPayload, today: Date): number {
    const annualNetExpectedReturns = inboundPayload.preGoal.expectedReturnPercentage - (inboundPayload.feesPercentage ?? 0);
    const monthlyNetExpectedReturns = Math.pow((1 + annualNetExpectedReturns/100), 1/12) - 1;
    const timeTillGoalInMonths =  monthsDiff(today, inboundPayload.drawdownOneOff?.targetDate ? parseDate(inboundPayload.drawdownOneOff.targetDate) : today);
    const multiplier = (Math.pow((1 + monthlyNetExpectedReturns), timeTillGoalInMonths) - 1) / monthlyNetExpectedReturns;
    const valueOfCurrentHoldingsAndUpFrontContributionAtGoalTargetDate = Math.pow((1 + monthlyNetExpectedReturns), timeTillGoalInMonths) * ((inboundPayload.upfrontContribution ?? 0) + inboundPayload.currentPortfolioValue);
    const totalAmountProjectedAtGoalDate = valueOfCurrentHoldingsAndUpFrontContributionAtGoalTargetDate + (inboundPayload.monthlyContribution * multiplier);
    return totalAmountProjectedAtGoalDate / (inboundPayload.drawdownOneOff?.targetAmount ?? 1) * 100;
  }

export {
    calculateOnTrackPercentage
}