import { ProjectionMonth, RequestPayload, ValidationError} from "./types";
import {
  monthsDiff,
  getTargetProjection,
  calculateValueAtDrawdownStart,
  calculateCompoundInterestMultiplierPreDrawdown,
  calculateCompoundInterestMultiplierAtDrawdown,
  calculateMonthlyContributionsRequiredToFundDrawdown,
  calculateTargetGoalAmount,
  calculateMonthlyNetExpectedReturn,
  calculateMonthlyVolatility,
  calculateValueAtDrawdownStartRetainingFundsAfterDrawdown,
  validateInput
} from './index';
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
          "code": "val-targetproj-001",
          "property": "timeToAge100",
          "message": "timeToAge100_must_be_more_than_zero"
          },{
            "code": "val-targetproj-002",
            "property": "preGoalRiskModel",
            "message": "preGoalRiskModel_must_not_be_empty"
          },{
            "code": "val-targetproj-003",
            "property": "portfolioValue",
            "message": "portfolioValue_must_be_a_positive_number_or_zero"
          },{
            "code": "val-targetproj-004",
            "property": "desiredMonthlyDrawdown",
            "message": "desiredMonthlyDrawdown_must_be_a_positive_number_or_zero"
          },{
            "code": "val-targetproj-005",
            "property": "drawdownStartDate",
            "message": "drawdownStartDate_must_be_a_valid_date"
          },{
            "code": "val-targetproj-006",
            "property": "drawdownEndDate",
            "message": "drawdownEndDate_must_be_a_valid_date"
          },{
            "code": "val-targetproj-008",
            "property": "upfrontContribution",
            "message": "upfrontContribution_must_be_a_positive_number_or_zero"
          },{
            "code": "val-targetproj-009",
            "property": "preGoalExpectedReturn",
            "message": "preGoalExpectedReturn_must_be_a_valid_number"
          },{
            "code": "val-targetproj-010",
            "property": "preGoalVolatility",
            "message": "preGoalVolatility_must_be_a_valid_number"
          },{
            "code": "val-targetproj-011",
            "property": "feesPercentage",
            "message": "feesPercentage_must_be_a_positive_number_or_zero"
          }, {
            "code": "val-targetproj-012",
            "property": "postGoalRiskModel",
            "message": "postGoalRiskModel_must_not_be_empty"
          },{
            "code": "val-targetproj-013",
            "property": "postGoalExpectedReturn",
            "message": "postGoalExpectedReturn_must_be_a_valid_number"
          },{
            "code": "val-targetproj-014",
            "property": "postGoalExpectedVolatility",
            "message": "postGoalExpectedVolatility_must_be_a_valid_number"
          },{
            "code": "val-targetproj-015",
            "property": "goalLumpSum",
            "message": "goalLumpSum_must_be_a_positive_number_or_zero"
          },{
            "code": "val-targetproj-016",
            "property": "lumpSumDate",
            "message": "lumpSumDate_must_be_a_valid_date"
          },{
            "code": "val-targetproj-017",
            "property": "statePensionAmount",
            "message": "statePensionAmount_must_be_a_positive_number_or_zero"
          },{
            "code": "val-targetproj-018",
            "property": "desiredValueAtEndOfDrawdown",
            "message": "desiredValueAtEndOfDrawdown_must_be_a_positive_number_or_zero"
          },{
            "code": "val-targetproj-019",
            "property": "includeStatePension",
            "message": "includeStatePension_must_be_a_valid_boolean_value"
          }
        ]
      );
  });

  it("when all data is valid no validation error is thrown", () => {
    expect(
      validateInput(validRequestPayload))
      .toEqual([])
  });

  it("when dates are not valid validation error is thrown", () => {
    const invalidDateRequestPayload = validRequestPayload;
    invalidDateRequestPayload.drawdownStartDate = "2021-01-01"
    invalidDateRequestPayload.drawdownEndDate = "2020-01-01"

    expect(
      validateInput(invalidDateRequestPayload))
      .toEqual(
        [
          {
            "code": "val-targetproj-007",
            "property": "drawdownEndDate",
            "message": "drawdownEndDate_must_be_later_than_start_date"
          }
        ] as ValidationError[])
  });

});

describe("Calculate number of months between two dates", () => {
  test("Between 2 simple dates with no potential errors", () => {
    let dateFrom: Date = new Date("1974-02-25T00:00:00");
    let dateTo: Date = new Date("1975-03-02T00:00:00");
    expect(monthsDiff(dateFrom, dateTo)).toBe(12);
  });
  test("Between 2 simple dates with the from date being after the to date", () => {
    let dateFrom: Date = new Date("1975-02-25T00:00:00");
    let dateTo: Date = new Date("1974-03-02T00:00:00");
    expect(monthsDiff(dateFrom, dateTo)).toBeLessThan(0);
  });
  test("Between 2 dates with to date being later in the year than from date", () => {
    let dateFrom: Date = new Date("1974-03-01T00:00:00");
    let dateTo: Date = new Date("1975-01-01T00:00:00");
    expect(monthsDiff(dateFrom, dateTo)).toBe(10);
  });
});

describe("Current projection calculation logic", () => {
  const expectedAnnualReturnPreDrawdown = 0.043;
  const expectedAnnualReturnAtDrawdown = 0.0298;
  const feesAnnualPercentage = 0.004;
  const drawdownStartDate = new Date(2055, 4, 10);
  const drawdownEndDate = new Date(2076, 4, 10);
  const currentDate = new Date(2021, 4, 10);
  const portfolioValue = 250000;
  const volatilityPreDrawdown = 0.1637;
  const volatilityAtDrawdown = 0.0927;
  const desiredValueAtEndOfDrawdown = 100000;
  const goalContributingMonths = monthsDiff(currentDate, drawdownStartDate) - 1;
  const preGoalExpectedMonthlyReturn = calculateMonthlyNetExpectedReturn(expectedAnnualReturnPreDrawdown, feesAnnualPercentage);
  const goalDrawdownMonths = monthsDiff(drawdownStartDate, drawdownEndDate) + 1;
  const postGoalExpectedMonthlyReturn = calculateMonthlyNetExpectedReturn(expectedAnnualReturnAtDrawdown, feesAnnualPercentage);
  let desiredDrawdownAmount = 10000;
  let lumpSum = 0;
  let upfrontContribution = 0;


  test("Calculates monthly contribution period", () => {
    expect(monthsDiff(currentDate, drawdownStartDate))
      .toBe(408);
  })

  test("Calculates monthly net expected return correctly", () => {
    expect(calculateMonthlyNetExpectedReturn(expectedAnnualReturnPreDrawdown, feesAnnualPercentage))
      .toBeCloseTo(0.0032, 4)
  })

  test("Calculates monthly volatilityPreDrawdown correctly", () => {
    expect(calculateMonthlyVolatility(volatilityPreDrawdown))
    .toBeCloseTo(0.0473, 4)
  })

  test("Calculates value at drawdown start correctly without upfront contribution", () => {

    expect(calculateValueAtDrawdownStart(goalContributingMonths, preGoalExpectedMonthlyReturn, portfolioValue, upfrontContribution))
      .toBeCloseTo(915132.54, 2);
  })

  test("Calculates value at drawdown start correctly with upfront contribution", () => {
    upfrontContribution = 10000
    expect(calculateValueAtDrawdownStart(goalContributingMonths, preGoalExpectedMonthlyReturn, portfolioValue, upfrontContribution))
    .toBeCloseTo( 951737.84, 2);
  })

  test("Calculates compound interest multiplier correctly pre drawdown", () => {
    expect(calculateCompoundInterestMultiplierPreDrawdown(goalContributingMonths, preGoalExpectedMonthlyReturn))
      .toBeCloseTo(833.1564975, 7)
  })

  test("Calculates compound interest multiplier correctly at drawdown", () => {
    expect(calculateCompoundInterestMultiplierAtDrawdown(goalDrawdownMonths,postGoalExpectedMonthlyReturn ))
      .toBeCloseTo(195.9606487, 7)
  })

  test("Calculates portfolio value at drawdown start with lump sum zero", () => {
    expect(calculateValueAtDrawdownStartRetainingFundsAfterDrawdown(goalDrawdownMonths, postGoalExpectedMonthlyReturn, desiredValueAtEndOfDrawdown))
      .toBeCloseTo(58446.91, 2)
  })

  test("Calculates amount needed at age of drawdown to fund goal with lumpsum equal to zero", () => {
    expect(calculateTargetGoalAmount(goalDrawdownMonths, desiredDrawdownAmount, lumpSum, postGoalExpectedMonthlyReturn, desiredValueAtEndOfDrawdown))
      .toBeCloseTo(2018053.39, 2)
  })

  test("Calculates amount needed at age of drawdown to fund goal with lumpsum equal to £100000", () => {
    lumpSum = 100000;
    expect(calculateTargetGoalAmount(goalDrawdownMonths, desiredDrawdownAmount, lumpSum, postGoalExpectedMonthlyReturn, desiredValueAtEndOfDrawdown))
    .toBeCloseTo(2118053.39, 2)
  })
  test("Calculates required monthly contribution to fund desired drawdown with zero lumpsum and upfront contribution", () => {
    lumpSum = 0;
    upfrontContribution = 0;
    expect(calculateMonthlyContributionsRequiredToFundDrawdown(goalDrawdownMonths, goalContributingMonths, desiredDrawdownAmount, lumpSum, preGoalExpectedMonthlyReturn, postGoalExpectedMonthlyReturn, portfolioValue, upfrontContribution, desiredValueAtEndOfDrawdown))
    .toBeCloseTo(1323.79, 2)
  })

  test("Calculates required monthly contribution to fund desired drawdown", () => {
    lumpSum = 100000;
    upfrontContribution = 10000;
    expect(calculateMonthlyContributionsRequiredToFundDrawdown(goalDrawdownMonths, goalContributingMonths, desiredDrawdownAmount, lumpSum, preGoalExpectedMonthlyReturn, postGoalExpectedMonthlyReturn, portfolioValue, upfrontContribution, desiredValueAtEndOfDrawdown))
    .toBeCloseTo(1399.88, 2)
  })
})

describe("Tests for getTargetProjection Function with lumpsum and desired remaining amount", () => {
  let context: Context;

  beforeEach(() => {
    context = ({ log: jest.fn() } as unknown) as Context;
  });

  it("should return an 200 response", async () => {
    const inboundPayload = {
      timeToAge100: 900,
      preGoalRiskModel: "TAA7",
      portfolioValue: 250000,
      desiredMonthlyDrawdown: 10000,
      drawdownStartDate: "2055-04-10",
      drawdownEndDate: "2076-04-10",
      upfrontContribution: 10000,
      preGoalExpectedReturn: 0.043,
      preGoalVolatility: 0.1637,
      feesPercentage: 0.004,
      postGoalRiskModel: "TAA3",
      goalLumpSum: 100000,
      lumpSumDate: "2055-04-10",
      statePensionAmount: 0,
      postGoalExpectedReturn: 0.0298,
      postGoalVolatility: 0.0927,
      desiredValueAtEndOfDrawdown: 100000,
      includeStatePension: false   
    } as RequestPayload;

    const result = getTargetProjection(inboundPayload, new Date("2021-04-10"));

    expect(result.targetGoalAmount).toBeCloseTo(2118053.39, 2)
    expect(result.monthlyContributionsRequiredToFundDrawdown).toBeCloseTo(1399.88, 2)

    expect(result.projections[0]).toEqual(
      {
        month: 0,
        projectedValue: 260000
      } as ProjectionMonth);

    expect(result.projections[1].projectedValue).toBeCloseTo(262230,0);

    //Month before drawdown start
    expect(result.projections[406].projectedValue).toBeCloseTo(2109916,0);
    
    //Drawdown start
    expect(result.projections[407].projectedValue).toBeCloseTo(2118053, 0);

    expect(result.projections.length).toEqual(901);

    // At the drawdown end date expect to have the desired value left
    expect(result.projections[660].projectedValue).toBeCloseTo(inboundPayload.desiredValueAtEndOfDrawdown, 0);

    expect(result.projections[661]).toEqual(
      {
        month: 661,
        projectedValue: 0,
      } as ProjectionMonth);

    expect(result.projections[900]).toEqual(
      {
        month: 900,
        projectedValue: 0,
      } as ProjectionMonth);
  });

})

describe("Tests for getTargetProjection Function without lumpsum and desired remaining amount", () => {
  let context: Context;

  beforeEach(() => {
    context = ({ log: jest.fn() } as unknown) as Context;
  });


it("should return an 200 response", async () => {
  const inboundPayload = {
    timeToAge100: 900,
    preGoalRiskModel: "TAA7",
    portfolioValue: 250000,
    desiredMonthlyDrawdown: 10000,
    drawdownStartDate: "2055-04-10",
    drawdownEndDate: "2076-04-10",
    upfrontContribution: 10000,
    preGoalExpectedReturn: 0.043,
    preGoalVolatility: 0.1637,
    feesPercentage: 0.004,
    postGoalRiskModel: "TAA3",
    goalLumpSum: 0,
    lumpSumDate: "2055-04-10",
    statePensionAmount: 0,
    postGoalExpectedReturn: 0.0298,
    postGoalVolatility: 0.0927,
    desiredValueAtEndOfDrawdown: 0,
    includeStatePension: false   
  } as RequestPayload;


  // Action
  const result = getTargetProjection(inboundPayload, new Date("2021-04-10"));

  // Assertion
  //first row
  expect(result.targetGoalAmount).toBeCloseTo( 1959606.49, 2)
  expect(result.monthlyContributionsRequiredToFundDrawdown).toBeCloseTo(1209.70, 2)

  expect(result.projections[0]).toEqual(
    {
      month: 0,
      projectedValue: 260000
    } as ProjectionMonth);

  expect(result.projections[1].projectedValue).toBeCloseTo(262040,0);

  //Month before drawdown start
  expect(result.projections[406].projectedValue).toBeCloseTo(1952163,0);
  
  //Drawdown start
  expect(result.projections[407].projectedValue).toBeCloseTo(1959606, 0);

  expect(result.projections.length).toEqual(901);

  //At the drawdown end date expect to have the desired value left
  expect(result.projections[660].projectedValue).toBeCloseTo(0, 0);

  expect(result.projections[661]).toEqual(
    {
      month: 661,
      projectedValue: 0,
    } as ProjectionMonth);

  expect(result.projections[900]).toEqual(
    {
      month: 900,
      projectedValue: 0,
    } as ProjectionMonth);
});

})

function createRequestPayload(): RequestPayload {
  return {
    timeToAge100: 900,
    preGoalRiskModel: "TAA7",
    portfolioValue: 250000,
    desiredMonthlyDrawdown: 10000,
    drawdownStartDate: "2055-04-10",
    drawdownEndDate: "2076-04-10",
    upfrontContribution: 10000,
    preGoalExpectedReturn: 0.043,
    preGoalVolatility: 0.1637,
    feesPercentage: 0.004,
    postGoalRiskModel: "TAA3",
    goalLumpSum: 100000,
    lumpSumDate: "2055-04-10",
    statePensionAmount: 0,
    postGoalExpectedReturn: 0.0298,
    postGoalVolatility: 0.0927,
    desiredValueAtEndOfDrawdown: 100000,
    includeStatePension: false
  };
}
