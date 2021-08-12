import { Context } from "@azure/functions";
import { calculateContributionLine, calculateDrawdown, calculateExpectedReturn, calculateHoldingsWithOnTrackPercentage, calculatePercentage, calculateProjectionValue, currentProjection, getCurrentProjection, monthDiff, validateInput, yearDiff } from "./index";
import { Drawdown, ExpectedReturns, ProjectionMonth, RequestPayload, ValidationError } from "./types";

describe("tests for validate function", () => {
  const emptyRequestPayload = {} as RequestPayload
  const validRequestPayload = createRequestPayload()

  it("when empty payload should return list of errors", () => {
    expect(
      validateInput(emptyRequestPayload))
      .toEqual(
        [
          {
            code: 'val-currentproj-001',
            property: 'timeHorizon',
            message: 'timeHorizon_must_be_more_than_zero'
          },
          {
            code: 'val-currentproj-003',
            property: 'monthlyContributions',
            message: 'monthlyContributions_must_be_a_positive_number_or_zero'
          },
          {
            code: 'val-currentproj-004',
            property: 'portfolioCurrentValue',
            message: 'portfolioCurrentValue_must_be_a_positive_number_or_zero'
          },
          {
            code: 'val-currentproj-005',
            property: 'desiredMonthlyDrawdown',
            message: 'desiredMonthlyDrawdown_must_be_a_positive_number_or_zero'
          },
          {
            code: 'val-currentproj-006',
            property: 'drawdownStartDate',
            message: 'drawdownStartDate_must_be_a_valid_date'
          },
          {
            code: 'val-currentproj-007',
            property: 'drawdownEndDate',
            message: 'drawdownEndDate_must_be_a_valid_date'
          },
          {
            code: 'val-currentproj-009',
            property: 'upfrontContribution',
            message: 'upfrontContribution_must_be_a_positive_number_or_zero'
          },
          {
            code: 'val-currentproj-011',
            property: 'preGoalExpectedReturn',
            message: 'preGoalExpectedReturn_must_be_a_valid_number'
          },
          {
            code: 'val-currentproj-012',
            property: 'preGoalExpectedVolatility',
            message: 'preGoalExpectedVolatility_must_be_a_valid_number'
          },
          {
            code: 'val-currentproj-013',
            property: 'preGoalZScoreLowerBound',
            message: 'preGoalZScoreLowerBound_must_be_a_valid_number'
          },
          {
            code: 'val-currentproj-014',
            property: 'preGoalZScoreUpperBound',
            message: 'preGoalZScoreUpperBound_must_be_a_valid_number'
          },
          {
            code: 'val-currentproj-015',
            property: 'feesPercentage',
            message: 'feesPercentage_must_be_a_positive_number_or_zero'
          },
          {
            code: 'val-currentproj-017',
            property: 'postGoalExpectedReturn',
            message: 'postGoalExpectedReturn_must_be_a_valid_number'
          },
          {
            code: 'val-currentproj-018',
            property: 'postGoalExpectedVolatility',
            message: 'postGoalExpectedVolatility_must_be_a_valid_number'
          },
          {
            code: 'val-currentproj-019',
            property: 'postGoalZScoreLowerBound',
            message: 'postGoalZScoreLowerBound_must_be_a_valid_number'
          },
          {
            code: 'val-currentproj-020',
            property: 'postGoalZScoreUpperBound',
            message: 'postGoalZScoreUpperBound_must_be_a_valid_number'
          },
          {
            code: 'val-currentproj-021',
            property: 'lumpSumAmount',
            message: 'lumpSumAmount_must_be_a_positive_number_or_zero'
          },
          {
            code: 'val-currentproj-022',
            property: 'statePensionAmount',
            message: 'statePensionAmount_must_be_a_positive_number_or_zero'
          },
          {
            code: 'val-currentproj-023',
            property: 'desiredAmount',
            message: 'desiredAmount_must_be_a_positive_number_or_zero'
          },
          {
            code: 'val-currentproj-024',
            property: 'netContribution',
            message: 'netContribution_must_be_a_positive_number_or_zero'
          },
          {
            code: 'val-currentproj-025',
            property: 'isConeGraph',
            message: 'isConeGraph_must_be_a_valid_boolean_value'
          },
          {
            code: 'val-currentproj-026',
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
    invalidDateRequestPayload.lumpSumDate = "2019-01-01"
    invalidDateRequestPayload.drawdownStartDate = "2021-01-01"
    invalidDateRequestPayload.drawdownEndDate = "2020-01-01"

    expect(
      validateInput(invalidDateRequestPayload))
      .toEqual(
        [
          {
            "code": "val-currentproj-008",
            "property": "drawdownEndDate",
            "message": "drawdownEndDate_must_be_later_than_start_date"
          }
        ] as ValidationError[])
  });
  it("when lump sum dates are not valid validation error is thrown", () => {
    const invalidDateRequestPayload = validRequestPayload;
    invalidDateRequestPayload.lumpSumDate = "2021-02-01"
    invalidDateRequestPayload.drawdownStartDate = "2021-01-01"
    invalidDateRequestPayload.drawdownEndDate = "2022-01-01"

    expect(
      validateInput(invalidDateRequestPayload))
      .toEqual(
        [
          {
            "code": "val-currentproj-028",
            "property": "lumpSumDate",
            "message": "lumpSumDate_must_be_same_or_before_the_drawdownStartDate"
          }
        ] as ValidationError[])
  });


});

describe("Tests for current-projection Function", () => {
  let context: Context;

  beforeEach(() => {
    context = ({ log: jest.fn() } as unknown) as Context;
  });

  it("should return a 200 response when payload is valid", async () => {
    // Arrange
    const inboundPayload = {
      timeHorizon: 900,
      monthlyContributions: 624,
      portfolioCurrentValue: 250000,
      desiredMonthlyDrawdown: 700,
      drawdownStartDate: "2055-04-10",
      drawdownEndDate: "2076-04-10",
      upfrontContribution: 0,
      preGoalExpectedReturn: 0.043,
      preGoalExpectedVolatility: 0.1637,
      preGoalZScoreLowerBound: -1.350641417,
      preGoalZScoreUpperBound: 1.26511912,
      feesPercentage: 0.004,
      lumpSumAmount: 200000,
      lumpSumDate: "2040-04-10",
      statePensionAmount: 0,
      desiredAmount: 0,
      postGoalExpectedReturn: 0.0298,
      postGoalExpectedVolatility: 0.0927,
      postGoalZScoreLowerBound: -1.297734628,
      postGoalZScoreUpperBound: 1.284789644,
      netContribution: 1000,
      isConeGraph: true,
      includeStatePension: true
    } as RequestPayload;
    const request = {
      query: {},
      body: inboundPayload,
    };

    // Action
    await currentProjection(context, request);

    // Assertion
    expect(context.res.status).toEqual(200);

  });

  it("should return a 200 response when payload has very low desiredMonthlyDrawdown this will have high iteration", async () => {
    // Arrange
    const inboundPayload = {
      "timeHorizon": 600,
      "isConeGraph": true,
      "lumpSumAmount": 0,
      "lumpSumDate": "2035-09-13",
      "desiredAmount": 0,
      "netContribution": 170114.02000000003,
      "monthlyContributions": 700,
      "portfolioCurrentValue": 217932.0115,
      "preGoalExpectedVolatility": 0.0575,
      "preGoalZScoreLowerBound": -0.082922932045877,
      "preGoalZScoreUpperBound": 0.11695998920423,
      "postGoalExpectedVolatility": 0.0575,
      "postGoalZScoreLowerBound": -0.053855486492308,
      "postGoalZScoreUpperBound": 0.096334740881002,
      "postGoalRiskModel": "TAA1",
      "postGoalExpectedReturn": 0.022,
      "preGoalRiskModel": "TAA1",
      "preGoalExpectedReturn": 0.022,
      "feesPercentage": 0,
      "includeStatePension": false,
      "desiredMonthlyDrawdown": 0.08,
      "drawdownStartDate": "2035-09-13",
      "drawdownEndDate": "2057-09-13",
      "upfrontContribution": 0,
      "statePensionAmount": 0
    } as RequestPayload;
    const request = {
      query: {},
      body: inboundPayload,
    };

    // Action
    await currentProjection(context, request);

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
    await currentProjection(context, request);

    // Assertion
    expect(context.res.status).toEqual(400);
  });

});

describe("Tests for getCurrentProjection Function", () => {
  let context: Context;

  beforeEach(() => {
    context = ({ log: jest.fn() } as unknown) as Context;
  });

  it("should return expected results when lump sum date is before drawdown start date ", async () => {
    // Arrange
    const inboundPayload = {
      timeHorizon: 900,
      monthlyContributions: 624,
      portfolioCurrentValue: 250000,
      desiredMonthlyDrawdown: 7500,
      drawdownStartDate: "2055-04-10",
      drawdownEndDate: "2076-04-10",
      upfrontContribution: 0,
      preGoalExpectedReturn: 0.043,
      preGoalExpectedVolatility: 0.1637,
      preGoalZScoreLowerBound: -1.350641417,
      preGoalZScoreUpperBound: 1.26511912,
      feesPercentage: 0.004,
      lumpSumAmount: 100000,
      lumpSumDate: "2040-04-10",
      statePensionAmount: 10000,
      desiredAmount: 100000,
      postGoalExpectedReturn: 0.0298,
      postGoalExpectedVolatility: 0.0927,
      postGoalZScoreLowerBound: -1.297734628,
      postGoalZScoreUpperBound: 1.284789644,
      netContribution: 1000,
      isConeGraph: true,
      includeStatePension: false
    } as RequestPayload;

    // Action
    const result = getCurrentProjection(inboundPayload, new Date("July 05,2021"));

    // Assertion
    expect(result.projectedGoalAgeTotal).toBeCloseTo(1419501.99, 2);
    expect(result.possibleDrawdown).toBeCloseTo(6435.25);
    expect(result.onTrackPercentage).toBeCloseTo(0.8350, 4);
    expect(result.desiredOutflow).toBeCloseTo(2097500);
    expect(result.affordableOutflow).toBeCloseTo(1751360.57, 2);
    expect(result.affordableDrawdown).toBeCloseTo(6262.31, 2);
    expect(result.affordableLumpSum).toBeCloseTo(83497.52, 2);
    expect(result.projections.length).toBeCloseTo(901);
    //underperform
    expect(result.marketUnderperform.onTrackPercentage).toBeCloseTo(0.4147, 4);
    expect(result.marketUnderperform.desiredOutflow).toBeCloseTo(2097500);
    expect(result.marketUnderperform.affordableOutflow).toBeCloseTo(869916.33, 2);
    expect(result.marketUnderperform.affordableDrawdown).toBeCloseTo(3110.55, 2);
    expect(result.marketUnderperform.affordableLumpSum).toBeCloseTo(41473.96, 2);

    expect(result.projections[0]).toEqual(
      {
        month: 0,
        contributionLine: 1000,
        lowerBound: 250000,
        projectedValue: 250000,
        upperBound: 250000
      } as ProjectionMonth);

    expect(result.projections[1]).toEqual(
      {
        month: 1,
        contributionLine: 1624,
        lowerBound: 235465.81038991973,
        projectedValue: 251422.32845197053,
        upperBound: 266368.48354157555
      } as ProjectionMonth);

    //just before  lump sum start
    expect(result.projections[224]).toEqual({
      month: 224,
      contributionLine: 140776,
      lowerBound: 417562.7172793837,
      projectedValue: 714327.2998455743,
      upperBound: 985019.5795674027
    } as ProjectionMonth);

    //just after lump sum
    expect(result.projections[225]).toEqual({
      month: 225,
      contributionLine: 57902.47573852539,
      lowerBound: 334819.59959494777,
      projectedValue: 633470.2056447117,
      upperBound: 906488.2535895858,
    } as ProjectionMonth);

    expect(result.projections[226]).toEqual({
      month: 226,
      lowerBound: 336339.6403310231,
      projectedValue: 638772.3962376652,
      upperBound: 916470.9875307771,
      contributionLine: 58526.47573852539,
    } as ProjectionMonth);


    expect(result.projections[405]).toEqual(
      {
        month: 405,
        lowerBound: 620229.4409289613,
        projectedValue: 1272404.9252367339,
        upperBound: 1989726.6866230138,
        contributionLine: 163336.1614189148,
      } as ProjectionMonth);


    //after drawdown start
    expect(result.projections[407]).toEqual(
      {
        month: 407,
        contributionLine: 150811.5327796936,
        lowerBound: 609247.6550393509,
        projectedValue: 1265253.7812876487,
        upperBound: 1988139.4335948436,
      } as ProjectionMonth);
    //target month
    expect(result.projections[657]).toEqual(
      {
        month: 657,
        contributionLine: -1414767.0471229553,
        lowerBound: 0,
        projectedValue: 83497.92273923039,
        upperBound: 1591333.7049422842,
      } as ProjectionMonth);

    expect(result.projections[658]).toEqual(
      {
        month: 658,
        contributionLine: -1504526.8857040405,
        lowerBound: 0,
        projectedValue: 0.39932451606410596,
        upperBound: 1588916.164137102,
      } as ProjectionMonth);


    expect(result.projections[900]).toEqual(
      {
        month: 900,
        upperBound: 765330.010170457,
        lowerBound: 0,
        contributionLine: -3020006.9510498047,
        projectedValue: 0,
      } as ProjectionMonth);
  });

  it("should return expected results when lump sum date is past date the result is same as lump sum is zero", async () => {
    // Arrange
    const today = new Date("2021-07-13");
    const pastDate = new Date(new Date().setDate(today.getDate() - 1)).toISOString().slice(0, 10);

    const inboundPayload = {
      timeHorizon: 900,
      monthlyContributions: 624,
      portfolioCurrentValue: 250000,
      desiredMonthlyDrawdown: 7500,
      drawdownStartDate: "2055-04-10",
      drawdownEndDate: "2076-04-10",
      upfrontContribution: 0,
      preGoalExpectedReturn: 0.043,
      preGoalExpectedVolatility: 0.1637,
      preGoalZScoreLowerBound: -1.350641417,
      preGoalZScoreUpperBound: 1.26511912,
      feesPercentage: 0.004,
      lumpSumAmount: 100000,
      lumpSumDate: pastDate,
      statePensionAmount: 10000,
      desiredAmount: 100000,
      postGoalExpectedReturn: 0.0298,
      postGoalExpectedVolatility: 0.0927,
      postGoalZScoreLowerBound: -1.297734628,
      postGoalZScoreUpperBound: 1.284789644,
      netContribution: 1000,
      isConeGraph: true,
      includeStatePension: false
    } as RequestPayload;

    // Action

    const resultWithLumpSum = getCurrentProjection(inboundPayload, today);

    inboundPayload.lumpSumAmount = 0;

    const resultWithLumpSumZero = getCurrentProjection(inboundPayload, today);


    // Assertion
    expect(resultWithLumpSum.projectedGoalAgeTotal).toBeCloseTo(resultWithLumpSumZero.projectedGoalAgeTotal);
    expect(resultWithLumpSum.possibleDrawdown).toBeCloseTo(resultWithLumpSumZero.possibleDrawdown);
    expect(resultWithLumpSum.onTrackPercentage).toEqual(resultWithLumpSumZero.onTrackPercentage);
    expect(resultWithLumpSum.desiredOutflow).toEqual(resultWithLumpSumZero.desiredOutflow);
    expect(resultWithLumpSum.affordableOutflow).toBeCloseTo(resultWithLumpSumZero.affordableOutflow);
    expect(resultWithLumpSum.affordableDrawdown).toBeCloseTo(resultWithLumpSumZero.affordableDrawdown);
    expect(resultWithLumpSum.affordableLumpSum).toBeCloseTo(resultWithLumpSumZero.affordableLumpSum);
    expect(resultWithLumpSum.projections.length).toBeCloseTo(901);
    //underperform
    expect(resultWithLumpSum.marketUnderperform.onTrackPercentage).toEqual(resultWithLumpSumZero.marketUnderperform.onTrackPercentage);
    expect(resultWithLumpSum.marketUnderperform.desiredOutflow).toBeCloseTo(resultWithLumpSumZero.marketUnderperform.desiredOutflow);
    expect(resultWithLumpSum.marketUnderperform.affordableOutflow).toBeCloseTo(resultWithLumpSumZero.marketUnderperform.affordableOutflow);
    expect(resultWithLumpSum.marketUnderperform.affordableDrawdown).toBeCloseTo(resultWithLumpSumZero.marketUnderperform.affordableDrawdown);
    expect(resultWithLumpSum.marketUnderperform.affordableLumpSum).toBeCloseTo(resultWithLumpSumZero.marketUnderperform.affordableLumpSum);

    expect(resultWithLumpSum.projections[0]).toEqual(resultWithLumpSumZero.projections[0]);

    expect(resultWithLumpSum.projections[1]).toEqual(resultWithLumpSumZero.projections[1]);
    expect(resultWithLumpSum.projections[224]).toEqual(resultWithLumpSumZero.projections[224]);
    expect(resultWithLumpSum.projections[225]).toEqual(resultWithLumpSumZero.projections[225]);
    expect(resultWithLumpSum.projections[226]).toEqual(resultWithLumpSumZero.projections[226]);



    //after drawdown start
    expect(resultWithLumpSum.projections[403]).toEqual(resultWithLumpSumZero.projections[403]);

    //target month
    expect(resultWithLumpSum.projections[600]).toEqual(resultWithLumpSumZero.projections[600]);
    expect(resultWithLumpSum.projections[657]).toEqual(resultWithLumpSumZero.projections[657]);
    expect(resultWithLumpSum.projections[658]).toEqual(resultWithLumpSumZero.projections[658]);
    expect(resultWithLumpSum.projections[900]).toEqual(resultWithLumpSumZero.projections[900]);
  });

  it("should return  results same as lump sum zero when lump sum date is past date with state pension", async () => {
    // Arrange
    const today = new Date("2021-07-13");
    const pastDate = new Date(new Date().setDate(today.getDate() - 1)).toISOString().slice(0, 10);

    const inboundPayload = {
      timeHorizon: 900,
      monthlyContributions: 624,
      portfolioCurrentValue: 250000,
      desiredMonthlyDrawdown: 7500,
      drawdownStartDate: "2055-04-10",
      drawdownEndDate: "2076-04-10",
      upfrontContribution: 0,
      preGoalExpectedReturn: 0.043,
      preGoalExpectedVolatility: 0.1637,
      preGoalZScoreLowerBound: -1.350641417,
      preGoalZScoreUpperBound: 1.26511912,
      feesPercentage: 0.004,
      lumpSumAmount: 100000,
      lumpSumDate: pastDate,
      statePensionAmount: 10000,
      desiredAmount: 100000,
      postGoalExpectedReturn: 0.0298,
      postGoalExpectedVolatility: 0.0927,
      postGoalZScoreLowerBound: -1.297734628,
      postGoalZScoreUpperBound: 1.284789644,
      netContribution: 1000,
      isConeGraph: true,
      includeStatePension: true
    } as RequestPayload;

    // Action

    const resultWithLumpSum = getCurrentProjection(inboundPayload, today);

    inboundPayload.lumpSumAmount = 0;

    const resultWithLumpSumZero = getCurrentProjection(inboundPayload, today);


    // Assertion
    expect(resultWithLumpSum.projectedGoalAgeTotal).toBeCloseTo(resultWithLumpSumZero.projectedGoalAgeTotal);
    expect(resultWithLumpSum.possibleDrawdown).toBeCloseTo(resultWithLumpSumZero.possibleDrawdown);
    expect(resultWithLumpSum.onTrackPercentage).toEqual(resultWithLumpSumZero.onTrackPercentage);
    expect(resultWithLumpSum.desiredOutflow).toEqual(resultWithLumpSumZero.desiredOutflow);
    expect(resultWithLumpSum.affordableOutflow).toBeCloseTo(resultWithLumpSumZero.affordableOutflow);
    expect(resultWithLumpSum.affordableDrawdown).toBeCloseTo(resultWithLumpSumZero.affordableDrawdown);
    expect(resultWithLumpSum.affordableLumpSum).toBeCloseTo(resultWithLumpSumZero.affordableLumpSum);
    expect(resultWithLumpSum.projections.length).toBeCloseTo(901);
    //underperform
    expect(resultWithLumpSum.marketUnderperform.onTrackPercentage).toEqual(resultWithLumpSumZero.marketUnderperform.onTrackPercentage);
    expect(resultWithLumpSum.marketUnderperform.desiredOutflow).toBeCloseTo(resultWithLumpSumZero.marketUnderperform.desiredOutflow);
    expect(resultWithLumpSum.marketUnderperform.affordableOutflow).toBeCloseTo(resultWithLumpSumZero.marketUnderperform.affordableOutflow);
    expect(resultWithLumpSum.marketUnderperform.affordableDrawdown).toBeCloseTo(resultWithLumpSumZero.marketUnderperform.affordableDrawdown);
    expect(resultWithLumpSum.marketUnderperform.affordableLumpSum).toBeCloseTo(resultWithLumpSumZero.marketUnderperform.affordableLumpSum);

    expect(resultWithLumpSum.projections[0]).toEqual(resultWithLumpSumZero.projections[0]);

    expect(resultWithLumpSum.projections[1]).toEqual(resultWithLumpSumZero.projections[1]);
    expect(resultWithLumpSum.projections[224]).toEqual(resultWithLumpSumZero.projections[224]);
    expect(resultWithLumpSum.projections[225]).toEqual(resultWithLumpSumZero.projections[225]);
    expect(resultWithLumpSum.projections[226]).toEqual(resultWithLumpSumZero.projections[226]);



    //after drawdown start
    expect(resultWithLumpSum.projections[403]).toEqual(resultWithLumpSumZero.projections[403]);

    //target month
    expect(resultWithLumpSum.projections[600]).toEqual(resultWithLumpSumZero.projections[600]);
    expect(resultWithLumpSum.projections[657]).toEqual(resultWithLumpSumZero.projections[657]);
    expect(resultWithLumpSum.projections[658]).toEqual(resultWithLumpSumZero.projections[658]);
    expect(resultWithLumpSum.projections[900]).toEqual(resultWithLumpSumZero.projections[900]);

  });

  it("when desired monthly amount is less than state pension when state pension is included the result should be same as desired monthly drawdown is zero", async () => {
    // Arrange
    const today = new Date("2021-07-13");
    const inboundPayload = {
      timeHorizon: 900,
      monthlyContributions: 624,
      portfolioCurrentValue: 250000,
      desiredMonthlyDrawdown: 0,
      drawdownStartDate: "2055-04-10",
      drawdownEndDate: "2076-04-10",
      upfrontContribution: 0,
      preGoalExpectedReturn: 0.043,
      preGoalExpectedVolatility: 0.1637,
      preGoalZScoreLowerBound: -1.350641417,
      preGoalZScoreUpperBound: 1.26511912,
      feesPercentage: 0.004,
      lumpSumAmount: 100000,
      lumpSumDate: "2055-04-10",
      statePensionAmount: 0,
      desiredAmount: 100000,
      postGoalExpectedReturn: 0.0298,
      postGoalExpectedVolatility: 0.0927,
      postGoalZScoreLowerBound: -1.297734628,
      postGoalZScoreUpperBound: 1.284789644,
      netContribution: 1000,
      isConeGraph: true,
      includeStatePension: false
    } as RequestPayload;

    // Action

    const result = getCurrentProjection(inboundPayload, today);

    const inboundPayloadWithStatePension = { ...inboundPayload, includeStatePension: true, desiredMonthlyDrawdown: 700, statePensionAmount: 12000 };

    const resultWithStatePension = getCurrentProjection(inboundPayloadWithStatePension, today);


    // // Assertion
    expect(result.projectedGoalAgeTotal).toEqual(resultWithStatePension.projectedGoalAgeTotal);
    expect(result.possibleDrawdown).toEqual(resultWithStatePension.possibleDrawdown - 1000);
    expect(result.onTrackPercentage).toEqual(resultWithStatePension.onTrackPercentage);
    expect(result.desiredOutflow).toEqual(resultWithStatePension.desiredOutflow);
    expect(result.affordableOutflow).toEqual(resultWithStatePension.affordableOutflow);
    expect(result.affordableDrawdown).toEqual(resultWithStatePension.affordableDrawdown);
    expect(result.affordableLumpSum).toEqual(resultWithStatePension.affordableLumpSum);
    expect(result.projections.length).toEqual(resultWithStatePension.projections.length);
    // //underperform
    expect(result.marketUnderperform.onTrackPercentage).toEqual(resultWithStatePension.marketUnderperform.onTrackPercentage);
    expect(result.marketUnderperform.desiredOutflow).toEqual(resultWithStatePension.marketUnderperform.desiredOutflow);
    expect(result.marketUnderperform.affordableOutflow).toEqual(resultWithStatePension.marketUnderperform.affordableOutflow);
    expect(result.marketUnderperform.affordableDrawdown).toEqual(resultWithStatePension.marketUnderperform.affordableDrawdown);
    expect(result.marketUnderperform.affordableLumpSum).toEqual(resultWithStatePension.marketUnderperform.affordableLumpSum);

    expect(result.projections[0]).toEqual(resultWithStatePension.projections[0]);

    expect(result.projections[1]).toEqual(resultWithStatePension.projections[1]);

    expect(result.projections[224]).toEqual(resultWithStatePension.projections[224]);

    expect(result.projections[225]).toEqual(resultWithStatePension.projections[225]);

    expect(result.projections[226]).toEqual(resultWithStatePension.projections[226]);

    //after drawdown start
    expect(result.projections[403]).toEqual(resultWithStatePension.projections[403]);

    //after target month
    expect(result.projections[600]).toEqual(resultWithStatePension.projections[600]);

    //end
    expect(result.projections[900]).toEqual(resultWithStatePension.projections[900]);


  });

  it("should return expected results when drawdown already started", async () => {
    // Arrange
    const today = new Date("2021-07-13");
    const pastDate = new Date(new Date().setDate(today.getDate() - 1)).toISOString().slice(0, 10);

    const inboundPayload = {
      timeHorizon: 900,
      monthlyContributions: 624,
      portfolioCurrentValue: 250000,
      desiredMonthlyDrawdown: 7500,
      drawdownStartDate: pastDate,
      drawdownEndDate: "2076-04-10",
      upfrontContribution: 0,
      preGoalExpectedReturn: 0.043,
      preGoalExpectedVolatility: 0.1637,
      preGoalZScoreLowerBound: -1.350641417,
      preGoalZScoreUpperBound: 1.26511912,
      feesPercentage: 0.004,
      lumpSumAmount: 100000,
      lumpSumDate: pastDate,
      statePensionAmount: 10000,
      desiredAmount: 100000,
      postGoalExpectedReturn: 0.0298,
      postGoalExpectedVolatility: 0.0927,
      postGoalZScoreLowerBound: -1.297734628,
      postGoalZScoreUpperBound: 1.284789644,
      netContribution: 1000,
      isConeGraph: true,
      includeStatePension: false
    } as RequestPayload;

    // Action

    const result = getCurrentProjection(inboundPayload, today);

    // Assertion
    expect(result.projectedGoalAgeTotal).toBeCloseTo(250000.00, 2);
    expect(result.possibleDrawdown).toBeCloseTo(635.27, 2);
    expect(result.onTrackPercentage).toEqual(0.093178391456604);
    expect(result.desiredOutflow).toEqual(5020000);
    expect(result.affordableOutflow).toBeCloseTo(467755.53, 2);
    expect(result.affordableDrawdown).toBeCloseTo(698.84, 2);
    expect(result.affordableLumpSum).toBeCloseTo(0);
    expect(result.projections.length).toBeCloseTo(901);
    //underperform
    expect(result.marketUnderperform.onTrackPercentage).toEqual(0.03659200668334961);
    expect(result.marketUnderperform.desiredOutflow).toBeCloseTo(5020000);
    expect(result.marketUnderperform.affordableOutflow).toBeCloseTo(183691.87, 2);
    expect(result.marketUnderperform.affordableDrawdown).toBeCloseTo(274.44, 2);
    expect(result.marketUnderperform.affordableLumpSum).toBeCloseTo(0, 2);

    expect(result.projections[0]).toEqual(
      {
        month: 0,
        contributionLine: 1000,
        lowerBound: 250000,
        projectedValue: 250000,
        upperBound: 250000
      } as ProjectionMonth);

    expect(result.projections[1]).toEqual(
      {
        month: 1,
        contributionLine: 301.16206407546997,
        lowerBound: 241173.28824305325,
        projectedValue: 249830.9239397488,
        upperBound: 258402.1991794191,
      } as ProjectionMonth);


    expect(result.projections[225]).toEqual({
      month: 225,
      contributionLine: -156238.53558301926,
      lowerBound: 8069.200342094473,
      projectedValue: 201287.94495424282,
      upperBound: 601076.8396010053,
    } as ProjectionMonth);

    expect(result.projections[226]).toEqual({
      month: 226,
      lowerBound: 7373.280363342688,
      projectedValue: 201015.3563815136,
      upperBound: 602393.1771085585,
      contributionLine: -156937.3735189438,
    } as ProjectionMonth);


    expect(result.projections[254]).toEqual({
      month: 254,
      lowerBound: 0,
      projectedValue: 193143.14145325872,
      upperBound: 639782.8246141374,
      contributionLine: -176504.83572483063,
    } as ProjectionMonth);


    //after drawdown start
    expect(result.projections[403]).toEqual(
      {
        month: 403,
        contributionLine: -280631.6881775856,
        lowerBound: 0,
        projectedValue: 142390.6504279485,
        upperBound: 863782.9411291315,
      } as ProjectionMonth);

    //target month
    expect(result.projections[600]).toEqual(
      {
        month: 600,
        contributionLine: -418302.761554718,
        lowerBound: 0,
        projectedValue: 45210.9387975561,
        upperBound: 1262448.2646806587,
      } as ProjectionMonth);


    expect(result.projections[900]).toEqual(
      {
        month: 900,
        upperBound: 2261123.1315051867,
        lowerBound: 0,
        contributionLine: -637271.9814777374,
        projectedValue: 0,
      } as ProjectionMonth);
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
    const includeStatePension = false;
    const statePensionAmount = 0;
    expect(
      calculateDrawdown(preGoalMonthlyNetExpectedReturn, goalContributingPeriod, portfolioCurrentValue, upfrontContribution, monthlyContributions, remainingAmount, lumpSumAmount, postGoalMonthlyNetExpectedReturn, goalDrawdownPeriod, includeStatePension, statePensionAmount))
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
    const includeStatePension = true;
    const statePensionAmount = 0;
    expect(
      calculateDrawdown(preGoalMonthlyNetExpectedReturn, goalContributingPeriod, portfolioCurrentValue, upfrontContribution, monthlyContributions, remainingAmount, lumpSumAmount, postGoalMonthlyNetExpectedReturn, goalDrawdownPeriod, includeStatePension, statePensionAmount))
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
    const includeStatePension = true;
    const statePensionAmount = 10000;
    expect(
      calculateDrawdown(preGoalMonthlyNetExpectedReturn, goalContributingPeriod, portfolioCurrentValue, upfrontContribution, monthlyContributions, remainingAmount, lumpSumAmount, postGoalMonthlyNetExpectedReturn, goalDrawdownPeriod, includeStatePension, statePensionAmount))
      .toEqual(
        {
          possibleDrawdown: 8077.144266977462,
          projectedGoalAgeTotal: 1419501.989856692,
          remainingAmountAtGoalAge: 0
        } as Drawdown);
  });



});

describe("tests for monthDiff function", () => {
  it("should return months difference for given dates", () => {
    expect(
      monthDiff(new Date("June 14, 2020"), new Date("June 14, 2021")))
      .toEqual(12);
  });

  it("should return months difference for given dates", () => {
    expect(
      monthDiff(new Date("June 15, 2020"), new Date("June 14, 2021")))
      .toEqual(11);
  });

  it("should return months difference for given dates", () => {
    expect(
      monthDiff(new Date("June 14,2021"), new Date("April 10,2055")))
      .toEqual(405);
  });
});

describe("tests for yearDiff function", () => {
  it("should return number of years difference for given dates", () => {
    expect(
      yearDiff(new Date("10/10/2010"), new Date("10/10/2021")))
      .toEqual(11);
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

describe("tests for calculateContributionLine function", () => {
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
      calculateContributionLine(month, previousMonthContributionLine, monthlyContributions, goalTargetMonth, affordableLumpSum, affordableRemainingAmount, affordableDrawdown, contributionPeriodUptoLumpSum, contributionPeriodFromLumpSumAndDrawdown))
      .toEqual(1624);
  });
});

describe("tests for calculateContributionLine function when lump sum is withdrawn", () => {
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
      calculateContributionLine(month, previousMonthContributionLine, monthlyContributions, goalTargetMonth, affordableLumpSum, affordableRemainingAmount, affordableDrawdown, contributionPeriodUptoLumpSum, contributionPeriodFromLumpSumAndDrawdown))
      .toEqual(58390.59);
  });
});
describe("tests for calculateContributionLine function when goal target period reached", () => {
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
      calculateContributionLine(month, previousMonthContributionLine, monthlyContributions, goalTargetMonth, affordableLumpSum, affordableRemainingAmount, affordableDrawdown, contributionPeriodUptoLumpSum, contributionPeriodFromLumpSumAndDrawdown))
      .toEqual(-1494252.0399999998);
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
    const includeStatePension = false;
    const statePension = 0;
    //act

    const result = calculateHoldingsWithOnTrackPercentage(timeHorizon, lumpSumAmount, desiredAmount, desiredMonthlyDrawdown, contributionPeriodUptoLumpSum, contributionPeriodFromLumpSumAndDrawdown, goalDrawdownPeriod, goalTargetMonth, monthlyContributions, portfolioCurrentValue, upfrontContribution, preGoalExpectedReturns, postGoalExpectedReturns, preGoalZScore, postGoalZScore, includeStatePension, statePension);

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
    const includeStatePension = true;
    const statePension = 10000;

    //act

    const result = calculateHoldingsWithOnTrackPercentage(timeHorizon, lumpSumAmount, desiredAmount, desiredMonthlyDrawdown, contributionPeriodUptoLumpSum, contributionPeriodFromLumpSumAndDrawdown, goalDrawdownPeriod, goalTargetMonth, monthlyContributions, portfolioCurrentValue, upfrontContribution, preGoalExpectedReturns, postGoalExpectedReturns, preGoalZScore, postGoalZScore, includeStatePension, statePension);

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
    const includeStatePension = false;
    const statePension = 0;
    // act 
    const result = () => {
      calculateHoldingsWithOnTrackPercentage(timeHorizon, lumpSumAmount, desiredAmount, desiredMonthlyDrawdown, contributionPeriodUptoLumpSum, contributionPeriodFromLumpSumAndDrawdown, goalDrawdownPeriod, goalTargetMonth, monthlyContributions, portfolioCurrentValue, upfrontContribution, preGoalExpectedReturns, postGoalExpectedReturns, preGoalZScore, postGoalZScore, includeStatePension, statePension);
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
    const includeStatePension = false;
    const statePension = 0;
    // act 
    const result = calculateHoldingsWithOnTrackPercentage(timeHorizon, lumpSumAmount, desiredAmount, desiredMonthlyDrawdown, contributionPeriodUptoLumpSum, contributionPeriodFromLumpSumAndDrawdown, goalDrawdownPeriod, goalTargetMonth, monthlyContributions, portfolioCurrentValue, upfrontContribution, preGoalExpectedReturns, postGoalExpectedReturns, preGoalZScore, postGoalZScore, includeStatePension, statePension);

    // assertion

    expect(result.onTrackPercentage).not.toBeNull();
    expect(result.onTrackPercentage).toEqual(8.798664093017578);

  });
});
function createRequestPayload(): RequestPayload {
  return {
    timeHorizon: 900,
    monthlyContributions: 624,
    portfolioCurrentValue: 250000,
    desiredMonthlyDrawdown: 700,
    drawdownStartDate: "2055-04-10",
    drawdownEndDate: "2076-04-10",
    upfrontContribution: 0,
    preGoalExpectedReturn: 0.043,
    preGoalExpectedVolatility: 0.1637,
    preGoalZScoreLowerBound: -1.350641417,
    preGoalZScoreUpperBound: 1.26511912,
    feesPercentage: 0.004,
    lumpSumAmount: 0.10,
    lumpSumDate: "2040-04-10",
    statePensionAmount: 0,
    desiredAmount: 0,
    postGoalExpectedReturn: 0.0298,
    postGoalExpectedVolatility: 0.0927,
    postGoalZScoreLowerBound: -1.297734628,
    postGoalZScoreUpperBound: 1.284789644,
    netContribution: 1000,
    isConeGraph: true,
    includeStatePension: true,
  };
}
