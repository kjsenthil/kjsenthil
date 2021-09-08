import React from 'react';
import { InputLabel } from '../../atoms';
import { FormInputError, StyledFormControl } from './FormInputWrapper.styles';

export interface FormInputWrapperProps {
  id: string;
  label: string;
  error?: string;
  hasValue: boolean;
  hasLeadingIcon: boolean;
  fullWidth: boolean;
  hideLabel?: boolean;
}

const FormInputWrapper: React.FC<FormInputWrapperProps> = ({
  id,
  error,
  label,
  hasValue,
  hideLabel,
  hasLeadingIcon,
  fullWidth,
  children,
}) => (
  <StyledFormControl
    hasError={!!error}
    hasLeadingIcon={hasLeadingIcon}
    fullWidth={fullWidth}
    hideLabel={!!hideLabel}
  >
    <InputLabel shrink={hasValue || !!error} htmlFor={id} data-shrink="true">
      {label}
    </InputLabel>
    {children}
    {error && <FormInputError>{error}</FormInputError>}
  </StyledFormControl>
);

export default FormInputWrapper;
