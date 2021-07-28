import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import { ProjectionMonth, RequestPayload, ResponsePayload, ValidationError } from './types';

const targetProjectionMain: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
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
      responseBody = getTargetProjection(input, new Date());
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


function getTargetProjection(inboundPayload: RequestPayload, today: Date): ResponsePayload {
  inboundPayload.monthlyContributions = inboundPayload.monthlyContributions ?? 0;

  const contributionPeriodUptoLumpSum = monthsDiff(today, parseDate(inboundPayload.lumpSumDate)) - 1;
  const goalContributingMonths = monthsDiff(today, parseDate(inboundPayload.drawdownStartDate)) - 1;
  const contributionPeriodFromLumpSumAndDrawdown = monthsDiff(parseDate(inboundPayload.lumpSumDate), parseDate(inboundPayload.drawdownStartDate));
  const goalDrawdownMonths = monthsDiff(parseDate(inboundPayload.drawdownStartDate), parseDate(inboundPayload.drawdownEndDate)) + 1;
  const preGoalExpectedMonthlyReturn = calculateMonthlyNetExpectedReturn(inboundPayload.preGoalExpectedReturn, inboundPayload.feesPercentage);
  const postGoalExpectedMonthlyReturn = calculateMonthlyNetExpectedReturn(inboundPayload.postGoalExpectedReturn, inboundPayload.feesPercentage);
  const goalTargetMonth = contributionPeriodUptoLumpSum + contributionPeriodFromLumpSumAndDrawdown + goalDrawdownMonths + 1;
  const growthInPostGoalDrawdownPeriod = (1 - (1 + postGoalExpectedMonthlyReturn) ** -goalDrawdownMonths) / postGoalExpectedMonthlyReturn * (1 + postGoalExpectedMonthlyReturn);

  const amountNeededAtEndOfDrawdown = inboundPayload.desiredValueAtEndOfDrawdown / ((1 + postGoalExpectedMonthlyReturn) ** goalDrawdownMonths);
  let desiredMonthlyDrawdown = 0

  //if lump sum date is past  then lump sum considered as zero
  if (contributionPeriodUptoLumpSum < 0) {
    inboundPayload.goalLumpSum = 0;
  }

  if (goalDrawdownMonths > 0) {
    desiredMonthlyDrawdown = inboundPayload.includeStatePension ? inboundPayload.desiredMonthlyDrawdown - (inboundPayload.statePensionAmount / 12) : inboundPayload.desiredMonthlyDrawdown
  }

  if (desiredMonthlyDrawdown < 0) //when desired monthly is below  zero
    desiredMonthlyDrawdown = 0;

  let upfrontContributionRequiredToFundDrawdown = 0;
  let monthlyContributionsRequiredToFundDrawdown = 0;
  let portfolioValueRequiredTodayToAchiveTarget = 0;
  if (goalContributingMonths <= 0) {
    const compoundInterestMultiplierAtDrawdown = calculateCompoundInterestMultiplierAtDrawdown(goalTargetMonth, postGoalExpectedMonthlyReturn);
    const remainingAmountInTodaysMoney = inboundPayload.desiredValueAtEndOfDrawdown / (1 + postGoalExpectedMonthlyReturn) ** goalTargetMonth;
    portfolioValueRequiredTodayToAchiveTarget = remainingAmountInTodaysMoney + compoundInterestMultiplierAtDrawdown * desiredMonthlyDrawdown;
    upfrontContributionRequiredToFundDrawdown = portfolioValueRequiredTodayToAchiveTarget - inboundPayload.portfolioValue;
  }

  else if (contributionPeriodFromLumpSumAndDrawdown == 0) {
    const targetGoalAmount = calculateTargetGoalAmountWhenLumpsumIsOnRetirement(goalDrawdownMonths, desiredMonthlyDrawdown, inboundPayload.goalLumpSum, postGoalExpectedMonthlyReturn, inboundPayload.desiredValueAtEndOfDrawdown);
    monthlyContributionsRequiredToFundDrawdown = calculateMonthlyContributionsRequiredToFundDrawdownWhenLumpsumIsOnRetirement(targetGoalAmount, goalDrawdownMonths, goalContributingMonths, desiredMonthlyDrawdown, inboundPayload.goalLumpSum, preGoalExpectedMonthlyReturn, postGoalExpectedMonthlyReturn, inboundPayload.portfolioValue, inboundPayload.upfrontContribution);
    upfrontContributionRequiredToFundDrawdown = calculateUpfrontContributionRequiredWhenLumpsumIsOnRetirement(preGoalExpectedMonthlyReturn, contributionPeriodUptoLumpSum, contributionPeriodUptoLumpSum, targetGoalAmount, inboundPayload.monthlyContributions, inboundPayload.portfolioValue);
  }
  else {
    const targetGoalAgeTotal = (desiredMonthlyDrawdown * growthInPostGoalDrawdownPeriod) + amountNeededAtEndOfDrawdown;
    monthlyContributionsRequiredToFundDrawdown = calculateMonthlyContributionsRequiredToFundDrawdown(targetGoalAgeTotal, preGoalExpectedMonthlyReturn, contributionPeriodFromLumpSumAndDrawdown, inboundPayload.portfolioValue, inboundPayload.upfrontContribution, inboundPayload.goalLumpSum, contributionPeriodUptoLumpSum);
    upfrontContributionRequiredToFundDrawdown = calculateUpfrontContributionRequired(preGoalExpectedMonthlyReturn, contributionPeriodUptoLumpSum, contributionPeriodFromLumpSumAndDrawdown, targetGoalAgeTotal, inboundPayload.monthlyContributions, inboundPayload.goalLumpSum, inboundPayload.portfolioValue, inboundPayload.upfrontContribution);
    portfolioValueRequiredTodayToAchiveTarget = targetGoalAgeTotal;
  }

  const projectionStartValue = (goalContributingMonths <= 0) ? portfolioValueRequiredTodayToAchiveTarget : inboundPayload.portfolioValue + inboundPayload.upfrontContribution;
  const response = {
    upfrontContributionRequiredToFundDrawdown: upfrontContributionRequiredToFundDrawdown,
    monthlyContributionsRequiredToFundDrawdown: monthlyContributionsRequiredToFundDrawdown,
    projections: calculateProjection(inboundPayload.timeToAge100, inboundPayload.portfolioValue, inboundPayload.upfrontContribution, inboundPayload.goalLumpSum, desiredMonthlyDrawdown, inboundPayload.monthlyContributions, inboundPayload.desiredValueAtEndOfDrawdown, goalContributingMonths, preGoalExpectedMonthlyReturn, postGoalExpectedMonthlyReturn, contributionPeriodUptoLumpSum, contributionPeriodFromLumpSumAndDrawdown, goalTargetMonth, monthlyContributionsRequiredToFundDrawdown, goalDrawdownMonths, projectionStartValue)
  } as ResponsePayload;
  return response;
}

function calculateTargetGoalAmountWhenLumpsumIsOnRetirement(drawdownMonths: number, desiredDrawdownAmount: number, lumpSum: number, expectedReturnAtDrawdown: number, desiredValueAtEndOfDrawdown: number): number {
  const valueAtDrawdownStartRetainingFundsAfterDrawdown = calculateValueAtDrawdownStartRetainingFundsAfterDrawdown(drawdownMonths, expectedReturnAtDrawdown, desiredValueAtEndOfDrawdown);
  const compoundInterestMultiplierAtDrawdown = calculateCompoundInterestMultiplierAtDrawdown(drawdownMonths, expectedReturnAtDrawdown);
  return (desiredDrawdownAmount * compoundInterestMultiplierAtDrawdown) + valueAtDrawdownStartRetainingFundsAfterDrawdown + lumpSum;
}

function calculateMonthlyContributionsRequiredToFundDrawdownWhenLumpsumIsOnRetirement(targetGoalAmount: number, drawdownMonths: number, contributingMonths: number, desiredDrawdownAmount: number, lumpSum: number, expectedReturnPreDrawdown: number, expectedReturnAtDrawdown: number, portfolioValue: number, upfrontContribution: number): number {
  const valueAtDrawdownStart = calculateValueAtDrawdownStart(contributingMonths, expectedReturnPreDrawdown, portfolioValue, upfrontContribution);
  const compoundInterestMultiplierPreDrawdown = calculateCompoundInterestMultiplierPreDrawdown(contributingMonths, expectedReturnPreDrawdown);
  return (targetGoalAmount - valueAtDrawdownStart) / compoundInterestMultiplierPreDrawdown;
}

function calculateUpfrontContributionRequiredWhenLumpsumIsOnRetirement(preGoalExpectedMonthlyReturn: number, contributionPeriodUptoLumpSum: number, contributionPeriodFromLumpSumAndDrawdown: number, targetGoalAgeTotal: number, monthlyContributions: number, portfolioValue: number) {
  const upfrontContributionRequiredToFundDrawdown = (targetGoalAgeTotal - monthlyContributions * ((1 + preGoalExpectedMonthlyReturn) ** contributionPeriodUptoLumpSum - 1) / preGoalExpectedMonthlyReturn) / ((1 + preGoalExpectedMonthlyReturn) ** contributionPeriodUptoLumpSum) - portfolioValue
  return upfrontContributionRequiredToFundDrawdown;
}


function calculateProjection(timeToAge100: number,
  portfolioValue: number, upfrontContribution: number, goalLumpSum: number, desiredMonthlyDrawdown: number, monthlyContributions: number, desiredValueAtEndOfDrawdown: number,
  goalContributingMonths: number, preGoalExpectedMonthlyReturn: number, postGoalExpectedMonthlyReturn: number, contributionPeriodUptoLumpSum: number, contributionPeriodFromLumpSumAndDrawdown: number,
  goalTargetMonth: number, monthlyContributionsRequiredToFundDrawdown: number, goalDrawdownMonths: number, startingValue: number) {
  const targetProjections = Array<ProjectionMonth>();
  const targetProjectionLine = new ProjectionMonth(
    0,
    startingValue
  );


  targetProjections.push(targetProjectionLine);

  for (let month = 1; month <= timeToAge100; month++) {

    const previousMonthProjectedValue = targetProjections[targetProjections.length - 1].projectedValue;

    const averagePercentage = month <= goalContributingMonths
      ? calculatePercentage(month, preGoalExpectedMonthlyReturn)
      : calculatePercentage(month, postGoalExpectedMonthlyReturn);


    let projectionValue = (contributionPeriodFromLumpSumAndDrawdown == 0) ?
      calculateProjectionWhenInRetirementOrWhenLumpsumIsOnRetirement(month, previousMonthProjectedValue, averagePercentage, portfolioValue, upfrontContribution, goalLumpSum, desiredMonthlyDrawdown, goalContributingMonths, goalDrawdownMonths, monthlyContributionsRequiredToFundDrawdown)
      : (contributionPeriodUptoLumpSum < 0)
        ? calculateProjectionWhenInRetirementOrWhenLumpsumIsOnRetirement(month, previousMonthProjectedValue, averagePercentage, portfolioValue, upfrontContribution, goalLumpSum, desiredMonthlyDrawdown, contributionPeriodUptoLumpSum, goalDrawdownMonths, monthlyContributions)
        : calculateProjectionValue(month, previousMonthProjectedValue, averagePercentage, portfolioValue, upfrontContribution, monthlyContributionsRequiredToFundDrawdown, goalLumpSum, desiredValueAtEndOfDrawdown, desiredMonthlyDrawdown, contributionPeriodUptoLumpSum, contributionPeriodFromLumpSumAndDrawdown, goalTargetMonth, (month > contributionPeriodUptoLumpSum + 1) ? targetProjections[contributionPeriodUptoLumpSum].projectedValue : 0)

    const targetProjectionLine = new ProjectionMonth(
      month,
      projectionValue
    );

    targetProjections.push(targetProjectionLine);
  }
  return targetProjections;
}

//when retirement and lump sum date is same

function calculateProjectionWhenInRetirementOrWhenLumpsumIsOnRetirement(month: number, previousMonthProjectedValue: number, percentage: number, portfolioCurrentValue: number, upfrontContribution: number, lumpSumAmount: number, desiredMonthlyDrawdown: number, goalContributingPeriod: number, goalDrawdownPeriod: number, monthlyContributions: number) {
  if (previousMonthProjectedValue <= 0) {
    return 0;
  }

  if (month > goalContributingPeriod + 1 && month <= goalContributingPeriod + goalDrawdownPeriod) {
    return (previousMonthProjectedValue - desiredMonthlyDrawdown) * (1 + percentage);
  }
  else if (month > goalContributingPeriod + goalDrawdownPeriod) {
    return 0;
  }
  else if (month == goalContributingPeriod + 1) {
    return (previousMonthProjectedValue - lumpSumAmount - desiredMonthlyDrawdown) * (1 + percentage);
  }
  return (portfolioCurrentValue + upfrontContribution) * (1 + percentage) ** month + monthlyContributions * ((1 - (1 + percentage) ** month) / (1 - (1 + percentage)));
}


function calculateProjectionValue(month: number, previousMonthProjectedValue: number, percentage: number, portfolioCurrentValue: number, upfrontContribution: number, monthlyContributionsRequiredToFundDrawdown: number, lumpSumAmount: number, desiredValueAtEndOfDrawdown: number, desiredMonthlyDrawdown: number, contributionPeriodUptoLumpSum: number, contributionPeriodFromLumpSumAndDrawdown: number, goalTargetMonth: number, ProjectionValueOnLumpSumDate: number) {

  if (previousMonthProjectedValue <= 0) {
    return 0;
  }

  if (month == goalTargetMonth) {
    return (previousMonthProjectedValue - desiredValueAtEndOfDrawdown);
  }

  if (month == contributionPeriodUptoLumpSum + 1) {
    return (previousMonthProjectedValue - lumpSumAmount + monthlyContributionsRequiredToFundDrawdown) * (1 + percentage);
  }

  if (month >= (contributionPeriodUptoLumpSum + contributionPeriodFromLumpSumAndDrawdown + 1)) {
    return ((previousMonthProjectedValue - desiredMonthlyDrawdown) * (1 + percentage));
  }

  if (month > contributionPeriodUptoLumpSum + 1) {
    return (ProjectionValueOnLumpSumDate - lumpSumAmount) * (1 + percentage) ** (month - contributionPeriodUptoLumpSum) + monthlyContributionsRequiredToFundDrawdown * ((1 + percentage) ** (month - contributionPeriodUptoLumpSum) - 1) / percentage;
  }
  return (portfolioCurrentValue + upfrontContribution) * (1 + percentage) ** month + monthlyContributionsRequiredToFundDrawdown * ((1 - (1 + percentage) ** month) / (1 - (1 + percentage)));
}


function calculatePercentage(month: number, monthlyNetExpectedReturn: number): number {
  return ((1 + monthlyNetExpectedReturn) ** month) ** (1 / month) - 1;
}

function calculateValueAtDrawdownStart(contributingMonths: number, monthlyExpectedReturn: number, portfolioValue: number, upfrontContribution: number): number {
  return ((1 + monthlyExpectedReturn) ** contributingMonths) * (portfolioValue + upfrontContribution);
}

function calculateCompoundInterestMultiplierAtDrawdown(drawdownMonths: number, monthlyExpectedReturn: number): number {
  return (1 - (1 + monthlyExpectedReturn) ** (-drawdownMonths)) / monthlyExpectedReturn * (1 + monthlyExpectedReturn);
}

function calculateCompoundInterestMultiplierPreDrawdown(contributingMonths: number, monthlyExpectedReturn: number): number {
  return ((1 + monthlyExpectedReturn) ** contributingMonths - 1) / monthlyExpectedReturn;
}

function calculateValueAtDrawdownStartRetainingFundsAfterDrawdown(drawdownMonths: number, monthlyExpectedReturn: number, desiredValueAtEndOfDrawdown: number): number {
  return desiredValueAtEndOfDrawdown / ((1 + monthlyExpectedReturn) ** drawdownMonths);
}

function calculateExpectedReturnMultiplier(monthlyExpectedReturn: number, contributionPeriod: number): number {
  return (1 + monthlyExpectedReturn) ** contributionPeriod;
}

function calculateUpfrontContributionRequired(preGoalExpectedMonthlyReturn: number, contributionPeriodUptoLumpSum: number, contributionPeriodFromLumpSumAndDrawdown: number, targetGoalAgeTotal: number, monthlyContributions: number, goalLumpSum: number, portfolioValue: number, upfrontContribution: number) {
  const preGoalContributionFromLumpSumAndDrawdown = calculateExpectedReturnMultiplier(preGoalExpectedMonthlyReturn, contributionPeriodFromLumpSumAndDrawdown);
  const preGoalUptoLumpSumCompoundInterestMultiplier = calculateCompoundInterestMultiplierPreDrawdown(contributionPeriodUptoLumpSum, preGoalExpectedMonthlyReturn);
  const preGoalFromLumpSumAndDrawdownCompoundInterestMultiplier = (preGoalContributionFromLumpSumAndDrawdown - 1) / preGoalExpectedMonthlyReturn;

  const upfrontContributionRequiredToFundDrawdown = (targetGoalAgeTotal - monthlyContributions * preGoalFromLumpSumAndDrawdownCompoundInterestMultiplier - preGoalContributionFromLumpSumAndDrawdown * (monthlyContributions * preGoalUptoLumpSumCompoundInterestMultiplier - goalLumpSum)) / ((1 + preGoalExpectedMonthlyReturn) ** (contributionPeriodUptoLumpSum + contributionPeriodFromLumpSumAndDrawdown)) - portfolioValue - upfrontContribution;


  return upfrontContributionRequiredToFundDrawdown;
}

function calculateMonthlyContributionsRequiredToFundDrawdown(targetGoalAgeAmount: number, preGoalExpectedMonthlyReturn: number, contributionPeriodFromLumpSumAndDrawdown: number, portfolioValue: number, upfrontContribution: number, goalLumpSum: number, contributionPeriodUptoLumpSum: number) {
  const compoundInterestMultiplierPreDrawdown = calculateCompoundInterestMultiplierPreDrawdown(contributionPeriodFromLumpSumAndDrawdown, preGoalExpectedMonthlyReturn);
  const compoundInterestMultiplierPreLumpSum = calculateCompoundInterestMultiplierPreDrawdown(contributionPeriodUptoLumpSum, preGoalExpectedMonthlyReturn);
  const valueAtDrawdownStart = calculateValueAtDrawdownStart(contributionPeriodUptoLumpSum, preGoalExpectedMonthlyReturn, portfolioValue, upfrontContribution)
  return (targetGoalAgeAmount - ((1 + preGoalExpectedMonthlyReturn) ** contributionPeriodFromLumpSumAndDrawdown) * (valueAtDrawdownStart - goalLumpSum)) / ((((1 + preGoalExpectedMonthlyReturn) ** contributionPeriodFromLumpSumAndDrawdown) * compoundInterestMultiplierPreLumpSum) + compoundInterestMultiplierPreDrawdown);
}


function calculateMonthlyNetExpectedReturn(expectedReturn: number, feesPercentage: number): number {
  const annualNetExpectedReturn = expectedReturn - feesPercentage;
  return ((1 + annualNetExpectedReturn) ** (1 / 12)) - 1;
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

function parseDate(date: string): Date {
  return new Date(Date.parse(date))
}

//TODO move into a shared code folder as there is duplication with the current-projection
function validateInput(inboundPayload: RequestPayload): ValidationError[] {
  let errors = Array<ValidationError>();

  if (typeof inboundPayload.timeToAge100 == 'undefined' || inboundPayload.timeToAge100 <= 0) {
    const error: ValidationError = {
      code: "val-targetproj-001",
      property: "timeToAge100",
      message: "timeToAge100_must_be_more_than_zero"
    }
    errors.push(error);
  }


  if (typeof inboundPayload.portfolioValue == 'undefined' || inboundPayload.portfolioValue < 0) {
    const error: ValidationError = {
      code: "val-targetproj-002",
      property: "portfolioValue",
      message: "portfolioValue_must_be_a_positive_number_or_zero",
    }
    errors.push(error)
  }

  if (typeof inboundPayload.desiredMonthlyDrawdown == 'undefined' || inboundPayload.desiredMonthlyDrawdown < 0) {
    const error: ValidationError = {
      code: "val-targetproj-003",
      property: "desiredMonthlyDrawdown",
      message: "desiredMonthlyDrawdown_must_be_a_positive_number_or_zero",
    }
    errors.push(error)
  }

  if (typeof inboundPayload.drawdownStartDate == 'undefined' || !Date.parse(inboundPayload.drawdownStartDate)) {
    const error: ValidationError = {
      code: "val-targetproj-004",
      property: "drawdownStartDate",
      message: "drawdownStartDate_must_be_a_valid_date",
    }
    errors.push(error)
  }

  if (typeof inboundPayload.drawdownEndDate == 'undefined' || !Date.parse(inboundPayload.drawdownEndDate)) {
    const error: ValidationError = {
      code: "val-targetproj-005",
      property: "drawdownEndDate",
      message: "drawdownEndDate_must_be_a_valid_date",
    }
    errors.push(error)
  }

  if (Date.parse(inboundPayload.drawdownStartDate) > 0 && parseDate(inboundPayload.drawdownEndDate) < parseDate(inboundPayload.drawdownStartDate)) {
    const error: ValidationError = {
      code: "val-targetproj-006",
      property: "drawdownEndDate",
      message: "drawdownEndDate_must_be_later_than_start_date",
    }
    errors.push(error)
  }


  if (typeof inboundPayload.upfrontContribution == 'undefined' || inboundPayload.upfrontContribution < 0) {
    const error: ValidationError = {
      code: "val-targetproj-007",
      property: "upfrontContribution",
      message: "upfrontContribution_must_be_a_positive_number_or_zero",
    }
    errors.push(error)
  }

  if (typeof inboundPayload.preGoalExpectedReturn == 'undefined') {
    const error: ValidationError = {
      code: "val-targetproj-008",
      property: "preGoalExpectedReturn",
      message: "preGoalExpectedReturn_must_be_a_valid_number",
    }
    errors.push(error)
  }


  if (typeof inboundPayload.feesPercentage == 'undefined' || inboundPayload.feesPercentage < 0) {
    const error: ValidationError = {
      code: "val-targetproj-009",
      property: "feesPercentage",
      message: "feesPercentage_must_be_a_positive_number_or_zero",
    }
    errors.push(error)
  }

  if (typeof inboundPayload.postGoalExpectedReturn == 'undefined') {
    const error: ValidationError = {
      code: "val-targetproj-010",
      property: "postGoalExpectedReturn",
      message: "postGoalExpectedReturn_must_be_a_valid_number",
    }
    errors.push(error)
  }


  if (typeof inboundPayload.goalLumpSum == 'undefined' || inboundPayload.goalLumpSum < 0) {
    const error: ValidationError = {
      code: "val-targetproj-011",
      property: "goalLumpSum",
      message: "goalLumpSum_must_be_a_positive_number_or_zero",
    }
    errors.push(error)
  }

  if (inboundPayload.goalLumpSum > 0 && (typeof inboundPayload.lumpSumDate == 'undefined' || !Date.parse(inboundPayload.lumpSumDate))) {
    const error: ValidationError = {
      code: "val-targetproj-012",
      property: "lumpSumDate",
      message: "lumpSumDate_must_be_a_valid_date",
    }
    errors.push(error)
  }

  if (typeof inboundPayload.statePensionAmount == 'undefined' || inboundPayload.statePensionAmount < 0) {
    const error: ValidationError = {
      code: "val-targetproj-013",
      property: "statePensionAmount",
      message: "statePensionAmount_must_be_a_positive_number_or_zero",
    }
    errors.push(error)
  }
  if (typeof inboundPayload.desiredValueAtEndOfDrawdown == 'undefined' || inboundPayload.desiredValueAtEndOfDrawdown < 0) {
    const error: ValidationError = {
      code: "val-targetproj-014",
      property: "desiredValueAtEndOfDrawdown",
      message: "desiredValueAtEndOfDrawdown_must_be_a_positive_number_or_zero",
    }
    errors.push(error)
  }

  if (typeof inboundPayload.includeStatePension == 'undefined') {
    const error: ValidationError = {
      code: "val-targetproj-017",
      property: "includeStatePension",
      message: "includeStatePension_must_be_a_valid_boolean_value",
    }
    errors.push(error)
  }

  if (Date.parse(inboundPayload.drawdownStartDate) > 0 && parseDate(inboundPayload.lumpSumDate) > parseDate(inboundPayload.drawdownStartDate)) {
    const error: ValidationError = {
      code: "val-targetproj-v2-018",
      property: "lumpSumDate",
      message: "lumpSumDate_must_be_same_or_before_the_drawdownStartDate",
    }
    errors.push(error)
  }
  return errors;
}

export {
  calculateCompoundInterestMultiplierPreDrawdown,
  calculateCompoundInterestMultiplierAtDrawdown,
  calculateMonthlyNetExpectedReturn,
  calculateMonthlyContributionsRequiredToFundDrawdown,
  calculateProjectionValue,
  calculateUpfrontContributionRequired,
  calculateValueAtDrawdownStart,
  calculateValueAtDrawdownStartRetainingFundsAfterDrawdown,
  getTargetProjection,
  monthsDiff,
  targetProjectionMain,
  validateInput
};

