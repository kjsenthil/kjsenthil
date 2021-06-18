import { ProjectionMonth, RequestPayload, ValidationError } from "./types";
import { validateInput, currentProjectionMain, getCurrentProjection, monthDiff, yearDiff, calculateZscore, calculatePercentage, calculateProjectionValue, calculateContributionLine, calculateExpectedreturn } from "./index";
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
            "code": "val-currentproj-001",
            "property": "timeHorizon",
            "message": "timeHorizon_must_be_more_than_zero"
          },
          {
            "code": "val-currentproj-002",
            "property": "preGoalRiskModel",
            "message": "preGoalRiskModel_must_not_be_empty"
          },
          {
            "code": "val-currentproj-003",
            "property": "monthlyContributions",
            "message": "monthlyContributions_must_be_a_positive_number_or_zero"
          },
          {
            "code": "val-currentproj-004",
            "property": "portfolioCurrentValue",
            "message": "portfolioCurrentValue_must_be_a_positive_number_or_zero"
          },
          {
            "code": "val-currentproj-005",
            "property": "desiredMonthlyDrawdown",
            "message": "desiredMonthlyDrawdown_must_be_a_positive_number_or_zero"
          },
          {
            "code": "val-currentproj-006",
            "property": "drawdownStartDate",
            "message": "drawdownStartDate_must_be_a_valid_date"
          },
          {
            "code": "val-currentproj-007",
            "property": "drawdownEndDate",
            "message": "drawdownEndDate_must_be_a_valid_date"
          },
          {
            "code": "val-currentproj-009",
            "property": "upfrontContribution",
            "message": "upfrontContribution_must_be_a_positive_number_or_zero"
          },
          {
            "code": "val-currentproj-011",
            "property": "preGoalExpectedReturn",
            "message": "preGoalExpectedReturn_must_be_a_valid_number"
          },
          {
            "code": "val-currentproj-012",
            "property": "preGoalExpectedVolatility",
            "message": "preGoalExpectedVolatility_must_be_a_valid_number"
          },
          {
            "code": "val-currentproj-013",
            "property": "preGoalZScoreLowerBound",
            "message": "preGoalZScoreLowerBound_must_be_a_valid_number"
          },
          {
            "code": "val-currentproj-014",
            "property": "preGoalZScoreUpperBound",
            "message": "preGoalZScoreUpperBound_must_be_a_valid_number"
          },
          {
            "code": "val-currentproj-015",
            "property": "feesPercentage",
            "message": "feesPercentage_must_be_a_positive_number_or_zero"
          },
          {
            "code": "val-currentproj-016",
            "property": "postGoalRiskModel",
            "message": "postGoalRiskModel_must_not_be_empty"
          },
          {
            "code": "val-currentproj-017",
            "property": "postGoalExpectedReturn",
            "message": "postGoalExpectedReturn_must_be_a_valid_number"
          },
          {
            "code": "val-currentproj-018",
            "property": "postGoalExpectedVolatility",
            "message": "postGoalExpectedVolatility_must_be_a_valid_number"
          },
          {
            "code": "val-currentproj-019",
            "property": "postGoalZScoreLowerBound",
            "message": "postGoalZScoreLowerBound_must_be_a_valid_number"
          },
          {
            "code": "val-currentproj-020",
            "property": "postGoalZScoreUpperBound",
            "message": "postGoalZScoreUpperBound_must_be_a_valid_number"
          },
          {
            "code": "val-currentproj-021",
            "property": "lumpSumAmount",
            "message": "lumpSumAmount_must_be_a_positive_number_or_zero"
          },
          {
            "code": "val-currentproj-022",
            "property": "statePensionAmount",
            "message": "statePensionAmount_must_be_a_positive_number_or_zero"
          },
          {
            "code": "val-currentproj-023",
            "property": "desiredAmount",
            "message": "desiredAmount_must_be_a_positive_number_or_zero"
          },
          {
            "code": "val-currentproj-024",
            "property": "netContribution",
            "message": "netContribution_must_be_a_positive_number_or_zero"
          },
          {
            "code": "val-currentproj-025",
            "property": "isConeGraph",
            "message": "isConeGraph_must_be_a_valid_boolean_value"
          },
          {
            "code": "val-currentproj-026",
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
            "code": "val-currentproj-008",
            "property": "drawdownEndDate",
            "message": "drawdownEndDate_must_be_later_than_start_date"
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
    const inbountPayload = {
      timeHorizon: 900,
      preGoalRiskModel: "TAA1",
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
      postGoalRiskModel: "TAA3",
      lumpSumAmount: 0.10,
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
      body: inbountPayload,
    };

    // Action
    await currentProjectionMain(context, request);

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
    await currentProjectionMain(context, request);

    // Assertion
    expect(context.res.status).toEqual(400);
  });

});

describe("Tests for getCurrentProjection Function", () => {
  let context: Context;

  beforeEach(() => {
    context = ({ log: jest.fn() } as unknown) as Context;
  });

  it("should return a 200 response when payload is valid", async () => {
    // Arrange
    const inbountPayload = {
      timeHorizon: 900,
      preGoalRiskModel: "TAA1",
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
      postGoalRiskModel: "TAA3",
      lumpSumAmount: 0.10,
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

    // Action
    const result = getCurrentProjection(inbountPayload, new Date("June 10,2021"));

    // Assertion
    //first row
    expect(result.projectedGoalAgeTotal).toEqual(1424658.9051612173);
    expect(result.possibleDrawdown).toEqual(7270.127009539294);
    expect(result.possibleDrawdownWithSP).toEqual(7270.127009539294);
    expect(result.projectedGoalAgeTotalWhenMarketUnderperform).toEqual(987349.9562431246);
    expect(result.possibleDrawdownWhenMarketUnderperform).toEqual(4552.9466918780145);
    expect(result.possibleDrawdownWhenMarketUnderperformWithSP).toEqual(4552.9466918780145);

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
        contributionLine: 1624,
        lowerBound: 235465.81038991973,
        month: 1,
        projectedValue: 251422.32845197053,
        upperBound: 266368.48354157555
      } as ProjectionMonth);

    //when drawdown start
    expect(result.projections[405]).toEqual({
      contributionLine: 245825.7729904607,
      lowerBound: 977695.5965752011,
      month: 405,
      projectedValue: 1416741.4620353822,
      upperBound: 1818320.0762484258
    } as ProjectionMonth);

    expect(result.projections.length).toEqual(901);

    expect(result.projections[806]).toEqual(
      {
        month: 806,
        upperBound: 0,
        lowerBound: 0,
        contributionLine: 0,
        projectedValue: 0,
      } as ProjectionMonth);

    expect(result.projections[898]).toEqual(
      {
        month: 898,
        upperBound: 0,
        lowerBound: 0,
        contributionLine: 0,
        projectedValue: 0
      } as ProjectionMonth);

    expect(result.projections[900]).toEqual(
      {
        month: 900,
        upperBound: 0,
        lowerBound: 0,
        contributionLine: 0,
        projectedValue: 0,
      } as ProjectionMonth);
  });

})

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
  it("should return valid projection", () => {
    expect(
      calculateProjectionValue(10, 120, 100000, 20000, 0.101296240386098, 500, 0.101296240386098, -0.065337942794282, 200,))
      .toEqual(3207.458658451081);
  });
});

describe("tests for calculateContributionLine function", () => {
  it("should return valid projection", () => {
    expect(
      calculateContributionLine(2500, 1, 120, 20000, 1000, 600))
      .toEqual(3100);
  });
});

describe("tests for calculateExpectedreturn function", () => {
  it("should return valid projection", () => {
    expect(
      calculateExpectedreturn(2500, 0.04, 0.012))
      .toEqual({ "monthlyNetExpectedReturn": 0.9194445131184874, "monthlyVolatility": 0.0034641016151377548 });
  });
});



function createRequestPayload(): RequestPayload {
  return {
    timeHorizon: 900,
    preGoalRiskModel: "TAA1",
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
    postGoalRiskModel: "TAA3",
    lumpSumAmount: 0.10,
    statePensionAmount: 0,
    desiredAmount: 0,
    postGoalExpectedReturn: 0.0298,
    postGoalExpectedVolatility: 0.0927,
    postGoalZScoreLowerBound: -1.297734628,
    postGoalZScoreUpperBound: 1.284789644,
    netContribution: 1000,
    isConeGraph: true,
    includeStatePension: true
  };
}
