import React from 'react';
import { InputBase as MUIInputBase, InputProps as MUIInputProps } from '@material-ui/core';
import styled from 'styled-components';

const StyledTextField = styled(({ hasError, ...props }) => <MUIInputBase {...props} />)`
  ${({
    hasError,
    theme: {
      palette,
      typography: { pxToRem },
    },
  }) => `
      &.MuiInputAdornment-root {
        margin: 0 ${pxToRem(12)};
      }

      &.MuiInputBase-root {
        border: none;
        .MuiInputBase-input {
          width: ${pxToRem(182)};
          height: ${pxToRem(48)};

          padding: 0;
          padding-left: ${pxToRem(12)};

          box-sizing: inherit;
          font-size: ${pxToRem(16)};
          font-weight: bold;
          line-height: 1.25;
          letter-spacing: ${pxToRem(0.29)};
          border-radius: 4px;
          border: ${
            hasError ? `1px solid ${palette.error.main}` : `2px solid ${palette.grey.light2}`
          };

          &::placeholder {
            opacity: 1;
            color: ${palette.grey.main};
          }
        }

        &.Mui-focused {
          .MuiInputBase-input {
            border: 1px solid ${hasError ? palette.error.main : palette.primary.main};
            color: ${palette.primary.main};
          }
        }
      }
    `}
`;

export interface TextFieldProps extends Omit<MUIInputProps, 'color'> {
  hasError?: boolean;
}

const TextField = ({ hasError, ...props }: TextFieldProps) => (
  <StyledTextField {...props} hasError={!!hasError} />
);
export default TextField;
