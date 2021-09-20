import { ValidationError } from "../../types";
import isNumberValidatorFactory from "./is-number-validator-factory";

type TestCase = [
  unknown, // The value to be checked by the validator function
  undefined | ValidationError // Expected results from running the validator function
];

const errorCode = "my-error-code";
const property = "my-property";

const min = 0;
const max = 100;

const notNumberValidationError: ValidationError = {
  code: errorCode,
  property,
  message: `${property}_must_be_a_number`,
};

const numberLowerThanMinValidationError: ValidationError = {
  code: errorCode,
  property,
  message: `${property}_must_be_larger_than_${min}`,
};

const numberLargerThanMaxValidationError: ValidationError = {
  code: errorCode,
  property,
  message: `${property}_must_be_smaller_than_${max}`,
};

describe("isNumberValidatorFactory", () => {
  describe("no min max", () => {
    const validatorFactory = isNumberValidatorFactory({
      code: errorCode,
    });

    const testCases: TestCase[] = [
      [1, undefined],
      [Infinity, undefined],
      [NaN, notNumberValidationError],
      ["a", notNumberValidationError],
      ["1", notNumberValidationError],
      [true, notNumberValidationError],
      [false, notNumberValidationError],
      [undefined, notNumberValidationError],
      [null, notNumberValidationError],
      [[], notNumberValidationError],
      [{}, notNumberValidationError],
      [() => {}, notNumberValidationError],
    ];

    test.each(testCases)(
      "the created validator factory returns correct result when executing on %p",
      (value, expected) => {
        expect(validatorFactory(value, property)).toEqual(expected);
      }
    );
  });

  describe("with min max", () => {
    const validatorFactory = isNumberValidatorFactory({
      code: errorCode,
      min,
      max,
    });

    const testCases: TestCase[] = [
      [0, undefined],
      [100, undefined],
      [-1, numberLowerThanMinValidationError],
      [101, numberLargerThanMaxValidationError],
    ];

    test.each(testCases)(
      "the created validator factory returns correct result when executing on %p",
      (value, expected) => {
        expect(validatorFactory(value, property)).toEqual(expected);
      }
    );
  });
});
