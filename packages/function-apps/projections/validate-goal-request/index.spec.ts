import { GoalRequestPayload, ValidationError } from "./types";
import { validateInput, validateGoalRequestMain } from "./index";
import { Context } from "@azure/functions";

describe("tests for validate function", () => {
    const emptyGoal = {} as GoalRequestPayload
    const validGoal = createGoal("Test description", 3, "1", 3, 65, 77, 100)

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
                        "message": "drawdownAmount_must_be_more_than_zero",
                        "property": "drawdownAmount"
                    }
                ] as ValidationError[])
    });

    it("when status is not validate error must be thrown", () => {
        let invalidStatusGoal = createGoal("Test description", 3, "77", 3, 65, 77, 100)
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
        let invalidStatusGoal = createGoal("Test description", 3, "1", 9, 65, 77, 100)
        expect(
            validateInput(invalidStatusGoal))
            .toEqual([
                {
                    "code": "val-goal-004",
                    "message": "adviceType_not_valid",
                    "property": "advice_type"
                }
            ] as ValidationError[])
    });

    it("when category is a valid category but not allowed one , validate error must be thrown", () => {
        let invalidStatusGoal = createGoal("Test description", 10, "1", 5, 65, 77, 100)
        expect(
            validateInput(invalidStatusGoal))
            .toEqual([
                {
                    "code": "val-goal-002",
                    "message": "category_not_valid",
                    "property": "category"
                }
            ] as ValidationError[])
    });    

    it("when start age is not above 65 error must be thrown", () => {
        let invalidStatusGoal = createGoal("Test description", 3, "1", 3, 64, 77, 100)
        expect(
            validateInput(invalidStatusGoal))
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
        let invalidStatusGoal = createGoal("Test description", 3, "1", 3, 65, 64, 100)
        expect(
            validateInput(invalidStatusGoal))
            .toEqual([
                {
                    "code": "val-goal-006",
                    "message": "endAge_not_valid",
                    "property": "objective_frequency_end_age"
                }
            ] as ValidationError[])
    });
    it("when drawdown amount is less than or equal to zero error must be thrown", () => {
        let invalidStatusGoal = createGoal("Test description", 3, "1", 3, 65, 66, 0)
        expect(
            validateInput(invalidStatusGoal))
            .toEqual(
                [
                    {
                        "code": "val-goal-007",
                        "message": "drawdownAmount_must_be_more_than_zero",
                        "property": "drawdownAmount"
                    }
                ] as ValidationError[])
    });


    it("when all data is valid no validation error is thrown", () => {
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

function createGoal(description: string, category: number, status: string, advice_type: number, objective_frequency_start_age: number, objective_frequency_end_age: number, drawdownAmount: number): any {
    const date = new Date();
    return {
        fields: {
            description, category, status, advice_type, objective_frequency_start_age,
            drawdown_frequency: 12, capture_date: { _type: "Date", _val: date },
            objective_frequency_end_age, regular_drawdown: {
                _type: "Currency", _val: { value: { _val: drawdownAmount, _type: "BigDecimal" }, code: "GBP" }
            }
        }
    };
}





