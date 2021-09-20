import { ValidatorFactory } from "./types";

const isBooleanValidatorFactory: ValidatorFactory = ({ code }) => (
  value,
  property
) => {
  if (typeof value !== "boolean") {
    return {
      property,
      code,
      message: `${property}_must_be_a_boolean`,
    };
  }
};

export default isBooleanValidatorFactory;
