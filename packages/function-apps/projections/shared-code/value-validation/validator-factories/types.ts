import { Validator } from "../types";

export interface ValidatorFactoryBaseProps {
  code: string;
}

export type ValidatorFactory<
  P extends ValidatorFactoryBaseProps = ValidatorFactoryBaseProps
> = (props: P) => Validator;
