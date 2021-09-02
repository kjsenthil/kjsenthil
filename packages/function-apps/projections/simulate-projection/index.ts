import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import { getRetirementProjection } from './goal-retirement';
import { monthsDiff, parseDate } from './helpers';
import { DrawdownType, RequestPayload, ResponsePayload, ValidationError } from './types';

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
    if (e instanceof Error) {
      responseBody = { errorMessage: e.message };
    }
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

      if (typeof inboundPayload.drawdownOneOff.targetDate == 'undefined'  || !Date.parse(inboundPayload.drawdownOneOff.targetDate)) {
        const error: ValidationError = {
          code: "val-simulateproj-011",
          property: "drawdownOneOff.targetDate",
          message: "drawdownOneOff_targetDate_must_be_a_valid_date",
        }
        errors.push(error)
      }
      else
      {
        const currentDate = parseDate(new Date().toISOString().slice(0, 10));
        if (parseDate(inboundPayload.drawdownOneOff.targetDate) >= currentDate) {
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

      if (typeof inboundPayload.drawdownMonthly.startDate == 'undefined'  || !Date.parse(inboundPayload.drawdownMonthly.startDate)) {
        const error: ValidationError = {
          code: "val-simulateproj-014",
          property: "drawdownMonthly.startDate",
          message: "drawdownMonthly_startDate_must_be_a_valid_date"
        }
        errors.push(error)
      }
      if (typeof inboundPayload.drawdownMonthly.endDate == 'undefined'  || !Date.parse(inboundPayload.drawdownMonthly.endDate)) {
        const error: ValidationError = {
          code: "val-simulateproj-015",
          property: "drawdownMonthly.endDate",
          message: "drawdownMonthly_endDate_must_be_a_valid_date"
        }
        errors.push(error)
      }
      else{
        const currentDate = parseDate(new Date().toISOString().slice(0, 10));
        if (parseDate(inboundPayload.drawdownMonthly.endDate) <= currentDate){
          const error: ValidationError = {
            code: "val-simulateproj-038",
            property: "drawdownMonthly.endDate",
            message: "drawdownMonthly_endDate_must_be_in_the_future"
          }
          errors.push(error)
        }
      }

      if (inboundPayload.drawdownMonthly.startDate && inboundPayload.drawdownMonthly.endDate && monthsDiff(parseDate(inboundPayload.drawdownMonthly.startDate), parseDate(inboundPayload.drawdownMonthly.endDate)) < 1) {
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

      if (typeof inboundPayload.drawdownAnnually.startDate == 'undefined'  || !Date.parse(inboundPayload.drawdownAnnually.startDate)) {
        const error: ValidationError = {
          code: "val-simulateproj-019",
          property: "drawdownAnnually.startDate",
          message: "drawdownAnnually_startDate_must_be_a_valid_date",
        }
        errors.push(error)
      }

      if (typeof inboundPayload.drawdownAnnually.endDate == 'undefined'  || !Date.parse(inboundPayload.drawdownAnnually.endDate)) {
        const error: ValidationError = {
          code: "val-simulateproj-020",
          property: "drawdownAnnually.endDate",
          message: "drawdownAnnually_endDate_must_be_a_valid_date",
        }
        errors.push(error)
      }
      else {
        const currentDate = parseDate(new Date().toISOString().slice(0, 10));
        if (parseDate(inboundPayload.drawdownAnnually.endDate) <= currentDate){
          const error: ValidationError = {
            code: "val-simulateproj-037",
            property: "drawdownAnnually.endDate",
            message: "drawdownAnnually_endDate_must_be_in_the_future",
          }
          errors.push(error)
        }
      }

      if (inboundPayload.drawdownAnnually.startDate && inboundPayload.drawdownAnnually.endDate && (parseDate(inboundPayload.drawdownAnnually.endDate).getFullYear() - parseDate(inboundPayload.drawdownAnnually.startDate).getFullYear() < 1))  {
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

      if (typeof inboundPayload.drawdownRetirement.startDate == 'undefined'  || !Date.parse(inboundPayload.drawdownRetirement.startDate)) {
        const error: ValidationError = {
          code: "val-simulateproj-024",
          property: "drawdownRetirement.startDate",
          message: "drawdownRetirement_startDate_must_be_a_valid_date",
        }
        errors.push(error)
      }

      if (typeof inboundPayload.drawdownRetirement.endDate == 'undefined'  || !Date.parse(inboundPayload.drawdownRetirement.endDate)) {
        const error: ValidationError = {
          code: "val-simulateproj-025",
          property: "drawdownRetirement.endDate",
          message: "drawdownRetirement_endDate_must_be_a_valid_date",
        }
        errors.push(error)
      }

      if (inboundPayload.drawdownRetirement.startDate && inboundPayload.drawdownRetirement.endDate && monthsDiff(parseDate(inboundPayload.drawdownRetirement.startDate), parseDate(inboundPayload.drawdownRetirement.endDate)) < 1) {
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

          if (typeof inboundPayload.drawdownRetirement.lumpSum.date == 'undefined'  || !Date.parse(inboundPayload.drawdownRetirement.lumpSum.date)) {
            const error: ValidationError = {
              code: "val-simulateproj-028",
              property: "drawdownRetirement.lumpSum.date",
              message: "drawdownRetirement_lumpSum_date_must_be_a_valid_date",
            }
            errors.push(error)
          }
          else{
            if (typeof inboundPayload.drawdownRetirement.startDate != 'undefined')
              if (parseDate(inboundPayload.drawdownRetirement.startDate) < parseDate(inboundPayload.drawdownRetirement.lumpSum.date)){
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

export {
  simulateProjectionMain,
  getSimulateProjection,
  validateInput,
  setDefaultInputValues
};
