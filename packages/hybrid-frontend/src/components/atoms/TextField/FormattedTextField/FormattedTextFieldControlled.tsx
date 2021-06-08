/**
 * To use the controlled version of the FormattedTextField, a value and a
 * function to update this value must be provided.
 *
 * If you'd prefer to just pass native props like 'value' and 'onChange', then
 * it might be best to perform the formatting in the parent component.
 */

import * as React from 'react';
import StyledTextField from '../TextField.styles';
import {
  FormattedTextFieldControlledRequiredProps,
  FormattedTextFieldRequiredProps,
} from './types';
import { TextFieldProps } from '../types';

export type FormattedTextFieldControlledProps = TextFieldProps &
  FormattedTextFieldRequiredProps &
  FormattedTextFieldControlledRequiredProps;

const FormattedTextFieldControlled = ({
  hasError,
  formatter,
  value,
  setValue,
  onChange,
  ...props
}: FormattedTextFieldControlledProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const unformattedValue = e.target.value;
    const formattedValue = formatter(unformattedValue, value);

    setValue(formattedValue);

    if (onChange) {
      onChange();
    }
  };

  return <StyledTextField {...props} hasError={!!hasError} value={value} onChange={handleChange} />;
};

export default FormattedTextFieldControlled;
