import { ValidatorFactory, ValidatorFactoryBaseProps } from "./types";

export interface IsArrayValidatorFactoryProps
  extends ValidatorFactoryBaseProps {
  minLength?: number;
}

const isArrayValidatorFactory: ValidatorFactory<IsArrayValidatorFactoryProps> = ({
  code,
  minLength,
}) => (value, property) => {
  if (!Array.isArray(value)) {
    return {
      property,
      code,
      message: `${property}_must_be_an_array`,
    };
  }

  if (minLength !== undefined && value.length < minLength) {
    return {
      property,
      code,
      message: `${property}_must_have_length_of_at_least_${minLength}`,
    };
  }
};

export default isArrayValidatorFactory;
