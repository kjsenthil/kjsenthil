import { RequestPayload } from "../types";
import prepareInputValuesDrawdownRetirement from "./prepare-input-values-drawdown-retirement";

describe("prepareInputValuesDrawdownRetirement", () => {
  it("mutates the inbound payload object as expected", () => {
    const inboundPayload: RequestPayload = {
      assetModels: [],
      timeHorizonToProject: 10,
      monthlyContribution: 100,
      currentNetContribution: 100,
      currentPortfolioValue: 100,
      includeGoal: true,
    };

    expect(prepareInputValuesDrawdownRetirement(inboundPayload)).toEqual({
      assetModels: [],
      contributionPeriodFromLumpSumAndDrawdown: 0,
      contributionPeriodUptoLumpSum: -1,
      desiredAmount: 0,
      desiredMonthlyDrawdown: 0,
      feesPercentage: 0,
      goalDrawdownPeriod: 0,
      goalTargetMonth: 1,
      lumpSumAmount: 0,
      monthlyContributions: 100,
      portfolioCurrentValue: 100,
      statePensionAmount: 0,
      timeHorizon: 10,
      upfrontContribution: 0,
    });
  });
});
