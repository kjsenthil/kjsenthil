import { ValidationError } from "../../types";
import isDateStringValidatorFactory from "./is-date-string-validator-factory";

type TestCase = [
  unknown, // The value to be checked by the validator function
  undefined | ValidationError // Expected results from running the validator function
];

const errorCode = "my-error-code";
const property = "my-property";

const notStringValidationError: ValidationError = {
  code: errorCode,
  property,
  message: `${property}_must_be_a_string`,
};

const notDateStringValidationError: ValidationError = {
  code: errorCode,
  property,
  message: `${property}_must_be_a_valid_date_string`,
};

describe("isDateStringValidatorFactory", () => {
  const validatorFactory = isDateStringValidatorFactory({
    code: errorCode,
  });

  const testCases: TestCase[] = [
    // Not string errors
    [true, notStringValidationError],
    [false, notStringValidationError],
    [undefined, notStringValidationError],
    [null, notStringValidationError],
    [[], notStringValidationError],
    [{}, notStringValidationError],
    [() => {}, notStringValidationError],

    // Not date string errors
    ["a", notDateStringValidationError],

    // Valid date strings
    ["01/01/2020", undefined],
    ["2020-01-01", undefined],
    ["2020-12-31", undefined],
    ["2021-09-20T08:31:15+00:00", undefined],
    ["2021-09-20T08:31:15Z", undefined],
  ];

  test.each(testCases)(
    "the created validator factory returns correct result when executing on %p",
    (value, expected) => {
      expect(validatorFactory(value, property)).toEqual(expected);
    }
  );
});
