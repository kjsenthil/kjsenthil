import { ValidationError } from "../types";

export type Validator = (
  value: unknown, // The value to be validated
  property: string // The key associated with the value, for error reporting purpose
) => undefined | ValidationError;
