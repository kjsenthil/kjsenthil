import { monthsDiff, parseDate } from "../shared-code/date-helpers/helpers";
import { ExpectedReturns, Stats } from "../shared-code/simulation/types";
import {
  calculateExpectedReturn,
  calculateHoldingsWithOnTrackPercentage,
  calculatePercentage,
} from "../shared-code/simulation/goal-retirement/goal-retirement";
import {
  ContributionMonth,
  GoldProjectionResponse,
  ProjectionMonth,
  RequestPayload,
  ResponsePayload,
  TargetProjectionMonth,
} from "./types";

function getRetirementProjection(
  inboundPayload: RequestPayload,
  today: Date
): ResponsePayload {
  let response = getRetirementTealProjectionRecursive(inboundPayload, today);
  if (response.goal.onTrack.percentage >= 100) return response;

  const goldProjectionResponse = getGoldProjection(inboundPayload, today);
  response.goal.onTrack.monthlyContributionsToReach =
    goldProjectionResponse.monthlyContributionsToReach;
  response.goal.onTrack.upfrontContributionsToReach =
    goldProjectionResponse.upfrontContributionsToReach;
  response.goal.onTrack.targetProjectionData =
    goldProjectionResponse.targetProjectionData;

  return response;
}

function getRetirementTealProjectionRecursive(
  inboundPayload: RequestPayload,
  today: Date
): ResponsePayload {
  let startDate = inboundPayload.drawdownRetirement?.startDate
    ? parseDate(inboundPayload.drawdownRetirement.startDate)
    : new Date();
  let endDate = inboundPayload.drawdownRetirement?.endDate
    ? parseDate(inboundPayload.drawdownRetirement.endDate)
    : new Date();
  let lumpSumDate = inboundPayload.drawdownRetirement?.lumpSum?.date
    ? parseDate(inboundPayload.drawdownRetirement.lumpSum.date)
    : null;
  if (lumpSumDate == null) lumpSumDate = startDate;

  let contributionPeriodUptoLumpSum = monthsDiff(today, lumpSumDate) - 1;
  //if lump sum date is past  then lump sum considered as zero
  let lumpSum = inboundPayload.drawdownRetirement?.lumpSum?.amount ?? 0;
  const isLumpSumSetup = lumpSum ? true : false;
  if (contributionPeriodUptoLumpSum < 0) {
    lumpSum = 0;
  }

  contributionPeriodUptoLumpSum =
    contributionPeriodUptoLumpSum < 0 ? 0 : contributionPeriodUptoLumpSum;

  let goalContributingPeriod = monthsDiff(today, startDate) - 1;
  goalContributingPeriod =
    goalContributingPeriod < 0 ? 0 : goalContributingPeriod;

  const contributionPeriodFromLumpSumAndDrawdown =
    contributionPeriodUptoLumpSum == 0
      ? goalContributingPeriod
      : monthsDiff(lumpSumDate, startDate);

  const preGoalExpectedReturn = calculateExpectedReturn(
    inboundPayload.preGoal.expectedReturnPercentage / 100,
    (inboundPayload.feesPercentage ?? 0) / 100,
    inboundPayload.preGoal.volatilityPercentage / 100
  );
  const postGoalExpectedReturn = calculateExpectedReturn(
    (inboundPayload.postGoal?.expectedReturnPercentage ?? 0) / 100,
    (inboundPayload.feesPercentage ?? 0) / 100,
    (inboundPayload.postGoal?.volatilityPercentage ?? 0) / 100
  );

  const goalDrawdownPeriod =
    goalContributingPeriod == 0
      ? monthsDiff(today, endDate)
      : monthsDiff(startDate, endDate) + 1;

  const goalTargetMonth = goalContributingPeriod + goalDrawdownPeriod + 1;

  const stats = calculateHoldingsWithOnTrackPercentage(
    inboundPayload.timeHorizonToProject,
    lumpSum,
    inboundPayload.drawdownRetirement?.remainingAmount ?? 0,
    inboundPayload.drawdownRetirement?.regularDrawdown ?? 0,
    contributionPeriodUptoLumpSum,
    contributionPeriodFromLumpSumAndDrawdown,
    goalDrawdownPeriod,
    goalTargetMonth,
    inboundPayload.monthlyContribution,
    inboundPayload.currentPortfolioValue,
    inboundPayload.upfrontContribution ?? 0,
    preGoalExpectedReturn,
    postGoalExpectedReturn,
    0,
    0,
    inboundPayload.drawdownRetirement?.statePensionAmount ?? 0
  );

  const projections = calculateProjection(
    inboundPayload,
    goalContributingPeriod,
    preGoalExpectedReturn,
    postGoalExpectedReturn,
    stats,
    contributionPeriodUptoLumpSum,
    contributionPeriodFromLumpSumAndDrawdown,
    goalTargetMonth,
    isLumpSumSetup
  );
  const contributions = calculateContributions(
    inboundPayload.currentNetContribution,
    inboundPayload.upfrontContribution ?? 0,
    inboundPayload.timeHorizonToProject,
    inboundPayload.monthlyContribution,
    stats.affordableLumpSum,
    stats.affordableRemainingAmount,
    stats.affordableDrawdown,
    contributionPeriodUptoLumpSum,
    contributionPeriodFromLumpSumAndDrawdown,
    goalTargetMonth,
    isLumpSumSetup
  );

  //when market underperform
  const marketUnderperformStats = calculateHoldingsWithOnTrackPercentage(
    inboundPayload.timeHorizonToProject,
    lumpSum,
    inboundPayload.drawdownRetirement?.remainingAmount ?? 0,
    inboundPayload.drawdownRetirement?.regularDrawdown ?? 0,
    contributionPeriodUptoLumpSum,
    contributionPeriodFromLumpSumAndDrawdown,
    goalDrawdownPeriod,
    goalTargetMonth,
    inboundPayload.monthlyContribution,
    inboundPayload.currentPortfolioValue,
    inboundPayload.upfrontContribution ?? 0,
    preGoalExpectedReturn,
    postGoalExpectedReturn,
    inboundPayload.preGoal.ZScoreLowerBound,
    inboundPayload.postGoal?.ZScoreLowerBound ?? 0,
    inboundPayload.drawdownRetirement?.statePensionAmount ?? 0
  );

  return {
    projectionData: projections,
    contributionData: contributions,
    goal: {
      onTrack: {
        percentage: stats.onTrackPercentage * 100,
      },
      desiredDiscountedOutflow: stats.desiredOutflow,
      affordableUnDiscountedOutflowAverage: stats.affordableOutflow,
      shortfallSurplusAverage: stats.surplusOrShortfall,
      affordableUndiscountedOutflowUnderperform:
        marketUnderperformStats.affordableOutflow,
      shortfallSurplusUnderperform: marketUnderperformStats.surplusOrShortfall,
      drawdownRetirement: {
        affordable: {
          drawdown: stats.affordableDrawdown,
          lumpSum: stats.affordableLumpSum,
          remainingAmount: stats.affordableRemainingAmount,
          totalDrawdown: stats.totalAffordableDrawdown,
        },
        underperform: {
          drawdown: marketUnderperformStats.affordableDrawdown,
          lumpSum: marketUnderperformStats.affordableLumpSum,
          remainingAmount: marketUnderperformStats.affordableRemainingAmount,
          totalDrawdown: marketUnderperformStats.totalAffordableDrawdown,
        },
      },
    },
  } as ResponsePayload;
}

function getGoldProjection(
  inboundPayload: RequestPayload,
  today: Date
): GoldProjectionResponse {
  let startDate = inboundPayload.drawdownRetirement?.startDate
    ? parseDate(inboundPayload.drawdownRetirement.startDate)
    : new Date();
  let endDate = inboundPayload.drawdownRetirement?.endDate
    ? parseDate(inboundPayload.drawdownRetirement.endDate)
    : new Date();
  let lumpSumDate = inboundPayload.drawdownRetirement?.lumpSum?.date
    ? parseDate(inboundPayload.drawdownRetirement.lumpSum.date)
    : null;
  if (lumpSumDate == null) lumpSumDate = startDate;

  const contributionPeriodUptoLumpSum = monthsDiff(today, lumpSumDate) - 1;
  const goalContributingMonths = monthsDiff(today, startDate) - 1;
  const contributionPeriodFromLumpSumAndDrawdown = monthsDiff(
    lumpSumDate,
    startDate
  );
  const goalDrawdownMonths = monthsDiff(startDate, endDate) + 1;
  const preGoalExpectedMonthlyReturn = calculateMonthlyNetExpectedReturn(
    inboundPayload.preGoal.expectedReturnPercentage / 100,
    (inboundPayload.feesPercentage ?? 0) / 100
  );
  const postGoalExpectedMonthlyReturn = calculateMonthlyNetExpectedReturn(
    (inboundPayload.postGoal?.expectedReturnPercentage ?? 0) / 100,
    (inboundPayload.feesPercentage ?? 0) / 100
  );
  const goalTargetMonth =
    contributionPeriodUptoLumpSum +
    contributionPeriodFromLumpSumAndDrawdown +
    goalDrawdownMonths +
    1;

  let regularDrawdown = 0;

  //if lump sum date is past  then lump sum considered as zero
  let lumpSum = inboundPayload.drawdownRetirement?.lumpSum?.amount ?? 0;
  if (contributionPeriodUptoLumpSum < 0) {
    lumpSum = 0;
  }

  let statePension = inboundPayload.drawdownRetirement?.statePensionAmount ?? 0;
  if (goalDrawdownMonths > 0) {
    regularDrawdown =
      statePension > 0
        ? (inboundPayload?.drawdownRetirement?.regularDrawdown ?? 0) -
          statePension / 12
        : inboundPayload?.drawdownRetirement?.regularDrawdown ?? 0;
  }

  if (regularDrawdown < 0)
    //when desired monthly is below  zero
    regularDrawdown = 0;

  let upfrontContributionRequiredToFundDrawdown = 0;
  let monthlyContributionsRequiredToFundDrawdown = 0;
  let portfolioValueRequiredTodayToAchiveTarget = 0;
  if (goalContributingMonths <= 0) {
    const compoundInterestMultiplierAtDrawdown = calculateCompoundInterestMultiplierAtDrawdown(
      goalTargetMonth,
      postGoalExpectedMonthlyReturn
    );
    const remainingAmountInTodaysMoney =
      (inboundPayload.drawdownRetirement?.remainingAmount ?? 0) /
      (1 + postGoalExpectedMonthlyReturn) ** goalTargetMonth;
    portfolioValueRequiredTodayToAchiveTarget =
      remainingAmountInTodaysMoney +
      compoundInterestMultiplierAtDrawdown * regularDrawdown;
    upfrontContributionRequiredToFundDrawdown =
      portfolioValueRequiredTodayToAchiveTarget -
      inboundPayload.currentPortfolioValue;
  } else if (contributionPeriodFromLumpSumAndDrawdown == 0) {
    const targetGoalAmount = calculateTargetGoalAmountWhenLumpsumIsOnRetirement(
      goalDrawdownMonths,
      regularDrawdown,
      lumpSum,
      postGoalExpectedMonthlyReturn,
      inboundPayload.drawdownRetirement?.remainingAmount ?? 0
    );
    monthlyContributionsRequiredToFundDrawdown = calculateMonthlyContributionsRequiredToFundDrawdownWhenLumpsumIsOnRetirement(
      targetGoalAmount,
      goalDrawdownMonths,
      goalContributingMonths,
      regularDrawdown,
      lumpSum,
      preGoalExpectedMonthlyReturn,
      postGoalExpectedMonthlyReturn,
      inboundPayload.currentPortfolioValue,
      inboundPayload.upfrontContribution ?? 0
    );
    upfrontContributionRequiredToFundDrawdown = calculateUpfrontContributionRequiredWhenLumpsumIsOnRetirement(
      preGoalExpectedMonthlyReturn,
      contributionPeriodUptoLumpSum,
      targetGoalAmount,
      inboundPayload.monthlyContribution,
      inboundPayload.currentPortfolioValue
    );
  } else {
    if (
      inboundPayload.preGoal.expectedReturnPercentage > 0 &&
      (inboundPayload.postGoal?.expectedReturnPercentage ?? 0) > 0
    ) {
      const growthInPostGoalDrawdownPeriod =
        ((1 - (1 + postGoalExpectedMonthlyReturn) ** -goalDrawdownMonths) /
          postGoalExpectedMonthlyReturn) *
        (1 + postGoalExpectedMonthlyReturn);
      const amountNeededAtEndOfDrawdown =
        (inboundPayload.drawdownRetirement?.remainingAmount ?? 0) /
        (1 + postGoalExpectedMonthlyReturn) ** goalDrawdownMonths;
      const targetGoalAgeTotal =
        regularDrawdown * growthInPostGoalDrawdownPeriod +
        amountNeededAtEndOfDrawdown;
      monthlyContributionsRequiredToFundDrawdown = calculateMonthlyContributionsRequiredToFundDrawdown(
        targetGoalAgeTotal,
        preGoalExpectedMonthlyReturn,
        contributionPeriodFromLumpSumAndDrawdown,
        inboundPayload.currentPortfolioValue,
        inboundPayload.upfrontContribution ?? 0,
        lumpSum,
        contributionPeriodUptoLumpSum
      );
      upfrontContributionRequiredToFundDrawdown = calculateUpfrontContributionRequired(
        preGoalExpectedMonthlyReturn,
        contributionPeriodUptoLumpSum,
        contributionPeriodFromLumpSumAndDrawdown,
        targetGoalAgeTotal,
        inboundPayload.monthlyContribution,
        lumpSum,
        inboundPayload.currentPortfolioValue,
        inboundPayload.upfrontContribution ?? 0
      );
      portfolioValueRequiredTodayToAchiveTarget = targetGoalAgeTotal;
    } else {
      const targetGoalAgeTotal =
        regularDrawdown * goalDrawdownMonths +
        (inboundPayload.drawdownRetirement?.remainingAmount ?? 0);
      monthlyContributionsRequiredToFundDrawdown =
        (targetGoalAgeTotal -
          inboundPayload.currentPortfolioValue -
          (inboundPayload.upfrontContribution ?? 0) +
          lumpSum) /
        goalContributingMonths;
      upfrontContributionRequiredToFundDrawdown =
        targetGoalAgeTotal +
        lumpSum -
        (inboundPayload?.upfrontContribution ?? 0) -
        inboundPayload.currentPortfolioValue -
        inboundPayload.monthlyContribution * goalContributingMonths;
      portfolioValueRequiredTodayToAchiveTarget = targetGoalAgeTotal;
    }
  }

  const projectionStartValue =
    goalContributingMonths <= 0
      ? portfolioValueRequiredTodayToAchiveTarget
      : inboundPayload.currentPortfolioValue +
        (inboundPayload.upfrontContribution ?? 0);
  const response = {
    upfrontContributionsToReach: upfrontContributionRequiredToFundDrawdown,
    monthlyContributionsToReach: monthlyContributionsRequiredToFundDrawdown,
    targetProjectionData: calculateGoldProjection(
      inboundPayload.timeHorizonToProject,
      inboundPayload.currentPortfolioValue,
      inboundPayload.upfrontContribution ?? 0,
      lumpSum,
      regularDrawdown,
      inboundPayload.monthlyContribution,
      inboundPayload.drawdownRetirement?.remainingAmount ?? 0,
      goalContributingMonths,
      preGoalExpectedMonthlyReturn,
      postGoalExpectedMonthlyReturn,
      contributionPeriodUptoLumpSum,
      contributionPeriodFromLumpSumAndDrawdown,
      goalTargetMonth,
      monthlyContributionsRequiredToFundDrawdown,
      goalDrawdownMonths,
      projectionStartValue
    ),
  } as GoldProjectionResponse;
  return response;
}

function calculateMonthlyContributionsRequiredToFundDrawdown(
  targetGoalAgeAmount: number,
  preGoalExpectedMonthlyReturn: number,
  contributionPeriodFromLumpSumAndDrawdown: number,
  portfolioValue: number,
  upfrontContribution: number,
  goalLumpSum: number,
  contributionPeriodUptoLumpSum: number
) {
  const compoundInterestMultiplierPreDrawdown = calculateCompoundInterestMultiplierPreDrawdown(
    contributionPeriodFromLumpSumAndDrawdown,
    preGoalExpectedMonthlyReturn
  );
  const compoundInterestMultiplierPreLumpSum = calculateCompoundInterestMultiplierPreDrawdown(
    contributionPeriodUptoLumpSum,
    preGoalExpectedMonthlyReturn
  );
  const valueAtDrawdownStart = calculateValueAtDrawdownStart(
    contributionPeriodUptoLumpSum,
    preGoalExpectedMonthlyReturn,
    portfolioValue,
    upfrontContribution
  );
  return (
    (targetGoalAgeAmount -
      (1 + preGoalExpectedMonthlyReturn) **
        contributionPeriodFromLumpSumAndDrawdown *
        (valueAtDrawdownStart - goalLumpSum)) /
    ((1 + preGoalExpectedMonthlyReturn) **
      contributionPeriodFromLumpSumAndDrawdown *
      compoundInterestMultiplierPreLumpSum +
      compoundInterestMultiplierPreDrawdown)
  );
}

function calculateUpfrontContributionRequired(
  preGoalExpectedMonthlyReturn: number,
  contributionPeriodUptoLumpSum: number,
  contributionPeriodFromLumpSumAndDrawdown: number,
  targetGoalAgeTotal: number,
  monthlyContributions: number,
  goalLumpSum: number,
  portfolioValue: number,
  upfrontContribution: number
) {
  const preGoalContributionFromLumpSumAndDrawdown = calculateExpectedReturnMultiplier(
    preGoalExpectedMonthlyReturn,
    contributionPeriodFromLumpSumAndDrawdown
  );
  const preGoalUptoLumpSumCompoundInterestMultiplier = calculateCompoundInterestMultiplierPreDrawdown(
    contributionPeriodUptoLumpSum,
    preGoalExpectedMonthlyReturn
  );
  const preGoalFromLumpSumAndDrawdownCompoundInterestMultiplier =
    (preGoalContributionFromLumpSumAndDrawdown - 1) /
    preGoalExpectedMonthlyReturn;

  return (
    (targetGoalAgeTotal -
      monthlyContributions *
        preGoalFromLumpSumAndDrawdownCompoundInterestMultiplier -
      preGoalContributionFromLumpSumAndDrawdown *
        (monthlyContributions * preGoalUptoLumpSumCompoundInterestMultiplier -
          goalLumpSum)) /
      (1 + preGoalExpectedMonthlyReturn) **
        (contributionPeriodUptoLumpSum +
          contributionPeriodFromLumpSumAndDrawdown) -
    portfolioValue -
    upfrontContribution
  );
}

function calculateMonthlyContributionsRequiredToFundDrawdownWhenLumpsumIsOnRetirement(
  targetGoalAmount: number,
  drawdownMonths: number,
  contributingMonths: number,
  desiredDrawdownAmount: number,
  lumpSum: number,
  expectedReturnPreDrawdown: number,
  expectedReturnAtDrawdown: number,
  portfolioValue: number,
  upfrontContribution: number
): number {
  const valueAtDrawdownStart = calculateValueAtDrawdownStart(
    contributingMonths,
    expectedReturnPreDrawdown,
    portfolioValue,
    upfrontContribution
  );
  const compoundInterestMultiplierPreDrawdown = calculateCompoundInterestMultiplierPreDrawdown(
    contributingMonths,
    expectedReturnPreDrawdown
  );
  return (
    (targetGoalAmount - valueAtDrawdownStart) /
    compoundInterestMultiplierPreDrawdown
  );
}

function calculateTargetGoalAmountWhenLumpsumIsOnRetirement(
  drawdownMonths: number,
  desiredDrawdownAmount: number,
  lumpSum: number,
  expectedReturnAtDrawdown: number,
  desiredValueAtEndOfDrawdown: number
): number {
  const valueAtDrawdownStartRetainingFundsAfterDrawdown = calculateValueAtDrawdownStartRetainingFundsAfterDrawdown(
    drawdownMonths,
    expectedReturnAtDrawdown,
    desiredValueAtEndOfDrawdown
  );
  const compoundInterestMultiplierAtDrawdown = calculateCompoundInterestMultiplierAtDrawdown(
    drawdownMonths,
    expectedReturnAtDrawdown
  );
  return (
    desiredDrawdownAmount * compoundInterestMultiplierAtDrawdown +
    valueAtDrawdownStartRetainingFundsAfterDrawdown +
    lumpSum
  );
}

function calculateExpectedReturnMultiplier(
  monthlyExpectedReturn: number,
  contributionPeriod: number
): number {
  return (1 + monthlyExpectedReturn) ** contributionPeriod;
}

function calculateValueAtDrawdownStart(
  contributingMonths: number,
  monthlyExpectedReturn: number,
  portfolioValue: number,
  upfrontContribution: number
): number {
  return (
    (1 + monthlyExpectedReturn) ** contributingMonths *
    (portfolioValue + upfrontContribution)
  );
}

function calculateCompoundInterestMultiplierPreDrawdown(
  contributingMonths: number,
  monthlyExpectedReturn: number
): number {
  return (
    ((1 + monthlyExpectedReturn) ** contributingMonths - 1) /
    monthlyExpectedReturn
  );
}

function calculateCompoundInterestMultiplierAtDrawdown(
  drawdownMonths: number,
  monthlyExpectedReturn: number
): number {
  return (
    ((1 - (1 + monthlyExpectedReturn) ** -drawdownMonths) /
      monthlyExpectedReturn) *
    (1 + monthlyExpectedReturn)
  );
}

function calculateValueAtDrawdownStartRetainingFundsAfterDrawdown(
  drawdownMonths: number,
  monthlyExpectedReturn: number,
  desiredValueAtEndOfDrawdown: number
): number {
  return (
    desiredValueAtEndOfDrawdown / (1 + monthlyExpectedReturn) ** drawdownMonths
  );
}

function calculateMonthlyNetExpectedReturn(
  expectedReturn: number,
  feesPercentage: number
): number {
  const annualNetExpectedReturn = expectedReturn - feesPercentage;
  return (1 + annualNetExpectedReturn) ** (1 / 12) - 1;
}

function calculateUpfrontContributionRequiredWhenLumpsumIsOnRetirement(
  preGoalExpectedMonthlyReturn: number,
  contributionPeriodUptoLumpSum: number,
  targetGoalAgeTotal: number,
  monthlyContributions: number,
  portfolioValue: number
) {
  return (
    (targetGoalAgeTotal -
      (monthlyContributions *
        ((1 + preGoalExpectedMonthlyReturn) ** contributionPeriodUptoLumpSum -
          1)) /
        preGoalExpectedMonthlyReturn) /
      (1 + preGoalExpectedMonthlyReturn) ** contributionPeriodUptoLumpSum -
    portfolioValue
  );
}

function calculateProjection(
  inboundPayload: RequestPayload,
  goalContributingPeriod: number,
  preGoalExpectedReturn: ExpectedReturns,
  postGoalExpectedReturn: ExpectedReturns,
  response: Stats,
  contributionPeriodUptoLumpSum: number,
  contributionPeriodFromLumpSumAndDrawdown: number,
  goalTargetMonth: number,
  isLumpSumSetup: boolean
): Array<ProjectionMonth> {
  const projections = Array<ProjectionMonth>();
  const defaultValue =
    inboundPayload.currentPortfolioValue +
    (inboundPayload.upfrontContribution ?? 0);
  projections.push(
    new ProjectionMonth(0, defaultValue, defaultValue, defaultValue)
  );

  for (let month = 1; month <= inboundPayload.timeHorizonToProject; month++) {
    //calculate percentages
    const lowerBoundGoalDrawdownPeriodPercentage: number = calculatePercentage(
      month,
      goalContributingPeriod,
      preGoalExpectedReturn.monthlyNetExpectedReturn,
      preGoalExpectedReturn.monthlyVolatility,
      inboundPayload.preGoal.ZScoreLowerBound,
      postGoalExpectedReturn.monthlyNetExpectedReturn,
      postGoalExpectedReturn.monthlyVolatility,
      inboundPayload.postGoal?.ZScoreLowerBound ?? 0
    );

    const averagePercentage: number = calculatePercentage(
      month,
      goalContributingPeriod,
      preGoalExpectedReturn.monthlyNetExpectedReturn,
      preGoalExpectedReturn.monthlyVolatility,
      0,
      postGoalExpectedReturn.monthlyNetExpectedReturn,
      postGoalExpectedReturn.monthlyVolatility,
      0
    );

    const upperBoundGoalDrawdownPeriodPercentage: number = calculatePercentage(
      month,
      goalContributingPeriod,
      preGoalExpectedReturn.monthlyNetExpectedReturn,
      preGoalExpectedReturn.monthlyVolatility,
      inboundPayload.preGoal.ZScoreUpperBound,
      postGoalExpectedReturn.monthlyNetExpectedReturn,
      postGoalExpectedReturn.monthlyVolatility,
      inboundPayload.postGoal?.ZScoreUpperBound ?? 0
    );

    const previousMonth = projections[projections.length - 1];

    const currentProjectionLine = new ProjectionMonth(
      month,
      calculateProjectionValue(
        month,
        previousMonth.lower,
        lowerBoundGoalDrawdownPeriodPercentage,
        inboundPayload.currentPortfolioValue,
        inboundPayload.upfrontContribution ?? 0,
        inboundPayload.monthlyContribution,
        response.affordableLumpSum,
        response.affordableRemainingAmount,
        response.affordableDrawdown,
        contributionPeriodUptoLumpSum,
        contributionPeriodFromLumpSumAndDrawdown,
        goalTargetMonth,
        month > contributionPeriodUptoLumpSum + 1
          ? projections[contributionPeriodUptoLumpSum + 1].lower
          : 0,
        isLumpSumSetup
      ),
      calculateProjectionValue(
        month,
        previousMonth.average,
        averagePercentage,
        inboundPayload.currentPortfolioValue,
        inboundPayload.upfrontContribution ?? 0,
        inboundPayload.monthlyContribution,
        response.affordableLumpSum,
        response.affordableRemainingAmount,
        response.affordableDrawdown,
        contributionPeriodUptoLumpSum,
        contributionPeriodFromLumpSumAndDrawdown,
        goalTargetMonth,
        month > contributionPeriodUptoLumpSum + 1
          ? projections[contributionPeriodUptoLumpSum + 1].average
          : 0,
        isLumpSumSetup
      ),
      calculateProjectionValue(
        month,
        previousMonth.upper,
        upperBoundGoalDrawdownPeriodPercentage,
        inboundPayload.currentPortfolioValue,
        inboundPayload.upfrontContribution ?? 0,
        inboundPayload.monthlyContribution,
        response.affordableLumpSum,
        response.affordableRemainingAmount,
        response.affordableDrawdown,
        contributionPeriodUptoLumpSum,
        contributionPeriodFromLumpSumAndDrawdown,
        goalTargetMonth,
        month > contributionPeriodUptoLumpSum + 1
          ? projections[contributionPeriodUptoLumpSum + 1].upper
          : 0,
        isLumpSumSetup,
        true
      )
    );

    projections.push(currentProjectionLine);
  }
  return projections;
}

function calculateContributions(
  currentNetContribution: number,
  upfrontContribution: number,
  timeHorizonToProject: number,
  monthlyContribution: number,
  affordableLumpSum: number,
  affordableRemainingAmount: number,
  affordableDrawdown: number,
  contributionPeriodUptoLumpSum: number,
  contributionPeriodFromLumpSumAndDrawdown: number,
  goalTargetMonth: number,
  isLumpSumSetup: boolean
): Array<ContributionMonth> {
  const contributions = Array<ContributionMonth>();
  contributions.push(
    new ContributionMonth(0, currentNetContribution + upfrontContribution)
  );

  for (let month = 1; month <= timeHorizonToProject; month++) {
    const previousMonth = contributions[contributions.length - 1];
    const contributionItem = new ContributionMonth(
      month,
      calculateContribution(
        month,
        previousMonth.value,
        monthlyContribution,
        goalTargetMonth,
        affordableLumpSum,
        affordableRemainingAmount,
        affordableDrawdown,
        contributionPeriodUptoLumpSum,
        contributionPeriodFromLumpSumAndDrawdown,
        isLumpSumSetup
      )
    );

    contributions.push(contributionItem);
  }
  return contributions;
}

function calculateContribution(
  month: number,
  previousMonthContributionValue: number,
  monthlyContributions: number,
  goalTargetMonth: number,
  affordableLumpSum: number,
  affordableRemainingAmount: number,
  affordableDrawdown: number,
  contributionPeriodUptoLumpSum: number,
  contributionPeriodFromLumpSumAndDrawdown: number,
  isLumpSumSetup
) {
  if (month == goalTargetMonth) {
    return previousMonthContributionValue - affordableRemainingAmount;
  }

  if (month > goalTargetMonth) {
    return previousMonthContributionValue;
  }

  if (
    contributionPeriodUptoLumpSum != 0 &&
    month == contributionPeriodUptoLumpSum + 1 &&
    isLumpSumSetup
  ) {
    return (
      previousMonthContributionValue - affordableLumpSum + monthlyContributions
    );
  }
  if (
    contributionPeriodUptoLumpSum == 0 &&
    month >= goalTargetMonth - contributionPeriodFromLumpSumAndDrawdown
  ) {
    return previousMonthContributionValue - affordableDrawdown;
  }

  if (
    month >=
    contributionPeriodUptoLumpSum + contributionPeriodFromLumpSumAndDrawdown + 1
  ) {
    return previousMonthContributionValue - affordableDrawdown;
  }
  return previousMonthContributionValue + monthlyContributions;
}

function calculateProjectionValue(
  month: number,
  previousMonthProjectedValue: number,
  percentage: number,
  portfolioCurrentValue: number,
  upfrontContribution: number,
  monthlyContributions: number,
  affordableLumpSum: number,
  affordableRemainingAmount: number,
  affordableDrawdown: number,
  contributionPeriodUptoLumpSum: number,
  contributionPeriodFromLumpSumAndDrawdown: number,
  goalTargetMonth: number,
  projectedAmountOnLumpSumDate: number,
  isLumpSumSetup: boolean,
  isUpperCalculation: boolean = false
) {
  if (
    isUpperCalculation &&
    month >= goalTargetMonth &&
    previousMonthProjectedValue <= affordableRemainingAmount
  ) {
    return (
      (previousMonthProjectedValue - affordableRemainingAmount) *
      (1 + percentage)
    );
  }

  if (!isUpperCalculation && month == goalTargetMonth) {
    return (
      (previousMonthProjectedValue - affordableRemainingAmount) *
      (1 + percentage)
    );
  }

  if (
    contributionPeriodUptoLumpSum != 0 &&
    month == contributionPeriodUptoLumpSum + 1 &&
    isLumpSumSetup
  ) {
    return (
      (previousMonthProjectedValue - affordableLumpSum + monthlyContributions) *
      (1 + percentage)
    );
  }

  if (
    month >=
    contributionPeriodUptoLumpSum + contributionPeriodFromLumpSumAndDrawdown + 1
  ) {
    return (
      (previousMonthProjectedValue - affordableDrawdown) * (1 + percentage)
    );
  }

  if (
    contributionPeriodUptoLumpSum != 0 &&
    month > contributionPeriodUptoLumpSum + 1
  ) {
    const multiplier =
      percentage != 0
        ? ((1 + percentage) ** (month - contributionPeriodUptoLumpSum) - 1) /
          percentage
        : month - contributionPeriodUptoLumpSum - 1;
    return (
      projectedAmountOnLumpSumDate *
        (1 + percentage) ** (month - contributionPeriodUptoLumpSum) +
      monthlyContributions * multiplier
    );
  }

  let multiplier = month;
  if (percentage != 0)
    multiplier = (1 - (1 + percentage) ** month) / (1 - (1 + percentage));
  return (
    (portfolioCurrentValue + upfrontContribution) * (1 + percentage) ** month +
    monthlyContributions * multiplier
  );
}

function calculateGoldProjection(
  timeToAge100: number,
  portfolioValue: number,
  upfrontContribution: number,
  goalLumpSum: number,
  desiredMonthlyDrawdown: number,
  monthlyContributions: number,
  desiredValueAtEndOfDrawdown: number,
  goalContributingMonths: number,
  preGoalExpectedMonthlyReturn: number,
  postGoalExpectedMonthlyReturn: number,
  contributionPeriodUptoLumpSum: number,
  contributionPeriodFromLumpSumAndDrawdown: number,
  goalTargetMonth: number,
  monthlyContributionsRequiredToFundDrawdown: number,
  goalDrawdownMonths: number,
  startingValue: number
): TargetProjectionMonth[] {
  const targetProjections = Array<TargetProjectionMonth>();
  const targetProjectionLine = new TargetProjectionMonth(0, startingValue);

  targetProjections.push(targetProjectionLine);

  for (let month = 1; month <= timeToAge100; month++) {
    const previousMonthProjectedValue =
      targetProjections[targetProjections.length - 1].value;

    const averagePercentage =
      month <= goalContributingMonths
        ? calculateGoldPercentage(month, preGoalExpectedMonthlyReturn)
        : calculateGoldPercentage(month, postGoalExpectedMonthlyReturn);

    let projectionValue =
      contributionPeriodFromLumpSumAndDrawdown == 0
        ? calculateGoldProjectionWhenInRetirementOrWhenLumpsumIsOnRetirement(
            month,
            previousMonthProjectedValue,
            averagePercentage,
            portfolioValue,
            upfrontContribution,
            goalLumpSum,
            desiredMonthlyDrawdown,
            goalContributingMonths,
            goalDrawdownMonths,
            monthlyContributionsRequiredToFundDrawdown
          )
        : contributionPeriodUptoLumpSum < 0
        ? calculateGoldProjectionWhenInRetirementOrWhenLumpsumIsOnRetirement(
            month,
            previousMonthProjectedValue,
            averagePercentage,
            portfolioValue,
            upfrontContribution,
            goalLumpSum,
            desiredMonthlyDrawdown,
            contributionPeriodUptoLumpSum,
            goalDrawdownMonths,
            monthlyContributions
          )
        : calculateGoldProjectionValue(
            month,
            previousMonthProjectedValue,
            averagePercentage,
            portfolioValue,
            upfrontContribution,
            monthlyContributionsRequiredToFundDrawdown,
            goalLumpSum,
            desiredValueAtEndOfDrawdown,
            desiredMonthlyDrawdown,
            contributionPeriodUptoLumpSum,
            contributionPeriodFromLumpSumAndDrawdown,
            goalTargetMonth,
            month > contributionPeriodUptoLumpSum + 1
              ? targetProjections[contributionPeriodUptoLumpSum].value
              : 0
          );

    const targetProjectionLine = new TargetProjectionMonth(
      month,
      projectionValue
    );

    targetProjections.push(targetProjectionLine);
  }
  return targetProjections;
}

function calculateGoldPercentage(
  month: number,
  monthlyNetExpectedReturn: number
): number {
  return ((1 + monthlyNetExpectedReturn) ** month) ** (1 / month) - 1;
}

function calculateGoldProjectionWhenInRetirementOrWhenLumpsumIsOnRetirement(
  month: number,
  previousMonthProjectedValue: number,
  percentage: number,
  portfolioCurrentValue: number,
  upfrontContribution: number,
  lumpSumAmount: number,
  desiredMonthlyDrawdown: number,
  goalContributingPeriod: number,
  goalDrawdownPeriod: number,
  monthlyContributions: number
) {
  if (previousMonthProjectedValue <= 0) {
    return 0;
  }

  if (
    month > goalContributingPeriod + 1 &&
    month <= goalContributingPeriod + goalDrawdownPeriod
  ) {
    return (
      (previousMonthProjectedValue - desiredMonthlyDrawdown) * (1 + percentage)
    );
  } else if (month > goalContributingPeriod + goalDrawdownPeriod) {
    return 0;
  } else if (month == goalContributingPeriod + 1) {
    return (
      (previousMonthProjectedValue - lumpSumAmount - desiredMonthlyDrawdown) *
      (1 + percentage)
    );
  }
  return (
    (portfolioCurrentValue + upfrontContribution) * (1 + percentage) ** month +
    monthlyContributions *
      ((1 - (1 + percentage) ** month) / (1 - (1 + percentage)))
  );
}

function calculateGoldProjectionValue(
  month: number,
  previousMonthProjectedValue: number,
  percentage: number,
  portfolioCurrentValue: number,
  upfrontContribution: number,
  monthlyContributionsRequiredToFundDrawdown: number,
  lumpSumAmount: number,
  desiredValueAtEndOfDrawdown: number,
  desiredMonthlyDrawdown: number,
  contributionPeriodUptoLumpSum: number,
  contributionPeriodFromLumpSumAndDrawdown: number,
  goalTargetMonth: number,
  ProjectionValueOnLumpSumDate: number
) {
  if (previousMonthProjectedValue <= 0) {
    return 0;
  }

  if (month == goalTargetMonth) {
    return previousMonthProjectedValue - desiredValueAtEndOfDrawdown;
  }

  if (month == contributionPeriodUptoLumpSum + 1) {
    return (
      (previousMonthProjectedValue -
        lumpSumAmount +
        monthlyContributionsRequiredToFundDrawdown) *
      (1 + percentage)
    );
  }

  if (
    month >=
    contributionPeriodUptoLumpSum + contributionPeriodFromLumpSumAndDrawdown + 1
  ) {
    return (
      (previousMonthProjectedValue - desiredMonthlyDrawdown) * (1 + percentage)
    );
  }

  if (month > contributionPeriodUptoLumpSum + 1) {
    let multiplier = month - contributionPeriodUptoLumpSum;
    if (percentage != 0)
      multiplier =
        ((1 + percentage) ** (month - contributionPeriodUptoLumpSum) - 1) /
        percentage;

    return (
      (ProjectionValueOnLumpSumDate - lumpSumAmount) *
        (1 + percentage) ** (month - contributionPeriodUptoLumpSum) +
      monthlyContributionsRequiredToFundDrawdown * multiplier
    );
  }

  let multiplier = month;
  if (percentage != 0)
    multiplier = (1 - (1 + percentage) ** month) / (1 - (1 + percentage));

  return (
    (portfolioCurrentValue + upfrontContribution) * (1 + percentage) ** month +
    monthlyContributionsRequiredToFundDrawdown * multiplier
  );
}

export {
  getRetirementProjection,
  getRetirementTealProjectionRecursive,
  getGoldProjection,
  calculateProjectionValue,
  calculateContribution,
  calculateMonthlyNetExpectedReturn,
  calculateValueAtDrawdownStart,
  calculateCompoundInterestMultiplierPreDrawdown,
  calculateCompoundInterestMultiplierAtDrawdown,
  calculateValueAtDrawdownStartRetainingFundsAfterDrawdown,
  calculateMonthlyContributionsRequiredToFundDrawdown,
  calculateUpfrontContributionRequired,
  calculateGoldProjectionValue,
};
