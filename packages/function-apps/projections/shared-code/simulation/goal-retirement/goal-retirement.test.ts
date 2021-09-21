import { ExpectedReturns } from "../types";
import {
  calculateExpectedReturn,
  calculateHoldingsWithOnTrackPercentage,
  calculatePercentage,
} from "./goal-retirement";

describe("tests for calculatePercentage function", () => {
  it("should return valid percentage", () => {
    expect(
      calculatePercentage(
        10,
        10,
        1000,
        0.0537,
        0.101296240386098,
        500,
        0.101296240386098,
        -0.065337942794282
      )
    ).toEqual(1000.0000000000003);
  });
});

describe("tests for calculateExpectedReturn function", () => {
  it("should return valid projection", () => {
    expect(calculateExpectedReturn(2500, 0.04, 0.012)).toEqual({
      monthlyNetExpectedReturn: 0.9194445131184874,
      monthlyVolatility: 0.0034641016151377548,
    });
  });
});

describe("tests for calculateHoldingsWithOnTrackPercentage function", () => {
  it("should return valid holding with ontrack percentage", () => {
    // Arrange
    const timeHorizon: number = 900;
    const lumpSumAmount: number = 100000;
    const desiredAmount: number = 100000;
    const desiredMonthlyDrawdown: number = 7500;
    const contributionPeriodUptoLumpSum: number = 224;
    const contributionPeriodFromLumpSumAndDrawdown: number = 180;
    const goalDrawdownPeriod = 253;
    const goalTargetMonth: number = 658;
    const monthlyContributions: number = 624;
    const portfolioCurrentValue: number = 250000;
    const upfrontContribution: number = 0;
    const preGoalExpectedReturn: number = 0.043;
    const feesPercentage: number = 0.004;
    const preGoalExpectedVolatility: number = 0.1637;
    const postGoalExpectedReturn: number = 0.0298;
    const postGoalExpectedVolatility: number = 0.0927;

    const preGoalExpectedReturns: ExpectedReturns = calculateExpectedReturn(
      preGoalExpectedReturn,
      feesPercentage,
      preGoalExpectedVolatility
    );
    const postGoalExpectedReturns: ExpectedReturns = calculateExpectedReturn(
      postGoalExpectedReturn,
      feesPercentage,
      postGoalExpectedVolatility
    );
    const preGoalZScore: number = 0;
    const postGoalZScore: number = 0;
    const statePension: number = null;
    //act

    const result = calculateHoldingsWithOnTrackPercentage(
      timeHorizon,
      lumpSumAmount,
      desiredAmount,
      desiredMonthlyDrawdown,
      contributionPeriodUptoLumpSum,
      contributionPeriodFromLumpSumAndDrawdown,
      goalDrawdownPeriod,
      goalTargetMonth,
      monthlyContributions,
      portfolioCurrentValue,
      upfrontContribution,
      preGoalExpectedReturns,
      postGoalExpectedReturns,
      preGoalZScore,
      postGoalZScore,
      statePension
    );

    //assert

    // Assertion
    expect(result.onTrackPercentage).not.toBeNull();
    expect(result.onTrackPercentage).toBeCloseTo(0.835, 4);
    expect(result.affordableDrawdown).toBeCloseTo(6262.31, 2);
    expect(result.affordableLumpSum).toBeCloseTo(83497.52, 2);
    expect(result.affordableRemainingAmount).toBeCloseTo(83497.52, 2);
    expect(result.affordableOutflow).toBeCloseTo(1751360.57, 2);
    expect(result.surplusOrShortfall).toBeCloseTo(346139.43, 2);
    expect(result.valueAtRetirement).toBeCloseTo(0.4, 2);
    expect(result.totalAffordableDrawdown).toBeCloseTo(1584365.52, 2);
  });
});

describe("tests for calculateHoldingsWithOnTrackPercentage function with state pension", () => {
  it("should return valid holding with ontrack percentage", () => {
    // Arrange
    const timeHorizon: number = 900;
    const lumpSumAmount: number = 100000;
    const desiredAmount: number = 100000;
    const desiredMonthlyDrawdown: number = 7500.0;
    const contributionPeriodUptoLumpSum: number = 224;
    const contributionPeriodFromLumpSumAndDrawdown: number = 180;
    const goalDrawdownPeriod = 253;
    const goalTargetMonth: number = 658;
    const monthlyContributions: number = 624;
    const portfolioCurrentValue: number = 250000;
    const upfrontContribution: number = 0;
    const preGoalExpectedReturn: number = 0.043;
    const feesPercentage: number = 0.004;
    const preGoalExpectedVolatility: number = 0.1637;
    const postGoalExpectedReturn: number = 0.0298;
    const postGoalExpectedVolatility: number = 0.0927;

    const preGoalExpectedReturns: ExpectedReturns = calculateExpectedReturn(
      preGoalExpectedReturn,
      feesPercentage,
      preGoalExpectedVolatility
    );
    const postGoalExpectedReturns: ExpectedReturns = calculateExpectedReturn(
      postGoalExpectedReturn,
      feesPercentage,
      postGoalExpectedVolatility
    );
    const preGoalZScore: number = 0;
    const postGoalZScore: number = 0;
    const statePension = 10000;

    //act

    const result = calculateHoldingsWithOnTrackPercentage(
      timeHorizon,
      lumpSumAmount,
      desiredAmount,
      desiredMonthlyDrawdown,
      contributionPeriodUptoLumpSum,
      contributionPeriodFromLumpSumAndDrawdown,
      goalDrawdownPeriod,
      goalTargetMonth,
      monthlyContributions,
      portfolioCurrentValue,
      upfrontContribution,
      preGoalExpectedReturns,
      postGoalExpectedReturns,
      preGoalZScore,
      postGoalZScore,
      statePension
    );

    //assert

    // Assertion
    expect(result.onTrackPercentage).not.toBeNull();
    expect(result.onTrackPercentage).toBeCloseTo(0.9233, 4);
    expect(result.affordableDrawdown).toBeCloseTo(6155.65, 2);
    expect(result.affordableLumpSum).toBeCloseTo(92334.75, 2);
    expect(result.affordableRemainingAmount).toBeCloseTo(92334.75, 2);
    expect(result.affordableOutflow).toBeCloseTo(1742048.9, 2);
    expect(result.surplusOrShortfall).toBeCloseTo(144617.77, 2);
    expect(result.valueAtRetirement).toBeCloseTo(-0.4, 2);
    expect(result.totalAffordableDrawdown).toBeCloseTo(1557379.4, 2);
  });
});

describe("tests for calculateHoldingsWithOnTrackPercentage function", () => {
  it("should throw error when maximum iterations is reached", () => {
    // Arrange
    const timeHorizon: number = 900;
    const lumpSumAmount: number = 1000000000;
    const desiredAmount: number = 10;
    const desiredMonthlyDrawdown: number = 2;
    const contributionPeriodUptoLumpSum: number = 224;
    const contributionPeriodFromLumpSumAndDrawdown: number = 180;
    const goalDrawdownPeriod = 253;
    const goalTargetMonth: number = 200;
    const monthlyContributions: number = 624;
    const portfolioCurrentValue: number = 250000000;
    const upfrontContribution: number = 0;
    const preGoalExpectedReturn: number = 0.043;
    const feesPercentage: number = 0.004;
    const preGoalExpectedVolatility: number = 0.1637;
    const postGoalExpectedReturn: number = 0.0298;
    const postGoalExpectedVolatility: number = 0.0927;

    const preGoalExpectedReturns: ExpectedReturns = calculateExpectedReturn(
      preGoalExpectedReturn,
      feesPercentage,
      preGoalExpectedVolatility
    );
    const postGoalExpectedReturns: ExpectedReturns = calculateExpectedReturn(
      postGoalExpectedReturn,
      feesPercentage,
      postGoalExpectedVolatility
    );
    const preGoalZScore: number = 0;
    const postGoalZScore: number = 0;
    const statePension: number = null;
    // act
    const result = () => {
      calculateHoldingsWithOnTrackPercentage(
        timeHorizon,
        lumpSumAmount,
        desiredAmount,
        desiredMonthlyDrawdown,
        contributionPeriodUptoLumpSum,
        contributionPeriodFromLumpSumAndDrawdown,
        goalDrawdownPeriod,
        goalTargetMonth,
        monthlyContributions,
        portfolioCurrentValue,
        upfrontContribution,
        preGoalExpectedReturns,
        postGoalExpectedReturns,
        preGoalZScore,
        postGoalZScore,
        statePension
      );
    };

    expect(result).toThrowError(
      "Maximum iterations reached while calculating on track percentage"
    );
  });
});
describe("tests for calculateHoldingsWithOnTrackPercentage function", () => {
  it("should be able to calculate over 100% on track", () => {
    // Arrange
    const timeHorizon: number = 900;
    const lumpSumAmount: number = 100000;
    const desiredAmount: number = 10;
    const desiredMonthlyDrawdown: number = 2;
    const contributionPeriodUptoLumpSum: number = 224;
    const contributionPeriodFromLumpSumAndDrawdown: number = 180;
    const goalDrawdownPeriod = 253;
    const goalTargetMonth: number = 624;
    const monthlyContributions: number = 800;
    const portfolioCurrentValue: number = 250000;
    const upfrontContribution: number = 0;
    const preGoalExpectedReturn: number = 0.043;
    const feesPercentage: number = 0.004;
    const preGoalExpectedVolatility: number = 0.1637;
    const postGoalExpectedReturn: number = 0.0298;
    const postGoalExpectedVolatility: number = 0.0927;

    const preGoalExpectedReturns: ExpectedReturns = calculateExpectedReturn(
      preGoalExpectedReturn,
      feesPercentage,
      preGoalExpectedVolatility
    );
    const postGoalExpectedReturns: ExpectedReturns = calculateExpectedReturn(
      postGoalExpectedReturn,
      feesPercentage,
      postGoalExpectedVolatility
    );
    const preGoalZScore: number = 0;
    const postGoalZScore: number = 0;
    const statePension: number = null;
    // act
    const result = calculateHoldingsWithOnTrackPercentage(
      timeHorizon,
      lumpSumAmount,
      desiredAmount,
      desiredMonthlyDrawdown,
      contributionPeriodUptoLumpSum,
      contributionPeriodFromLumpSumAndDrawdown,
      goalDrawdownPeriod,
      goalTargetMonth,
      monthlyContributions,
      portfolioCurrentValue,
      upfrontContribution,
      preGoalExpectedReturns,
      postGoalExpectedReturns,
      preGoalZScore,
      postGoalZScore,
      statePension
    );

    // assertion

    expect(result.onTrackPercentage).not.toBeNull();
    expect(result.onTrackPercentage).toEqual(8.798664093017578);
  });
});
