import React from 'react';
import { TextField as MUITextField, TextFieldProps as MUITextFieldProps } from '@material-ui/core';
import styled from 'styled-components';

const StyledTextField = styled(MUITextField)`
  ${({
    theme: {
      palette,
      typography: { pxToRem },
    },
  }) => `
      width: ${pxToRem(182)};
      height: ${pxToRem(64)};
      border: none;

      label {
        &.MuiInputLabel-formControl {
          top: 5px;
          left: 12px;
        }

        &.Mui-focused, &.MuiInputLabel-shrink {
          transform: translate(-8px, -12px) scale(0.75);
          color: ${palette.primary.main};
        }
      }

      label, input {
        font-size: ${pxToRem(16)};
        font-weight: bold;
        line-height: 1.25;
        letter-spacing: ${pxToRem(0.29)};
      }

      input {
        padding: ${pxToRem(12)};
        border-radius: 4px;
        border: solid 2px ${palette.grey.light2};
        &::placeholder {
          opacity: 1;
          color: ${palette.grey.main};
        }
        &:focus {
          border: 1px solid ${palette.primary.main};
          color: ${palette.primary.main};
        }
      }
    `}
`;

export interface TextFieldProps extends Omit<MUITextFieldProps, 'color'> {}

const TextField = ({ InputProps = {}, placeholder, ...props }: TextFieldProps) => (
  <StyledTextField
    {...props}
    placeholder={placeholder}
    InputProps={{
      disableUnderline: true,
      placeholder: placeholder || props.label || '',
      ...InputProps,
    }}
  />
);

export default TextField;
