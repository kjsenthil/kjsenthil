import React from 'react';
import { TextFieldProps } from './types';
import StyledTextField from './TextField.styles';

const TextField = ({ hasError, ...props }: TextFieldProps) => (
  <StyledTextField {...props} hasError={!!hasError} />
);
export default TextField;
