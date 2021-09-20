import { ValidatorFactory, ValidatorFactoryBaseProps } from "./types";

export interface IsStringValidatorFactoryProps
  extends ValidatorFactoryBaseProps {
  validStrings?: string[];

  // If true, will also say in the error message which strings are valid
  verboseErrorMessage?: boolean;
}

const isStringValidatorFactory: ValidatorFactory<IsStringValidatorFactoryProps> = ({
  code,
  validStrings,
  verboseErrorMessage,
}) => (value, property) => {
  if (typeof value !== "string") {
    return {
      property,
      code,
      message: `${property}_must_be_a_string`,
    };
  }

  if (validStrings && !validStrings.includes(value as string)) {
    const verboseText = verboseErrorMessage
      ? `_in_this_set_${validStrings.join(",_")}`
      : "";

    return {
      property,
      code,
      message: `${property}_must_be_a_valid_string${verboseText}`,
    };
  }
};

export default isStringValidatorFactory;
