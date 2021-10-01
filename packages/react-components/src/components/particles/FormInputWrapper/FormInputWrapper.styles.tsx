import * as React from 'react';
import styled, { css } from 'styled-components';
import { FormControl, FormControlProps, Theme, Typography, typographyCss } from '../../atoms';

/**
 * Hide the label visually, whilst still making it available to screen readers
 */
const hiddenLabelStyles = css`
  clip: rect(1px, 1px, 1px, 1px);
  clip-path: inset(50%);
  height: 1px;
  width: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
`;

export const StyledFormControl = styled(
  ({ hasError, hasLeadingIcon, fullWidth, hideLabel, ...props }) => <FormControl {...props} />
)`
  ${({
    hasLeadingIcon,
    hasError,
    fullWidth,
    hideLabel,
    theme,
  }: FormControlProps & {
    hasError: boolean;
    hasLeadingIcon: boolean;
    hideLabel: boolean;
    theme: Theme;
  }) => {
    const {
      palette,
      typography: { pxToRem },
    } = theme;

    return `
      display: flex;
      width: ${fullWidth ? '100%' : 'fit-content'};
      flex-direction: column;
      position: relative;
      margin-top: ${hideLabel ? 0 : pxToRem(24)};

      .Mui-focused {
        &.MuiInputBase-adornedStart {
          .MuiInputAdornment-positionStart {
            color: ${palette.primary.main};
          }
        }
      }

      .MuiInputBase-root {
        &.MuiInputBase-adornedStart {
          .MuiInputAdornment-positionStart {
            position: absolute;
            margin-right: 0;
            left: ${pxToRem(12)};
            color: ${hasError ? palette.error.main : palette.grey[300]}
          }

          .MuiInputBase-inputAdornedStart {
            padding-left: ${pxToRem(48)};
          }
        }
      }

      .MuiInputBase-root {
        &.MuiInputBase-adornedEnd {
          .MuiInputAdornment-positionEnd {
            position: absolute;
            margin-right: 0;
            right: ${pxToRem(12)};
            color: ${hasError ? palette.error.main : palette.primary.main}
          }
        }

        .MuiInputBase-inputAdornedEnd {
          padding-left: ${pxToRem(48)};
        }
      }

      .MuiInputLabel-root {
        margin-top: -10px;
        ${typographyCss({ variant: 'sh4', theme })}

        &.MuiInputLabel-formControl {
          left: ${pxToRem(hasLeadingIcon ? 45 : 12)};
        }

        &.Mui-focused, &.MuiInputLabel-shrink {
          transform: translate(-${pxToRem(hasLeadingIcon ? 40 : 8)}, -${pxToRem(14)}) scale(0.75);
          color: ${hasError ? palette.error.main : palette.primary.main};
        }

        ${hideLabel && hiddenLabelStyles}
      }
    `;
  }}
`;

export const FormInputInfo = styled((props) => (
  <Typography {...props} variant="b4" color="primary" />
))`
  font-style: italic;
  line-height: 1.67;
  letterspacing: normal;
`;

export const FormInputError = styled((props) => <Typography {...props} color="error" />)`
  ${({
    theme: {
      typography: { pxToRem },
    },
  }) => `
    font-size: ${pxToRem(14)};
    font-style: italic;
    line-height: 1.67;
    letterSpacing: normal;
  `}
`;
