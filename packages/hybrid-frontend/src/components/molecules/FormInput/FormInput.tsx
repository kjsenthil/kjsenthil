import React from 'react';
import { TextField, TextFieldProps } from '../../atoms';
import { FormInputWrapper } from '../../particles';

export interface FormInputProps extends TextFieldProps {
  label: string;
  error?: string;
}

const FormInput: React.FC<FormInputProps> = (props) => {
  const { id, name, value, error, startAdornment, label, placeholder, fullWidth } = props;
  return (
    <FormInputWrapper
      label={label}
      error={error}
      id={id || name}
      hasValue={!!value}
      hasLeadingIcon={!!startAdornment}
      fullWidth={!!fullWidth}
    >
      <TextField
        {...props}
        id={id || name}
        hasError={!!error}
        placeholder={placeholder || label}
        fullWidth={fullWidth}
      />
    </FormInputWrapper>
  );
};

export default FormInput;
