import { ValidationError } from "../../types";
import isObjectValidatorFactory from "./is-object-validator-factory";

type TestCase = [
  unknown, // The value to be checked by the validator function
  undefined | ValidationError // Expected results from running the validator function
];

const errorCode = "my-error-code";
const property = "my-property";

const notObjectValidationError: ValidationError = {
  code: errorCode,
  property,
  message: `${property}_must_be_an_object`,
};

describe("isObjectValidatorFactory", () => {
  const validatorFactory = isObjectValidatorFactory({
    code: errorCode,
  });

  const testCases: TestCase[] = [
    [{}, undefined],
    [1, notObjectValidationError],
    ["a", notObjectValidationError],
    ["1", notObjectValidationError],
    [true, notObjectValidationError],
    [false, notObjectValidationError],
    [undefined, notObjectValidationError],
    [null, notObjectValidationError],
    [[], notObjectValidationError],
    [() => {}, notObjectValidationError],
  ];

  test.each(testCases)(
    "the created validator factory returns correct result when executing on %p",
    (value, expected) => {
      expect(validatorFactory(value, property)).toEqual(expected);
    }
  );
});
