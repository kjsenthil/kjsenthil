import * as React from 'react';
import styled, { css } from 'styled-components';
import { InputBase as MUIInputBase } from '@material-ui/core';
import { TextFieldProps } from './types';
import { typographyCss } from '../Typography/Typography';

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

/* eslint-disable no-nested-ternary */
const getCurrencyStyles = (hasError: boolean, disabled: boolean, theme) => {
  const {
    palette,
    typography: { pxToRem },
  } = theme;

  return css`
    &.MuiInputBase-adornedStart .MuiInputAdornment-root {
      &.MuiInputAdornment-positionStart {
        color: ${disabled
          ? palette.grey['300']
          : hasError
          ? palette.common.white
          : palette.primary.dark2};
        padding: 0 ${pxToRem(10)};
        top: 1px;
        left: 1px;
        min-height: calc(${pxToRem(48)} - 2px);
        border-radius: 4px 0 0 4px;
        background: ${hasError ? palette.error.main : palette.grey.light2};
      }
    }

    &.Mui-focused .MuiInputAdornment-root {
      &.MuiInputAdornment-positionStart {
        background: ${hasError ? palette.error.main : palette.primary.main};
        color: ${palette.common.white};
      }
    }
  `;
};

const StyledTextField = styled((props: TextFieldProps) => <MUIInputBase {...props} />)`
  ${({ disabled, hasError, hideNumberSpinButton, isCurrency, fullWidth, theme }) => {
    const {
      palette,
      typography: { pxToRem },
    } = theme;

    return css`
      &.MuiInputAdornment-root {
        margin: 0 ${pxToRem(12)};
      }

      &.MuiInputBase-root {
        border: none;
        min-width: ${pxToRem(182)};
        width: ${fullWidth ? '100%' : pxToRem(182)};

        .MuiInputBase-input {
          ${typographyCss({ variant: 'sh2', theme })}
          height: ${pxToRem(48)};
          padding: 0;
          padding-left: ${pxToRem(12)};
          padding-right: ${isCurrency && pxToRem(20)};
          box-sizing: inherit;
          background-color: ${palette.common.white};
          border-radius: 4px;
          border: ${hasError
            ? `1px solid ${palette.error.main}`
            : `2px solid ${palette.grey.light2}`};
          text-align: ${isCurrency && 'right'};

          &::placeholder {
            opacity: 1;
            color: ${palette.grey.main};
          }

          ${hideNumberSpinButton && hiddenNumberSpinButtonStyles}
        }

        ${isCurrency && getCurrencyStyles(!!hasError, !!disabled, theme)}

        &.Mui-focused {
          .MuiInputBase-input {
            border: 1px solid ${hasError ? palette.error.main : palette.primary.main};
            color: ${palette.primary.main};
          }
        }
      }
    `;
  }}
`;

export default StyledTextField;
