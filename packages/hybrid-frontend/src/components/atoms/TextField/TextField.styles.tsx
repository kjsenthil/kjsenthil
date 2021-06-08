import * as React from 'react';
import styled, { css } from 'styled-components';
import { InputBase as MUIInputBase } from '@material-ui/core';
import { TextFieldProps } from './types';

// This removes the up and down buttons for webkit browsers that can appear
// when input type is "number"
// https://stackoverflow.com/questions/45396280/customizing-increment-arrows-on-input-of-type-number-using-css
const hiddenNumberSpinButtonStyles = css`
  -webkit-appearance: textfield;
  -moz-appearance: textfield;
  appearance: textfield;
  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    display: none;
  }
`;

const StyledTextField = styled(({ hasError, hideNumberSpinButton, ...props }: TextFieldProps) => (
  <MUIInputBase {...props} />
))`
  ${({
    hasError,
    hideNumberSpinButton,
    fullWidth,
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
        min-width: ${pxToRem(182)};
        width: ${fullWidth ? '100%' : pxToRem(182)};

        .MuiInputBase-input {
          height: ${pxToRem(48)};
          padding: 0;
          padding-left: ${pxToRem(12)};

          box-sizing: inherit;
          font-size: ${pxToRem(16)};
          font-weight: bold;
          line-height: 1.25;
          letter-spacing: ${pxToRem(0.29)};
          background-color: ${palette.common.white};
          border-radius: 4px;
          border: ${
            hasError ? `1px solid ${palette.error.main}` : `2px solid ${palette.grey.light2}`
          };

          &::placeholder {
            opacity: 1;
            color: ${palette.grey.main};
          }

          ${hideNumberSpinButton && hiddenNumberSpinButtonStyles}
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

export default StyledTextField;
