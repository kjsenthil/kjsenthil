import { ValidationError } from "../types";
import { Validator } from "./types";

export interface ValidatePropertyProps {
  property: string;
  value: unknown;
  validators: Validator[];
  errors: ValidationError[];

  // If true, will stop going through other validator functions (if there are
  // any) if an error has been found
  returnAfterOneError?: boolean;

  // If true, will skip all validations when the value is undefined
  optional?: boolean;

  // If true, will skip all validations when the value is null
  nullable?: boolean;
}

export default function validateProperty({
  property,
  value,
  validators,
  errors,
  returnAfterOneError,
  optional,
  nullable,
}: ValidatePropertyProps): ValidationError[] {
  if (optional && value === undefined) {
    return errors;
  }

  if (nullable && value === null) {
    return errors;
  }

  for (const validator of validators) {
    const error = validator(value, property);

    if (error) {
      errors.push(error);

      if (returnAfterOneError) {
        // Break out of the for...of loop and end the function
        return errors;
      }
    }
  }

  return errors;
}
