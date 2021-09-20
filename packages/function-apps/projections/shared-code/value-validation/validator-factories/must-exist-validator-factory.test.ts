import { ValidationError } from "../../types";
import mustExistValidatorFactory from "./must-exist-validator-factory";

type TestCase = [
  unknown, // The value to be checked by the validator function
  undefined | ValidationError // Expected results from running the validator function
];

const errorCode = "my-error-code";
const property = "my-property";

const mustExistValidationError: ValidationError = {
  code: errorCode,
  property,
  message: `${property}_must_exist`,
};

describe("mustExistValidatorFactory", () => {
  const validatorFactory = mustExistValidatorFactory({
    code: errorCode,
  });

  const testCases: TestCase[] = [
    [{}, undefined],
    [1, undefined],
    ["a", undefined],
    ["1", undefined],
    [true, undefined],
    [false, undefined],
    [null, undefined],
    [[], undefined],
    [() => {}, undefined],
    [undefined, mustExistValidationError],
  ];

  test.each(testCases)(
    "the created validator factory returns correct result when executing on %p",
    (value, expected) => {
      expect(validatorFactory(value, property)).toEqual(expected);
    }
  );
});
