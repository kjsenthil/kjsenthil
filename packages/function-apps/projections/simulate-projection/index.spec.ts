import { DrawdownType, RequestPayload, ValidationError } from "./types";
import { validateInput, simulateProjectionMain, setDefaultInputValues } from './index';
import { Context } from "@azure/functions";

describe("tests for validate function", () => {
  const emptyRequestPayload = {} as RequestPayload
  const validRequestPayload = createRequestPayload()

  it("when empty payload should return list of errors", () => {
    expect(
      validateInput(emptyRequestPayload))
      .toEqual(
        [
          {
             code: 'val-simulateproj-001',
             message: 'timeHorizonToProject_must_be_greater_than_zero',
             property: 'timeHorizonToProject',
          },
          {
             code: 'val-simulateproj-004',
             message: 'monthlyContribution_must_be_a_positive_number_or_zero',
             property: 'monthlyContribution',
          },
          {
            code: 'val-simulateproj-005',
            message: 'currentNetContribution_must_be_a_number',
            property: 'currentNetContribution',
          },
          {
            code: 'val-simulateproj-006',
            message: 'currentPortfolioValue_must_be_a_positive_number_or_zero',
            property: 'currentPortfolioValue',
          },
          {
            code: 'val-simulateproj-007',
            property: 'includeGoal',
            message: 'includeGoal_must_be_a_valid_boolean'
          },
          {
            code: 'val-simulateproj-032',
            property: 'preGoal',
            message: 'preGoal_must_be_setup'
          }
        ]
      );
  });

  it("when all data is valid no validation error is thrown", () => {
    expect(
      validateInput(validRequestPayload))
      .toEqual([])
  });

  it("when default inputs are not valid validation errors are thrown", () => {
    const invalidDateRequestPayload = createRequestPayload();
    invalidDateRequestPayload.timeHorizonToProject = -5;
    invalidDateRequestPayload.feesPercentage = 102;
    invalidDateRequestPayload.upfrontContribution = -5;
    invalidDateRequestPayload.monthlyContribution = -100;
    invalidDateRequestPayload.currentPortfolioValue = -1000;
    invalidDateRequestPayload.includeGoal = true;
    invalidDateRequestPayload.drawdownType = null;

    expect(
      validateInput(invalidDateRequestPayload))
      .toEqual(
        [
          {
            "code": "val-simulateproj-001",
            "property": "timeHorizonToProject",
            "message": "timeHorizonToProject_must_be_greater_than_zero"
          },
          {
            "code": "val-simulateproj-002",
            "property": "feesPercentage",
            "message": "feesPercentage_must_be_a_percentage_value_between_zero_and_one_hundred"
          },
          {
            "code": "val-simulateproj-003",
            "property": "upfrontContribution",
            "message": "upfrontContribution_must_be_a_positive_number_or_zero"
          }, 
          {
            "code": "val-simulateproj-004",
            "property": "monthlyContribution",
            "message": "monthlyContribution_must_be_a_positive_number_or_zero"
          },
          {
            "code": "val-simulateproj-006",
            "property": "currentPortfolioValue",
            "message": "currentPortfolioValue_must_be_a_positive_number_or_zero"
          },
          {
            "code": "val-simulateproj-008",
            "property": "drawdownType",
            "message": "drawdownType_must_be_one_of_the_values_One-off_Monthly_Annual_Retirement"
          }
        ] as ValidationError[])
  });

  it("when drawdown type is One-Off and drawdownOneOff is not setup validation error is thrown", () => {
    const invalidDateRequestPayload = createRequestPayload();
    invalidDateRequestPayload.includeGoal = true;
    invalidDateRequestPayload.drawdownType = DrawdownType.OneOff;

    expect(
      validateInput(invalidDateRequestPayload))
      .toEqual(
        [
          {
            "code": "val-simulateproj-009",
            "property": "drawdownOneOff",
            "message": "drawdownOneOff_must_be_setup"
          }
        ] as ValidationError[])
  });

  it("when drawdown type is One-Off and drawdownOneOff has invalid values validation errors are thrown", () => {
    const invalidDateRequestPayload = createRequestPayload();
    invalidDateRequestPayload.includeGoal = true;
    invalidDateRequestPayload.drawdownType = DrawdownType.OneOff;
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() +1);
    invalidDateRequestPayload.drawdownOneOff = {
      targetAmount : -10,
      targetDate: targetDate.toISOString().slice(0, 10)
    }

    expect(
      validateInput(invalidDateRequestPayload))
      .toEqual(
        [
          {
            "code": "val-simulateproj-010",
            "message": "drawdownOneOff_targetAmount_must_be_a_positive_number",
            "property": "drawdownOneOff.targetAmount"
          },
          {
            "code": "val-simulateproj-039",
            "message": "drawdownOneOff_targetDate_must_be_in_the_past",
            "property": "drawdownOneOff.targetDate"
          }
        ] as ValidationError[])
  });

  it("when drawdown type is One-Off and drawdownOneOff has no values validation errors are thrown", () => {
    const invalidDateRequestPayload = createRequestPayload();
    invalidDateRequestPayload.includeGoal = true;
    invalidDateRequestPayload.drawdownType = DrawdownType.OneOff;
    invalidDateRequestPayload.drawdownOneOff = {
      targetAmount : null,
      targetDate: null
    }

    expect(
      validateInput(invalidDateRequestPayload))
      .toEqual(
        [
          {
            "code": "val-simulateproj-010",
            "message": "drawdownOneOff_targetAmount_must_be_a_positive_number",
            "property": "drawdownOneOff.targetAmount"
          },
          {
            "code": "val-simulateproj-011",
            "message": "drawdownOneOff_targetDate_must_be_a_valid_date",
            "property": "drawdownOneOff.targetDate"
          }
        ] as ValidationError[])
  });

  it("when drawdown type is One-Off and drawdownOneOff has valid values validation will return no error", () => {
    const invalidDateRequestPayload = createRequestPayload();
    invalidDateRequestPayload.includeGoal = true;
    invalidDateRequestPayload.drawdownType = DrawdownType.OneOff;
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() -1);
    invalidDateRequestPayload.drawdownOneOff = {
      targetAmount : 100,
      targetDate: targetDate.toISOString().slice(0, 10)
    }

    expect(
      validateInput(invalidDateRequestPayload))
      .toEqual(
        [
        ] as ValidationError[])
  });

  it("when drawdown type is Monthly and drawdownMonthly is not setup validation error is thrown", () => {
    const invalidDateRequestPayload = createRequestPayload();
    invalidDateRequestPayload.includeGoal = true;
    invalidDateRequestPayload.drawdownType = DrawdownType.Monthly;

    expect(
      validateInput(invalidDateRequestPayload))
      .toEqual(
        [
          {
            "code": "val-simulateproj-012",
            "property": "drawdownMonthly",
            "message": "drawdownMonthly_must_be_setup"
          }
        ] as ValidationError[])
  });

  it("when drawdown type is Monthly and drawdownMonthly has null values validation errors are thrown", () => {
    const invalidDateRequestPayload = createRequestPayload();
    invalidDateRequestPayload.includeGoal = true;
    invalidDateRequestPayload.drawdownType = DrawdownType.Monthly;
    invalidDateRequestPayload.drawdownMonthly = {
      amount: null,
      endDate: null,
      startDate: null

    }

    expect(
      validateInput(invalidDateRequestPayload))
      .toEqual(
        [
          {
            "code": "val-simulateproj-013",
            "message": "drawdownMonthly_amount_must_be_a_positive_number",
            "property": "drawdownMonthly.amount"
          },
          {
            "code": "val-simulateproj-014",
            "message": "drawdownMonthly_startDate_must_be_a_valid_date",
            "property": "drawdownMonthly.startDate"
          },
          {
            "code": "val-simulateproj-015",
            "message": "drawdownMonthly_endDate_must_be_a_valid_date",
            "property": "drawdownMonthly.endDate"
          }
        ] as ValidationError[])
  });

  it("when drawdown type is Monthly and drawdownMonthly has invalid values validation errors are thrown", () => {
    const invalidDateRequestPayload = createRequestPayload();
    invalidDateRequestPayload.includeGoal = true;
    invalidDateRequestPayload.drawdownType = DrawdownType.Monthly;
    invalidDateRequestPayload.drawdownMonthly = {
      amount: -15,
      endDate: new Date().toISOString().slice(0, 10),
      startDate: new Date().toISOString().slice(0, 10),
    }

    expect(
      validateInput(invalidDateRequestPayload))
      .toEqual(
        [
          {
            "code": "val-simulateproj-013",
            "message": "drawdownMonthly_amount_must_be_a_positive_number",
            "property": "drawdownMonthly.amount"
          },
          {
            "code": "val-simulateproj-038",
            "message": "drawdownMonthly_endDate_must_be_in_the_future",
            "property": "drawdownMonthly.endDate"
          },
          {
            "code": "val-simulateproj-016",
            "message": "drawdownMonthly_endDate_must_be_at_least_one_month_greater_than_startDate",
            "property": "drawdownMonthly.endDate"
          }
        ] as ValidationError[])
  });

  it("when drawdown type is Monthly and drawdownMonthly has valid values validation will return no error", () => {
    const invalidDateRequestPayload = createRequestPayload();
    const startDate = new Date(1975,1,5);
    const endDate = new Date();
    endDate.setDate(endDate.getDate() +1);
    invalidDateRequestPayload.includeGoal = true;
    invalidDateRequestPayload.drawdownType = DrawdownType.Monthly;
    invalidDateRequestPayload.drawdownMonthly = {
      amount: 1505,
      endDate: endDate.toISOString().slice(0, 10),
      startDate: startDate.toISOString().slice(0, 10),
    }

    expect(
      validateInput(invalidDateRequestPayload))
      .toEqual(
        [
        ] as ValidationError[])
  });

  it("when drawdown type is Annual and drawdownAnnualy is not setup validation error is thrown", () => {
    const invalidDateRequestPayload = createRequestPayload();
    invalidDateRequestPayload.includeGoal = true;
    invalidDateRequestPayload.drawdownType = DrawdownType.Annual;

    expect(
      validateInput(invalidDateRequestPayload))
      .toEqual(
        [
          {
            "code": "val-simulateproj-017",
            "property": "drawdownAnnually",
            "message": "drawdownAnnually_must_be_setup"
          }
        ] as ValidationError[])
  });

  it("when drawdown type is Annual and drawdownAnnualy has null values validation errors are thrown", () => {
    const invalidDateRequestPayload = createRequestPayload();
    invalidDateRequestPayload.includeGoal = true;
    invalidDateRequestPayload.drawdownType = DrawdownType.Annual;
    invalidDateRequestPayload.drawdownAnnually= {
      amount: null,
      endDate: null,
      startDate: null

    }

    expect(
      validateInput(invalidDateRequestPayload))
      .toEqual(
        [
          {
            "code": "val-simulateproj-018",
            "message": "drawdownAnnually_amount_must_be_a_positive_number",
            "property": "drawdownAnnually.amount"
          },
          {
            "code": "val-simulateproj-019",
            "message": "drawdownAnnually_startDate_must_be_a_valid_date",
            "property": "drawdownAnnually.startDate"
          },
          {
            "code": "val-simulateproj-020",
            "message": "drawdownAnnually_endDate_must_be_a_valid_date",
            "property": "drawdownAnnually.endDate"
          }
        ] as ValidationError[])
  });

  it("when drawdown type is Annual and drawdownAnnualy has invalid values validation errors are thrown", () => {
    const invalidDateRequestPayload = createRequestPayload();
    invalidDateRequestPayload.includeGoal = true;
    invalidDateRequestPayload.drawdownType = DrawdownType.Annual;
    invalidDateRequestPayload.drawdownAnnually = {
      amount: -15,
      endDate: new Date().toISOString().slice(0, 10),
      startDate: new Date().toISOString().slice(0, 10),
    }

    expect(
      validateInput(invalidDateRequestPayload))
      .toEqual(
        [
          {
            "code": "val-simulateproj-018",
            "message": "drawdownAnnually_amount_must_be_a_positive_number",
            "property": "drawdownAnnually.amount"
          },
          {
            "code": "val-simulateproj-037",
            "message": "drawdownAnnually_endDate_must_be_in_the_future",
            "property": "drawdownAnnually.endDate"
          },
          {
            "code": "val-simulateproj-021",
            "message": "drawdownAnnually_endDate_must_be_at_least_one_year_greater_than_startDate",
            "property": "drawdownAnnually.endDate"
          }
        ] as ValidationError[])
  });

  it("when drawdown type is Annual and drawdownAnnualy has valid values validation will return no error", () => {
    const invalidDateRequestPayload = createRequestPayload();
    const startDate = new Date(1975,1,5);
    const endDate = new Date();
    endDate.setDate(endDate.getDate() +1);
    invalidDateRequestPayload.includeGoal = true;
    invalidDateRequestPayload.drawdownType = DrawdownType.Annual;
    invalidDateRequestPayload.drawdownAnnually = {
      amount: 1505,
      endDate: endDate.toISOString().slice(0, 10),
      startDate: startDate.toISOString().slice(0, 10),
    }

    expect(
      validateInput(invalidDateRequestPayload))
      .toEqual(
        [
        ] as ValidationError[])
  });

  it("when drawdown type is Retirement and drawdownRetirement is not setup validation error is thrown", () => {
    const invalidDateRequestPayload = createRequestPayload();
    invalidDateRequestPayload.includeGoal = true;
    invalidDateRequestPayload.drawdownType = DrawdownType.Retirement;

    expect(
      validateInput(invalidDateRequestPayload))
      .toEqual(
        [
          {
            "code": "val-simulateproj-022",
            "property": "drawdownRetirement",
            "message": "drawdownRetirement_must_be_setup"
          }
        ] as ValidationError[])
  });

  it("when drawdown type is Retirement and drawdownRetirement has null values validation errors are thrown", () => {
    const invalidDateRequestPayload = createRequestPayload();
    invalidDateRequestPayload.includeGoal = true;
    invalidDateRequestPayload.drawdownType = DrawdownType.Retirement;
    invalidDateRequestPayload.drawdownRetirement= {
      regularDrawdown: null,
      endDate: null,
      startDate: null,
      lumpSum: {
        amount: 100,
        date: null
      }
    }

    expect(
      validateInput(invalidDateRequestPayload))
      .toEqual(
        [
          {
            "code": "val-simulateproj-023",
            "message": "drawdownRetirement_regularDrawdown_must_be_a_positive_number",
            "property": "drawdownRetirement.regularDrawdown"
          },
          {
            "code": "val-simulateproj-024",
            "message": "drawdownRetirement_startDate_must_be_a_valid_date",
            "property": "drawdownRetirement.startDate"
          },
          {
            "code": "val-simulateproj-025",
            "message": "drawdownRetirement_endDate_must_be_a_valid_date",
            "property": "drawdownRetirement.endDate"
          },
          {
            "code": "val-simulateproj-028",
            "message": "drawdownRetirement_lumpSum_date_must_be_a_valid_date",
            "property": "drawdownRetirement.lumpSum.date"
          }
        ] as ValidationError[])
  });

  it("when drawdown type is Retirement and drawdownRetirement has invalid values validation errors are thrown", () => {
    const invalidDateRequestPayload = createRequestPayload();
    const lumpSumDate = new Date();
    lumpSumDate.setDate(lumpSumDate.getDate() +1);
    invalidDateRequestPayload.includeGoal = true;
    invalidDateRequestPayload.drawdownType = DrawdownType.Retirement;
    invalidDateRequestPayload.drawdownRetirement = {
      regularDrawdown: -15,
      endDate: new Date().toISOString().slice(0, 10),
      startDate: new Date().toISOString().slice(0, 10),
      lumpSum: {
        amount: -10,
        date: lumpSumDate.toISOString().slice(0, 10),
      },
      remainingAmount: -100,
      statePensionAmount: -150
    }

    expect(
      validateInput(invalidDateRequestPayload))
      .toEqual(
        [
          {
            "code": "val-simulateproj-023",
            "message": "drawdownRetirement_regularDrawdown_must_be_a_positive_number",
            "property": "drawdownRetirement.regularDrawdown"
          },
          {
            "code": "val-simulateproj-026",
            "message": "drawdownRetirement_endDate_must_be_at_least_one_month_greater_than_startDate",
            "property": "drawdownRetirement.endDate"
          },
          {
            "code": "val-simulateproj-027",
            "message": "drawdownRetirement_lumpSum_amount_must_be_a_positive_number_or_zero",
            "property": "drawdownRetirement.lumpSum.amount"
          },
          {
            "code": "val-simulateproj-029",
            "message": "drawdownRetirement_lumpSum_date_must_be_less_or_equal_than_drawdownRetirement_startDate",
            "property": "drawdownRetirement.lumpSum.date"
          },
          {
            "code": "val-simulateproj-030",
            "message": "drawdownRetirement_remainingAmount_must_be_a_positive_number_or_zero",
            "property": "drawdownRetirement.remainingAmount"
          },
          {
            "code": "val-simulateproj-031",
            "message": "drawdownRetirement_statePensionAmount_must_be_a_positive_number_or_zero",
            "property": "drawdownRetirement.statePensionAmount"
          }
        ] as ValidationError[])
  });

  it("when drawdown type is Retirement and drawdownRetirement has the following setup: valid statePension, regularDrawdown < limit, no remaningAmount and no lumpSum amount will return error", () => {
    const invalidDateRequestPayload = createRequestPayload();
    const statePensionLimitValue = 778.3;
    const startDate = new Date(2021,1,5);
    invalidDateRequestPayload.includeGoal = true;
    invalidDateRequestPayload.drawdownType = DrawdownType.Retirement;
    invalidDateRequestPayload.drawdownRetirement = {
      regularDrawdown: 105,
      endDate: new Date().toISOString().slice(0, 10),
      startDate: startDate.toISOString().slice(0, 10),
      remainingAmount: 0,
      statePensionAmount: 150
    }

    expect(
      validateInput(invalidDateRequestPayload))
      .toEqual(
        [
          {
            "code": "val-simulateproj-041",
            "message": "drawdownRetirement_statePensionAmount_equal_zero_regularDrawdown_less_than_" + statePensionLimitValue + "_remainingAmmount_equals_zero_and_lumpSumAmount_equals_zero_cannot_be_at_same_time",
            "property": "drawdownRetirement",
          }
        ] as ValidationError[])
  });

  it("when drawdown type is Retirement and drawdownRetirement has valid values validation will return no error", () => {
    const invalidDateRequestPayload = createRequestPayload();
    const startDate = new Date(2021,1,5);
    const lumpSumDate = new Date(2021,1,1);
    invalidDateRequestPayload.includeGoal = true;
    invalidDateRequestPayload.drawdownType = DrawdownType.Retirement;
    invalidDateRequestPayload.drawdownRetirement = {
      regularDrawdown: 105,
      endDate: new Date().toISOString().slice(0, 10),
      startDate: startDate.toISOString().slice(0, 10),
      lumpSum: {
        amount: 10,
        date: lumpSumDate.toISOString().slice(0, 10),
      },
      remainingAmount: 100,
      statePensionAmount: 150
    }

    expect(
      validateInput(invalidDateRequestPayload))
      .toEqual(
        [
        ] as ValidationError[])
  });

  it("when checking preagoal has invalid values validation errors are thrown", () => {
    const invalidDateRequestPayload = createRequestPayload();
    invalidDateRequestPayload.includeGoal = false;
    invalidDateRequestPayload.preGoal = {
      expectedReturnPercentage: -10,
      volatilityPercentage: 120,
      ZScoreLowerBound: 15,
      ZScoreUpperBound: -5
    }

    expect(
      validateInput(invalidDateRequestPayload))
      .toEqual(
        [
          {
            "code": "val-simulateproj-033",
            "message": "preGoal_expectedReturnPercentage_must_be_a_percentage_value_between_zero_and_one_hundred",
            "property": "preGoal.expectedReturnPercentage"
          },
          {
            "code": "val-simulateproj-034",
            "message": "preGoal_volatilityPercentage_must_be_a_percentage_value_between_zero_and_one_hundred",
            "property": "preGoal.volatilityPercentage"
          },
          {
            "code": "val-simulateproj-035",
            "message": "preGoal_ZScoreLowerBound_must_be_a_number_bellow_zero_or_zero",
            "property": "preGoal.ZScoreLowerBound"
          },
          {
            "code": "val-simulateproj-036",
            "message": "preGoal_ZScoreUpperBound_must_be_a_positive_number_or_zero",
            "property": "preGoal.ZScoreUpperBound"
          }
        ] as ValidationError[])
  });

  it("when checking postgoal has invalid values validation errors are thrown", () => {
    const invalidDateRequestPayload = createRequestPayload();
    invalidDateRequestPayload.includeGoal = false;
    invalidDateRequestPayload.postGoal = {
      expectedReturnPercentage: -10,
      volatilityPercentage: 120,
      ZScoreLowerBound: 15,
      ZScoreUpperBound: -5
    }

    expect(
      validateInput(invalidDateRequestPayload))
      .toEqual(
        [
          {
            "code": "val-simulateproj-037",
            "message": "postGoal_expectedReturnPercentage_must_be_a_percentage_value_between_zero_and_one_hundred",
            "property": "postGoal.expectedReturnPercentage"
          },
          {
            "code": "val-simulateproj-038",
            "message": "postGoal_volatilityPercentage_must_be_a_percentage_value_between_zero_and_one_hundred",
            "property": "postGoal.volatilityPercentage"
          },
          {
            "code": "val-simulateproj-039",
            "message": "postGoal_ZScoreLowerBound_must_be_a_number_bellow_zero_or_zero",
            "property": "postGoal.ZScoreLowerBound"
          },
          {
            "code": "val-simulateproj-040",
            "message": "postGoal_ZScoreUpperBound_must_be_a_positive_number_or_zero",
            "property": "postGoal.ZScoreUpperBound"
          }
        ] as ValidationError[])
  });

});

describe("Tests for simulate-projection Function", () => {
  let context: Context;

  beforeEach(() => {
    context = ({ log: jest.fn() } as unknown) as Context;
  });

  it("should return a 200 response when payload is valid", async () => {
    // Arrange
    const validDateRequestPayload = createRequestPayload();
    const request = {
      query: {},
      body: validDateRequestPayload,
    };

    // Action
    await simulateProjectionMain(context, request);

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
    await simulateProjectionMain(context, request);

    // Assertion
    expect(context.res.status).toEqual(400);
  });

});


describe("Set default input values", () => {
  test("If no values set for input fields, set default values", () => {
    const validDateRequestPayload = createRequestPayload();
    const copyValidDateRequestPayload = createRequestPayload();
    validDateRequestPayload.feesPercentage = null;
    validDateRequestPayload.upfrontContribution = null;

    setDefaultInputValues(validDateRequestPayload);

    expect(validDateRequestPayload.feesPercentage).toBe(0);
    expect(validDateRequestPayload.upfrontContribution).toBe(0);
    expect(validDateRequestPayload.postGoal.expectedReturnPercentage).toBe(copyValidDateRequestPayload.preGoal.expectedReturnPercentage);
    expect(validDateRequestPayload.postGoal.volatilityPercentage).toBe(copyValidDateRequestPayload.preGoal.volatilityPercentage);
    expect(validDateRequestPayload.postGoal.ZScoreLowerBound).toBe(copyValidDateRequestPayload.preGoal.ZScoreLowerBound);
    expect(validDateRequestPayload.postGoal.ZScoreUpperBound).toBe(copyValidDateRequestPayload.preGoal.ZScoreUpperBound);

  });
  test("if values set will not override with default values", () => {
    const validDateRequestPayload = createRequestPayload();
    validDateRequestPayload.feesPercentage = 15;
    validDateRequestPayload.upfrontContribution = 10000;
    validDateRequestPayload.postGoal = {
      expectedReturnPercentage: 15,
      volatilityPercentage: 1,
      ZScoreLowerBound: -15,
      ZScoreUpperBound: 100
    };

    setDefaultInputValues(validDateRequestPayload);

    expect(validDateRequestPayload.feesPercentage).toBe(15);
    expect(validDateRequestPayload.upfrontContribution).toBe(10000);
    expect(validDateRequestPayload.postGoal.expectedReturnPercentage).toBe(15);
    expect(validDateRequestPayload.postGoal.volatilityPercentage).toBe(1);
    expect(validDateRequestPayload.postGoal.ZScoreLowerBound).toBe(-15);
    expect(validDateRequestPayload.postGoal.ZScoreUpperBound).toBe(100);
  });
});

function createRequestPayload(): RequestPayload {
  return {
    timeHorizonToProject: 100,
    monthlyContribution: 500,
    currentNetContribution: 0,
    currentPortfolioValue: 0,
    includeGoal: false,
    preGoal: {
      expectedReturnPercentage: 10,
      volatilityPercentage: 4,
      ZScoreLowerBound: -1,
      ZScoreUpperBound: 20,
    }
  };
}
