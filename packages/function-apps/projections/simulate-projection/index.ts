import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import { ContributionMonth, Drawdown, DrawdownType, ExpectedReturns, ProjectionMonth, RequestPayload, ResponsePayload, Stats, ValidationError } from './types';

const simulateProjectionMain: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  let responseBody = {};
  let responseStatus = 200;

  try {
    const input: RequestPayload = req.body
    const validationResult = validateInput(input)

    if (validationResult != null && validationResult.length > 0) {
      responseStatus = 400
      responseBody = validationResult;
    }
    else {
      setDefaultInputValues(input);
      responseBody = getSimulateProjection(input, new Date());
    }
  } catch (e) {
    responseBody = { errorMessage: e.message };
    responseStatus = 400;
  }
  context.res = {
    body: responseBody,
    status: responseStatus,
  };
};

function getSimulateProjection(inboundPayload: RequestPayload, today: Date): ResponsePayload {
  if (!inboundPayload.includeGoal){
    return getTealProjectionNonRecursive();
  }
  else{
      switch(inboundPayload.drawdownType){
        case DrawdownType.OneOff: 
          return getOneOffProjection();
        case DrawdownType.Annual:
          return getAnnualProjection();
        case DrawdownType.Retirement:
          return getRetirementProjection(inboundPayload, today);
        case DrawdownType.Monthly:
        default:
          return getMonthlyProjection();
      }
  }
}

function getOneOffProjection(): ResponsePayload{
//TODO in next stories
  const response = {
  } as ResponsePayload;
  return response;
}

function getAnnualProjection() : ResponsePayload{
  //TODO in next stories
  const response = {
  } as ResponsePayload;
  return response;
}

function getMonthlyProjection() : ResponsePayload{
  //TODO in next stories
  const response = {
  } as ResponsePayload;
  return response;
}

function getTealProjectionNonRecursive(): ResponsePayload {
  //TODO in the next stories
  const response = {
  } as ResponsePayload;
  return response;
}

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

function calculateOnTrackPercentage(inboundPayload: RequestPayload, today: Date): number {
  const annualNetExpectedReturns = inboundPayload.preGoal.expectedReturnPercentage - (inboundPayload.feesPercentage ?? 0);
  const monthlyNetExpectedReturns = Math.pow((1 + annualNetExpectedReturns/100), 1/12) - 1;
  const timeTillGoalInMonths =  monthsDiff(today, inboundPayload.drawdownOneOff?.targetDate ?? today);
  const multiplier = (Math.pow((1 + monthlyNetExpectedReturns), timeTillGoalInMonths) - 1) / monthlyNetExpectedReturns;
  const valueOfCurrentHoldingsAndUpFrontContributionAtGoalTargetDate = Math.pow((1 + monthlyNetExpectedReturns), timeTillGoalInMonths) * ((inboundPayload.upfrontContribution ?? 0) + inboundPayload.currentPortfolioValue);
  const totalAmountProjectedAtGoalDate = valueOfCurrentHoldingsAndUpFrontContributionAtGoalTargetDate + (inboundPayload.monthlyContribution * multiplier);
  return totalAmountProjectedAtGoalDate / (inboundPayload.drawdownOneOff?.targetAmount ?? 1) * 100;
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

function setDefaultInputValues(inboundPayload: RequestPayload){
  if (inboundPayload.feesPercentage == null || typeof inboundPayload.feesPercentage == 'undefined')
    inboundPayload.feesPercentage = 0;

  if (inboundPayload.upfrontContribution == null || typeof inboundPayload.upfrontContribution == 'undefined')
    inboundPayload.upfrontContribution = 0;
  
  if (inboundPayload.postGoal == null || typeof inboundPayload.postGoal == 'undefined')
  {
    inboundPayload.postGoal = inboundPayload.preGoal;
  }
  else{
    if (typeof inboundPayload.postGoal.expectedReturnPercentage == 'undefined')
      inboundPayload.postGoal.expectedReturnPercentage = inboundPayload.preGoal.expectedReturnPercentage;

    if (typeof inboundPayload.postGoal.volatilityPercentage == 'undefined')
      inboundPayload.postGoal.volatilityPercentage = inboundPayload.preGoal.volatilityPercentage;

    if (typeof inboundPayload.postGoal.ZScoreLowerBound == 'undefined')
      inboundPayload.postGoal.ZScoreLowerBound = inboundPayload.preGoal.ZScoreLowerBound;

    if (typeof inboundPayload.postGoal.ZScoreUpperBound == 'undefined')
      inboundPayload.postGoal.ZScoreUpperBound = inboundPayload.preGoal.ZScoreUpperBound;
  }
}

function validateInput(inboundPayload: RequestPayload): ValidationError[] {
  let errors = Array<ValidationError>();

  validateDefaultInputs(inboundPayload, errors);

  if (inboundPayload.includeGoal) {
    validateDrawdownOneOff(inboundPayload, errors);

    validateDrawdownMonthly(inboundPayload, errors);
  
    validateDrawdownAnnually(inboundPayload, errors);
  
    validateDrawdownRetirement(inboundPayload, errors);
  }
  
  validatePreGoal(inboundPayload, errors);

  validatePostGoal(inboundPayload, errors);

  return errors;
}

function validateDefaultInputs(inboundPayload: RequestPayload, errors: Array<ValidationError>) {
  if (typeof inboundPayload.timeHorizonToProject == 'undefined' || inboundPayload.timeHorizonToProject <= 0) {
    const error: ValidationError = {
      code: "val-simulateproj-001",
      property: "timeHorizonToProject",
      message: "timeHorizonToProject_must_be_greater_than_zero"
    }
    errors.push(error);
  }

  if (typeof inboundPayload.feesPercentage != 'undefined')
    if(inboundPayload.feesPercentage < 0 || inboundPayload.feesPercentage > 100) {
      const error: ValidationError = {
        code: "val-simulateproj-002",
        property: "feesPercentage",
        message: "feesPercentage_must_be_a_percentage_value_between_zero_and_one_hundred",
      }
      errors.push(error)
    }

  if (typeof inboundPayload.upfrontContribution != 'undefined')
    if (inboundPayload.upfrontContribution < 0) {
      const error: ValidationError = {
        code: "val-simulateproj-003",
        property: "upfrontContribution",
        message: "upfrontContribution_must_be_a_positive_number_or_zero",
      }
      errors.push(error)
    }

  if (typeof inboundPayload.monthlyContribution == 'undefined' || inboundPayload.monthlyContribution < 0) {
    const error: ValidationError = {
      code: "val-simulateproj-004",
      property: "monthlyContribution",
      message: "monthlyContribution_must_be_a_positive_number_or_zero",
    }
    errors.push(error)
  }

  if (typeof inboundPayload.currentNetContribution == 'undefined') {
    const error: ValidationError = {
      code: "val-simulateproj-005",
      property: "currentNetContribution",
      message: "currentNetContribution_must_be_a_number",
    }
    errors.push(error)
  }

  if (typeof inboundPayload.currentPortfolioValue == 'undefined' || inboundPayload.currentPortfolioValue < 0) {
    const error: ValidationError = {
      code: "val-simulateproj-006",
      property: "currentPortfolioValue",
      message: "currentPortfolioValue_must_be_a_positive_number_or_zero",
    }
    errors.push(error)
  }

  if (typeof inboundPayload.includeGoal == 'undefined') {
    const error: ValidationError = {
      code: "val-simulateproj-007",
      property: "includeGoal",
      message: "includeGoal_must_be_a_valid_boolean",
    }
    errors.push(error)
  }

  var drawDownTypes = Object.values(DrawdownType);
  if (inboundPayload.includeGoal && (typeof inboundPayload.drawdownType == 'undefined' || drawDownTypes.indexOf(inboundPayload.drawdownType) < 0)) {
    const error: ValidationError = {
      code: "val-simulateproj-008",
      property: "drawdownType",
      message: "drawdownType_must_be_one_of_the_values_" + Object.values(DrawdownType).join("_")
    }
    errors.push(error)
  }
}

function validateDrawdownOneOff(inboundPayload: RequestPayload, errors: Array<ValidationError>) {
  if (inboundPayload.drawdownType == DrawdownType.OneOff)
  {
    if (typeof inboundPayload.drawdownOneOff == 'undefined') {
        const error: ValidationError = {
          code: "val-simulateproj-009",
          property: "drawdownOneOff",
          message: "drawdownOneOff_must_be_setup",
        }
        errors.push(error)
      }
    else {
      if (typeof inboundPayload.drawdownOneOff.targetAmount == 'undefined' || inboundPayload.drawdownOneOff.targetAmount <= 0) {
        const error: ValidationError = {
          code: "val-simulateproj-010",
          property: "drawdownOneOff.targetAmount",
          message: "drawdownOneOff_targetAmount_must_be_a_positive_number"
        }
        errors.push(error)
      }

      if (inboundPayload.drawdownOneOff.targetDate == null) {
        const error: ValidationError = {
          code: "val-simulateproj-011",
          property: "drawdownOneOff.targetDate",
          message: "drawdownOneOff_targetDate_must_be_a_valid_date",
        }
        errors.push(error)
      }
      else
      {
        const currentDate = new Date();
        if (inboundPayload.drawdownOneOff.targetDate >= currentDate) {
          const error: ValidationError = {
            code: "val-simulateproj-039",
            property: "drawdownOneOff.targetDate",
            message: "drawdownOneOff_targetDate_must_be_in_the_past",
          }
          errors.push(error)
        }
      }
    }
  }
}

function validateDrawdownMonthly(inboundPayload: RequestPayload, errors: Array<ValidationError>) {
  if (inboundPayload.drawdownType == DrawdownType.Monthly)
  {
    if (typeof inboundPayload.drawdownMonthly == 'undefined') {
      const error: ValidationError = {
        code: "val-simulateproj-012",
        property: "drawdownMonthly",
        message: "drawdownMonthly_must_be_setup",
      }
      errors.push(error)
    }
    else {
      if (typeof inboundPayload.drawdownMonthly.amount == 'undefined' || inboundPayload.drawdownMonthly.amount <= 0) {
        const error: ValidationError = {
          code: "val-simulateproj-013",
          property: "drawdownMonthly.amount",
          message: "drawdownMonthly_amount_must_be_a_positive_number",
        }
        errors.push(error)
      }

      if (inboundPayload.drawdownMonthly.startDate == null) {
        const error: ValidationError = {
          code: "val-simulateproj-014",
          property: "drawdownMonthly.startDate",
          message: "drawdownMonthly_startDate_must_be_a_valid_date"
        }
        errors.push(error)
      }

      if (inboundPayload.drawdownMonthly.endDate == null) {
        const error: ValidationError = {
          code: "val-simulateproj-015",
          property: "drawdownMonthly.endDate",
          message: "drawdownMonthly_endDate_must_be_a_valid_date"
        }
        errors.push(error)
      }
      else{
        const currentDate = new Date();
        if (inboundPayload.drawdownMonthly.endDate <= currentDate){
          const error: ValidationError = {
            code: "val-simulateproj-038",
            property: "drawdownMonthly.endDate",
            message: "drawdownMonthly_endDate_must_be_in_the_future"
          }
          errors.push(error)
        }
      }

      if (inboundPayload.drawdownMonthly.startDate && inboundPayload.drawdownMonthly.endDate && monthsDiff(inboundPayload.drawdownMonthly.startDate, inboundPayload.drawdownMonthly.endDate) < 1) {
        const error: ValidationError = {
          code: "val-simulateproj-016",
          property: "drawdownMonthly.endDate",
          message: "drawdownMonthly_endDate_must_be_at_least_one_month_greater_than_startDate",
        }
        errors.push(error)
      }
    }
  }
}

function validateDrawdownAnnually(inboundPayload: RequestPayload, errors: Array<ValidationError>) {
  if (inboundPayload.drawdownType == DrawdownType.Annual)
  {
    if (typeof inboundPayload.drawdownAnnually == 'undefined') {
      const error: ValidationError = {
        code: "val-simulateproj-017",
        property: "drawdownAnnually",
        message: "drawdownAnnually_must_be_setup",
      }
      errors.push(error)
    }
    else {
      if (typeof inboundPayload.drawdownAnnually.amount == 'undefined' || inboundPayload.drawdownAnnually.amount <= 0) {
        const error: ValidationError = {
          code: "val-simulateproj-018",
          property: "drawdownAnnually.amount",
          message: "drawdownAnnually_amount_must_be_a_positive_number",
        }
        errors.push(error)
      }

      if (inboundPayload.drawdownAnnually.startDate == null) {
        const error: ValidationError = {
          code: "val-simulateproj-019",
          property: "drawdownAnnually.startDate",
          message: "drawdownAnnually_startDate_must_be_a_valid_date",
        }
        errors.push(error)
      }

      if (inboundPayload.drawdownAnnually.endDate == null) {
        const error: ValidationError = {
          code: "val-simulateproj-020",
          property: "drawdownAnnually.endDate",
          message: "drawdownAnnually_endDate_must_be_a_valid_date",
        }
        errors.push(error)
      }
      else {
        const currentDate = new Date();
        if (inboundPayload.drawdownAnnually.endDate <= currentDate){
          const error: ValidationError = {
            code: "val-simulateproj-037",
            property: "drawdownAnnually.endDate",
            message: "drawdownAnnually_endDate_must_be_in_the_future",
          }
          errors.push(error)
        }
      }

      if (inboundPayload.drawdownAnnually.startDate && inboundPayload.drawdownAnnually.endDate && (inboundPayload.drawdownAnnually.endDate.getFullYear() - inboundPayload.drawdownAnnually.startDate.getFullYear() < 1))  {
        const error: ValidationError = {
          code: "val-simulateproj-021",
          property: "drawdownAnnually.endDate",
          message: "drawdownAnnually_endDate_must_be_at_least_one_year_greater_than_startDate",
        }
        errors.push(error)
      }
    }
  }
}

function validateDrawdownRetirement(inboundPayload: RequestPayload, errors: Array<ValidationError>) {
  if (inboundPayload.drawdownType == DrawdownType.Retirement)
  {
    if (typeof inboundPayload.drawdownRetirement == 'undefined') {
      const error: ValidationError = {
        code: "val-simulateproj-022",
        property: "drawdownRetirement",
        message: "drawdownRetirement_must_be_setup",
      }
      errors.push(error)
    }
    else {
      if (typeof inboundPayload.drawdownRetirement.regularDrawdown == 'undefined' || inboundPayload.drawdownRetirement.regularDrawdown <= 0) {
        const error: ValidationError = {
          code: "val-simulateproj-023",
          property: "drawdownRetirement.regularDrawdown",
          message: "drawdownRetirement_regularDrawdown_must_be_a_positive_number",
        }
        errors.push(error)
      }

      if (inboundPayload.drawdownRetirement.startDate == null) {
        const error: ValidationError = {
          code: "val-simulateproj-024",
          property: "drawdownRetirement.startDate",
          message: "drawdownRetirement_startDate_must_be_a_valid_date",
        }
        errors.push(error)
      }

      if (inboundPayload.drawdownRetirement.endDate == null) {
        const error: ValidationError = {
          code: "val-simulateproj-025",
          property: "drawdownRetirement.endDate",
          message: "drawdownRetirement_endDate_must_be_a_valid_date",
        }
        errors.push(error)
      }

      if (inboundPayload.drawdownRetirement.startDate && inboundPayload.drawdownRetirement.endDate && monthsDiff(inboundPayload.drawdownRetirement.startDate, inboundPayload.drawdownRetirement.endDate) < 1) {
        const error: ValidationError = {
          code: "val-simulateproj-026",
          property: "drawdownRetirement.endDate",
          message: "drawdownRetirement_endDate_must_be_at_least_one_month_greater_than_startDate",
        }
        errors.push(error)
      }

      if (typeof inboundPayload.drawdownRetirement.lumpSum != 'undefined'){
        if (typeof inboundPayload.drawdownRetirement.lumpSum.amount != 'undefined'){
          if (inboundPayload.drawdownRetirement.lumpSum.amount < 0){
            const error: ValidationError = {
              code: "val-simulateproj-027",
              property: "drawdownRetirement.lumpSum.amount",
              message: "drawdownRetirement_lumpSum_amount_must_be_a_positive_number_or_zero",
            }
            errors.push(error)
          }

          if(inboundPayload.drawdownRetirement.lumpSum.date == null)
          {
            const error: ValidationError = {
              code: "val-simulateproj-028",
              property: "drawdownRetirement.lumpSum.date",
              message: "drawdownRetirement_lumpSum_date_must_be_a_valid_date",
            }
            errors.push(error)
          }
          else{
            if (typeof inboundPayload.drawdownRetirement.startDate != 'undefined')
              if (inboundPayload.drawdownRetirement.startDate > inboundPayload.drawdownRetirement.lumpSum.date){
                const error: ValidationError = {
                  code: "val-simulateproj-029",
                  property: "drawdownRetirement.lumpSum.date",
                  message: "drawdownRetirement_lumpSum_date_must_be_less_or_equal_than_drawdownRetirement_startDate",
                }
                errors.push(error)
              }
          }
        }
      }

      if (typeof inboundPayload.drawdownRetirement.remainingAmount != 'undefined')
        if (inboundPayload.drawdownRetirement.remainingAmount < 0){
          const error: ValidationError = {
            code: "val-simulateproj-030",
            property: "drawdownRetirement.remainingAmount",
            message: "drawdownRetirement_remainingAmount_must_be_a_positive_number_or_zero",
          }
          errors.push(error)
        }

      if (typeof inboundPayload.drawdownRetirement.statePensionAmount != 'undefined')
        if (inboundPayload.drawdownRetirement.statePensionAmount < 0){
          const error: ValidationError = {
            code: "val-simulateproj-031",
            property: "drawdownRetirement.statePensionAmount",
            message: "drawdownRetirement_statePensionAmount_must_be_a_positive_number_or_zero",
          }
          errors.push(error)
        }
    }
  }
}

function validatePreGoal(inboundPayload: RequestPayload, errors: Array<ValidationError>){
  if (typeof inboundPayload.preGoal == 'undefined'){
    const error: ValidationError = {
      code: "val-simulateproj-032",
      property: "preGoal",
      message: "preGoal_must_be_setup",
    }
    errors.push(error)
  }
  else {
    if (typeof inboundPayload.preGoal.expectedReturnPercentage == 'undefined' || inboundPayload.preGoal.expectedReturnPercentage < 0 || inboundPayload.preGoal.expectedReturnPercentage > 100){
      const error: ValidationError = {
        code: "val-simulateproj-033",
        property: "preGoal.expectedReturnPercentage",
        message: "preGoal_expectedReturnPercentage_must_be_a_percentage_value_between_zero_and_one_hundred",
      }
      errors.push(error)
    }

    if (typeof inboundPayload.preGoal.volatilityPercentage == 'undefined' || inboundPayload.preGoal.volatilityPercentage < 0 || inboundPayload.preGoal.volatilityPercentage > 100){
      const error: ValidationError = {
        code: "val-simulateproj-034",
        property: "preGoal.volatilityPercentage",
        message: "preGoal_volatilityPercentage_must_be_a_percentage_value_between_zero_and_one_hundred",
      }
      errors.push(error)
    }

    if (typeof inboundPayload.preGoal.ZScoreLowerBound == 'undefined' || inboundPayload.preGoal.ZScoreLowerBound > 0){
      const error: ValidationError = {
        code: "val-simulateproj-035",
        property: "preGoal.ZScoreLowerBound",
        message: "preGoal_ZScoreLowerBound_must_be_a_number_bellow_zero_or_zero",
      }
      errors.push(error)
    }

    if (typeof inboundPayload.preGoal.ZScoreUpperBound == 'undefined' || inboundPayload.preGoal.ZScoreUpperBound < 0){
      const error: ValidationError = {
        code: "val-simulateproj-036",
        property: "preGoal.ZScoreUpperBound",
        message: "preGoal_ZScoreUpperBound_must_be_a_positive_number_or_zero",
      }
      errors.push(error)
    }
  } 
}

function validatePostGoal(inboundPayload: RequestPayload, errors: Array<ValidationError>){
    if (typeof inboundPayload.postGoal != 'undefined')
    {
      if (typeof inboundPayload.postGoal.expectedReturnPercentage != 'undefined')
        if (inboundPayload.postGoal.expectedReturnPercentage < 0 || inboundPayload.postGoal.expectedReturnPercentage > 100){
          const error: ValidationError = {
            code: "val-simulateproj-037",
            property: "postGoal.expectedReturnPercentage",
            message: "postGoal_expectedReturnPercentage_must_be_a_percentage_value_between_zero_and_one_hundred",
          }
          errors.push(error)
        }

      if (typeof inboundPayload.postGoal.volatilityPercentage != 'undefined')
        if (inboundPayload.postGoal.volatilityPercentage < 0 || inboundPayload.postGoal.volatilityPercentage > 100){
          const error: ValidationError = {
            code: "val-simulateproj-038",
            property: "postGoal.volatilityPercentage",
            message: "postGoal_volatilityPercentage_must_be_a_percentage_value_between_zero_and_one_hundred",
          }
          errors.push(error)
        }

      if (typeof inboundPayload.postGoal.ZScoreLowerBound != 'undefined')
        if (inboundPayload.postGoal.ZScoreLowerBound > 0){
          const error: ValidationError = {
            code: "val-simulateproj-039",
            property: "postGoal.ZScoreLowerBound",
            message: "postGoal_ZScoreLowerBound_must_be_a_number_bellow_zero_or_zero",
          }
          errors.push(error)
        }

      if (typeof inboundPayload.postGoal.ZScoreUpperBound != 'undefined')
        if (inboundPayload.postGoal.ZScoreUpperBound < 0){
          const error: ValidationError = {
            code: "val-simulateproj-040",
            property: "postGoal.ZScoreUpperBound",
            message: "postGoal_ZScoreUpperBound_must_be_a_positive_number_or_zero",
          }
          errors.push(error)
        }

    }  
}

function monthsDiff(dateFrom: Date, dateTo: Date): number {
  const years = yearsDiff(dateFrom, dateTo);
  let months = (years * 12) + (dateTo.getMonth() - dateFrom.getMonth());
  const diffDays = dateTo.getDate() - dateFrom.getDate();
  if (diffDays < 0) {
    months--;
  }

  return Math.round(months);
}

function yearsDiff(dateFrom: Date, dateTo: Date): number {
  return dateTo.getFullYear() - dateFrom.getFullYear();
}

export {
  simulateProjectionMain,
  getSimulateProjection,
  getRetirementTealProjectionRecursive,
  validateInput,
  monthsDiff,
  setDefaultInputValues,
  calculateOnTrackPercentage,
  calculateDrawdown,
  calculatePercentage,
  calculateProjectionValue,
  calculateContributions,
  calculateContribution,
  calculateExpectedReturn,
  calculateHoldingsWithOnTrackPercentage
};
