import { ValidatorFactory } from "./types";

const mustExistValidatorFactory: ValidatorFactory = ({ code }) => (
  value,
  property
) => {
  if (value === undefined) {
    return {
      property,
      code,
      message: `${property}_must_exist`,
    };
  }
};

export default mustExistValidatorFactory;
