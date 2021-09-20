import { ValidationError } from "../../shared-code/types";
import validateInboundPayload, {
  ValidateInboundPayloadProps,
} from "./validate-inbound-payload";
import validInboundPayload from "../mock-data/inbound-payload.json";

type TestCase = [
  string, // Test description
  ValidateInboundPayloadProps, // Props to be provided to the function
  ValidationError[] // Expected results
];

const testCases: TestCase[] = [
  [
    "the inbound payload matches our expectations",
    {
      inboundPayload: validInboundPayload,
      errors: [],
    },
    [],
  ],
  [
    "the inbound payload has a few errors",
    {
      inboundPayload: {
        ...validInboundPayload,

        // Overwrite the valid inbound payload object to create an invalid
        // object
        currentNetContribution: -1,
        includeGoal: "this-should-have-been-a-boolean",
        drawdownRetirement: {
          startDate: "2020-01-01",
          regularDrawdown: -1,
          lumpSum: {
            amount: "this-should-have-been-a-number",
            date: "invalid-date-string",
          },
        },
      },
      errors: [],
    },
    [
      {
        code: "val-goalriskprofile-141",
        message: "currentNetContribution_must_be_larger_than_0",
        property: "currentNetContribution",
      },
      {
        code: "val-goalriskprofile-161",
        message: "includeGoal_must_be_a_boolean",
        property: "includeGoal",
      },
      {
        code: "val-goalriskprofile-202",
        message: "drawdownRetirement.lumpSum_must_be_a_number",
        property: "drawdownRetirement.lumpSum",
      },
      {
        code: "val-goalriskprofile-204",
        message: "drawdownRetirement.regularDrawdown_must_be_larger_than_0",
        property: "drawdownRetirement.regularDrawdown",
      },
      {
        code: "val-goalriskprofile-205",
        message: "drawdownRetirement.endDate_must_exist",
        property: "drawdownRetirement.endDate",
      },
      {
        code: "val-goalriskprofile-206",
        message: "drawdownRetirement.endDate_must_be_a_string",
        property: "drawdownRetirement.endDate",
      },
      {
        code: "val-goalriskprofile-211",
        message: "drawdownRetirement.lumpSum.amount_must_be_a_number",
        property: "drawdownRetirement.lumpSum.amount",
      },
      {
        code: "val-goalriskprofile-212",
        message: "drawdownRetirement.lumpSum.date_must_be_a_valid_date_string",
        property: "drawdownRetirement.lumpSum.date",
      },
    ],
  ],
];

describe("validateInboundPayload", () => {
  test.each(testCases)(
    "it returns the expected error array when %s",
    (_, props, expectedErrors) => {
      expect(validateInboundPayload(props)).toEqual(expectedErrors);
    }
  );
});
