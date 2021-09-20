import { ValidatorFactory } from "./types";

const isDateStringValidatorFactory: ValidatorFactory = ({ code }) => (
  value,
  property
) => {
  if (typeof value !== "string") {
    return {
      property,
      code,
      message: `${property}_must_be_a_string`,
    };
  }

  if (Number.isNaN(Date.parse(value))) {
    return {
      property,
      code,
      message: `${property}_must_be_a_valid_date_string`,
    };
  }
};

export default isDateStringValidatorFactory;
