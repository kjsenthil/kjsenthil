import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { GoalStatus, GoalCategory, GoalAdviceType, GoalRequestPayload, ValidationError } from "./types";

const validateGoalRequestMain: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    let responseBody = {}
    let responseStatus = 200

    try {
        const input: GoalRequestPayload = req.body
        const validationResult = validateInput(input)
        if (validationResult != null && validationResult.length > 0) {
            responseStatus = 400
        }
        responseBody = validationResult;
    }
    catch (e) {
        responseBody = { "errorMessage": e.message }
        responseStatus = 400
    }

    context.res = {
        body: responseBody,
        status: responseStatus
    }
}

function validateInput(inboundPayload: GoalRequestPayload): ValidationError[] {
    let validCategories = [GoalCategory.RETIREMENT.valueOf(), GoalCategory.INVESTMENT.valueOf(), GoalCategory.UNCATEGORIZED.valueOf()];
    let validAdviceTypes = [GoalAdviceType.RETIREMENT.valueOf(), GoalAdviceType.INVESTMENT.valueOf()];
    let errors = Array<ValidationError>();

    if (typeof inboundPayload.fields?.description?.trim == 'undefined') {
        const error: ValidationError = {
            "code": "val-goal-001",
            "property": "description",
            "message": "description_cannot_be_empty",
        }
        errors.push(error)
    }

    if (typeof inboundPayload.fields?.category == 'undefined' || !validCategories.includes(inboundPayload.fields?.category)) {
        const error: ValidationError = {
            "code": "val-goal-002",
            "property": "category",
            "message": "category_not_valid",
        }
        errors.push(error)
    }
    if (typeof inboundPayload.fields?.status == 'undefined' || !Object.values(GoalStatus).includes(inboundPayload.fields.status)) {
        const error: ValidationError = {
            "code": "val-goal-003",
            "property": "status",
            "message": "status_not_valid",
        }
        errors.push(error)
    }
    if (typeof inboundPayload.fields?.advice_type == 'undefined'  || !validAdviceTypes.includes(inboundPayload.fields?.advice_type)) {
        const error: ValidationError = {
            "code": "val-goal-004",
            "property": "advice_type",
            "message": "adviceType_not_valid",
        }
        errors.push(error)
    }

    let startAge = 0;
    if (typeof inboundPayload.fields?.objective_frequency_start_age == 'undefined' || inboundPayload.fields?.objective_frequency_start_age < 65) {
        const error: ValidationError = {
            "code": "val-goal-005",
            "property": "objective_frequency_start_age",
            "message": "startAge_not_valid",
        }
        errors.push(error)
    }
    else {
        startAge = inboundPayload.fields?.objective_frequency_start_age
    }

    if (typeof inboundPayload.fields?.objective_frequency_end_age == 'undefined' || inboundPayload.fields?.objective_frequency_end_age < startAge) {
        const error: ValidationError = {
            "code": "val-goal-006",
            "property": "objective_frequency_end_age",
            "message": "endAge_not_valid",
        }
        errors.push(error)
    }

    if (typeof inboundPayload.fields?.regular_drawdown?._val?.value?._val == 'undefined' || inboundPayload.fields?.regular_drawdown._val.value._val <= 0) {
        const error: ValidationError = {
            "code": "val-goal-007",
            "property": "drawdownAmount",
            "message": "drawdownAmount_must_be_more_than_zero",
        }
        errors.push(error)
    }

    return errors;
}


export { validateGoalRequestMain, validateInput }
