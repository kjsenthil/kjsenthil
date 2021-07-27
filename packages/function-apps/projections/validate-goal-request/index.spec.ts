import { GoalAdviceType, GoalCategory, GoalRequestPayload, GoalStatus, ValidationError } from "./types";
import { validateInput, validateGoalRequestMain } from "./index";
import { Context } from "@azure/functions";

describe("tests for validate function", () => {
    const emptyGoal = {} as GoalRequestPayload
    it("when empty payload should return list of errors", () => {
        expect(
            validateInput(emptyGoal))
            .toEqual(
                [
                    {
                        "code": "val-goal-001",
                        "message": "description_cannot_be_empty",
                        "property": "description"
                    },
                    {
                        "code": "val-goal-002",
                        "message": "category_not_valid",
                        "property": "category"
                    },
                    {
                        "code": "val-goal-003",
                        "message": "status_not_valid",
                        "property": "status"
                    },
                    {
                        "code": "val-goal-004",
                        "message": "adviceType_not_valid",
                        "property": "advice_type"
                    },
                    {
                        "code": "val-goal-005",
                        "message": "startAge_not_valid",
                        "property": "objective_frequency_start_age"
                    },
                    {
                        "code": "val-goal-006",
                        "message": "endAge_not_valid",
                        "property": "objective_frequency_end_age"
                    },
                    {
                        "code": "val-goal-007",
                        "message": "drawdownAmount_must_be_a_positive_number",
                        "property": "drawdownAmount"
                    },
                    {
                        "code": "val-goal-008",
                        "message": "bi_retirement_lump_sum_must_be_a_positive_number_or_zero",
                        "property": "bi_retirement_lump_sum",
                    },
                    {
                        "code": "val-goal-010",
                        "message": "bi_retirement_remaining_amount_must_be_a_positive_number_or_zero",
                        "property": "bi_retirement_remaining_amount",
                    },
                    {
                        "code": "val-goal-011",
                        "message": "bi_state_pension_amount_must_be_a_positive_number_or_zero",
                        "property": "bi_state_pension_amount",
                    },
                ] as ValidationError[])
    });

    it("when status is cancelled no validate error is thrown", () => {
        let cancelledStatusGoal = { fields: {} } as GoalRequestPayload;
        cancelledStatusGoal.fields.status = GoalStatus.CANCELLED;
        expect(
            validateInput(cancelledStatusGoal))
            .toEqual([
            ] as ValidationError[])
    });

    it("when status is not cancelled validate error is thrown", () => {
        let invalidStatusGoal = { fields: {} } as GoalRequestPayload;
        invalidStatusGoal.fields.status = GoalStatus.FULFILLED;
        expect(
            validateInput(invalidStatusGoal))
            .toEqual([
                {
                    "code": "val-goal-001",
                    "message": "description_cannot_be_empty",
                    "property": "description"
                },
                {
                    "code": "val-goal-002",
                    "message": "category_not_valid",
                    "property": "category"
                },
                {
                    "code": "val-goal-004",
                    "message": "adviceType_not_valid",
                    "property": "advice_type"
                },
                {
                    "code": "val-goal-005",
                    "message": "startAge_not_valid",
                    "property": "objective_frequency_start_age"
                },
                {
                    "code": "val-goal-006",
                    "message": "endAge_not_valid",
                    "property": "objective_frequency_end_age"
                },
                {
                    "code": "val-goal-007",
                    "message": "drawdownAmount_must_be_a_positive_number",
                    "property": "drawdownAmount"
                },
                {
                    "code": "val-goal-008",
                    "message": "bi_retirement_lump_sum_must_be_a_positive_number_or_zero",
                    "property": "bi_retirement_lump_sum",
                },
                {
                    "code": "val-goal-010",
                    "message": "bi_retirement_remaining_amount_must_be_a_positive_number_or_zero",
                    "property": "bi_retirement_remaining_amount",
                },
                {
                    "code": "val-goal-011",
                    "message": "bi_state_pension_amount_must_be_a_positive_number_or_zero",
                    "property": "bi_state_pension_amount",
                },
            ] as ValidationError[])
    });
    it("when status is not validate error must be thrown", () => {
        let invalidStatusGoal = createGoal();
        invalidStatusGoal.fields.status = "11";
        expect(
            validateInput(invalidStatusGoal))
            .toEqual([
                {
                    "code": "val-goal-003",
                    "message": "status_not_valid",
                    "property": "status"
                }
            ] as ValidationError[])
    });

    it("when advice type is a valid AdviceType but not allowed one , validate error must be thrown", () => {
        let invalidGoal = createGoal();
        invalidGoal.fields.advice_type = "11";
        expect(
            validateInput(invalidGoal))
            .toEqual([
                {
                    "code": "val-goal-004",
                    "message": "adviceType_not_valid",
                    "property": "advice_type"
                }
            ] as ValidationError[])
    });

    it("when category is a valid category but not allowed one , validate error must be thrown", () => {
        let invalidGoal = createGoal();
        invalidGoal.fields.category = "11";
        expect(
            validateInput(invalidGoal))
            .toEqual([
                {
                    "code": "val-goal-002",
                    "message": "category_not_valid",
                    "property": "category"
                }
            ] as ValidationError[])
    });

    it("when start age is not above 65 error must be thrown", () => {
        let invalidGoal = createGoal();
        invalidGoal.fields.objective_frequency_start_age = 64;
        expect(
            validateInput(invalidGoal))
            .toEqual(
                [
                    {
                        "code": "val-goal-005",
                        "message": "startAge_not_valid",
                        "property": "objective_frequency_start_age"
                    }
                ] as ValidationError[])
    });

    it("when end age is below start age error must be thrown", () => {
        let invalidGoal = createGoal();
        invalidGoal.fields.objective_frequency_end_age = 62;
        expect(
            validateInput(invalidGoal))
            .toEqual([
                {
                    "code": "val-goal-006",
                    "message": "endAge_not_valid",
                    "property": "objective_frequency_end_age"
                }
            ] as ValidationError[])
    });
    it("when drawdown amount is less than or equal to zero error must be thrown", () => {
        let invalidGoal = createGoal();
        invalidGoal.fields.regular_drawdown._val.value._val = -1000;
        expect(
            validateInput(invalidGoal))
            .toEqual(
                [
                    {
                        "code": "val-goal-007",
                        "message": "drawdownAmount_must_be_a_positive_number",
                        "property": "drawdownAmount"
                    }
                ] as ValidationError[])
    });

    it("when lumpsum is zero , validate error must not be thrown", () => {
        let invalidGoal = createGoal();
        invalidGoal.fields.bi_retirement_lump_sum = 0;
        expect(
            validateInput(invalidGoal))
            .toEqual([] as ValidationError[])
    });

    it("when lump sum amount is more than zero and lump sum date is not passed than error must be thrown", () => {
        let invalidGoal = createGoal();
        invalidGoal.fields.bi_retirement_lump_sum_date = null;
        expect(
            validateInput(invalidGoal))
            .toEqual(
                [
                    {
                        "code": "val-goal-009",
                        "message": "bi_retirement_lump_sum_date_must_be_a_valid_date",
                        "property": "bi_retirement_lump_sum_date"
                    }
                ] as ValidationError[])
    });

    it("when all data is valid no validation error is thrown", () => {
        const validGoal = createGoal();
        expect(
            validateInput(validGoal))
            .toEqual([] as ValidationError[])
    });

});

describe("Tests for GoalRequestValidation Function", () => {
    let context: Context;

    beforeEach(() => {
        context = ({ log: jest.fn() } as unknown) as Context;
    });

    it("should return a 200 response when payload is valid", async () => {
        // Arrange
        const request = {
            query: {},
            body: {
                "fields": {
                    "description": "Retirement",
                    "category": 5,
                    "status": "1",
                    "advice_type": 5,
                    "capture_date": {
                        "_val": "2021-05-13",
                        "_type": "Date"
                    },
                    "regular_drawdown": {
                        "_val": {
                            "code": "GBP",
                            "value": {
                                "_val": "7000",
                                "_type": "BigDecimal"
                            }
                        },
                        "_type": "Currency"
                    },
                    "objective_frequency_start_age": 65,
                    "objective_frequency_end_age": 85,
                    "drawdown_frequency": "12",
                    "bi_retirement_lump_sum": 100000,
                    "bi_retirement_lump_sum_date": "2055-10-04",
                    "bi_retirement_remaining_amount": 100000,
                    "bi_state_pension_amount": 10000,
                    "owner": "client"
                }
            },
        };

        // Action
        await validateGoalRequestMain(context, request);

        // Assertion
        expect(context.res.status).toEqual(200);
    });

    it("should return a 400 response when payload is invalid", async () => {
        // Arrange
        const request = {
            query: {},
            body: {},
        };

        // Action
        await validateGoalRequestMain(context, request);

        // Assertion
        expect(context.res.status).toEqual(400);
    });

});

function createGoal(): any {
    const date = new Date();
    return {
        fields: {
            description: "Test description",
            category: GoalCategory.RETIREMENT,
            status: GoalStatus.FULFILLED_PARTIALLY,
            advice_type: GoalAdviceType.RETIREMENT,
            objective_frequency_start_age: 65,
            objective_frequency_end_age: 85,
            drawdown_frequency: 12,
            capture_date: {
                _type: "Date",
                _val: date
            },
            bi_retirement_lump_sum: 1000,
            bi_retirement_lump_sum_date: "2055-10-04",
            bi_retirement_remaining_amount: 100000,
            bi_state_pension_amount: 12000,
            regular_drawdown: {
                _type: "Currency",
                _val:
                {
                    value:
                    {
                        _val: 1000,
                        _type: "BigDecimal"
                    },
                    code: "GBP"
                }
            }
        }
    };
}





