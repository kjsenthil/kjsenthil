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

const isUndefinedOrLessThanZero = (field: undefined | number) => !field || field < 0;

function validateInput(inboundPayload: GoalRequestPayload): ValidationError[] {

    let validCategories = [GoalCategory.RETIREMENT.valueOf(), GoalCategory.INVESTMENT.valueOf(), GoalCategory.UNCATEGORIZED.valueOf()];
    let validAdviceTypes = [GoalAdviceType.RETIREMENT.valueOf(), GoalAdviceType.INVESTMENT.valueOf()];
    let errors = Array<ValidationError>();

    //In case of  canceled goal than no need to validate whole request
    if (inboundPayload.fields?.status === GoalStatus.CANCELLED) { return [] };

    if (typeof inboundPayload.fields?.description?.trim == 'undefined') {
        const error: ValidationError = {
            "code": "val-goal-001",
            "property": "description",
            "message": "description_cannot_be_empty",
        }
        errors.push(error)
    }

    if (!validCategories.includes(inboundPayload.fields?.category)) {
        const error: ValidationError = {
            "code": "val-goal-002",
            "property": "category",
            "message": "category_not_valid",
        }
        errors.push(error)
    }
    if (!Object.values(GoalStatus).includes(inboundPayload.fields?.status)) {
        const error: ValidationError = {
            "code": "val-goal-003",
            "property": "status",
            "message": "status_not_valid",
        }
        errors.push(error)
    }
    if (!validAdviceTypes.includes(inboundPayload.fields?.advice_type)) {
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

    if (!inboundPayload.fields?.regular_drawdown?._val?.value?._val || inboundPayload.fields?.regular_drawdown?._val?.value?._val <= 0) {
        const error: ValidationError = {
            "code": "val-goal-007",
            "property": "drawdownAmount",
            "message": "drawdownAmount_must_be_a_positive_number",
        }
        errors.push(error)
    }

    if (isUndefinedOrLessThanZero(inboundPayload.fields?.bi_retirement_lump_sum)) {
        const error: ValidationError = {
            "code": "val-goal-008",
            "property": "bi_retirement_lump_sum",
            "message": "bi_retirement_lump_sum_must_be_a_positive_number_or_zero",
        }
        errors.push(error)
    }

    if (inboundPayload.fields?.bi_retirement_lump_sum > 0 && (typeof inboundPayload.fields?.bi_retirement_lump_sum_date == 'undefined' || !Date.parse(inboundPayload.fields?.bi_retirement_lump_sum_date))) {
        const error: ValidationError = {
            "code": "val-goal-009",
            "property": "bi_retirement_lump_sum_date",
            "message": "bi_retirement_lump_sum_date_must_be_a_valid_date",
        }
        errors.push(error)
    }
    if (isUndefinedOrLessThanZero(inboundPayload.fields?.bi_retirement_remaining_amount)) {
        const error: ValidationError = {
            "code": "val-goal-010",
            "property": "bi_retirement_remaining_amount",
            "message": "bi_retirement_remaining_amount_must_be_a_positive_number_or_zero",
        }
        errors.push(error)
    }

    if (isUndefinedOrLessThanZero(inboundPayload.fields?.bi_state_pension_amount)) {
        const error: ValidationError = {
            "code": "val-goal-011",
            "property": "bi_state_pension_amount",
            "message": "bi_state_pension_amount_must_be_a_positive_number_or_zero",
        }
        errors.push(error)
    }
    return errors;
}


export { validateGoalRequestMain, validateInput }
