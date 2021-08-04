import { monthsDiff } from "./helpers";
import { ContributionMonth, Drawdown, ExpectedReturns, ProjectionMonth, RequestPayload, ResponsePayload, Stats } from "./types";

function getRetirementProjection(inboundPayload: RequestPayload, today: Date): ResponsePayload {
  return getRetirementTealProjectionRecursive(inboundPayload, today);
}

function getRetirementTealProjectionRecursive(inboundPayload: RequestPayload, today: Date): ResponsePayload {
  let lumpSumDate = inboundPayload.drawdownRetirement?.lumpSum?.date;
  if (lumpSumDate == null)
    lumpSumDate = inboundPayload.drawdownRetirement?.startDate ?? new Date();

  let contributionPeriodUptoLumpSum = monthsDiff(today, lumpSumDate) - 1;
  contributionPeriodUptoLumpSum = contributionPeriodUptoLumpSum < 0 ? 0 : contributionPeriodUptoLumpSum;
  let goalContributingPeriod = monthsDiff(today, inboundPayload.drawdownRetirement?.startDate ?? new Date()) - 1;
  goalContributingPeriod = goalContributingPeriod < 0 ? 0 : goalContributingPeriod;

  const contributionPeriodFromLumpSumAndDrawdown = (contributionPeriodUptoLumpSum == 0) ? goalContributingPeriod : monthsDiff(lumpSumDate, inboundPayload.drawdownRetirement?.startDate ?? new Date());

  const preGoalExpectedReturn = calculateExpectedReturn(inboundPayload.preGoal.expectedReturnPercentage/100, (inboundPayload.feesPercentage ?? 0)/100, inboundPayload.preGoal.volatilityPercentage/100);
  const postGoalExpectedReturn = calculateExpectedReturn((inboundPayload.postGoal?.expectedReturnPercentage ?? 0)/100, (inboundPayload.feesPercentage ?? 0)/100, (inboundPayload.postGoal?.volatilityPercentage ?? 0)/100);

  const goalDrawdownPeriod = goalContributingPeriod == 0 ? monthsDiff(today, inboundPayload.drawdownRetirement?.endDate ?? new Date()) : monthsDiff(inboundPayload.drawdownRetirement?.startDate ?? new Date(), inboundPayload.drawdownRetirement?.endDate ?? new Date()) + 1;

  const goalTargetMonth = goalContributingPeriod + goalDrawdownPeriod + 1;

  const drawdown = calculateDrawdown(preGoalExpectedReturn.monthlyNetExpectedReturn, goalContributingPeriod, inboundPayload.currentPortfolioValue, inboundPayload.upfrontContribution ?? 0, inboundPayload.monthlyContribution, inboundPayload.drawdownRetirement?.remainingAmount ?? 0, inboundPayload.drawdownRetirement?.lumpSum?.amount ?? 0, postGoalExpectedReturn.monthlyNetExpectedReturn, goalDrawdownPeriod, inboundPayload.drawdownRetirement?.statePensionAmount ?? 0);

  const stats = calculateHoldingsWithOnTrackPercentage(inboundPayload.timeHorizonToProject, inboundPayload.drawdownRetirement?.lumpSum?.amount ?? 0, inboundPayload.drawdownRetirement?.remainingAmount ?? 0, inboundPayload.drawdownRetirement?.regularDrawdown ?? 0, contributionPeriodUptoLumpSum, contributionPeriodFromLumpSumAndDrawdown, goalDrawdownPeriod, goalTargetMonth, inboundPayload.monthlyContribution, inboundPayload.currentPortfolioValue, inboundPayload.upfrontContribution ?? 0, preGoalExpectedReturn, postGoalExpectedReturn, 0, 0, inboundPayload.drawdownRetirement?.statePensionAmount ?? 0);
  stats.projectedGoalAgeTotal = drawdown.projectedGoalAgeTotal;
  stats.possibleDrawdown = drawdown.possibleDrawdown;

  const projections = calculateProjection(inboundPayload, goalContributingPeriod, preGoalExpectedReturn, postGoalExpectedReturn, stats, contributionPeriodUptoLumpSum, contributionPeriodFromLumpSumAndDrawdown, goalTargetMonth);
  const contributions = calculateContributions(inboundPayload.currentNetContribution, inboundPayload.upfrontContribution ?? 0, inboundPayload.timeHorizonToProject, inboundPayload.monthlyContribution, stats.affordableLumpSum, stats.affordableRemainingAmount, stats.affordableDrawdown, contributionPeriodUptoLumpSum, contributionPeriodFromLumpSumAndDrawdown, goalTargetMonth);

  //when market underperform
  const marketUnderperformStats = calculateHoldingsWithOnTrackPercentage(inboundPayload.timeHorizonToProject, inboundPayload.drawdownRetirement?.lumpSum?.amount ?? 0, inboundPayload.drawdownRetirement?.remainingAmount ?? 0, inboundPayload.drawdownRetirement?.regularDrawdown ?? 0, contributionPeriodUptoLumpSum, contributionPeriodFromLumpSumAndDrawdown, goalDrawdownPeriod, goalTargetMonth, inboundPayload.monthlyContribution, inboundPayload.currentPortfolioValue, inboundPayload.upfrontContribution ?? 0, preGoalExpectedReturn, postGoalExpectedReturn, inboundPayload.preGoal.ZScoreLowerBound, inboundPayload.postGoal?.ZScoreLowerBound ?? 0, inboundPayload.drawdownRetirement?.statePensionAmount ?? 0);

  return {
    projectionData: projections,
    contributionData: contributions,
    goal: {
      onTrack:{
        percentage: stats.onTrackPercentage   
      },
      desiredDiscountedOutflow: stats.desiredOutflow,
      affordableUnDiscountedOutflowAverage: stats.affordableOutflow,
      shortfallSurplusAverage: stats.surplusOrShortfall,
      affordableUndiscountedOutflowUnderperform: marketUnderperformStats.affordableOutflow,
      shortfallSurplusUnderperform: marketUnderperformStats.surplusOrShortfall,
      drawdownRetirement : {
        affordable: {
          drawdown: stats.affordableDrawdown,
          lumpSum: stats.affordableLumpSum,
          remainingAmount: stats.affordableRemainingAmount,
          totalDrawdown: stats.totalAffordableDrawdown
        },
        underperform: {
          drawdown: marketUnderperformStats.affordableDrawdown,
          lumpSum: marketUnderperformStats.affordableLumpSum,
          remainingAmount: marketUnderperformStats.affordableRemainingAmount,
          totalDrawdown: marketUnderperformStats.totalAffordableDrawdown
        }
      }
    }
  } as ResponsePayload;
}

function calculateProjection(inboundPayload: RequestPayload, goalContributingPeriod: number, preGoalExpectedReturn: ExpectedReturns, postGoalExpectedReturn: ExpectedReturns, response: Stats, contributionPeriodUptoLumpSum: number, contributionPeriodFromLumpSumAndDrawdown: number, goalTargetMonth: number): Array<ProjectionMonth> {
  const projections = Array<ProjectionMonth>();
  const defaultValue = inboundPayload.currentPortfolioValue + (inboundPayload.upfrontContribution ?? 0);
  projections.push(new ProjectionMonth(0, defaultValue, defaultValue, defaultValue));

  for (let month = 1; month <= inboundPayload.timeHorizonToProject; month++) {
      //calculate percentages
      const lowerBoundGoalDrawdownPeriodPercentage: number = calculatePercentage(month, goalContributingPeriod, preGoalExpectedReturn.monthlyNetExpectedReturn, preGoalExpectedReturn.monthlyVolatility, inboundPayload.preGoal.ZScoreLowerBound, postGoalExpectedReturn.monthlyNetExpectedReturn, postGoalExpectedReturn.monthlyVolatility, (inboundPayload.postGoal?.ZScoreLowerBound ?? 0));

      const averagePercentage: number = calculatePercentage(month, goalContributingPeriod, preGoalExpectedReturn.monthlyNetExpectedReturn, preGoalExpectedReturn.monthlyVolatility, 0, postGoalExpectedReturn.monthlyNetExpectedReturn, postGoalExpectedReturn.monthlyVolatility, 0);

      const upperBoundGoalDrawdownPeriodPercentage: number = calculatePercentage(month, goalContributingPeriod, preGoalExpectedReturn.monthlyNetExpectedReturn, preGoalExpectedReturn.monthlyVolatility, inboundPayload.preGoal.ZScoreUpperBound, postGoalExpectedReturn.monthlyNetExpectedReturn, postGoalExpectedReturn.monthlyVolatility, (inboundPayload.postGoal?.ZScoreUpperBound ?? 0));

      const previousMonth = projections[projections.length - 1];

      const currentProjectionLine = new ProjectionMonth(
          month,
          calculateProjectionValue(month, previousMonth.lower, lowerBoundGoalDrawdownPeriodPercentage, inboundPayload.currentPortfolioValue, inboundPayload.upfrontContribution ?? 0, inboundPayload.monthlyContribution, response.affordableLumpSum, response.affordableRemainingAmount, response.affordableDrawdown, contributionPeriodUptoLumpSum, contributionPeriodFromLumpSumAndDrawdown, goalTargetMonth, (month > contributionPeriodUptoLumpSum + 1) ? projections[contributionPeriodUptoLumpSum + 1].lower : 0),
          calculateProjectionValue(month, previousMonth.average, averagePercentage, inboundPayload.currentPortfolioValue, inboundPayload.upfrontContribution ?? 0, inboundPayload.monthlyContribution, response.affordableLumpSum, response.affordableRemainingAmount, response.affordableDrawdown, contributionPeriodUptoLumpSum, contributionPeriodFromLumpSumAndDrawdown, goalTargetMonth, (month > contributionPeriodUptoLumpSum + 1) ? projections[contributionPeriodUptoLumpSum + 1].average : 0),
          calculateProjectionValue(month, previousMonth.upper, upperBoundGoalDrawdownPeriodPercentage, inboundPayload.currentPortfolioValue, inboundPayload.upfrontContribution ?? 0, inboundPayload.monthlyContribution, response.affordableLumpSum, response.affordableRemainingAmount, response.affordableDrawdown, contributionPeriodUptoLumpSum, contributionPeriodFromLumpSumAndDrawdown, goalTargetMonth, (month > contributionPeriodUptoLumpSum + 1) ? projections[contributionPeriodUptoLumpSum + 1].upper : 0, true)
      );

      projections.push(currentProjectionLine);
  }
  return projections;
}
  
function calculateContributions(currentNetContribution: number, upfrontContribution: number, timeHorizonToProject: number, monthlyContribution: number, affordableLumpSum: number, affordableRemainingAmount: number, affordableDrawdown: number, contributionPeriodUptoLumpSum: number, contributionPeriodFromLumpSumAndDrawdown: number, goalTargetMonth: number): Array<ContributionMonth> {
  const contributions = Array<ContributionMonth>();
  contributions.push(new ContributionMonth(0, currentNetContribution + upfrontContribution));

  for (let month = 1; month <= timeHorizonToProject; month++) {
      const previousMonth = contributions[contributions.length - 1];
      const contributionItem = new ContributionMonth(
          month,
          calculateContribution(month, previousMonth.value, monthlyContribution, goalTargetMonth, affordableLumpSum, affordableRemainingAmount, affordableDrawdown, contributionPeriodUptoLumpSum, contributionPeriodFromLumpSumAndDrawdown)
      );

      contributions.push(contributionItem);
  }
  return contributions;
}
  
function calculateHoldingsWithOnTrackPercentage(timeHorizon: number, lumpSumAmount: number, desiredAmount: number, desiredMonthlyDrawdown: number, contributionPeriodUptoLumpSum: number, contributionPeriodFromLumpSumAndDrawdown: number, goalDrawdownPeriod: number, goalTargetMonth: number, monthlyContributions: number, portfolioCurrentValue: number, upfrontContribution: number, preGoalExpectedReturn: ExpectedReturns, postGoalExpectedReturn: ExpectedReturns, preGoalZScore: number, postGoalZScore: number, statePensionAmount: number): Stats {
  let iterationCounter: number = 0;
  const maxIterations = 1000;
  const lowerGuessOntrackPercentage = 0;
  const upperGuessOntrackPercentage = 100;
  function calculateHoldingsWithOnTrackPercentage(timeHorizon: number, lumpSumAmount: number, desiredAmount: number, desiredMonthlyDrawdown: number, contributionPeriodUptoLumpSum: number, contributionPeriodFromLumpSumAndDrawdown: number, goalDrawdownPeriod: number, goalTargetMonth: number, monthlyContributions: number, portfolioCurrentValue: number, upfrontContribution: number, preGoalExpectedReturn: ExpectedReturns, postGoalExpectedReturn: ExpectedReturns, preGoalZScore: number, postGoalZScore: number, lowerGuessOntrackPercentage: number, upperGuessOntrackPercentage: number, maxIterations: number, statePensionAmount: number): Stats {
      const guessOntrackPercentage = ((upperGuessOntrackPercentage + lowerGuessOntrackPercentage) / 2) / 100

      let desiredMonthlyDrawdownWithStatePension = statePensionAmount ? desiredMonthlyDrawdown - (statePensionAmount / 12) : desiredMonthlyDrawdown;
      if (desiredMonthlyDrawdownWithStatePension < 0) //when desired amount is less than state pension set to zero
          desiredMonthlyDrawdownWithStatePension = 0;

      const affordableDrawdown = desiredMonthlyDrawdownWithStatePension * guessOntrackPercentage;
      const affordableLumpSum = lumpSumAmount * guessOntrackPercentage;
      const affordableRemainingAmount = desiredAmount * guessOntrackPercentage;
      const desiredOutflow = statePensionAmount ? desiredAmount + lumpSumAmount + desiredMonthlyDrawdownWithStatePension * goalDrawdownPeriod : desiredMonthlyDrawdownWithStatePension * goalDrawdownPeriod + lumpSumAmount + desiredAmount;
      const affordableOutflow = statePensionAmount ? affordableRemainingAmount + affordableLumpSum + affordableDrawdown * goalDrawdownPeriod : desiredOutflow * guessOntrackPercentage;

      const surplusOrShortfall = desiredOutflow - affordableOutflow;
      let previousMonthHoldingAmount = portfolioCurrentValue + upfrontContribution;
      let holdingAmountOnLumpSumDate = 0;
      let valueAtRetirement = 0;
      for (let month = 1; month <= timeHorizon; month++) {
          const percentage = calculatePercentage(month, contributionPeriodUptoLumpSum + contributionPeriodFromLumpSumAndDrawdown, preGoalExpectedReturn.monthlyNetExpectedReturn, preGoalExpectedReturn.monthlyVolatility, preGoalZScore, postGoalExpectedReturn.monthlyNetExpectedReturn, postGoalExpectedReturn.monthlyVolatility, postGoalZScore);
          const holdingAmount = calculateHolding(month, contributionPeriodUptoLumpSum, contributionPeriodFromLumpSumAndDrawdown, goalTargetMonth, previousMonthHoldingAmount, monthlyContributions, portfolioCurrentValue, upfrontContribution, affordableDrawdown, percentage, affordableLumpSum, affordableRemainingAmount, holdingAmountOnLumpSumDate)
          if (month == goalTargetMonth) {
              if (round(holdingAmount, 0) != 0) {
                  //keep counting iteration and exit if it has over the limit to avoid infinite loop.
                  ++iterationCounter;
                  if (iterationCounter >= maxIterations)
                      throw new Error("Maximum iterations reached while calculating on track percentage");

                  if (holdingAmount > 0) {
                      lowerGuessOntrackPercentage = guessOntrackPercentage * 100;
                  }

                  if (holdingAmount < 0) {
                      upperGuessOntrackPercentage = guessOntrackPercentage * 100;
                  }
                  if (lowerGuessOntrackPercentage == upperGuessOntrackPercentage) {
                      upperGuessOntrackPercentage = upperGuessOntrackPercentage * 2;
                  }

                  return calculateHoldingsWithOnTrackPercentage(timeHorizon, lumpSumAmount, desiredAmount, desiredMonthlyDrawdown, contributionPeriodUptoLumpSum, contributionPeriodFromLumpSumAndDrawdown, goalDrawdownPeriod, goalTargetMonth, monthlyContributions, portfolioCurrentValue, upfrontContribution, preGoalExpectedReturn, postGoalExpectedReturn, preGoalZScore, postGoalZScore, lowerGuessOntrackPercentage, upperGuessOntrackPercentage, maxIterations, statePensionAmount);
              }

          }
          previousMonthHoldingAmount = holdingAmount;
          if (month == contributionPeriodUptoLumpSum + 1) {
              holdingAmountOnLumpSumDate = holdingAmount;
          }
          if (month == goalTargetMonth)
              valueAtRetirement = holdingAmount;
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

  return calculateHoldingsWithOnTrackPercentage(timeHorizon, lumpSumAmount, desiredAmount, desiredMonthlyDrawdown, contributionPeriodUptoLumpSum, contributionPeriodFromLumpSumAndDrawdown, goalDrawdownPeriod, goalTargetMonth, monthlyContributions, portfolioCurrentValue, upfrontContribution, preGoalExpectedReturn, postGoalExpectedReturn, preGoalZScore, postGoalZScore, lowerGuessOntrackPercentage, upperGuessOntrackPercentage, maxIterations, statePensionAmount);
}

function round(value: number, precision: number): number {
  const multiplier = Math.pow(10, precision || 0);
  return Math.round(value * multiplier) / multiplier;
}

function calculateContribution(month: number, previousMonthContributionValue: number, monthlyContributions: number, goalTargetMonth: number, affordableLumpSum: number, affordableRemainingAmount: number, affordableDrawdown: number, contributionPeriodUptoLumpSum: number, contributionPeriodFromLumpSumAndDrawdown: number) {

  if (month == goalTargetMonth) {
      return previousMonthContributionValue - affordableDrawdown - affordableRemainingAmount;
  }

  if (contributionPeriodUptoLumpSum != 0 && month == contributionPeriodUptoLumpSum + 1) {
      return previousMonthContributionValue - affordableLumpSum + monthlyContributions
  }
  if (contributionPeriodUptoLumpSum == 0 && month >= goalTargetMonth - contributionPeriodFromLumpSumAndDrawdown) {
      return previousMonthContributionValue - affordableDrawdown
  }

  if (month >= (contributionPeriodUptoLumpSum + contributionPeriodFromLumpSumAndDrawdown + 1)) {
      return previousMonthContributionValue - affordableDrawdown;
  }
  return previousMonthContributionValue + monthlyContributions;
}
  
function calculateHolding(month: number, contributionPeriodUptoLumpSum: number, contributionPeriodFromLumpSumAndDrawdown: number, goalTargetMonth: number, PreviousMonthHolding: number, monthlyContributions: number, portfolioCurrentValue: number, upfrontContribution: number, affordableDrawdown: number, averagePercentage: number, affordableLumpSum: number, affordableRemainingAmount: number, holdingAmountOnLumpSumDate: number): number {

  if (month > goalTargetMonth) {
      return (PreviousMonthHolding - affordableDrawdown) * (1 + averagePercentage)
  }

  if (month == goalTargetMonth) {
      return (PreviousMonthHolding - affordableRemainingAmount) * (1 + averagePercentage);
  }

  if (month >= (contributionPeriodUptoLumpSum + contributionPeriodFromLumpSumAndDrawdown + 1)) {
      return (PreviousMonthHolding - affordableDrawdown) * (1 + averagePercentage)
  }

  if (contributionPeriodUptoLumpSum != 0 && month > (contributionPeriodUptoLumpSum + 1)) {
      return holdingAmountOnLumpSumDate * (1 + averagePercentage) ** (month - contributionPeriodUptoLumpSum) + monthlyContributions * ((1 + averagePercentage) ** (month - contributionPeriodUptoLumpSum) - 1) / averagePercentage;
  }

  if (contributionPeriodUptoLumpSum != 0 && month == (contributionPeriodUptoLumpSum + 1)) {
      return (PreviousMonthHolding - affordableLumpSum + monthlyContributions) * (1 + averagePercentage);
  }

  return (portfolioCurrentValue + upfrontContribution) * (1 + averagePercentage) ** month + monthlyContributions * ((1 - (1 + averagePercentage) ** month) / (1 - (1 + averagePercentage)));
}

function calculateExpectedReturn(expectedReturn: number, feesPercentage: number, expectedVolatility: number): ExpectedReturns {
  const annualNetExpectedReturn = expectedReturn - feesPercentage;
  const monthlyNetExpectedReturn = ((1 + annualNetExpectedReturn) ** (1 / 12)) - 1;
  const monthlyVolatility = expectedVolatility / Math.sqrt(12);
  return { monthlyNetExpectedReturn, monthlyVolatility };
}

function calculateDrawdown(preGoalMonthlyNetExpectedReturn: number, goalContributingPeriod: number, portfolioCurrentValue: number, upfrontContribution: number, monthlyContributions: number, remainingAmount: number, lumpSumAmount: number, postGoalMonthlyNetExpectedReturn: number, goalDrawdownPeriod: number, statePensionAmount: number): Drawdown {
  const projectedGoalAgeTotal = calculateProjectedGoalAgeTotal(preGoalMonthlyNetExpectedReturn, goalContributingPeriod, portfolioCurrentValue, upfrontContribution, monthlyContributions);

  const monthlyCompoundInterestMultiplePostGoal = (1 - (1 + postGoalMonthlyNetExpectedReturn) ** -goalDrawdownPeriod) / postGoalMonthlyNetExpectedReturn * (1 + postGoalMonthlyNetExpectedReturn);
  const remainingAmountAtGoalAge = remainingAmount / (1 + postGoalMonthlyNetExpectedReturn) ** goalDrawdownPeriod;
  const possibleDrawdown = (projectedGoalAgeTotal - lumpSumAmount - remainingAmountAtGoalAge) / monthlyCompoundInterestMultiplePostGoal;

  const possibleDrawdownWithStatePension = statePensionAmount ? possibleDrawdown + statePensionAmount / 12 : possibleDrawdown;
  return { possibleDrawdown: possibleDrawdownWithStatePension, projectedGoalAgeTotal, remainingAmountAtGoalAge };
}

function calculateProjectedGoalAgeTotal(preGoalMonthlyNetExpectedReturn: number, goalContributingPeriod: number, portfolioCurrentValue: number, upfrontContribution: number, monthlyContributions: number) {
  const valueOfCurrentHoldingsAtGoal = (1 + preGoalMonthlyNetExpectedReturn) ** goalContributingPeriod * (portfolioCurrentValue + upfrontContribution);
  const monthlyCompoundInterestMultiplePreGoal = ((1 + preGoalMonthlyNetExpectedReturn) ** goalContributingPeriod - 1) / preGoalMonthlyNetExpectedReturn;
  return valueOfCurrentHoldingsAtGoal + (monthlyContributions * monthlyCompoundInterestMultiplePreGoal);
}

function calculateProjectionValue(month: number, previousMonthProjectedValue: number, percentage: number, portfolioCurrentValue: number, upfrontContribution: number, monthlyContributions: number, affordableLumpSum: number, affordableRemainingAmount: number, affordableDrawdown: number, contributionPeriodUptoLumpSum: number, contributionPeriodFromLumpSumAndDrawdown: number, goalTargetMonth: number, projectedAmountOnLumpSumDate: number, isUpperCalculation: boolean = false) {
  if (isUpperCalculation && month >= goalTargetMonth && previousMonthProjectedValue <= affordableRemainingAmount) {
      return (previousMonthProjectedValue - affordableRemainingAmount) * (1 + percentage);
  }

  if (!isUpperCalculation && month == goalTargetMonth) {
      return (previousMonthProjectedValue - affordableRemainingAmount) * (1 + percentage);
  }

  if (contributionPeriodUptoLumpSum != 0 && month == contributionPeriodUptoLumpSum + 1) {
      return (previousMonthProjectedValue - affordableLumpSum + monthlyContributions) * (1 + percentage);
  }

  if (month >= (contributionPeriodUptoLumpSum + contributionPeriodFromLumpSumAndDrawdown + 1)) {
      return ((previousMonthProjectedValue - affordableDrawdown) * (1 + percentage));
  }

  if (contributionPeriodUptoLumpSum != 0 && month > contributionPeriodUptoLumpSum + 1) {
      return projectedAmountOnLumpSumDate * (1 + percentage) ** (month - contributionPeriodUptoLumpSum) + monthlyContributions * ((1 + percentage) ** (month - contributionPeriodUptoLumpSum) - 1) / percentage;
  }

  return (portfolioCurrentValue + upfrontContribution) * (1 + percentage) ** month + monthlyContributions * ((1 - (1 + percentage) ** month) / (1 - (1 + percentage)));
}

function calculatePercentage(month: number, goalContributingPeriod: number, preGoalMonthlyNetExpectedReturn: number, preGoalMonthlyVolatility: number, preGoalZScore: number, postGoalMonthlyNetExpectedReturn: number, postGoalMonthlyVolatility: number, postGoalZScore: number): number {
  if (month <= goalContributingPeriod) {
      return ((1 + preGoalMonthlyNetExpectedReturn) ** month + Math.sqrt(month) * preGoalMonthlyVolatility * preGoalZScore) ** (1 / month) - 1;
  }
  return ((1 + postGoalMonthlyNetExpectedReturn) ** month + Math.sqrt(month) * postGoalMonthlyVolatility * postGoalZScore) ** (1 / month) - 1;
}

export {
    getRetirementProjection,
    getRetirementTealProjectionRecursive,
    calculateDrawdown,
    calculatePercentage,
    calculateProjectionValue,
    calculateContribution,
    calculateExpectedReturn,
    calculateHoldingsWithOnTrackPercentage
}