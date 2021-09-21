import { ExpectedReturns, Stats } from "../types";

export function calculateHoldingsWithOnTrackPercentage(
  timeHorizon: number,
  lumpSumAmount: number,
  desiredAmount: number,
  desiredMonthlyDrawdown: number,
  contributionPeriodUptoLumpSum: number,
  contributionPeriodFromLumpSumAndDrawdown: number,
  goalDrawdownPeriod: number,
  goalTargetMonth: number,
  monthlyContributions: number,
  portfolioCurrentValue: number,
  upfrontContribution: number,
  preGoalExpectedReturn: ExpectedReturns,
  postGoalExpectedReturn: ExpectedReturns,
  preGoalZScore: number,
  postGoalZScore: number,
  statePensionAmount: number
): Stats {
  let iterationCounter: number = 0;
  const maxIterations = 1000;
  const lowerGuessOntrackPercentage = 0;
  const upperGuessOntrackPercentage = 100;

  function calculateHoldingsWithOnTrackPercentage(
    timeHorizon: number,
    lumpSumAmount: number,
    desiredAmount: number,
    desiredMonthlyDrawdown: number,
    contributionPeriodUptoLumpSum: number,
    contributionPeriodFromLumpSumAndDrawdown: number,
    goalDrawdownPeriod: number,
    goalTargetMonth: number,
    monthlyContributions: number,
    portfolioCurrentValue: number,
    upfrontContribution: number,
    preGoalExpectedReturn: ExpectedReturns,
    postGoalExpectedReturn: ExpectedReturns,
    preGoalZScore: number,
    postGoalZScore: number,
    lowerGuessOntrackPercentage: number,
    upperGuessOntrackPercentage: number,
    maxIterations: number,
    statePensionAmount: number
  ): Stats {
    const guessOntrackPercentage =
      (upperGuessOntrackPercentage + lowerGuessOntrackPercentage) / 2 / 100;

    let desiredMonthlyDrawdownWithStatePension = statePensionAmount
      ? desiredMonthlyDrawdown - statePensionAmount / 12
      : desiredMonthlyDrawdown;
    if (desiredMonthlyDrawdownWithStatePension < 0)
      //when desired amount is less than state pension set to zero
      desiredMonthlyDrawdownWithStatePension = 0;

    const affordableDrawdown =
      desiredMonthlyDrawdownWithStatePension * guessOntrackPercentage;
    const affordableLumpSum = lumpSumAmount * guessOntrackPercentage;
    const affordableRemainingAmount = desiredAmount * guessOntrackPercentage;
    const desiredOutflow = statePensionAmount
      ? desiredAmount +
        lumpSumAmount +
        desiredMonthlyDrawdownWithStatePension * goalDrawdownPeriod
      : desiredMonthlyDrawdownWithStatePension * goalDrawdownPeriod +
        lumpSumAmount +
        desiredAmount;
    const affordableOutflow = statePensionAmount
      ? affordableRemainingAmount +
        affordableLumpSum +
        affordableDrawdown * goalDrawdownPeriod
      : desiredOutflow * guessOntrackPercentage;

    const surplusOrShortfall = desiredOutflow - affordableOutflow;
    let previousMonthHoldingAmount =
      portfolioCurrentValue + upfrontContribution;
    let holdingAmountOnLumpSumDate = 0;
    let valueAtRetirement = 0;
    for (let month = 1; month <= timeHorizon; month++) {
      const percentage = calculatePercentage(
        month,
        contributionPeriodUptoLumpSum +
          contributionPeriodFromLumpSumAndDrawdown,
        preGoalExpectedReturn.monthlyNetExpectedReturn,
        preGoalExpectedReturn.monthlyVolatility,
        preGoalZScore,
        postGoalExpectedReturn.monthlyNetExpectedReturn,
        postGoalExpectedReturn.monthlyVolatility,
        postGoalZScore
      );
      const holdingAmount = calculateHolding(
        month,
        contributionPeriodUptoLumpSum,
        contributionPeriodFromLumpSumAndDrawdown,
        goalTargetMonth,
        previousMonthHoldingAmount,
        monthlyContributions,
        portfolioCurrentValue,
        upfrontContribution,
        affordableDrawdown,
        percentage,
        affordableLumpSum,
        affordableRemainingAmount,
        holdingAmountOnLumpSumDate
      );
      if (month == goalTargetMonth) {
        if (round(holdingAmount, 0) != 0) {
          //keep counting iteration and exit if it has over the limit to avoid infinite loop.
          ++iterationCounter;
          if (iterationCounter >= maxIterations)
            throw new Error(
              "Maximum iterations reached while calculating on track percentage"
            );

          if (holdingAmount > 0) {
            lowerGuessOntrackPercentage = guessOntrackPercentage * 100;
          }

          if (holdingAmount < 0) {
            upperGuessOntrackPercentage = guessOntrackPercentage * 100;
          }
          if (lowerGuessOntrackPercentage == upperGuessOntrackPercentage) {
            upperGuessOntrackPercentage = upperGuessOntrackPercentage * 2;
          }

          return calculateHoldingsWithOnTrackPercentage(
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
            preGoalZScore,
            postGoalZScore,
            lowerGuessOntrackPercentage,
            upperGuessOntrackPercentage,
            maxIterations,
            statePensionAmount
          );
        }
      }
      previousMonthHoldingAmount = holdingAmount;
      if (month == contributionPeriodUptoLumpSum + 1) {
        holdingAmountOnLumpSumDate = holdingAmount;
      }
      if (month == goalTargetMonth) valueAtRetirement = holdingAmount;
    }

    return {
      desiredOutflow: desiredOutflow,
      onTrackPercentage: guessOntrackPercentage,
      affordableDrawdown: affordableDrawdown,
      affordableLumpSum: affordableLumpSum,
      affordableRemainingAmount: affordableRemainingAmount,
      affordableOutflow: affordableOutflow,
      surplusOrShortfall: surplusOrShortfall,
      valueAtRetirement: valueAtRetirement,
      totalAffordableDrawdown: affordableDrawdown * goalDrawdownPeriod,
    } as Stats;
  }

  return calculateHoldingsWithOnTrackPercentage(
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
    preGoalZScore,
    postGoalZScore,
    lowerGuessOntrackPercentage,
    upperGuessOntrackPercentage,
    maxIterations,
    statePensionAmount
  );
}

export function round(value: number, precision: number): number {
  const multiplier = Math.pow(10, precision || 0);
  return Math.round(value * multiplier) / multiplier;
}

export function calculateHolding(
  month: number,
  contributionPeriodUptoLumpSum: number,
  contributionPeriodFromLumpSumAndDrawdown: number,
  goalTargetMonth: number,
  PreviousMonthHolding: number,
  monthlyContributions: number,
  portfolioCurrentValue: number,
  upfrontContribution: number,
  affordableDrawdown: number,
  averagePercentage: number,
  affordableLumpSum: number,
  affordableRemainingAmount: number,
  holdingAmountOnLumpSumDate: number
): number {
  if (month > goalTargetMonth) {
    return (
      (PreviousMonthHolding - affordableDrawdown) * (1 + averagePercentage)
    );
  }

  if (month == goalTargetMonth) {
    return (
      (PreviousMonthHolding - affordableRemainingAmount) *
      (1 + averagePercentage)
    );
  }

  if (
    month >=
    contributionPeriodUptoLumpSum + contributionPeriodFromLumpSumAndDrawdown + 1
  ) {
    return (
      (PreviousMonthHolding - affordableDrawdown) * (1 + averagePercentage)
    );
  }

  if (
    contributionPeriodUptoLumpSum != 0 &&
    month > contributionPeriodUptoLumpSum + 1
  ) {
    const multiplier =
      averagePercentage != 0
        ? ((1 + averagePercentage) ** (month - contributionPeriodUptoLumpSum) -
            1) /
          averagePercentage
        : month - contributionPeriodUptoLumpSum - 1;
    return (
      holdingAmountOnLumpSumDate *
        (1 + averagePercentage) ** (month - contributionPeriodUptoLumpSum) +
      monthlyContributions * multiplier
    );
  }

  if (
    contributionPeriodUptoLumpSum != 0 &&
    month == contributionPeriodUptoLumpSum + 1
  ) {
    return (
      (PreviousMonthHolding - affordableLumpSum + monthlyContributions) *
      (1 + averagePercentage)
    );
  }

  const multiplier =
    averagePercentage != 0
      ? (1 - (1 + averagePercentage) ** month) / (1 - (1 + averagePercentage))
      : month;
  return (
    (portfolioCurrentValue + upfrontContribution) *
      (1 + averagePercentage) ** month +
    monthlyContributions * multiplier
  );
}

export function calculateExpectedReturn(
  expectedReturn: number,
  feesPercentage: number,
  expectedVolatility: number
): ExpectedReturns {
  const annualNetExpectedReturn = expectedReturn - feesPercentage;
  const monthlyNetExpectedReturn =
    (1 + annualNetExpectedReturn) ** (1 / 12) - 1;
  const monthlyVolatility = expectedVolatility / Math.sqrt(12);
  return { monthlyNetExpectedReturn, monthlyVolatility };
}

export function calculatePercentage(
  month: number,
  goalContributingPeriod: number,
  preGoalMonthlyNetExpectedReturn: number,
  preGoalMonthlyVolatility: number,
  preGoalZScore: number,
  postGoalMonthlyNetExpectedReturn: number,
  postGoalMonthlyVolatility: number,
  postGoalZScore: number
): number {
  if (month <= goalContributingPeriod) {
    return (
      ((1 + preGoalMonthlyNetExpectedReturn) ** month +
        Math.sqrt(month) * preGoalMonthlyVolatility * preGoalZScore) **
        (1 / month) -
      1
    );
  }
  return (
    ((1 + postGoalMonthlyNetExpectedReturn) ** month +
      Math.sqrt(month) * postGoalMonthlyVolatility * postGoalZScore) **
      (1 / month) -
    1
  );
}
