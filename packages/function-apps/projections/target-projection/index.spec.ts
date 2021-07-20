import { ProjectionMonth, RequestPayload, ValidationError } from "./types";
import {
  monthsDiff,
  getTargetProjection,
  calculateValueAtDrawdownStart,
  calculateCompoundInterestMultiplierPreDrawdown,
  calculateCompoundInterestMultiplierAtDrawdown,
  calculateMonthlyNetExpectedReturn,
  calculateValueAtDrawdownStartRetainingFundsAfterDrawdown,
  validateInput,
  calculateMonthlyContributionsRequiredToFundDrawdown,
  calculateUpfrontContributionRequired,
  calculateProjectionValue
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
            code: 'val-targetproj-001',
            property: 'timeToAge100',
            message: 'timeToAge100_must_be_more_than_zero'
          },
          {
            code: 'val-targetproj-002',
            property: 'portfolioValue',
            message: 'portfolioValue_must_be_a_positive_number_or_zero'
          },
          {
            code: 'val-targetproj-003',
            property: 'desiredMonthlyDrawdown',
            message: 'desiredMonthlyDrawdown_must_be_a_positive_number_or_zero'
          },
          {
            code: 'val-targetproj-004',
            property: 'drawdownStartDate',
            message: 'drawdownStartDate_must_be_a_valid_date'
          },
          {
            code: 'val-targetproj-005',
            property: 'drawdownEndDate',
            message: 'drawdownEndDate_must_be_a_valid_date'
          },
          {
            code: 'val-targetproj-007',
            property: 'upfrontContribution',
            message: 'upfrontContribution_must_be_a_positive_number_or_zero'
          },
          {
            code: 'val-targetproj-008',
            property: 'preGoalExpectedReturn',
            message: 'preGoalExpectedReturn_must_be_a_valid_number'
          },
          {
            code: 'val-targetproj-009',
            property: 'feesPercentage',
            message: 'feesPercentage_must_be_a_positive_number_or_zero'
          },
          {
            code: 'val-targetproj-010',
            property: 'postGoalExpectedReturn',
            message: 'postGoalExpectedReturn_must_be_a_valid_number'
          },
          {
            code: 'val-targetproj-011',
            property: 'goalLumpSum',
            message: 'goalLumpSum_must_be_a_positive_number_or_zero'
          },
          {
            code: 'val-targetproj-013',
            property: 'statePensionAmount',
            message: 'statePensionAmount_must_be_a_positive_number_or_zero'
          },
          {
            code: 'val-targetproj-014',
            property: 'desiredValueAtEndOfDrawdown',
            message: 'desiredValueAtEndOfDrawdown_must_be_a_positive_number_or_zero'
          },
          {
            code: 'val-targetproj-017',
            property: 'includeStatePension',
            message: 'includeStatePension_must_be_a_valid_boolean_value'
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
    invalidDateRequestPayload.lumpSumDate = "2020-12-01"
    expect(
      validateInput(invalidDateRequestPayload))
      .toEqual(
        [
          {
            "code": "val-targetproj-006",
            "property": "drawdownEndDate",
            "message": "drawdownEndDate_must_be_later_than_start_date"
          }
        ] as ValidationError[])
  });

  it("when lumpsum dates are not valid validation error is thrown", () => {
    const invalidDateRequestPayload = validRequestPayload;
    invalidDateRequestPayload.lumpSumDate = "2021-02-01"
    invalidDateRequestPayload.drawdownStartDate = "2021-01-01"
    invalidDateRequestPayload.drawdownEndDate = "2022-01-01"

    expect(
      validateInput(invalidDateRequestPayload))
      .toEqual(
        [
          {
            "code": "val-targetproj-v2-018",
            "property": "lumpSumDate",
            "message": "lumpSumDate_must_be_same_or_before_the_drawdownStartDate"
          }
        ] as ValidationError[])
  });

  it("when lumpsum amount is more than 0 and lumpsum date is empty a validation error is thrown", () => {
    const invalidDateRequestPayload = validRequestPayload;
    invalidDateRequestPayload.drawdownStartDate = "2021-01-01"
    invalidDateRequestPayload.drawdownEndDate = "2022-01-01"
    invalidDateRequestPayload.goalLumpSum = 1000;
    invalidDateRequestPayload.lumpSumDate = null;

    expect(
      validateInput(invalidDateRequestPayload))
      .toEqual(
        [
          {
            "code": "val-targetproj-012",
            "property": "lumpSumDate",
            "message": "lumpSumDate_must_be_a_valid_date"
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
  const currentDate = new Date(2021, 7, 7);
  const portfolioValue = 250000;
  const desiredValueAtEndOfDrawdown = 100000;
  const goalContributingMonths = monthsDiff(currentDate, drawdownStartDate) - 1;
  const preGoalExpectedMonthlyReturn = calculateMonthlyNetExpectedReturn(expectedAnnualReturnPreDrawdown, feesAnnualPercentage);
  const goalDrawdownMonths = monthsDiff(drawdownStartDate, drawdownEndDate) + 1;
  const postGoalExpectedMonthlyReturn = calculateMonthlyNetExpectedReturn(expectedAnnualReturnAtDrawdown, feesAnnualPercentage);
  const contributionPeriodUptoLumpSum = 224;
  const contributionPeriodFromLumpSumAndDrawdown = 180;
  const targetGoalAgeTotal = 1528151.77;
  const monthlyContributions = 624;
  let lumpSum = 0;
  let upfrontContribution = 0;


  test("Calculates monthly contribution period", () => {
    expect(monthsDiff(currentDate, drawdownStartDate))
      .toBe(405);
  })

  test("Calculates monthly net expected return correctly", () => {
    expect(calculateMonthlyNetExpectedReturn(expectedAnnualReturnPreDrawdown, feesAnnualPercentage))
      .toBeCloseTo(0.0032, 4);
  })

  test("Calculates value at drawdown start correctly without upfront contribution", () => {

    expect(calculateValueAtDrawdownStart(goalContributingMonths, preGoalExpectedMonthlyReturn, portfolioValue, upfrontContribution))
      .toBeCloseTo(906421.32, 2);
  })

  test("Calculates value at drawdown start correctly with upfront contribution", () => {
    upfrontContribution = 10000
    expect(calculateValueAtDrawdownStart(goalContributingMonths, preGoalExpectedMonthlyReturn, portfolioValue, upfrontContribution))
      .toBeCloseTo(942678.17, 2);
  })

  test("Calculates compound interest multiplier correctly pre drawdown", () => {
    expect(calculateCompoundInterestMultiplierPreDrawdown(goalContributingMonths, preGoalExpectedMonthlyReturn))
      .toBeCloseTo(822.2446708679934, 7);
  })

  test("Calculates compound interest multiplier correctly at drawdown", () => {
    expect(calculateCompoundInterestMultiplierAtDrawdown(goalDrawdownMonths, postGoalExpectedMonthlyReturn))
      .toBeCloseTo(195.9606487, 7);
  })

  test("Calculates portfolio value at drawdown start with lump sum zero", () => {
    expect(calculateValueAtDrawdownStartRetainingFundsAfterDrawdown(goalDrawdownMonths, postGoalExpectedMonthlyReturn, desiredValueAtEndOfDrawdown))
      .toBeCloseTo(58446.91, 2);
  })

  test("Calculates required monthly contribution to fund desired drawdown with zero lumpsum and upfront contribution", () => {
    lumpSum = 0;
    upfrontContribution = 0;
    expect(calculateMonthlyContributionsRequiredToFundDrawdown(targetGoalAgeTotal, preGoalExpectedMonthlyReturn, contributionPeriodFromLumpSumAndDrawdown, portfolioValue, upfrontContribution, lumpSum, contributionPeriodUptoLumpSum))
      .toBeCloseTo(756.14, 2);
  })

  test("Calculates required monthly contribution to fund desired drawdown with zero upfrontContribution ", () => {
    lumpSum = 100000;
    upfrontContribution = 0;
    expect(calculateMonthlyContributionsRequiredToFundDrawdown(targetGoalAgeTotal, preGoalExpectedMonthlyReturn, contributionPeriodFromLumpSumAndDrawdown, portfolioValue, upfrontContribution, lumpSum, contributionPeriodUptoLumpSum))
      .toBeCloseTo(972.03, 2);
  })
  test("Calculates required monthly contribution to fund desired drawdown", () => {
    lumpSum = 100000;
    upfrontContribution = 10000;
    expect(calculateMonthlyContributionsRequiredToFundDrawdown(targetGoalAgeTotal, preGoalExpectedMonthlyReturn, contributionPeriodFromLumpSumAndDrawdown, portfolioValue, upfrontContribution, lumpSum, contributionPeriodUptoLumpSum))
      .toBeCloseTo(927.93, 2);
  })

  test("Calculates required upfront contribution to fund desired drawdown with zero lumpsum and upfront contribution", () => {
    lumpSum = 0;
    upfrontContribution = 0;
    expect(calculateUpfrontContributionRequired(preGoalExpectedMonthlyReturn, contributionPeriodUptoLumpSum, contributionPeriodFromLumpSumAndDrawdown, targetGoalAgeTotal, monthlyContributions, lumpSum, portfolioValue, upfrontContribution))
      .toBeCloseTo(29966.69, 2);
  })

  test("Calculates required upfront contribution to fund desired drawdown with zero upfrontContribution", () => {
    lumpSum = 100000;
    upfrontContribution = 0;
    expect(calculateUpfrontContributionRequired(preGoalExpectedMonthlyReturn, contributionPeriodUptoLumpSum, contributionPeriodFromLumpSumAndDrawdown, targetGoalAgeTotal, monthlyContributions, lumpSum, portfolioValue, upfrontContribution))
      .toBeCloseTo(78926.88, 2);
  })

  test("Calculates required upfront contribution to fund desired drawdown", () => {
    lumpSum = 100000;
    upfrontContribution = 10000;
    expect(calculateUpfrontContributionRequired(preGoalExpectedMonthlyReturn, contributionPeriodUptoLumpSum, contributionPeriodFromLumpSumAndDrawdown, targetGoalAgeTotal, monthlyContributions, lumpSum, portfolioValue, upfrontContribution))
      .toBeCloseTo(68926.88);
  })

});

describe("tests for calculateProjectionValue function", () => {
  const percentage = 0.003193314;
  const portfolioCurrentValue = 250000;
  const upfrontContribution = 0;
  const monthlyContributionsRequiredToFundDrawdown = 972.0278285;
  const lumpSumAmount = 100000;
  const desiredValueAtEndOfDrawdown = 100000;
  const desiredMonthlyDrawdown = 7500.00;
  const contributionPeriodUptoLumpSum = 224;
  const contributionPeriodFromLumpSumAndDrawdown = 180;
  const goalTargetMonth = 658;
  it("should return valid projection for month 1", () => {
    const month = 1;
    const previousMonthProjectedValue = 25000;
    expect(
      calculateProjectionValue(month, previousMonthProjectedValue, percentage, portfolioCurrentValue, upfrontContribution, monthlyContributionsRequiredToFundDrawdown, lumpSumAmount, desiredValueAtEndOfDrawdown, desiredMonthlyDrawdown, contributionPeriodUptoLumpSum, contributionPeriodFromLumpSumAndDrawdown, goalTargetMonth, 0))
      .toBeCloseTo(251770.36, 2);
  });

  it("should return valid projection for month after the lumpsum is taken", () => {
    const month = contributionPeriodUptoLumpSum + 1;
    const previousMonthProjectedValue = 827942.9852;

    expect(
      calculateProjectionValue(month, previousMonthProjectedValue, percentage, portfolioCurrentValue, upfrontContribution, monthlyContributionsRequiredToFundDrawdown, lumpSumAmount, desiredValueAtEndOfDrawdown, desiredMonthlyDrawdown, contributionPeriodUptoLumpSum, contributionPeriodFromLumpSumAndDrawdown, goalTargetMonth, 0))
      .toBeCloseTo(731242.67, 2);
  });


  it("should return valid projection for month after 1 month of lumpsum date", () => {
    const month = contributionPeriodUptoLumpSum + 2;
    const previousMonthProjectedValue = 731242.67;
    const projectedAmountOnLumpSumDate = 731242.67;
    expect(
      calculateProjectionValue(month, previousMonthProjectedValue, percentage, portfolioCurrentValue, upfrontContribution, monthlyContributionsRequiredToFundDrawdown, lumpSumAmount, desiredValueAtEndOfDrawdown, desiredMonthlyDrawdown, contributionPeriodUptoLumpSum, contributionPeriodFromLumpSumAndDrawdown, goalTargetMonth, projectedAmountOnLumpSumDate))
      .toBeCloseTo(637227.78, 2);
  });

  it("should return valid projection for month after 1 month of drawdown start date", () => {
    const month = contributionPeriodUptoLumpSum + contributionPeriodFromLumpSumAndDrawdown + 2;
    const previousMonthProjectedValue = 1523883.00;
    const projectedAmountOnLumpSumDate = 731242.67;
    const percentage = 0.002124988;
    expect(
      calculateProjectionValue(month, previousMonthProjectedValue, percentage, portfolioCurrentValue, upfrontContribution, monthlyContributionsRequiredToFundDrawdown, lumpSumAmount, desiredValueAtEndOfDrawdown, desiredMonthlyDrawdown, contributionPeriodUptoLumpSum, contributionPeriodFromLumpSumAndDrawdown, goalTargetMonth, projectedAmountOnLumpSumDate))
      .toBeCloseTo(1519605.30, 2);
  });

  it("should return valid projection for month after 1 month of target date", () => {
    const month = goalTargetMonth;
    const previousMonthProjectedValue = 100000.00;
    const projectedAmountOnLumpSumDate = 731242.67;
    const percentage = 0.002124988;
    expect(
      calculateProjectionValue(month, previousMonthProjectedValue, percentage, portfolioCurrentValue, upfrontContribution, monthlyContributionsRequiredToFundDrawdown, lumpSumAmount, desiredValueAtEndOfDrawdown, desiredMonthlyDrawdown, contributionPeriodUptoLumpSum, contributionPeriodFromLumpSumAndDrawdown, goalTargetMonth, projectedAmountOnLumpSumDate))
      .toBeCloseTo(0, 2);
  });

});
describe("Tests for getTargetProjection Function with lumpsum and desired remaining amount", () => {
  let context: Context;

  beforeEach(() => {
    context = ({ log: jest.fn() } as unknown) as Context;
  });

  it("should return an 200 response", async () => {
    const inboundPayload = {
      timeToAge100: 900,
      portfolioValue: 250000,
      desiredMonthlyDrawdown: 7500,
      drawdownStartDate: "2055-04-10",
      drawdownEndDate: "2076-04-10",
      upfrontContribution: 0,
      preGoalExpectedReturn: 0.043,
      feesPercentage: 0.004,
      goalLumpSum: 100000,
      lumpSumDate: "2040-04-10",
      statePensionAmount: 12000,
      postGoalExpectedReturn: 0.0298,
      desiredValueAtEndOfDrawdown: 100000,
      netContribution: 1000.00,
      monthlyContributions: 624.00,
      includeStatePension: false
    } as RequestPayload;

    const result = getTargetProjection(inboundPayload, new Date("2021-07-08"));

    expect(result.upfrontContributionRequiredToFundDrawdown).toBeCloseTo(78926.88, 2);
    expect(result.monthlyContributionsRequiredToFundDrawdown).toBeCloseTo(972.03, 2);

    expect(result.projections.length).toEqual(901);

    expect(result.projections[0]).toEqual(
      {
        month: 0,
        projectedValue: 250000
      } as ProjectionMonth);

    expect(result.projections[1].projectedValue).toBeCloseTo(251770.36, 2);

    //lumpsum  month
    expect(result.projections[224].projectedValue).toBeCloseTo(827942.99, 2);
    // after lumpsum date
    expect(result.projections[225].projectedValue).toBeCloseTo(731242.67, 2);

    // after lumpsum date
    expect(result.projections[226].projectedValue).toBeCloseTo(734546.67, 2);

    //Month before drawdown start
    expect(result.projections[406].projectedValue).toBeCloseTo(1519605.43, 2);

    //Drawdown start
    expect(result.projections[407].projectedValue).toBeCloseTo(1515318.64, 2);


    // At the drawdown end date expect to have desired amount
    expect(result.projections[657].projectedValue).toBeCloseTo(100000, 0);

    // After the drawdown end date expect to have zero amount
    expect(result.projections[658].projectedValue).toBeCloseTo(0, 0);

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


  it("should return an 200 response when lumpsum date is past", async () => {
    const today = new Date("2021-07-09");
    const pastdate = new Date(new Date().setDate(today.getDate() - 1)).toISOString().slice(0, 10);
    const inboundPayload = {
      timeToAge100: 900,
      portfolioValue: 250000,
      desiredMonthlyDrawdown: 9999,
      drawdownStartDate: "2055-04-10",
      drawdownEndDate: "2076-04-10",
      upfrontContribution: 0,
      preGoalExpectedReturn: 0.043,
      feesPercentage: 0.004,
      goalLumpSum: 100000,
      lumpSumDate: pastdate,
      statePensionAmount: 12000,
      postGoalExpectedReturn: 0.0298,
      desiredValueAtEndOfDrawdown: 100000,
      netContribution: 1000.00,
      monthlyContributions: 624.00,
      includeStatePension: false,
    } as RequestPayload;


    // Action
    const result = getTargetProjection(inboundPayload, today);

    // Assertion
    expect(result.monthlyContributionsRequiredToFundDrawdown).toBeCloseTo(1361.20, 2)
    expect(result.upfrontContributionRequiredToFundDrawdown).toBeCloseTo(166981.70, 2)

    expect(result.projections[0]).toEqual(
      {
        month: 0,
        projectedValue: 250000
      } as ProjectionMonth);

    expect(result.projections[1].projectedValue).toBeCloseTo(240767.40, 2);


    expect(result.projections.length).toEqual(901);

    //After the drawdown end date expect to have zero aamount left
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

  it("should return an 200 response when lumpsum date and drawdown start date is same", async () => {
    const today = new Date("2021-07-12");
    const inboundPayload = {
      timeToAge100: 900,
      portfolioValue: 250000,
      desiredMonthlyDrawdown: 9999,
      drawdownStartDate: "2055-04-10",
      drawdownEndDate: "2076-04-10",
      upfrontContribution: 0,
      preGoalExpectedReturn: 0.043,
      feesPercentage: 0.004,
      goalLumpSum: 100000,
      lumpSumDate: "2055-04-10",
      statePensionAmount: 12000,
      postGoalExpectedReturn: 0.043,
      desiredValueAtEndOfDrawdown: 100000,
      netContribution: 0.00,
      monthlyContributions: 624.00,
      includeStatePension: false,
    } as RequestPayload;


    // Action
    const result = getTargetProjection(inboundPayload, today);

    // Assertion
    expect(result.monthlyContributionsRequiredToFundDrawdown).toBeCloseTo(1197.36, 2)
    expect(result.upfrontContributionRequiredToFundDrawdown).toBeCloseTo(129871.21, 2)

    expect(result.projections[0]).toEqual(
      {
        month: 0,
        projectedValue: 250000
      } as ProjectionMonth);

    expect(result.projections[1].projectedValue).toBeCloseTo(251995.69, 2);

    //Month before drawdown start
    expect(result.projections[406].projectedValue).toBeCloseTo(1770688.47, 2);

    //Drawdown start
    expect(result.projections[407].projectedValue).toBeCloseTo(1766311.91, 2);

    expect(result.projections.length).toEqual(901);

    //After the drawdown end date expect to have zero aamount left
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

  it("should return an 200 response when already in retirement and no contribution", async () => {
    const today = new Date("2021-07-12");
    const pastdate = new Date(new Date().setDate(today.getDate() - 1)).toISOString().slice(0, 10);
    const inboundPayload = {
      timeToAge100: 900,
      portfolioValue: 250000,
      desiredMonthlyDrawdown: 7500,
      drawdownStartDate: pastdate,
      drawdownEndDate: "2076-04-10",
      upfrontContribution: 0,
      preGoalExpectedReturn: 0.043,
      feesPercentage: 0.004,
      goalLumpSum: 100000,
      lumpSumDate: pastdate,
      statePensionAmount: 12000,
      postGoalExpectedReturn: 0.0298,
      desiredValueAtEndOfDrawdown: 100000,
      netContribution: 1000.00,
      monthlyContributions: 624.00,
      includeStatePension: false,
    } as RequestPayload;


    // Action
    const result = getTargetProjection(inboundPayload, today);

    // Assertion
    expect(result.monthlyContributionsRequiredToFundDrawdown).toEqual(0)
    expect(result.upfrontContributionRequiredToFundDrawdown).toBeCloseTo(2433025.83, 2)

    expect(result.projections[0].month).toEqual(0);
    expect(result.projections[0].projectedValue).toBeCloseTo(2683025.83, 2);

    expect(result.projections[1].projectedValue).toBeCloseTo(2681211.29, 2);

    //Month before drawdown start
    expect(result.projections[406].projectedValue).toBeCloseTo(1515318.64, 2);

    //Drawdown start
    expect(result.projections[407].projectedValue).toBeCloseTo(1511022.73, 2);

    expect(result.projections.length).toEqual(901);

    //After the drawdown end date expect to have zero amount left
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

describe("Tests for getTargetProjection function with  statepension", () => {
  let context: Context;

  beforeEach(() => {
    context = ({ log: jest.fn() } as unknown) as Context;
  });


  it("should return an 200 response", async () => {
    const inboundPayload = {
      timeToAge100: 900,
      portfolioValue: 250000,
      desiredMonthlyDrawdown: 7500,
      drawdownStartDate: "2055-04-10",
      drawdownEndDate: "2076-04-10",
      upfrontContribution: 0,
      preGoalExpectedReturn: 0.043,
      feesPercentage: 0.004,
      goalLumpSum: 100000,
      lumpSumDate: "2040-04-10",
      statePensionAmount: 12000,
      postGoalExpectedReturn: 0.0298,
      desiredValueAtEndOfDrawdown: 100000,
      netContribution: 1000.00,
      monthlyContributions: 624.00,
      includeStatePension: true
    } as RequestPayload;


    // Action
    const result = getTargetProjection(inboundPayload, new Date("2021-07-08"));


    // Assertion
    expect(result.upfrontContributionRequiredToFundDrawdown).toBeCloseTo(24878.99, 2)
    expect(result.monthlyContributionsRequiredToFundDrawdown).toBeCloseTo(733.70, 2)

    expect(result.projections.length).toEqual(901);

    //first row
    expect(result.projections[1].projectedValue).toBeCloseTo(251532.03, 2);

    //just before lumpsum  month
    expect(result.projections[224].projectedValue).toBeCloseTo(750140.74, 2);
    // after lumpsum date
    expect(result.projections[225].projectedValue).toBeCloseTo(652952.89, 2);

    // after lumpsum date +1
    expect(result.projections[226].projectedValue).toBeCloseTo(655769.33, 2);

    //Month before drawdown start
    expect(result.projections[406].projectedValue).toBeCloseTo(1324817.45, 2);

    //Drawdown start
    expect(result.projections[407].projectedValue).toBeCloseTo(1321118.86, 2);


    // At the drawdown end date expect to have desired amount
    expect(result.projections[657].projectedValue).toBeCloseTo(100000, 0);

    // After the drawdown end date expect to have zero amount
    expect(result.projections[658].projectedValue).toBeCloseTo(0, 0);


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
    portfolioValue: 250000,
    desiredMonthlyDrawdown: 7500,
    drawdownStartDate: "2055-04-10",
    drawdownEndDate: "2076-04-10",
    upfrontContribution: 0,
    preGoalExpectedReturn: 0.043,
    feesPercentage: 0.004,
    goalLumpSum: 100000,
    lumpSumDate: "2040-04-10",
    statePensionAmount: 12000,
    postGoalExpectedReturn: 0.0298,
    desiredValueAtEndOfDrawdown: 100000,
    monthlyContributions: 624,
    includeStatePension: true
  };
}
