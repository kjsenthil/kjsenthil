import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import { RequestPayload, ResponsePayload, ProjectionMonth, ValidationError } from './types';

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
    responseBody = {errorMessage: e.message};
    responseStatus = 400;
  }
  context.res = {
    body: responseBody,
    status: responseStatus,
  };
};


function getTargetProjection(inboundPayload: RequestPayload, today: Date): ResponsePayload {
  
  const goalContributingMonths = monthsDiff(today, parseDate(inboundPayload.drawdownStartDate)) - 1;
  const goalDrawdownMonths = monthsDiff(parseDate(inboundPayload.drawdownStartDate), parseDate(inboundPayload.drawdownEndDate)) + 1;

  const preGoalExpectedMonthlyReturn = calculateMonthlyNetExpectedReturn(inboundPayload.preGoalExpectedReturn, inboundPayload.feesPercentage);
  const preGoalMonthlyVolatility = calculateMonthlyVolatility(inboundPayload.preGoalVolatility);
  const postGoalExpectedMonthlyReturn = calculateMonthlyNetExpectedReturn(inboundPayload.postGoalExpectedReturn, inboundPayload.feesPercentage);
  const postGoalMonthlyVolatility = calculateMonthlyVolatility(inboundPayload.postGoalVolatility);
  // for retirement v2 will need to include state pension
  let possibleDrawdownsp = 0;

  const response = {} as ResponsePayload;
  response.targetGoalAmount = calculateTargetGoalAmount(goalDrawdownMonths, inboundPayload.desiredMonthlyDrawdown, inboundPayload.goalLumpSum, postGoalExpectedMonthlyReturn, inboundPayload.desiredValueAtEndOfDrawdown);
  response.monthlyContributionsRequiredToFundDrawdown = calculateMonthlyContributionsRequiredToFundDrawdown(goalDrawdownMonths, goalContributingMonths,  inboundPayload.desiredMonthlyDrawdown, inboundPayload.goalLumpSum, preGoalExpectedMonthlyReturn, postGoalExpectedMonthlyReturn, inboundPayload.portfolioValue, inboundPayload.upfrontContribution, inboundPayload.desiredValueAtEndOfDrawdown);
 
  const targetProjections = Array<ProjectionMonth>();
  const targetProjectionLine = new ProjectionMonth(
    0,
    inboundPayload.portfolioValue + inboundPayload.upfrontContribution
  )

  targetProjections.push(targetProjectionLine);

  for (let month = 1; month <= inboundPayload.timeToAge100; month++) {
    
    const previousMonthValue = targetProjections[targetProjections.length - 1];
    
    const averagePercentage = month <= goalContributingMonths
      ? calculatePercentage(month, preGoalExpectedMonthlyReturn, preGoalMonthlyVolatility, 0)
      : calculatePercentage(month, postGoalExpectedMonthlyReturn, postGoalMonthlyVolatility, 0)

    const targetProjectionLine = new ProjectionMonth(
      month,
      calculateProjectionValue(month, goalContributingMonths, goalDrawdownMonths, previousMonthValue.projectedValue, possibleDrawdownsp, averagePercentage, inboundPayload.goalLumpSum, inboundPayload.portfolioValue, inboundPayload.upfrontContribution, response.monthlyContributionsRequiredToFundDrawdown, inboundPayload.desiredMonthlyDrawdown),
    );

     targetProjections.push(targetProjectionLine);
  }

  response.projections = targetProjections;
  return response;
}

//TODO: need to work out how to handle state pension for now it is 0
function calculateProjectionValue(month: number, goalContributingPeriod: number, goalDrawdownPeriod: number, previousMonthProjectedValue: number, possibleDrawdownsp: number, percentage: number, lumpSumAmount: number, portfolioCurrentValue: number, upfrontContribution: number, monthlyContributions: number, desiredMonthlyDrawdown: number) {
  if (previousMonthProjectedValue <= 0) {
      return 0;
  }

  if (month > goalContributingPeriod + 1 && month <= goalContributingPeriod + goalDrawdownPeriod ) {
      return (previousMonthProjectedValue - desiredMonthlyDrawdown - possibleDrawdownsp) * (1 + percentage);
  }   
  else if (month > goalContributingPeriod + goalDrawdownPeriod){
    return 0;
  }
  else if (month == goalContributingPeriod + 1) {
      return (previousMonthProjectedValue - lumpSumAmount - desiredMonthlyDrawdown - possibleDrawdownsp) * (1 + percentage);
  }

  return (portfolioCurrentValue + upfrontContribution) * (1 + percentage) ** month + monthlyContributions * ((1 - (1 + percentage) ** month) / (1 - (1 + percentage)));
}

function calculatePercentage(month: number, monthlyNetExpectedReturn: number, monthlyVolatility: number, zScore: number): number {
  return ((1 + monthlyNetExpectedReturn) ** month + Math.sqrt(month) * monthlyVolatility * zScore) ** (1 / month) - 1;
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

function calculateTargetGoalAmount(drawdownMonths: number, desiredDrawdownAmount: number, lumpSum: number, expectedReturnAtDrawdown: number, desiredValueAtEndOfDrawdown: number): number {
  const valueAtDrawdownStartRetainingFundsAfterDrawdown = calculateValueAtDrawdownStartRetainingFundsAfterDrawdown(drawdownMonths, expectedReturnAtDrawdown, desiredValueAtEndOfDrawdown);
  const compoundInterestMultiplierAtDrawdown = calculateCompoundInterestMultiplierAtDrawdown(drawdownMonths, expectedReturnAtDrawdown);
  return (desiredDrawdownAmount * compoundInterestMultiplierAtDrawdown) + valueAtDrawdownStartRetainingFundsAfterDrawdown + lumpSum;
}

function calculateMonthlyContributionsRequiredToFundDrawdown(drawdownMonths: number, contributingMonths: number, desiredDrawdownAmount: number, lumpSum: number, expectedReturnPreDrawdown: number, expectedReturnAtDrawdown: number, portfolioValue: number, upfrontContribution: number, desiredValueAtEndOfDrawdown: number): number {
  const targetGoalAmount = calculateTargetGoalAmount(drawdownMonths, desiredDrawdownAmount, lumpSum, expectedReturnAtDrawdown, desiredValueAtEndOfDrawdown);
  const valueAtDrawdownStart = calculateValueAtDrawdownStart(contributingMonths, expectedReturnPreDrawdown, portfolioValue, upfrontContribution);
  const compoundInterestMultiplierPreDrawdown = calculateCompoundInterestMultiplierPreDrawdown(contributingMonths, expectedReturnPreDrawdown);
  return (targetGoalAmount - valueAtDrawdownStart)/compoundInterestMultiplierPreDrawdown;
}

function calculateMonthlyNetExpectedReturn(expectedReturn: number, feesPercentage: number): number {
  const annualNetExpectedReturn = expectedReturn - feesPercentage;
  return ((1 + annualNetExpectedReturn) ** (1 / 12)) - 1;
}

function calculateMonthlyVolatility(volatility: number): number {
  return (volatility / Math.sqrt(12));
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

  if (typeof inboundPayload.preGoalRiskModel == 'undefined' || inboundPayload.preGoalRiskModel.trim() === "") {
      const error: ValidationError = {
          code: "val-targetproj-002",
          property: "preGoalRiskModel",
          message: "preGoalRiskModel_must_not_be_empty"
      }
      errors.push(error);
  }

  if (typeof inboundPayload.portfolioValue == 'undefined' || inboundPayload.portfolioValue < 0) {
      const error: ValidationError = {
          code: "val-targetproj-003",
          property: "portfolioValue",
          message: "portfolioValue_must_be_a_positive_number_or_zero",
      }
      errors.push(error)
  }

  if (typeof inboundPayload.desiredMonthlyDrawdown == 'undefined' || inboundPayload.desiredMonthlyDrawdown < 0) {
      const error: ValidationError = {
          code: "val-targetproj-004",
          property: "desiredMonthlyDrawdown",
          message: "desiredMonthlyDrawdown_must_be_a_positive_number_or_zero",
      }
      errors.push(error)
  }

  if (typeof inboundPayload.drawdownStartDate == 'undefined' || !Date.parse(inboundPayload.drawdownStartDate)) {
      const error: ValidationError = {
          code: "val-targetproj-005",
          property: "drawdownStartDate",
          message: "drawdownStartDate_must_be_a_valid_date",
      }
      errors.push(error)
  }

  if (typeof inboundPayload.drawdownEndDate == 'undefined' || !Date.parse(inboundPayload.drawdownEndDate)) {
      const error: ValidationError = {
          code: "val-targetproj-006",
          property: "drawdownEndDate",
          message: "drawdownEndDate_must_be_a_valid_date",
      }
      errors.push(error)
  }

  if (Date.parse(inboundPayload.drawdownStartDate) > 0 && parseDate(inboundPayload.drawdownEndDate) < parseDate(inboundPayload.drawdownStartDate)) {
      const error: ValidationError = {
          code: "val-targetproj-007",
          property: "drawdownEndDate",
          message: "drawdownEndDate_must_be_later_than_start_date",
      }
      errors.push(error)
  }


  if (typeof inboundPayload.upfrontContribution == 'undefined' || inboundPayload.upfrontContribution < 0) {
      const error: ValidationError = {
          code: "val-targetproj-008",
          property: "upfrontContribution",
          message: "upfrontContribution_must_be_a_positive_number_or_zero",
      }
      errors.push(error)
  }

  if (typeof inboundPayload.preGoalExpectedReturn == 'undefined') {
      const error: ValidationError = {
          code: "val-targetproj-009",
          property: "preGoalExpectedReturn",
          message: "preGoalExpectedReturn_must_be_a_valid_number",
      }
      errors.push(error)
  }

  if (typeof inboundPayload.preGoalVolatility == 'undefined') {
      const error: ValidationError = {
          code: "val-targetproj-010",
          property: "preGoalVolatility",
          message: "preGoalVolatility_must_be_a_valid_number",
      }
      errors.push(error)
  }

  if (typeof inboundPayload.feesPercentage == 'undefined' || inboundPayload.feesPercentage < 0) {
      const error: ValidationError = {
          code: "val-targetproj-011",
          property: "feesPercentage",
          message: "feesPercentage_must_be_a_positive_number_or_zero",
      }
      errors.push(error)
  }

  if (typeof inboundPayload.postGoalRiskModel == 'undefined' || inboundPayload.postGoalRiskModel.trim() === "") {
      const error: ValidationError = {
          code: "val-targetproj-012",
          property: "postGoalRiskModel",
          message: "postGoalRiskModel_must_not_be_empty",
      }
      errors.push(error)
  }
  if (typeof inboundPayload.postGoalExpectedReturn == 'undefined') {
      const error: ValidationError = {
          code: "val-targetproj-013",
          property: "postGoalExpectedReturn",
          message: "postGoalExpectedReturn_must_be_a_valid_number",
      }
      errors.push(error)
  }

  if (typeof inboundPayload.postGoalVolatility == 'undefined') {
      const error: ValidationError = {
          code: "val-targetproj-014",
          property: "postGoalExpectedVolatility",
          message: "postGoalExpectedVolatility_must_be_a_valid_number",
      }
      errors.push(error)
  }

  if (typeof inboundPayload.goalLumpSum == 'undefined' || inboundPayload.goalLumpSum  < 0) {
      const error: ValidationError = {
          code: "val-targetproj-015",
          property: "goalLumpSum",
          message: "goalLumpSum_must_be_a_positive_number_or_zero",
      }
      errors.push(error)
  }

  if (typeof inboundPayload.lumpSumDate == 'undefined' || !Date.parse(inboundPayload.lumpSumDate)) {
    const error: ValidationError = {
        code: "val-targetproj-016",
        property: "lumpSumDate",
        message: "lumpSumDate_must_be_a_valid_date",
    }
    errors.push(error)
  }

  if (typeof inboundPayload.statePensionAmount == 'undefined' || inboundPayload.statePensionAmount < 0) {
      const error: ValidationError = {
          code: "val-targetproj-017",
          property: "statePensionAmount",
          message: "statePensionAmount_must_be_a_positive_number_or_zero",
      }
      errors.push(error)
  }
  if (typeof inboundPayload.desiredValueAtEndOfDrawdown == 'undefined' || inboundPayload.desiredValueAtEndOfDrawdown < 0) {
      const error: ValidationError = {
          code: "val-targetproj-018",
          property: "desiredValueAtEndOfDrawdown",
          message: "desiredValueAtEndOfDrawdown_must_be_a_positive_number_or_zero",
      }
      errors.push(error)
  }

  if (typeof inboundPayload.includeStatePension == 'undefined') {
      const error: ValidationError = {
          code: "val-targetproj-019",
          property: "includeStatePension",
          message: "includeStatePension_must_be_a_valid_boolean_value",
      }
      errors.push(error)
  }

  return errors;
}

export {
  calculateCompoundInterestMultiplierPreDrawdown,
  calculateCompoundInterestMultiplierAtDrawdown,
  calculateMonthlyVolatility,
  calculateMonthlyNetExpectedReturn,
  calculateMonthlyContributionsRequiredToFundDrawdown,
  calculateTargetGoalAmount,
  calculateValueAtDrawdownStart,
  calculateValueAtDrawdownStartRetainingFundsAfterDrawdown,
  getTargetProjection,
  monthsDiff,
  targetProjectionMain,
  validateInput
};