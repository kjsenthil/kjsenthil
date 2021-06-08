import { InputProps as MUIInputProps } from '@material-ui/core';

export interface TextFieldProps extends Omit<MUIInputProps, 'color'> {
  hasError?: boolean;

  // This hides the number spin buttons that can appear when the input type is
  // "number". Useful for custom stylings, for example.
  hideNumberSpinButton?: boolean;
}
