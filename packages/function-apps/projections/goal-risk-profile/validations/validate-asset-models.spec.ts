import validateAssetModels, {
  ValidateAssetModelsProps,
} from "./validate-asset-models";
import { ValidationError } from "../../shared-code/types";
import { RiskModel } from "../types";

type TestCase = [
  string, // Test description
  ValidateAssetModelsProps, // Props to be provided to the function
  ValidationError[] // Expected results
];

const BASE_ERROR_CODE = "error-code";

const testCases: TestCase[] = [
  [
    "all asset models match our expectations",
    {
      assetModels: [
        {
          id: 1,
          riskModel: RiskModel.TAA1,
          erValue: 0.022,
          volatility: 0.0575,
          zScores: {
            MoreLikelyLB: -0.053855486492308,
            MoreLikelyUB: 0.096334740881002,
            LessLikelyLB: -0.082922932045877,
            LessLikelyUB: 0.11695998920423,
          },
        },
      ],
      errors: [],
      baseErrorCode: BASE_ERROR_CODE,
    },
    [],
  ],
  [
    "some asset models don't match our expectations",
    {
      assetModels: [
        {
          id: 1,
          riskModel: RiskModel.TAA1,
          erValue: 0.022,
          volatility: 0.0575,
          zScores: {
            MoreLikelyLB: -0.053855486492308,
            MoreLikelyUB: 0.096334740881002,
            LessLikelyLB: -0.082922932045877,
            LessLikelyUB: 0.11695998920423,
          },
        },
        {
          id: 1,
          volatility: 0.0575,
          zScores: {
            MoreLikelyLB: -0.053855486492308,
            MoreLikelyUB: 0.096334740881002,
            LessLikelyLB: -0.082922932045877,
            LessLikelyUB: 0.11695998920423,
          },

          // @ts-ignore - Intentionally creating an invalid asset model
          riskModel: "random-string",
          // @ts-ignore - Intentionally creating an invalid asset model
          erValue: "random-string",
        },
      ],
      errors: [],
      baseErrorCode: BASE_ERROR_CODE,
    },
    [
      {
        code: "error-code-004",
        message:
          "assetModel[1].riskModel_must_be_a_valid_string_in_this_set_TAA1,_TAA2,_TAA3,_TAA4,_TAA5,_TAA6,_TAA7",
        property: "assetModel[1].riskModel",
      },
      {
        code: "error-code-006",
        message: "assetModel[1].erValue_must_be_a_number",
        property: "assetModel[1].erValue",
      },
    ],
  ],
  [
    "the asset models array is empty",
    {
      assetModels: [],
      errors: [],
      baseErrorCode: BASE_ERROR_CODE,
    },
    [
      {
        code: "error-code-002",
        message: "assetModels_must_have_length_of_at_least_1",
        property: "assetModels",
      },
    ],
  ],
  [
    "the asset models array is undefined",
    {
      assetModels: undefined,
      errors: [],
      baseErrorCode: BASE_ERROR_CODE,
    },
    [
      {
        code: "error-code-001",
        message: "assetModels_must_exist",
        property: "assetModels",
      },
      {
        code: "error-code-002",
        message: "assetModels_must_be_an_array",
        property: "assetModels",
      },
    ],
  ],
];

describe("validateAssetModels", () => {
  test.each(testCases)(
    "returns the expected validation errors when %s",
    (_, props, expectedErrors) => {
      expect(validateAssetModels(props)).toEqual(expectedErrors);
    }
  );
});
