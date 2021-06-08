import * as React from 'react';
import StyledTextField from '../TextField.styles';
import { FormattedTextFieldRequiredProps } from './types';
import { TextFieldProps } from '../types';

export type FormattedTextFieldUncontrolledProps = Omit<TextFieldProps, 'value'> &
  FormattedTextFieldRequiredProps;

const FormattedTextFieldUncontrolled = ({
  hasError,
  formatter,
  onChange,
  onFocus,
  ...props
}: FormattedTextFieldUncontrolledProps) => {
  const inputRef = React.useRef<HTMLInputElement | undefined>();
  const inputRefPrevValue = React.useRef<string | undefined>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (inputRef.current) {
      inputRef.current.value = formatter(e.target.value, inputRefPrevValue.current);
      inputRefPrevValue.current = inputRef.current.value;
    }

    if (onChange) {
      onChange(e);
    }
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    const element = inputRef.current;

    if (element) {
      inputRefPrevValue.current = element.value;
    }

    if (onFocus) {
      onFocus(e);
    }
  };

  return (
    <StyledTextField
      {...props}
      hasError={!!hasError}
      inputRef={inputRef}
      onChange={handleChange}
      onFocus={handleFocus}
    />
  );
};

export default FormattedTextFieldUncontrolled;
