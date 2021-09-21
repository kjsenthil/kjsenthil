import findRiskModel from "./index";
import { FindRiskModelProps } from "./types";
import { RiskModel } from "../types";
import assetModels from "../mock-data/asset-models.json";

type TestCase = [
  string, // This is the test case's description
  FindRiskModelProps, // This is the props to be provided to findRiskModel()
  ReturnType<typeof findRiskModel> // This is the expected results
];

const testCases: TestCase[] = [
  [
    "there are no risk models that can get to at least 100% on-track percentage",
    {
      assetModels,
      timeHorizon: 900,
      lumpSumAmount: 100_000,
      desiredAmount: 100_000,
      desiredMonthlyDrawdown: 7_500,
      contributionPeriodUptoLumpSum: 224,
      contributionPeriodFromLumpSumAndDrawdown: 180,
      goalDrawdownPeriod: 253,
      goalTargetMonth: 658,
      monthlyContributions: 624,
      portfolioCurrentValue: 250_000,
      upfrontContribution: 0,
      feesPercentage: 0.004,
      statePensionAmount: 0,
    },
    {
      maxOnTrackPercentage: 0.9328763484954834,
      maxOnTrackPercentageRiskModel: RiskModel.TAA7,
    },
  ],
  [
    "there is a risk model that can get to at least 100% on-track percentage",
    {
      assetModels,
      timeHorizon: 900,
      lumpSumAmount: 100_000,
      desiredAmount: 100_000,
      desiredMonthlyDrawdown: 3_000,
      contributionPeriodUptoLumpSum: 224,
      contributionPeriodFromLumpSumAndDrawdown: 180,
      goalDrawdownPeriod: 253,
      goalTargetMonth: 658,
      monthlyContributions: 624,
      portfolioCurrentValue: 250_000,
      upfrontContribution: 0,
      feesPercentage: 0.004,
      statePensionAmount: 0,
    },
    {
      maxOnTrackPercentage: 1.146397590637207,
      maxOnTrackPercentageRiskModel: RiskModel.TAA2,
    },
  ],
];

describe("findRiskModel", () => {
  test.each(testCases)(
    "it returns expected results when %s",
    (_, findRiskModelProps, expectedResults) => {
      const {
        maxOnTrackPercentage,
        maxOnTrackPercentageRiskModel,
      } = findRiskModel(findRiskModelProps);

      expect(maxOnTrackPercentage).toBe(expectedResults.maxOnTrackPercentage);
      expect(maxOnTrackPercentageRiskModel).toBe(
        expectedResults.maxOnTrackPercentageRiskModel
      );
    }
  );
});
