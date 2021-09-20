import { ValidatorFactory, ValidatorFactoryBaseProps } from "./types";
import isNumber from "../../is-number/is-number";

export interface IsNumberValidatorFactoryProps
  extends ValidatorFactoryBaseProps {
  min?: number;
  max?: number;
}

const isNumberValidatorFactory: ValidatorFactory<IsNumberValidatorFactoryProps> = ({
  code,
  min,
  max,
}) => (value, property) => {
  // Is number check

  if (!isNumber(value)) {
    return {
      property,
      code,
      message: `${property}_must_be_a_number`,
    };
  }

  // Is number within range check. If neither 'min' nor 'max' is provided, will
  // not do anything

  const errorTextParts: string[] = [];

  if (min !== undefined && (value as number) < min) {
    errorTextParts.push(`must_be_larger_than_${min}`);
  }

  if (max !== undefined && (value as number) > max) {
    errorTextParts.push(`must_be_smaller_than_${max}`);
  }

  if (errorTextParts.length > 0) {
    return {
      property,
      code,
      message: `${property}_${errorTextParts.join("_and_")}`,
    };
  }
};

export default isNumberValidatorFactory;
