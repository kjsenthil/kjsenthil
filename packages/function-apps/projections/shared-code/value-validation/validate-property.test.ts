import validateProperty, { ValidatePropertyProps } from "./validate-property";
import {
  isStringValidatorFactory,
  mustExistValidatorFactory,
} from "./validator-factories";
import { ValidationError } from "../types";

type TestCase = [ValidatePropertyProps, ValidationError[]];

const property = "my-property";
const code = "my-error-code";

const validators = [
  mustExistValidatorFactory({ code }),
  isStringValidatorFactory({ code }),
];

const testCases: TestCase[] = [
  // Test case #0
  [
    {
      property,
      value: "my-value",
      validators,
      errors: [],
    },
    [],
  ],

  // Test case #1
  [
    {
      property,
      value: undefined,
      validators,
      errors: [],
      optional: true,
    },
    [],
  ],

  // Test case #2
  [
    {
      property,
      value: null,
      validators,
      errors: [],
      nullable: true,
    },
    [],
  ],

  // Test case #3
  [
    {
      property,
      value: 1,
      validators,
      errors: [],
    },
    [
      {
        code: "my-error-code",
        message: "my-property_must_be_a_string",
        property: "my-property",
      },
    ],
  ],

  // Test case #4
  [
    {
      property,
      value: undefined,
      validators,
      errors: [],
    },
    [
      {
        code: "my-error-code",
        message: "my-property_must_exist",
        property: "my-property",
      },
      {
        code: "my-error-code",
        message: "my-property_must_be_a_string",
        property: "my-property",
      },
    ],
  ],

  // Test case #5
  [
    {
      property,
      value: undefined,
      validators,
      errors: [],
      returnAfterOneError: true,
    },
    [
      {
        code: "my-error-code",
        message: "my-property_must_exist",
        property: "my-property",
      },
    ],
  ],
];

describe("validateProperty", () => {
  test.each(testCases)(
    "it works as expected for test case %#",
    (props, expected) => {
      expect(validateProperty(props)).toEqual(expected);
    }
  );
});
