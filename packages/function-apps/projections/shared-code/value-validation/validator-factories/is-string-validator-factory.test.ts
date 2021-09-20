import { ValidationError } from "../../types";
import isStringValidatorFactory from "./is-string-validator-factory";

type TestCase = [
  unknown, // The value to be checked by the validator function
  undefined | ValidationError // Expected results from running the validator function
];

const errorCode = "my-error-code";
const property = "my-property";

const validStrings = ["a", "b", "c"];

const notStringValidationError: ValidationError = {
  code: errorCode,
  property,
  message: `${property}_must_be_a_string`,
};

const notValidStringValidationError: ValidationError = {
  code: errorCode,
  property,
  message: `${property}_must_be_a_valid_string`,
};

const notValidStringVerboseValidationError: ValidationError = {
  code: errorCode,
  property,
  message: `${property}_must_be_a_valid_string_in_this_set_a,_b,_c`,
};

describe("isStringValidatorFactory", () => {
  describe("without a list of valid strings", () => {
    const validatorFactory = isStringValidatorFactory({
      code: errorCode,
    });

    const testCases: TestCase[] = [
      ["a", undefined],
      ["1", undefined],
      [{}, notStringValidationError],
      [1, notStringValidationError],
      [true, notStringValidationError],
      [false, notStringValidationError],
      [undefined, notStringValidationError],
      [null, notStringValidationError],
      [[], notStringValidationError],
      [() => {}, notStringValidationError],
    ];

    test.each(testCases)(
      "the created validator factory returns correct result when executing on %p",
      (value, expected) => {
        expect(validatorFactory(value, property)).toEqual(expected);
      }
    );
  });

  describe("With a list of valid strings", () => {
    const validatorFactory = isStringValidatorFactory({
      code: errorCode,
      validStrings,
    });

    const testCases: TestCase[] = [
      ["a", undefined],
      ["1", notValidStringValidationError],
    ];

    test.each(testCases)(
      "the created validator factory returns correct result when executing on %p",
      (value, expected) => {
        expect(validatorFactory(value, property)).toEqual(expected);
      }
    );
  });

  describe("With a list of valid strings (verbose error message)", () => {
    const validatorFactory = isStringValidatorFactory({
      code: errorCode,
      validStrings,
      verboseErrorMessage: true,
    });

    const testCases: TestCase[] = [
      ["a", undefined],
      ["1", notValidStringVerboseValidationError],
    ];

    test.each(testCases)(
      "the created validator factory returns correct result when executing on %p",
      (value, expected) => {
        expect(validatorFactory(value, property)).toEqual(expected);
      }
    );
  });
});
