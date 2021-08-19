import { Context } from "@azure/functions";
import { calculateCompoundInterestMultiplierAtDrawdown, calculateCompoundInterestMultiplierPreDrawdown, calculateContribution, calculateDrawdown, calculateExpectedReturn, calculateGoldProjectionValue, calculateHoldingsWithOnTrackPercentage, calculateMonthlyContributionsRequiredToFundDrawdown, calculateMonthlyNetExpectedReturn, calculatePercentage, calculateProjectionValue, calculateUpfrontContributionRequired, calculateValueAtDrawdownStart, calculateValueAtDrawdownStartRetainingFundsAfterDrawdown, getGoldProjection, getRetirementTealProjectionRecursive } from "./goal-retirement";
import { monthsDiff } from "./helpers";
import { ContributionMonth, Drawdown, DrawdownType, ExpectedReturns, ProjectionMonth, RequestPayload, TargetProjectionMonth } from "./types";

describe("Tests for getRetirementTealProjectionRecursive Function", () => {
  let context: Context;

  beforeEach(() => {
    context = ({ log: jest.fn() } as unknown) as Context;
  });

  it("should return expected results when lump sum date is before drawdown start date ", async () => {
    // Arrange
    const inboundPayload = {
      timeHorizonToProject: 900,
      monthlyContribution: 624,
      currentPortfolioValue: 250000,
      upfrontContribution: 0,
      currentNetContribution: 1000,
      includeGoal: true,
      preGoal: {
        expectedReturnPercentage: 4.3,
        volatilityPercentage: 16.37,
        ZScoreLowerBound: -1.350641417,
        ZScoreUpperBound: 1.26511912
      },
      feesPercentage: 0.4,
      postGoal: {
        expectedReturnPercentage: 2.98,
        volatilityPercentage: 9.27,
        ZScoreLowerBound: -1.297734628,
        ZScoreUpperBound: 1.284789644
      },
      drawdownType: DrawdownType.Retirement,
      drawdownRetirement: {
        startDate: new Date("2055-04-10").toISOString().slice(0, 10),
        endDate: new Date("2076-04-10").toISOString().slice(0, 10),
        regularDrawdown: 7500,
        remainingAmount: 100000,
        lumpSum: {
          amount: 100000,
          date: new Date("2040-04-10").toISOString().slice(0, 10),
        }
      }
    } as RequestPayload;

    // Action
    const result = getRetirementTealProjectionRecursive(inboundPayload, new Date("July 05,2021"));

    // Assertion
    expect(result.goal.onTrack.percentage).toBeCloseTo(83.49752426147461, 2);
    expect(result.goal.desiredDiscountedOutflow).toBeCloseTo(2097500);
    expect(result.goal.affordableUnDiscountedOutflowAverage).toBeCloseTo(1751360.57, 2);
    expect(result.goal.drawdownRetirement.affordable.drawdown).toBeCloseTo(6262.31, 2);
    expect(result.goal.drawdownRetirement.affordable.lumpSum).toBeCloseTo(83497.52, 2);
    expect(result.projectionData.length).toBeCloseTo(901);
    //underperform
    expect(result.goal.drawdownRetirement.underperform.drawdown).toBeCloseTo(3110.55, 2);
    expect(result.goal.drawdownRetirement.underperform.lumpSum).toBeCloseTo(41473.96, 2);


    expect(result.projectionData[0]).toEqual(
      {
        monthNo: 0,
        lower: 250000,
        average: 250000,
        upper: 250000
      } as ProjectionMonth);

    expect(result.contributionData[0]).toEqual(
      {
        monthNo: 0,
        value: 1000
      } as ContributionMonth);

    expect(result.projectionData[1]).toEqual(
      {
        monthNo: 1,
        lower: 235465.81038991973,
        average: 251422.32845197053,
        upper: 266368.48354157555
      } as ProjectionMonth);

    expect(result.contributionData[1]).toEqual(
      {
        monthNo: 1,
        value: 1624
      } as ContributionMonth);

    //just before  lump sum start
    expect(result.projectionData[224]).toEqual({
      monthNo: 224,
      lower: 417562.7172793837,
      average: 714327.2998455743,
      upper: 985019.5795674027
    } as ProjectionMonth);

    expect(result.contributionData[224]).toEqual(
      {
        monthNo: 224,
        value: 140776
      } as ContributionMonth);

    //just after lump sum
    expect(result.projectionData[225]).toEqual({
      monthNo: 225,
      lower: 334819.59959494777,
      average: 633470.2056447117,
      upper: 906488.2535895858,
    } as ProjectionMonth);

    expect(result.contributionData[225]).toEqual(
      {
        monthNo: 225,
        value: 57902.47573852539
      } as ContributionMonth);

    expect(result.projectionData[226]).toEqual({
      monthNo: 226,
      lower: 336339.6403310231,
      average: 638772.3962376652,
      upper: 916470.9875307771
    } as ProjectionMonth);


    expect(result.contributionData[226]).toEqual(
      {
        monthNo: 226,
        value: 58526.47573852539
      } as ContributionMonth);

    expect(result.projectionData[405]).toEqual(
      {
        monthNo: 405,
        lower: 620229.4409289613,
        average: 1272404.9252367339,
        upper: 1989726.6866230138
      } as ProjectionMonth);


    expect(result.contributionData[405]).toEqual(
      {
        monthNo: 405,
        value: 163336.1614189148
      } as ContributionMonth);

    //after drawdown start
    expect(result.projectionData[407]).toEqual(
      {
        monthNo: 407,
        lower: 609247.6550393509,
        average: 1265253.7812876487,
        upper: 1988139.4335948436,
      } as ProjectionMonth);

    expect(result.contributionData[407]).toEqual(
      {
        monthNo: 407,
        value: 150811.5327796936
      } as ContributionMonth);

    //target month
    expect(result.projectionData[657]).toEqual(
      {
        monthNo: 657,
        lower: 0,
        average: 83497.92273923039,
        upper: 1591333.7049422842,
      } as ProjectionMonth);

    expect(result.contributionData[657]).toEqual(
      {
        monthNo: 657,
        value: -1414767.0471229553
      } as ContributionMonth);

    expect(result.projectionData[658]).toEqual(
      {
        monthNo: 658,
        lower: 0,
        average: 0.39932451606410596,
        upper: 1588916.164137102,
      } as ProjectionMonth);

    expect(result.contributionData[658]).toEqual(
      {
        monthNo: 658,
        value: -1498264.57138443
      } as ContributionMonth);

    expect(result.projectionData[900]).toEqual(
      {
        monthNo: 900,
        upper: 765330.010170457,
        lower: 0,
        average: 0,
      } as ProjectionMonth);

    expect(result.contributionData[900]).toEqual(
      {
        monthNo: 900,
        value: -1498264.57138443
      } as ContributionMonth);
  });

  it("should return expected results when lump sum date is past date the result is same as lump sum is zero", async () => {
    // Arrange
    const today = new Date("2021-07-13");
    const pastDate = new Date(new Date().setDate(today.getDate() - 200)).toISOString().slice(0, 10);

    const inboundPayload = {
      timeHorizonToProject: 900,
      monthlyContribution: 624,
      currentPortfolioValue: 250000,
      drawdownRetirement: {
        regularDrawdown: 7500,
        startDate: new Date("2055-04-10").toISOString().slice(0, 10),
        endDate: new Date("2076-04-10").toISOString().slice(0, 10),
        remainingAmount: 100000,
        lumpSum: {
          amount: 100000,
          date: pastDate
        }
      },
      upfrontContribution: 0,
      preGoal: {
        expectedReturnPercentage: 4.3,
        volatilityPercentage: 16.37,
        ZScoreLowerBound: -1.350641417,
        ZScoreUpperBound: 1.26511912,
      },
      feesPercentage: 0.4,
      postGoal: {
        expectedReturnPercentage: 2.98,
        volatilityPercentage: 9.27,
        ZScoreLowerBound: -1.297734628,
        ZScoreUpperBound: 1.284789644
      },
      currentNetContribution: 1000,
      includeGoal: true,
      drawdownType: DrawdownType.Retirement
    } as RequestPayload;

    // Action

    const resultWithLumpSumAndPastDate = getRetirementTealProjectionRecursive(inboundPayload, today);

    inboundPayload.drawdownRetirement.lumpSum.amount = 0;

    const resultWithZeroLumpSum = getRetirementTealProjectionRecursive(inboundPayload, today);


    // Assertion
    expect(resultWithLumpSumAndPastDate.goal.onTrack.percentage).toEqual(resultWithZeroLumpSum.goal.onTrack.percentage);
    expect(resultWithLumpSumAndPastDate.goal.desiredDiscountedOutflow).toEqual(resultWithZeroLumpSum.goal.desiredDiscountedOutflow);

    expect(resultWithLumpSumAndPastDate.goal.drawdownRetirement.affordable.drawdown).toEqual(resultWithZeroLumpSum.goal.drawdownRetirement.affordable.drawdown);
    expect(resultWithLumpSumAndPastDate.goal.drawdownRetirement.affordable.lumpSum).toEqual(resultWithZeroLumpSum.goal.drawdownRetirement.affordable.lumpSum);
    expect(resultWithLumpSumAndPastDate.projectionData.length).toBeCloseTo(901);

    //underperform
    expect(resultWithLumpSumAndPastDate.goal.drawdownRetirement.underperform.drawdown).toEqual(resultWithZeroLumpSum.goal.drawdownRetirement.underperform.drawdown);
    expect(resultWithLumpSumAndPastDate.goal.drawdownRetirement.underperform.lumpSum).toEqual(resultWithZeroLumpSum.goal.drawdownRetirement.underperform.lumpSum);

    expect(resultWithLumpSumAndPastDate.projectionData[0]).toEqual(resultWithZeroLumpSum.projectionData[0]);
    expect(resultWithLumpSumAndPastDate.contributionData[0]).toEqual(resultWithZeroLumpSum.contributionData[0]);

    expect(resultWithLumpSumAndPastDate.projectionData[1]).toEqual(resultWithZeroLumpSum.projectionData[1]);
    expect(resultWithLumpSumAndPastDate.contributionData[1]).toEqual(resultWithZeroLumpSum.contributionData[1]);

    expect(resultWithLumpSumAndPastDate.projectionData[224]).toEqual(resultWithZeroLumpSum.projectionData[224]);
    expect(resultWithLumpSumAndPastDate.contributionData[224]).toEqual(resultWithZeroLumpSum.contributionData[224]);

    expect(resultWithLumpSumAndPastDate.projectionData[225]).toEqual(resultWithZeroLumpSum.projectionData[225]);
    expect(resultWithLumpSumAndPastDate.contributionData[225]).toEqual(resultWithZeroLumpSum.contributionData[225]);

    expect(resultWithLumpSumAndPastDate.projectionData[226]).toEqual(resultWithZeroLumpSum.projectionData[226]);
    expect(resultWithLumpSumAndPastDate.contributionData[226]).toEqual(resultWithZeroLumpSum.contributionData[226]);

    expect(resultWithLumpSumAndPastDate.projectionData[254]).toEqual(resultWithZeroLumpSum.projectionData[254]);
    expect(resultWithLumpSumAndPastDate.contributionData[254]).toEqual(resultWithZeroLumpSum.contributionData[254]);
    //after drawdown start
    expect(resultWithLumpSumAndPastDate.projectionData[403]).toEqual(resultWithZeroLumpSum.projectionData[403]);
    expect(resultWithLumpSumAndPastDate.contributionData[403]).toEqual(resultWithZeroLumpSum.contributionData[403]);

    //target month
    expect(resultWithLumpSumAndPastDate.projectionData[600]).toEqual(resultWithZeroLumpSum.projectionData[600]);
    expect(resultWithLumpSumAndPastDate.contributionData[600]).toEqual(resultWithZeroLumpSum.contributionData[600]);


    expect(resultWithLumpSumAndPastDate.projectionData[657]).toEqual(resultWithZeroLumpSum.projectionData[657]);
    expect(resultWithLumpSumAndPastDate.contributionData[657]).toEqual(resultWithZeroLumpSum.contributionData[657]);

    expect(resultWithLumpSumAndPastDate.projectionData[658]).toEqual(resultWithZeroLumpSum.projectionData[658]);
    expect(resultWithLumpSumAndPastDate.contributionData[658]).toEqual(resultWithZeroLumpSum.contributionData[658]);

    expect(resultWithLumpSumAndPastDate.projectionData[900]).toEqual(resultWithZeroLumpSum.projectionData[900]);
    expect(resultWithLumpSumAndPastDate.contributionData[900]).toEqual(resultWithZeroLumpSum.contributionData[900]);
  });
  it("should return  results same as lump sum zero when lump sum date is past date with state pension", async () => {
    // Arrange
    const today = new Date("2021-07-13");
    const pastDate = new Date(new Date().setDate(today.getDate() - 1)).toISOString().slice(0, 10);

    const inboundPayload = {
      timeHorizonToProject: 900,
      monthlyContribution: 624,
      currentPortfolioValue: 250000,
      drawdownRetirement: {
        regularDrawdown: 7500,
        startDate: new Date("2055-04-10").toISOString().slice(0, 10),
        endDate: new Date("2076-04-10").toISOString().slice(0, 10),
        lumpSum: {
          amount: 100000,
          date: pastDate
        },
        remainingAmount: 100000,
        statePensionAmount: 10000
      },
      upfrontContribution: 0,
      preGoal: {
        expectedReturnPercentage: 4.3,
        volatilityPercentage: 16.37,
        ZScoreLowerBound: -1.350641417,
        ZScoreUpperBound: 1.26511912
      },
      feesPercentage: 0.4,
      postGoal: {
        expectedReturnPercentage: 2.98,
        volatilityPercentage: 9.27,
        ZScoreLowerBound: -1.297734628,
        ZScoreUpperBound: 1.284789644,
      },
      currentNetContribution: 1000,
      includeGoal: true,
      drawdownType: DrawdownType.Retirement
    } as RequestPayload;

    // Action

    const resultWithLumpSumAndPastDate = getRetirementTealProjectionRecursive(inboundPayload, today);

    inboundPayload.drawdownRetirement.lumpSum.amount = 0;

    const resultWithZeroLumpSum = getRetirementTealProjectionRecursive(inboundPayload, today);


    // Assertion
    expect(resultWithLumpSumAndPastDate.goal.onTrack.percentage).toEqual(resultWithZeroLumpSum.goal.onTrack.percentage);
    expect(resultWithLumpSumAndPastDate.goal.desiredDiscountedOutflow).toEqual(resultWithZeroLumpSum.goal.desiredDiscountedOutflow);

    expect(resultWithLumpSumAndPastDate.goal.drawdownRetirement.affordable.drawdown).toEqual(resultWithZeroLumpSum.goal.drawdownRetirement.affordable.drawdown);
    expect(resultWithLumpSumAndPastDate.goal.drawdownRetirement.affordable.lumpSum).toEqual(resultWithZeroLumpSum.goal.drawdownRetirement.affordable.lumpSum);
    expect(resultWithLumpSumAndPastDate.projectionData.length).toBeCloseTo(901);

    //underperform
    expect(resultWithLumpSumAndPastDate.goal.drawdownRetirement.underperform.drawdown).toEqual(resultWithZeroLumpSum.goal.drawdownRetirement.underperform.drawdown);
    expect(resultWithLumpSumAndPastDate.goal.drawdownRetirement.underperform.lumpSum).toEqual(resultWithZeroLumpSum.goal.drawdownRetirement.underperform.lumpSum);

    expect(resultWithLumpSumAndPastDate.projectionData[0]).toEqual(resultWithZeroLumpSum.projectionData[0]);
    expect(resultWithLumpSumAndPastDate.contributionData[0]).toEqual(resultWithZeroLumpSum.contributionData[0]);

    expect(resultWithLumpSumAndPastDate.projectionData[1]).toEqual(resultWithZeroLumpSum.projectionData[1]);
    expect(resultWithLumpSumAndPastDate.contributionData[1]).toEqual(resultWithZeroLumpSum.contributionData[1]);

    expect(resultWithLumpSumAndPastDate.projectionData[224]).toEqual(resultWithZeroLumpSum.projectionData[224]);
    expect(resultWithLumpSumAndPastDate.contributionData[224]).toEqual(resultWithZeroLumpSum.contributionData[224]);

    expect(resultWithLumpSumAndPastDate.projectionData[225]).toEqual(resultWithZeroLumpSum.projectionData[225]);
    expect(resultWithLumpSumAndPastDate.contributionData[225]).toEqual(resultWithZeroLumpSum.contributionData[225]);

    expect(resultWithLumpSumAndPastDate.projectionData[226]).toEqual(resultWithZeroLumpSum.projectionData[226]);
    expect(resultWithLumpSumAndPastDate.contributionData[226]).toEqual(resultWithZeroLumpSum.contributionData[226]);

    expect(resultWithLumpSumAndPastDate.projectionData[254]).toEqual(resultWithZeroLumpSum.projectionData[254]);
    expect(resultWithLumpSumAndPastDate.contributionData[254]).toEqual(resultWithZeroLumpSum.contributionData[254]);
    //after drawdown start
    expect(resultWithLumpSumAndPastDate.projectionData[403]).toEqual(resultWithZeroLumpSum.projectionData[403]);
    expect(resultWithLumpSumAndPastDate.contributionData[403]).toEqual(resultWithZeroLumpSum.contributionData[403]);

    //target month
    expect(resultWithLumpSumAndPastDate.projectionData[600]).toEqual(resultWithZeroLumpSum.projectionData[600]);
    expect(resultWithLumpSumAndPastDate.contributionData[600]).toEqual(resultWithZeroLumpSum.contributionData[600]);


    expect(resultWithLumpSumAndPastDate.projectionData[657]).toEqual(resultWithZeroLumpSum.projectionData[657]);
    expect(resultWithLumpSumAndPastDate.contributionData[657]).toEqual(resultWithZeroLumpSum.contributionData[657]);

    expect(resultWithLumpSumAndPastDate.projectionData[658]).toEqual(resultWithZeroLumpSum.projectionData[658]);
    expect(resultWithLumpSumAndPastDate.contributionData[658]).toEqual(resultWithZeroLumpSum.contributionData[658]);

    expect(resultWithLumpSumAndPastDate.projectionData[900]).toEqual(resultWithZeroLumpSum.projectionData[900]);
    expect(resultWithLumpSumAndPastDate.contributionData[900]).toEqual(resultWithZeroLumpSum.contributionData[900]);

  });

  it("should return expected results when drawdown already started", async () => {
    // Arrange
    const today = new Date("2021-07-13");
    const pastDate = new Date(new Date().setDate(today.getDate() - 1)).toISOString().slice(0, 10);

    const inboundPayload = {
      timeHorizonToProject: 900,
      monthlyContribution: 624,
      currentPortfolioValue: 250000,
      drawdownRetirement: {
        startDate: pastDate,
        endDate: new Date("2076-04-10").toISOString().slice(0, 10),
        lumpSum: {
          date: pastDate,
          amount: 100000
        },
        regularDrawdown: 7500,
        remainingAmount: 100000
      },
      upfrontContribution: 0,
      preGoal: {
        expectedReturnPercentage: 4.3,
        volatilityPercentage: 16.37,
        ZScoreLowerBound: -1.350641417,
        ZScoreUpperBound: 1.26511912,
      },
      feesPercentage: 0.4,

      postGoal: {
        expectedReturnPercentage: 2.98,
        volatilityPercentage: 9.27,
        ZScoreLowerBound: -1.297734628,
        ZScoreUpperBound: 1.284789644,
      },

      currentNetContribution: 1000,
      includeGoal: true,
      drawdownType: DrawdownType.Retirement
    } as RequestPayload;

    // Action

    const result = getRetirementTealProjectionRecursive(inboundPayload, today);

    // Assertion
    expect(result.goal.onTrack.percentage).toEqual(9.3178391456604);
    expect(result.goal.desiredDiscountedOutflow).toEqual(5020000);
    expect(result.goal.drawdownRetirement.affordable.drawdown).toBeCloseTo(698.84, 2);
    expect(result.goal.drawdownRetirement.affordable.lumpSum).toEqual(0);
    expect(result.projectionData.length).toBeCloseTo(901);
    //underperform
    expect(result.goal.drawdownRetirement.underperform.drawdown).toBeCloseTo(274.44, 2);
    expect(result.goal.drawdownRetirement.underperform.lumpSum).toEqual(0);

    expect(result.projectionData[0]).toEqual(
      {
        monthNo: 0,
        lower: 250000,
        average: 250000,
        upper: 250000
      } as ProjectionMonth);

    expect(result.contributionData[0]).toEqual(
      {
        monthNo: 0,
        value: 1000,
      } as ContributionMonth);

    expect(result.projectionData[1]).toEqual(
      {
        monthNo: 1,
        lower: 241173.28824305325,
        average: 249830.9239397488,
        upper: 258402.1991794191,
      } as ProjectionMonth);


    expect(result.contributionData[1]).toEqual(
      {
        monthNo: 1,
        value: 301.16206407546997,
      } as ContributionMonth);


    expect(result.projectionData[225]).toEqual({
      monthNo: 225,
      lower: 8069.200342094546,
      average: 201287.94495424282,
      upper: 601076.8396010052,
    } as ProjectionMonth);


    expect(result.contributionData[225]).toEqual(
      {
        monthNo: 225,
        value: -156238.53558301926,
      } as ContributionMonth);

    expect(result.projectionData[226]).toEqual({
      monthNo: 226,
      lower: 7373.280363342761,
      average: 201015.3563815136,
      upper: 602393.1771085584,
    } as ProjectionMonth);


    expect(result.contributionData[226]).toEqual(
      {
        monthNo: 226,
        value: -156937.3735189438,
      } as ContributionMonth);

    expect(result.projectionData[254]).toEqual({
      monthNo: 254,
      lower: 0,
      average: 193143.14145325872,
      upper: 639782.8246141373,
    } as ProjectionMonth);

    expect(result.contributionData[254]).toEqual(
      {
        monthNo: 254,
        value: -176504.83572483063,
      } as ContributionMonth);

    //after drawdown start
    expect(result.projectionData[403]).toEqual(
      {
        monthNo: 403,
        lower: 0,
        average: 142390.6504279485,
        upper: 863782.9411291314,
      } as ProjectionMonth);

    expect(result.contributionData[403]).toEqual(
      {
        monthNo: 403,
        value: -280631.6881775856,
      } as ContributionMonth);

    //target month
    expect(result.projectionData[600]).toEqual(
      {
        monthNo: 600,
        lower: 0,
        average: 45210.9387975561,
        upper: 1262448.2646806587,
      } as ProjectionMonth);


    expect(result.contributionData[600]).toEqual(
      {
        monthNo: 600,
        value: -418302.761554718,
      } as ContributionMonth);

    expect(result.projectionData[900]).toEqual(
      {
        monthNo: 900,
        upper: 2261123.1315051867,
        lower: 0,
        average: 0,
      } as ProjectionMonth);

    expect(result.contributionData[900]).toEqual(
      {
        monthNo: 900,
        value: -466755.5251121521,
      } as ContributionMonth);
  });

  it("should return expected results when zeros are set for preGoal and postGoal", async () => {
    // Arrange
    const inboundPayload = {
      timeHorizonToProject: 900,
      monthlyContribution: 650,
      currentPortfolioValue: 250000,
      upfrontContribution: 1000,
      currentNetContribution: 1000,
      includeGoal: true,
      preGoal: {
        expectedReturnPercentage: 0,
        volatilityPercentage: 0,
        ZScoreLowerBound: 0,
        ZScoreUpperBound: 0
      },
      feesPercentage: 0,
      drawdownType: DrawdownType.Retirement,
      drawdownRetirement: {
        startDate: new Date("2055-04-10").toISOString().slice(0, 10),
        endDate: new Date("2076-04-10").toISOString().slice(0, 10),
        regularDrawdown: 3000,
        remainingAmount: 2000,
        lumpSum: {
          amount: 1000,
          date: new Date("2040-04-10").toISOString().slice(0, 10),
        }
      }
    } as RequestPayload;

    // Action
    const result = getRetirementTealProjectionRecursive(inboundPayload, new Date("2021-08-12"));

    // Assertion
    expect(result.goal.onTrack.percentage).toBeCloseTo(67.2309711286088, 4);
    expect(result.goal.desiredDiscountedOutflow).toBeCloseTo(762000);
    expect(result.goal.affordableUnDiscountedOutflowAverage).toBeCloseTo(512300.125, 2);
    expect(result.goal.drawdownRetirement.affordable.drawdown).toBeCloseTo(2016.92913385826, 2);
    expect(result.goal.drawdownRetirement.affordable.lumpSum).toBeCloseTo(672.309711286088, 2);
    expect(result.goal.drawdownRetirement.affordable.totalDrawdown).toBeCloseTo(510283.19549560547, 2);
    expect(result.goal.drawdownRetirement.affordable.remainingAmount).toBeCloseTo(1344.61942257218, 2);
    expect(result.projectionData.length).toBeCloseTo(901);
    //underperform
    expect(result.goal.drawdownRetirement.underperform.drawdown).toBeCloseTo(2016.92913385826, 2);
    expect(result.goal.drawdownRetirement.underperform.lumpSum).toBeCloseTo(672.309711286088, 2);
    expect(result.goal.drawdownRetirement.underperform.totalDrawdown).toBeCloseTo(510283.19549560547, 2);
    expect(result.goal.drawdownRetirement.underperform.remainingAmount).toBeCloseTo(1344.61942257218, 2);

    expect(result.projectionData[0]).toEqual(
      {
        monthNo: 0,
        lower: 251000,
        average: 251000,
        upper: 251000
      } as ProjectionMonth);

    expect(result.contributionData[0]).toEqual(
      {
        monthNo:0,
        value: 2000
      } as ContributionMonth);

    expect(result.projectionData[1]).toEqual(
      {
        monthNo: 1,
        lower: 251650,
        average: 251650,
        upper: 251650
      } as ProjectionMonth);

    expect(result.contributionData[1]).toEqual(
      {
          monthNo:1,
          value: 2650
      } as ContributionMonth);

    //just before  lump sum start
    expect(result.projectionData[224]).toEqual({
      monthNo: 224,
      lower: 395927.6901245117,
      average: 395927.6901245117,
      upper: 395927.6901245117
    } as ProjectionMonth);

    expect(result.contributionData[224]).toEqual(
      {
          monthNo:224,
          value: 146927.69012451172
      } as ContributionMonth);

    //just after lump sum
    expect(result.projectionData[225]).toEqual({
      monthNo: 225,
      lower: 396577.6901245117,
      average: 396577.6901245117,
      upper: 396577.6901245117,
    } as ProjectionMonth);

    expect(result.contributionData[225]).toEqual(
      {
          monthNo:225,
          value: 147577.69012451172
      } as ContributionMonth);

    expect(result.projectionData[226]).toEqual({
      monthNo: 226,
      lower: 397227.6901245117,
      average: 397227.6901245117,
      upper: 397227.6901245117
    } as ProjectionMonth);


    expect(result.contributionData[226]).toEqual(
      {
          monthNo:226,
          value: 148227.69012451172
      } as ContributionMonth);

    expect(result.projectionData[405]).toEqual(
      {
        monthNo: 405,
        lower: 505576.9012451172,
        average: 505576.9012451172,
        upper: 505576.9012451172
      } as ProjectionMonth);


    expect(result.contributionData[405]).toEqual(
      {
          monthNo:405,
          value: 256576.9012451172
      } as ContributionMonth);

    //after drawdown start
    expect(result.projectionData[407]).toEqual(
      {
        monthNo: 407,
        lower: 501543.0419921875,
        average: 501543.0419921875,
        upper: 501543.0419921875,
      } as ProjectionMonth);

    expect(result.contributionData[407]).toEqual(
      {
          monthNo:407,
          value: 252543.0419921875
        } as ContributionMonth);
  
    //target month
    expect(result.projectionData[657]).toEqual(
      {
        monthNo: 657,
        lower: 0,
        average: 0,
        upper: 0,
      } as ProjectionMonth);

    expect(result.contributionData[657]).toEqual(
      {
          monthNo:657,
          value: -249000.1251220703
        } as ContributionMonth);
      
    expect(result.projectionData[658]).toEqual(
      {
        monthNo: 658,
        lower: 0,
        average: 0,
        upper: 0,
      } as ProjectionMonth);

    expect(result.contributionData[658]).toEqual(
      {
          monthNo:658,
          value: -249000.1251220703
      } as ContributionMonth);

    expect(result.projectionData[900]).toEqual(
      {
        monthNo: 900,
        upper: 0,
        lower: 0,
        average: 0,
      } as ProjectionMonth);

    expect(result.contributionData[900]).toEqual(
      {
            monthNo:900,
            value: -249000.1251220703
        } as ContributionMonth);
  });
});

describe("tests for calculateDrawdown function", () => {
  it("should return expected value when state pension is false", () => {
    const preGoalMonthlyNetExpectedReturn = 0.0031933138078821255;
    const goalContributingPeriod = 404;
    const portfolioCurrentValue = 250000;
    const upfrontContribution = 0;
    const monthlyContributions = 624;
    const remainingAmount = 0;
    const lumpSumAmount = 0.1;
    const postGoalMonthlyNetExpectedReturn = 0.0021249875904596482;
    const goalDrawdownPeriod = 253;
    const statePensionAmount: number = null;
    expect(
      calculateDrawdown(preGoalMonthlyNetExpectedReturn, goalContributingPeriod, portfolioCurrentValue, upfrontContribution, monthlyContributions, remainingAmount, lumpSumAmount, postGoalMonthlyNetExpectedReturn, goalDrawdownPeriod, statePensionAmount))
      .toEqual(
        {
          possibleDrawdown: 7243.810933644129,
          projectedGoalAgeTotal: 1419501.989856692,
          remainingAmountAtGoalAge: 0
        } as Drawdown);
  });

  it("should return expected value when state pension is true with zero state pension amount", () => {
    const preGoalMonthlyNetExpectedReturn = 0.0031933138078821255;
    const goalContributingPeriod = 404;
    const portfolioCurrentValue = 250000;
    const upfrontContribution = 0;
    const monthlyContributions = 624;
    const remainingAmount = 0;
    const lumpSumAmount = 0.1;
    const postGoalMonthlyNetExpectedReturn = 0.0021249875904596482;
    const goalDrawdownPeriod = 253;
    const statePensionAmount = 0;
    expect(
      calculateDrawdown(preGoalMonthlyNetExpectedReturn, goalContributingPeriod, portfolioCurrentValue, upfrontContribution, monthlyContributions, remainingAmount, lumpSumAmount, postGoalMonthlyNetExpectedReturn, goalDrawdownPeriod, statePensionAmount))
      .toEqual(
        {
          possibleDrawdown: 7243.810933644129,
          projectedGoalAgeTotal: 1419501.989856692,
          remainingAmountAtGoalAge: 0
        } as Drawdown);
  });

  it("should return expected value when state pension is true with state pension amount more than zero", () => {
    const preGoalMonthlyNetExpectedReturn = 0.0031933138078821255;
    const goalContributingPeriod = 404;
    const portfolioCurrentValue = 250000;
    const upfrontContribution = 0;
    const monthlyContributions = 624;
    const remainingAmount = 0;
    const lumpSumAmount = 0.1;
    const postGoalMonthlyNetExpectedReturn = 0.0021249875904596482;
    const goalDrawdownPeriod = 253;
    const statePensionAmount = 10000;
    expect(
      calculateDrawdown(preGoalMonthlyNetExpectedReturn, goalContributingPeriod, portfolioCurrentValue, upfrontContribution, monthlyContributions, remainingAmount, lumpSumAmount, postGoalMonthlyNetExpectedReturn, goalDrawdownPeriod, statePensionAmount))
      .toEqual(
        {
          possibleDrawdown: 8077.144266977462,
          projectedGoalAgeTotal: 1419501.989856692,
          remainingAmountAtGoalAge: 0
        } as Drawdown);
  });
});

describe("tests for calculatePercentage function", () => {
  it("should return valid percentage", () => {
    expect(
      calculatePercentage(10, 10, 1000, 0.0537, 0.101296240386098, 500, 0.101296240386098, -0.065337942794282))
      .toEqual(1000.0000000000003);
  });
});

describe("tests for calculateProjectionValue function", () => {

  it("should return valid projection for month 1", () => {
    const month = 1;
    const previousMonthProjectedValue = 25000;
    const percentage = 0.003193314;
    const portfolioCurrentValue = 250000;
    const upfrontContribution = 0;
    const monthlyContributions = 624;
    const affordableLumpSum = 83009.41;
    const affordableRemainingAmount = 83009.41;
    const affordableDrawdown = 2800.67;
    const contributionPeriodUptoLumpSum = 224;
    const contributionPeriodFromLumpSumAndDrawdown = 180;
    const goalTargetMonth = 657;
    expect(
      calculateProjectionValue(month, previousMonthProjectedValue, percentage, portfolioCurrentValue, upfrontContribution, monthlyContributions, affordableLumpSum, affordableRemainingAmount, affordableDrawdown, contributionPeriodUptoLumpSum, contributionPeriodFromLumpSumAndDrawdown, goalTargetMonth, 0))
      .toEqual(251422.3285);
  });

  it("should return valid projection for month after the lump sum is taken", () => {
    const month = 225;
    const previousMonthProjectedValue = 714327.30;
    const percentage = 0.003193314;
    const portfolioCurrentValue = 250000;
    const upfrontContribution = 0;
    const monthlyContributions = 624;
    const affordableLumpSum = 83009.41;
    const affordableRemainingAmount = 83009.41;
    const affordableDrawdown = 2800.67;
    const contributionPeriodUptoLumpSum = 224;
    const contributionPeriodFromLumpSumAndDrawdown = 180;
    const goalTargetMonth = 657;
    expect(
      calculateProjectionValue(month, previousMonthProjectedValue, percentage, portfolioCurrentValue, upfrontContribution, monthlyContributions, affordableLumpSum, affordableRemainingAmount, affordableDrawdown, contributionPeriodUptoLumpSum, contributionPeriodFromLumpSumAndDrawdown, goalTargetMonth, 0))
      .toEqual(633959.8788845235);
  });


  it("should return valid projection for month after 1 month of lump sum date", () => {
    const month = 226;
    const previousMonthProjectedValue = 633957.8862565875;
    const percentage = 0.003193314;
    const portfolioCurrentValue = 250000;
    const upfrontContribution = 0;
    const monthlyContributions = 624;
    const affordableLumpSum = 83009.41;
    const affordableRemainingAmount = 83009.41;
    const affordableDrawdown = 2800.67;
    const contributionPeriodUptoLumpSum = 224;
    const contributionPeriodFromLumpSumAndDrawdown = 180;
    const goalTargetMonth = 658;
    const projectedAmountOnLumpSumDate = 633959.8788845235;
    expect(
      calculateProjectionValue(month, previousMonthProjectedValue, percentage, portfolioCurrentValue, upfrontContribution, monthlyContributions, affordableLumpSum, affordableRemainingAmount, affordableDrawdown, contributionPeriodUptoLumpSum, contributionPeriodFromLumpSumAndDrawdown, goalTargetMonth, projectedAmountOnLumpSumDate))
      .toEqual(639265.2020759225);
  });

  it("should return valid projection for month after 1 month of lump sum date", () => {
    const month = 658;
    const previousMonthProjectedValue = 1590180.22;
    const percentage = 0.002426445;
    const portfolioCurrentValue = 250000;
    const upfrontContribution = 0;
    const monthlyContributions = 624;
    const affordableLumpSum = 83009.41;
    const affordableRemainingAmount = 83009.41;
    const affordableDrawdown = 6225.71;
    const contributionPeriodUptoLumpSum = 224;
    const contributionPeriodFromLumpSumAndDrawdown = 180;
    const goalTargetMonth = 658;
    const projectedAmountOnLumpSumDate = 633959.8788845235;
    expect(
      calculateProjectionValue(month, previousMonthProjectedValue, percentage, portfolioCurrentValue, upfrontContribution, monthlyContributions, affordableLumpSum, affordableRemainingAmount, affordableDrawdown, contributionPeriodUptoLumpSum, contributionPeriodFromLumpSumAndDrawdown, goalTargetMonth, projectedAmountOnLumpSumDate))
      .toEqual(1510827.8770760705);
  });
});

describe("tests for calculateProjectionValue function", () => {

  it("should return valid projection for month 1", () => {
    const month = 1;
    const previousMonthProjectedValue = 25000;
    const percentage = 0.003193314;
    const portfolioCurrentValue = 250000;
    const upfrontContribution = 0;
    const monthlyContributions = 624;
    const affordableLumpSum = 83009.41;
    const affordableRemainingAmount = 83009.41;
    const affordableDrawdown = 2800.67;
    const contributionPeriodUptoLumpSum = 224;
    const contributionPeriodFromLumpSumAndDrawdown = 180;
    const goalTargetMonth = 657;
    expect(
      calculateProjectionValue(month, previousMonthProjectedValue, percentage, portfolioCurrentValue, upfrontContribution, monthlyContributions, affordableLumpSum, affordableRemainingAmount, affordableDrawdown, contributionPeriodUptoLumpSum, contributionPeriodFromLumpSumAndDrawdown, goalTargetMonth, 0))
      .toEqual(251422.3285);
  });

  it("should return valid projection for month after the lump sum is taken", () => {
    const month = 225;
    const previousMonthProjectedValue = 714327.30;
    const percentage = 0.003193314;
    const portfolioCurrentValue = 250000;
    const upfrontContribution = 0;
    const monthlyContributions = 624;
    const affordableLumpSum = 83009.41;
    const affordableRemainingAmount = 83009.41;
    const affordableDrawdown = 2800.67;
    const contributionPeriodUptoLumpSum = 224;
    const contributionPeriodFromLumpSumAndDrawdown = 180;
    const goalTargetMonth = 657;
    expect(
      calculateProjectionValue(month, previousMonthProjectedValue, percentage, portfolioCurrentValue, upfrontContribution, monthlyContributions, affordableLumpSum, affordableRemainingAmount, affordableDrawdown, contributionPeriodUptoLumpSum, contributionPeriodFromLumpSumAndDrawdown, goalTargetMonth, 0))
      .toEqual(633959.8788845235);
  });

  it("should return valid projection for month after 1 month of lump sum date", () => {
    const month = 226;
    const previousMonthProjectedValue = 633957.8862565875;
    const percentage = 0.003193314;
    const portfolioCurrentValue = 250000;
    const upfrontContribution = 0;
    const monthlyContributions = 624;
    const affordableLumpSum = 83009.41;
    const affordableRemainingAmount = 83009.41;
    const affordableDrawdown = 2800.67;
    const contributionPeriodUptoLumpSum = 224;
    const contributionPeriodFromLumpSumAndDrawdown = 180;
    const goalTargetMonth = 658;
    const projectedAmountOnLumpSumDate = 633959.8788845235;
    expect(
      calculateProjectionValue(month, previousMonthProjectedValue, percentage, portfolioCurrentValue, upfrontContribution, monthlyContributions, affordableLumpSum, affordableRemainingAmount, affordableDrawdown, contributionPeriodUptoLumpSum, contributionPeriodFromLumpSumAndDrawdown, goalTargetMonth, projectedAmountOnLumpSumDate))
      .toEqual(639265.2020759225);
  });

  it("should return valid projection for month after 1 month of lump sum date", () => {
    const month = 658;
    const previousMonthProjectedValue = 1590180.22;
    const percentage = 0.002426445;
    const portfolioCurrentValue = 250000;
    const upfrontContribution = 0;
    const monthlyContributions = 624;
    const affordableLumpSum = 83009.41;
    const affordableRemainingAmount = 83009.41;
    const affordableDrawdown = 6225.71;
    const contributionPeriodUptoLumpSum = 224;
    const contributionPeriodFromLumpSumAndDrawdown = 180;
    const goalTargetMonth = 658;
    const projectedAmountOnLumpSumDate = 633959.8788845235;
    expect(
      calculateProjectionValue(month, previousMonthProjectedValue, percentage, portfolioCurrentValue, upfrontContribution, monthlyContributions, affordableLumpSum, affordableRemainingAmount, affordableDrawdown, contributionPeriodUptoLumpSum, contributionPeriodFromLumpSumAndDrawdown, goalTargetMonth, projectedAmountOnLumpSumDate))
      .toEqual(1510827.8770760705);
  });

});

describe("tests for calculateContribution function", () => {
  it("should return valid projection", () => {
    //arrange
    const previousMonthContributionLine: number = 1000;
    const month: number = 1;
    const monthlyContributions: number = 624;
    const goalTargetMonth: number = 657;
    const affordableLumpSum: number = 83009.41;
    const affordableRemainingAmount: number = 83009.41;
    const affordableDrawdown: number = 6225.71;
    const contributionPeriodUptoLumpSum: number = 224;
    const contributionPeriodFromLumpSumAndDrawdown: number = 180;

    expect(
      calculateContribution(month, previousMonthContributionLine, monthlyContributions, goalTargetMonth, affordableLumpSum, affordableRemainingAmount, affordableDrawdown, contributionPeriodUptoLumpSum, contributionPeriodFromLumpSumAndDrawdown))
      .toEqual(1624);
  });
});

describe("tests for calculateContribution function when lump sum is withdrawn", () => {
  it("should return valid projection", () => {
    //arrange
    const previousMonthContributionLine: number = 140776.00;
    const month: number = 225;
    const monthlyContributions: number = 624;
    const goalTargetMonth: number = 657;
    const affordableLumpSum: number = 83009.41;
    const affordableRemainingAmount: number = 83009.41;
    const affordableDrawdown: number = 6225.71;
    const contributionPeriodUptoLumpSum: number = 224;
    const contributionPeriodFromLumpSumAndDrawdown: number = 180;

    expect(
      calculateContribution(month, previousMonthContributionLine, monthlyContributions, goalTargetMonth, affordableLumpSum, affordableRemainingAmount, affordableDrawdown, contributionPeriodUptoLumpSum, contributionPeriodFromLumpSumAndDrawdown))
      .toEqual(58390.59);
  });
});
describe("tests for calculateContribution function when goal target period reached", () => {
  it("should return valid projection", () => {
    //arrange
    const previousMonthContributionLine: number = -1405016.92;
    const month: number = 658;
    const monthlyContributions: number = 624.00;
    const goalTargetMonth: number = 658;
    const affordableLumpSum: number = 83009.41;
    const affordableRemainingAmount: number = 83009.41;
    const affordableDrawdown: number = 6225.71;
    const contributionPeriodUptoLumpSum: number = 224;
    const contributionPeriodFromLumpSumAndDrawdown: number = 180;

    expect(
      calculateContribution(month, previousMonthContributionLine, monthlyContributions, goalTargetMonth, affordableLumpSum, affordableRemainingAmount, affordableDrawdown, contributionPeriodUptoLumpSum, contributionPeriodFromLumpSumAndDrawdown))
      .toEqual(-1488026.3299999998);
  });
});

describe("tests for calculateExpectedReturn function", () => {
  it("should return valid projection", () => {
    expect(
      calculateExpectedReturn(2500, 0.04, 0.012))
      .toEqual({ "monthlyNetExpectedReturn": 0.9194445131184874, "monthlyVolatility": 0.0034641016151377548 });
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

    const preGoalExpectedReturns: ExpectedReturns = calculateExpectedReturn(preGoalExpectedReturn, feesPercentage, preGoalExpectedVolatility);
    const postGoalExpectedReturns: ExpectedReturns = calculateExpectedReturn(postGoalExpectedReturn, feesPercentage, postGoalExpectedVolatility);
    const preGoalZScore: number = 0;
    const postGoalZScore: number = 0;
    const statePension: number = null;
    //act

    const result = calculateHoldingsWithOnTrackPercentage(timeHorizon, lumpSumAmount, desiredAmount, desiredMonthlyDrawdown, contributionPeriodUptoLumpSum, contributionPeriodFromLumpSumAndDrawdown, goalDrawdownPeriod, goalTargetMonth, monthlyContributions, portfolioCurrentValue, upfrontContribution, preGoalExpectedReturns, postGoalExpectedReturns, preGoalZScore, postGoalZScore, statePension);

    //assert

    // Assertion
    expect(result.onTrackPercentage).not.toBeNull();
    expect(result.onTrackPercentage).toBeCloseTo(0.8350, 4);
    expect(result.affordableDrawdown).toBeCloseTo(6262.31, 2);
    expect(result.affordableLumpSum).toBeCloseTo(83497.52, 2);
    expect(result.affordableRemainingAmount).toBeCloseTo(83497.52, 2);
    expect(result.affordableOutflow).toBeCloseTo(1751360.57, 2);
    expect(result.surplusOrShortfall).toBeCloseTo(346139.43, 2);
    expect(result.valueAtRetirement).toBeCloseTo(0.40, 2);
    expect(result.totalAffordableDrawdown).toBeCloseTo(1584365.52, 2);

  });
});

describe("tests for calculateHoldingsWithOnTrackPercentage function with state pension", () => {
  it("should return valid holding with ontrack percentage", () => {
    // Arrange
    const timeHorizon: number = 900;
    const lumpSumAmount: number = 100000;
    const desiredAmount: number = 100000;
    const desiredMonthlyDrawdown: number = 7500.00;
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

    const preGoalExpectedReturns: ExpectedReturns = calculateExpectedReturn(preGoalExpectedReturn, feesPercentage, preGoalExpectedVolatility);
    const postGoalExpectedReturns: ExpectedReturns = calculateExpectedReturn(postGoalExpectedReturn, feesPercentage, postGoalExpectedVolatility);
    const preGoalZScore: number = 0;
    const postGoalZScore: number = 0;
    const statePension = 10000;

    //act

    const result = calculateHoldingsWithOnTrackPercentage(timeHorizon, lumpSumAmount, desiredAmount, desiredMonthlyDrawdown, contributionPeriodUptoLumpSum, contributionPeriodFromLumpSumAndDrawdown, goalDrawdownPeriod, goalTargetMonth, monthlyContributions, portfolioCurrentValue, upfrontContribution, preGoalExpectedReturns, postGoalExpectedReturns, preGoalZScore, postGoalZScore, statePension);

    //assert

    // Assertion
    expect(result.onTrackPercentage).not.toBeNull();
    expect(result.onTrackPercentage).toBeCloseTo(0.9233, 4);
    expect(result.affordableDrawdown).toBeCloseTo(6155.65, 2);
    expect(result.affordableLumpSum).toBeCloseTo(92334.75, 2);
    expect(result.affordableRemainingAmount).toBeCloseTo(92334.75, 2);
    expect(result.affordableOutflow).toBeCloseTo(1742048.90, 2);
    expect(result.surplusOrShortfall).toBeCloseTo(144617.77, 2);
    expect(result.valueAtRetirement).toBeCloseTo(-0.40, 2);
    expect(result.totalAffordableDrawdown).toBeCloseTo(1557379.40, 2);
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

    const preGoalExpectedReturns: ExpectedReturns = calculateExpectedReturn(preGoalExpectedReturn, feesPercentage, preGoalExpectedVolatility);
    const postGoalExpectedReturns: ExpectedReturns = calculateExpectedReturn(postGoalExpectedReturn, feesPercentage, postGoalExpectedVolatility);
    const preGoalZScore: number = 0;
    const postGoalZScore: number = 0;
    const statePension: number = null;
    // act 
    const result = () => {
      calculateHoldingsWithOnTrackPercentage(timeHorizon, lumpSumAmount, desiredAmount, desiredMonthlyDrawdown, contributionPeriodUptoLumpSum, contributionPeriodFromLumpSumAndDrawdown, goalDrawdownPeriod, goalTargetMonth, monthlyContributions, portfolioCurrentValue, upfrontContribution, preGoalExpectedReturns, postGoalExpectedReturns, preGoalZScore, postGoalZScore, statePension);
    };

    expect(result)
      .toThrowError("Maximum iterations reached while calculating on track percentage");
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

    const preGoalExpectedReturns: ExpectedReturns = calculateExpectedReturn(preGoalExpectedReturn, feesPercentage, preGoalExpectedVolatility);
    const postGoalExpectedReturns: ExpectedReturns = calculateExpectedReturn(postGoalExpectedReturn, feesPercentage, postGoalExpectedVolatility);
    const preGoalZScore: number = 0;
    const postGoalZScore: number = 0;
    const statePension: number = null;
    // act 
    const result = calculateHoldingsWithOnTrackPercentage(timeHorizon, lumpSumAmount, desiredAmount, desiredMonthlyDrawdown, contributionPeriodUptoLumpSum, contributionPeriodFromLumpSumAndDrawdown, goalDrawdownPeriod, goalTargetMonth, monthlyContributions, portfolioCurrentValue, upfrontContribution, preGoalExpectedReturns, postGoalExpectedReturns, preGoalZScore, postGoalZScore, statePension);

    // assertion

    expect(result.onTrackPercentage).not.toBeNull();
    expect(result.onTrackPercentage).toEqual(8.798664093017578);

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

  test("Calculates required monthly contribution to fund desired drawdown with zero lump sum and upfront contribution", () => {
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

  test("Calculates required upfront contribution to fund desired drawdown with zero lump sum and upfront contribution", () => {
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

describe("tests for calculateGoldProjectionValue function", () => {
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
      calculateGoldProjectionValue(month, previousMonthProjectedValue, percentage, portfolioCurrentValue, upfrontContribution, monthlyContributionsRequiredToFundDrawdown, lumpSumAmount, desiredValueAtEndOfDrawdown, desiredMonthlyDrawdown, contributionPeriodUptoLumpSum, contributionPeriodFromLumpSumAndDrawdown, goalTargetMonth, 0))
      .toBeCloseTo(251770.36, 2);
  });

  it("should return valid projection for month after the lump sum is taken", () => {
    const month = contributionPeriodUptoLumpSum + 1;
    const previousMonthProjectedValue = 827942.9852;

    expect(
      calculateGoldProjectionValue(month, previousMonthProjectedValue, percentage, portfolioCurrentValue, upfrontContribution, monthlyContributionsRequiredToFundDrawdown, lumpSumAmount, desiredValueAtEndOfDrawdown, desiredMonthlyDrawdown, contributionPeriodUptoLumpSum, contributionPeriodFromLumpSumAndDrawdown, goalTargetMonth, 0))
      .toBeCloseTo(731242.67, 2);
  });


  it("should return valid projection for month after 1 month of lump sum date", () => {
    const month = contributionPeriodUptoLumpSum + 2;
    const previousMonthProjectedValue = 731242.67;
    const projectedAmountOnLumpSumDate = 731242.67;
    expect(
      calculateGoldProjectionValue(month, previousMonthProjectedValue, percentage, portfolioCurrentValue, upfrontContribution, monthlyContributionsRequiredToFundDrawdown, lumpSumAmount, desiredValueAtEndOfDrawdown, desiredMonthlyDrawdown, contributionPeriodUptoLumpSum, contributionPeriodFromLumpSumAndDrawdown, goalTargetMonth, projectedAmountOnLumpSumDate))
      .toBeCloseTo(637227.78, 2);
  });

  it("should return valid projection for month after 1 month of drawdown start date", () => {
    const month = contributionPeriodUptoLumpSum + contributionPeriodFromLumpSumAndDrawdown + 2;
    const previousMonthProjectedValue = 1523883.00;
    const projectedAmountOnLumpSumDate = 731242.67;
    const percentage = 0.002124988;
    expect(
      calculateGoldProjectionValue(month, previousMonthProjectedValue, percentage, portfolioCurrentValue, upfrontContribution, monthlyContributionsRequiredToFundDrawdown, lumpSumAmount, desiredValueAtEndOfDrawdown, desiredMonthlyDrawdown, contributionPeriodUptoLumpSum, contributionPeriodFromLumpSumAndDrawdown, goalTargetMonth, projectedAmountOnLumpSumDate))
      .toBeCloseTo(1519605.30, 2);
  });

  it("should return valid projection for month after 1 month of target date", () => {
    const month = goalTargetMonth;
    const previousMonthProjectedValue = 100000.00;
    const projectedAmountOnLumpSumDate = 731242.67;
    const percentage = 0.002124988;
    expect(
      calculateGoldProjectionValue(month, previousMonthProjectedValue, percentage, portfolioCurrentValue, upfrontContribution, monthlyContributionsRequiredToFundDrawdown, lumpSumAmount, desiredValueAtEndOfDrawdown, desiredMonthlyDrawdown, contributionPeriodUptoLumpSum, contributionPeriodFromLumpSumAndDrawdown, goalTargetMonth, projectedAmountOnLumpSumDate))
      .toBeCloseTo(0, 2);
  });
});

describe("Tests for getGoldProjection Function with lump sum and desired remaining amount", () => {
  let context: Context;

  beforeEach(() => {
    context = ({ log: jest.fn() } as unknown) as Context;
  });

  it("should return correct reponse", async () => {
    const inboundPayload = {
      timeHorizonToProject: 900,
      currentPortfolioValue: 250000,
      drawdownRetirement: {
        startDate: new Date("2055-04-10").toISOString().slice(0, 10),
        endDate: new Date("2076-04-10").toISOString().slice(0, 10),
        regularDrawdown: 7500,
        lumpSum: {
          amount: 100000,
          date: new Date("2040-04-10").toISOString().slice(0, 10),
        },
        remainingAmount: 100000
      },
      upfrontContribution: 0,
      feesPercentage: 0.4,
      currentNetContribution: 1000.00,
      monthlyContribution: 624.00,
      preGoal: {
        expectedReturnPercentage: 4.3
      },
      postGoal: {
        expectedReturnPercentage: 2.98
      }
    } as RequestPayload;

    const result = getGoldProjection(inboundPayload, new Date("2021-07-08"));

    expect(result.upfrontContributionsToReach).toBeCloseTo(78926.88, 2);
    expect(result.monthlyContributionsToReach).toBeCloseTo(972.03, 2);

    expect(result.targetProjectionData.length).toEqual(901);

    expect(result.targetProjectionData[0]).toEqual(
      {
        monthNo: 0,
        value: 250000
      } as TargetProjectionMonth);

    expect(result.targetProjectionData[1].value).toBeCloseTo(251770.36, 2);

    //lump sum  month
    expect(result.targetProjectionData[224].value).toBeCloseTo(827942.99, 2);
    // after lump sum date
    expect(result.targetProjectionData[225].value).toBeCloseTo(731242.67, 2);

    // after lump sum date
    expect(result.targetProjectionData[226].value).toBeCloseTo(734546.67, 2);

    //Month before drawdown start
    expect(result.targetProjectionData[406].value).toBeCloseTo(1519605.43, 2);

    //Drawdown start
    expect(result.targetProjectionData[407].value).toBeCloseTo(1515318.64, 2);


    // At the drawdown end date expect to have desired amount
    expect(result.targetProjectionData[657].value).toBeCloseTo(100000, 0);

    // After the drawdown end date expect to have zero amount
    expect(result.targetProjectionData[658].value).toBeCloseTo(0, 0);

    expect(result.targetProjectionData[661]).toEqual(
      {
        monthNo: 661,
        value: 0,
      } as TargetProjectionMonth);

    expect(result.targetProjectionData[900]).toEqual(
      {
        monthNo: 900,
        value: 0,
      } as TargetProjectionMonth);
  });
})

describe("Tests for getGoldProjection Function without lump sum and desired remaining amount", () => {
  let context: Context;

  beforeEach(() => {
    context = ({ log: jest.fn() } as unknown) as Context;
  });


  it("should return correct response when lump sum date is past", async () => {
    const today = new Date("2021-07-09");
    const pastDate = new Date(new Date().setDate(today.getDate() - 1)).toISOString().slice(0, 10);
    const inboundPayload = {
      timeHorizonToProject: 900,
      currentPortfolioValue: 250000,
      drawdownRetirement: {
        startDate: new Date("2055-04-10").toISOString().slice(0, 10),
        endDate: new Date("2076-04-10").toISOString().slice(0, 10),
        regularDrawdown: 9999,
        lumpSum: {
          amount: 100000,
          date: pastDate
        },
        remainingAmount: 100000
      },
      upfrontContribution: 0,
      feesPercentage: 0.4,
      preGoal: {
        expectedReturnPercentage: 4.3
      },
      postGoal: {
        expectedReturnPercentage: 2.98
      },
      currentNetContribution: 1000.00,
      monthlyContribution: 624.00,
    } as RequestPayload;


    // Action
    const result = getGoldProjection(inboundPayload, today);

    // Assertion
    expect(result.monthlyContributionsToReach).toBeCloseTo(1361.20, 2)
    expect(result.upfrontContributionsToReach).toBeCloseTo(166981.70, 2)

    expect(result.targetProjectionData[0]).toEqual(
      {
        monthNo: 0,
        value: 250000
      } as TargetProjectionMonth);

    expect(result.targetProjectionData[1].value).toBeCloseTo(240767.40, 2);


    expect(result.targetProjectionData.length).toEqual(901);

    //After the drawdown end date expect to have zero amount left
    expect(result.targetProjectionData[660].value).toBeCloseTo(0, 0);

    expect(result.targetProjectionData[661]).toEqual(
      {
        monthNo: 661,
        value: 0,
      } as TargetProjectionMonth);

    expect(result.targetProjectionData[900]).toEqual(
      {
        monthNo: 900,
        value: 0,
      } as TargetProjectionMonth);
  });

  it("when desired monthly amount is less than state pension when state pension is included the result should be same as desired monthly drawdown is zero", async () => {
    const today = new Date("2021-07-09");
    const pastDate = new Date(new Date().setDate(today.getDate() - 1)).toISOString().slice(0, 10);
    const inboundPayload = {
      timeHorizonToProject: 900,
      currentPortfolioValue: 250000,
      drawdownRetirement: {
        startDate: new Date("2055-04-10").toISOString().slice(0, 10),
        endDate: new Date("2076-04-10").toISOString().slice(0, 10),
        regularDrawdown: 0,
        lumpSum: {
          amount: 100000,
          date: pastDate
        },
        remainingAmount: 100000
      },
      preGoal: {
        expectedReturnPercentage: 4.3
      },
      upfrontContribution: 0,
      feesPercentage: 0.4,
      postGoal: {
        expectedReturnPercentage: 2.98
      },
      currentNetContribution: 1000.00,
      monthlyContribution: 624.00,
    } as RequestPayload;


    // Action
    const result = getGoldProjection(inboundPayload, today);

    const inboundPayloadWithStatePension = { ...inboundPayload, includeStatePension: true, desiredMonthlyDrawdown: 800, statePensionAmount: 12000 };

    const resultWithStatePension = getGoldProjection(inboundPayloadWithStatePension, today);

    // Assertion
    expect(result.monthlyContributionsToReach).toEqual(resultWithStatePension.monthlyContributionsToReach)
    expect(result.upfrontContributionsToReach).toEqual(resultWithStatePension.upfrontContributionsToReach)

    expect(result.targetProjectionData[0]).toEqual(resultWithStatePension.targetProjectionData[0]);

    expect(result.targetProjectionData[1]).toEqual(resultWithStatePension.targetProjectionData[1]);


    expect(result.targetProjectionData.length).toEqual(resultWithStatePension.targetProjectionData.length);

    //After the drawdown end date expect to have zero amount left
    expect(result.targetProjectionData[660]).toEqual(resultWithStatePension.targetProjectionData[660]);

    expect(result.targetProjectionData[661]).toEqual(resultWithStatePension.targetProjectionData[661]);
    expect(result.targetProjectionData[900]).toEqual(resultWithStatePension.targetProjectionData[900]);
  });

  it("should return a correct response when lump sum date and drawdown start date is same", async () => {
    const today = new Date("2021-07-12");
    const inboundPayload = {
      timeHorizonToProject: 900,
      currentPortfolioValue: 250000,
      drawdownRetirement: {
        remainingAmount: 100000,
        regularDrawdown: 9999,
        startDate: new Date("2055-04-10").toISOString().slice(0, 10),
        endDate: new Date("2076-04-10").toISOString().slice(0, 10),
        lumpSum: {
          amount: 100000,
          date: new Date("2055-04-10").toISOString().slice(0, 10),
        }
      },
      upfrontContribution: 0,
      preGoal: {
        expectedReturnPercentage: 4.3
      },
      postGoal: {
        expectedReturnPercentage: 4.3
      },
      feesPercentage: 0.4,
      currentNetContribution: 0.00,
      monthlyContribution: 624.00,
    } as RequestPayload;


    // Action
    const result = getGoldProjection(inboundPayload, today);

    // Assertion
    expect(result.monthlyContributionsToReach).toBeCloseTo(1197.36, 2)
    expect(result.upfrontContributionsToReach).toBeCloseTo(129871.21, 2)

    expect(result.targetProjectionData[0]).toEqual(
      {
        monthNo: 0,
        value: 250000
      } as TargetProjectionMonth);

    expect(result.targetProjectionData[1].value).toBeCloseTo(251995.69, 2);

    //Month before drawdown start
    expect(result.targetProjectionData[406].value).toBeCloseTo(1770688.47, 2);

    //Drawdown start
    expect(result.targetProjectionData[407].value).toBeCloseTo(1766311.91, 2);

    expect(result.targetProjectionData.length).toEqual(901);

    //After the drawdown end date expect to have zero amount left
    expect(result.targetProjectionData[660].value).toBeCloseTo(0, 0);

    expect(result.targetProjectionData[661]).toEqual(
      {
        monthNo: 661,
        value: 0,
      } as TargetProjectionMonth);

    expect(result.targetProjectionData[900]).toEqual(
      {
        monthNo: 900,
        value: 0,
      } as TargetProjectionMonth);
  });

  it("should return a correct response when already in retirement and no contribution", async () => {
    const today = new Date("2021-07-12");
    const pastDate = new Date(new Date().setDate(today.getDate() - 1)).toISOString().slice(0, 10);
    const inboundPayload = {
      timeHorizonToProject: 900,
      currentPortfolioValue: 250000,
      drawdownRetirement: {
        remainingAmount: 100000,
        regularDrawdown: 7500,
        startDate: new Date(pastDate).toISOString().slice(0, 10),
        endDate: new Date("2076-04-10").toISOString().slice(0, 10),
        lumpSum: {
          amount: 100000,
          date: pastDate
        }
      },
      upfrontContribution: 0,
      preGoal: {
        expectedReturnPercentage: 4.3
      },
      postGoal: {
        expectedReturnPercentage: 2.98
      },
      feesPercentage: 0.4,
      currentNetContribution: 1000.00,
      monthlyContribution: 624.00,
    } as RequestPayload;


    // Action
    const result = getGoldProjection(inboundPayload, today);

    // Assertion
    expect(result.monthlyContributionsToReach).toEqual(0)
    expect(result.upfrontContributionsToReach).toBeCloseTo(2433025.83, 2)

    expect(result.targetProjectionData[0].monthNo).toEqual(0);
    expect(result.targetProjectionData[0].value).toBeCloseTo(2683025.83, 2);

    expect(result.targetProjectionData[1].value).toBeCloseTo(2681211.29, 2);

    //Month before drawdown start
    expect(result.targetProjectionData[406].value).toBeCloseTo(1515318.64, 2);

    //Drawdown start
    expect(result.targetProjectionData[407].value).toBeCloseTo(1511022.73, 2);

    expect(result.targetProjectionData.length).toEqual(901);

    //After the drawdown end date expect to have zero amount left
    expect(result.targetProjectionData[660].value).toBeCloseTo(0, 0);

    expect(result.targetProjectionData[661]).toEqual(
      {
        monthNo: 661,
        value: 0,
      } as TargetProjectionMonth);

    expect(result.targetProjectionData[900]).toEqual(
      {
        monthNo: 900,
        value: 0,
      } as TargetProjectionMonth);
  });
})

describe("Tests for getGoldProjection function with state pension", () => {
  let context: Context;

  beforeEach(() => {
    context = ({ log: jest.fn() } as unknown) as Context;
  });


  it("should return a correct response", async () => {
    const inboundPayload = {
      timeHorizonToProject: 900,
      currentPortfolioValue: 250000,
      drawdownRetirement: {
        regularDrawdown: 7500,
        startDate: new Date("2055-04-10").toISOString().slice(0, 10),
        endDate: new Date("2076-04-10").toISOString().slice(0, 10),
        lumpSum: {
          amount: 100000,
          date: new Date("2040-04-10").toISOString().slice(0, 10),
        },
        statePensionAmount: 12000,
        remainingAmount: 100000
      },
      upfrontContribution: 0,
      preGoal: {
        expectedReturnPercentage: 4.3
      },
      feesPercentage: 0.4,
      postGoal: {
        expectedReturnPercentage: 2.98
      },
      currentNetContribution: 1000.00,
      monthlyContribution: 624.00,
    } as RequestPayload;


    // Action
    const result = getGoldProjection(inboundPayload, new Date("2021-07-08"));


    // Assertion
    expect(result.upfrontContributionsToReach).toBeCloseTo(24878.99, 2)
    expect(result.monthlyContributionsToReach).toBeCloseTo(733.70, 2)

    expect(result.targetProjectionData.length).toEqual(901);

    //first row
    expect(result.targetProjectionData[1].value).toBeCloseTo(251532.03, 2);

    //just before lump sum  month
    expect(result.targetProjectionData[224].value).toBeCloseTo(750140.74, 2);
    // after lump sum date
    expect(result.targetProjectionData[225].value).toBeCloseTo(652952.89, 2);

    // after lump sum date +1
    expect(result.targetProjectionData[226].value).toBeCloseTo(655769.33, 2);

    //Month before drawdown start
    expect(result.targetProjectionData[406].value).toBeCloseTo(1324817.45, 2);

    //Drawdown start
    expect(result.targetProjectionData[407].value).toBeCloseTo(1321118.86, 2);


    // At the drawdown end date expect to have desired amount
    expect(result.targetProjectionData[657].value).toBeCloseTo(100000, 0);

    // After the drawdown end date expect to have zero amount
    expect(result.targetProjectionData[658].value).toBeCloseTo(0, 0);


    expect(result.targetProjectionData[661]).toEqual(
      {
        monthNo: 661,
        value: 0,
      } as TargetProjectionMonth);

    expect(result.targetProjectionData[900]).toEqual(
      {
        monthNo: 900,
        value: 0,
      } as TargetProjectionMonth);
  });
})

describe("Tests for getGoldProjection function with pre and post goal zeros", () => {
  let context: Context;

  beforeEach(() => {
    context = ({ log: jest.fn() } as unknown) as Context;
  });


  it("should return a correct response", async () => {
    const inboundPayload = {
      timeHorizonToProject: 900,
      currentPortfolioValue: 250000,
      drawdownRetirement: {
        regularDrawdown: 3000,
        startDate: new Date("2055-04-10").toISOString().slice(0, 10),
        endDate: new Date("2076-04-10").toISOString().slice(0, 10),
        lumpSum: {
          amount: 1000,
          date: new Date("2040-04-10").toISOString().slice(0, 10),
        },
        statePensionAmount: 0,
        remainingAmount: 2000
      },
      upfrontContribution: 1000,
      preGoal: {
        expectedReturnPercentage: 0,
        ZScoreLowerBound: 0,
        ZScoreUpperBound: 0,
        volatilityPercentage: 0
      },
      feesPercentage: 0,
      currentNetContribution: 1000,
      monthlyContribution: 650,
    } as RequestPayload;


    // Action
    const result = getGoldProjection(inboundPayload, new Date("2021-08-12"));


    // Assertion
    expect(result.upfrontContributionsToReach).toBeCloseTo(249700, 2)
    expect(result.monthlyContributionsToReach).toBeCloseTo(1271.14427860697, 2)

    expect(result.targetProjectionData.length).toEqual(901);

    //first row
    expect(result.targetProjectionData[1].value).toBeCloseTo(252271.144278607, 2);

    //just before lump sum  month
    expect(result.targetProjectionData[224].value).toBeCloseTo(534736.318407964, 2);
    // after lump sum date
    expect(result.targetProjectionData[225].value).toBeCloseTo(536007.462686571, 2);

    // after lump sum date +1
    expect(result.targetProjectionData[226].value).toBeCloseTo(537278.606965178, 2);

    //Month before drawdown start
    expect(result.targetProjectionData[406].value).toBeCloseTo(749000, 2);

    //Drawdown start
    expect(result.targetProjectionData[407].value).toBeCloseTo(746000, 2);


    // At the drawdown end date expect to have desired amount
    expect(result.targetProjectionData[657].value).toBeCloseTo(0, 0);

    // After the drawdown end date expect to have zero amount
    expect(result.targetProjectionData[658].value).toBeCloseTo(0, 0);


    expect(result.targetProjectionData[661]).toEqual(
      {
        monthNo: 661,
        value: 0,
      } as TargetProjectionMonth);

    expect(result.targetProjectionData[900]).toEqual(
      {
        monthNo: 900,
        value: 0,
      } as TargetProjectionMonth);
  });
})
