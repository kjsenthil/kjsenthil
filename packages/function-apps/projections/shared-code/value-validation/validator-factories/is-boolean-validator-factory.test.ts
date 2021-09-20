import { ValidationError } from "../../types";
import isBooleanValidatorFactory from "./is-boolean-validator-factory";

type TestCase = [
  unknown, // The value to be checked by the validator function
  undefined | ValidationError // Expected results from running the validator function
];

const errorCode = "my-error-code";
const property = "my-property";

const notBooleanValidationError: ValidationError = {
  code: errorCode,
  property,
  message: `${property}_must_be_a_boolean`,
};

describe("isBooleanValidatorFactory", () => {
  const validatorFactory = isBooleanValidatorFactory({
    code: errorCode,
  });

  const testCases: TestCase[] = [
    [true, undefined],
    [false, undefined],
    ["a", notBooleanValidationError],
    [undefined, notBooleanValidationError],
    [null, notBooleanValidationError],
    [[], notBooleanValidationError],
    [{}, notBooleanValidationError],
    [() => {}, notBooleanValidationError],
  ];

  test.each(testCases)(
    "the created validator factory returns correct result when executing on %p",
    (value, expected) => {
      expect(validatorFactory(value, property)).toEqual(expected);
    }
  );
});
