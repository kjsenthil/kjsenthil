import { ValidatorFactory } from "./types";
import isObject from "../../is-object/is-object";

const isObjectValidatorFactory: ValidatorFactory = ({ code }) => (
  value,
  property
) => {
  if (!isObject(value)) {
    return {
      property,
      code,
      message: `${property}_must_be_an_object`,
    };
  }
};

export default isObjectValidatorFactory;
