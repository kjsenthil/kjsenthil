import React from 'react';
import TextField, { TextFieldProps } from '../../atoms/TextField';
import { FormInputWrapper } from '../../particles';

export interface FormInputProps extends TextFieldProps {
  label: string;
  error?: string;
}

const FormInput: React.FC<FormInputProps> = (props) => {
  const { id, name, value, error, startAdornment, label, placeholder } = props;
  return (
    <FormInputWrapper
      label={label}
      error={error}
      id={id || name}
      hasValue={!!value}
      hasLeadingIcon={!!startAdornment}
    >
      <TextField {...props} id={id || name} hasError={!!error} placeholder={placeholder || label} />
    </FormInputWrapper>
  );
};

export default FormInput;
