import isArrayValidatorFactory from "./is-array-validator-factory";
import { ValidationError } from "../../types";

type TestCase = [
  unknown, // The value to be checked by the validator function
  undefined | ValidationError // Expected results from running the validator function
];

const errorCode = "my-error-code";
const property = "my-property";

const minLength = 3;

const notArrayValidationError: ValidationError = {
  code: errorCode,
  property,
  message: `${property}_must_be_an_array`,
};

const arrayMinLengthValidationError: ValidationError = {
  code: errorCode,
  property,
  message: `${property}_must_have_length_of_at_least_${minLength}`,
};

describe("isArrayValidatorFactory", () => {
  describe("no min length", () => {
    const validatorFactory = isArrayValidatorFactory({
      code: errorCode,
    });

    const testCases: TestCase[] = [
      [[], undefined],
      [1, notArrayValidationError],
      ["a", notArrayValidationError],
      [undefined, notArrayValidationError],
      [null, notArrayValidationError],
      [true, notArrayValidationError],
      [{}, notArrayValidationError],
      [() => {}, notArrayValidationError],
    ];

    test.each(testCases)(
      "the created validator factory returns correct result when executing on %p",
      (value, expected) => {
        expect(validatorFactory(value, property)).toEqual(expected);
      }
    );
  });

  describe("min length check", () => {
    const validatorFactory = isArrayValidatorFactory({
      code: errorCode,
      minLength,
    });

    const testCases: TestCase[] = [
      [[1, 1, 1], undefined],
      [[1, 1], arrayMinLengthValidationError],
    ];

    test.each(testCases)(
      "the created validator factory returns correct result when executing on %p",
      (value, expected) => {
        expect(validatorFactory(value, property)).toEqual(expected);
      }
    );
  });
});
