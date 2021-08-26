import React from 'react';
import styled from 'styled-components';
import { Theme } from '@material-ui/core';
import { InputLabel, FormControl, FormControlProps, Typography, typographyCss } from '../../atoms';

const StyledFormControl = styled(
  ({
    hasError,
    hasLeadingIcon,
    fullWidth,
    ...props
  }: FormControlProps & {
    hasError: boolean;
    hasLeadingIcon: boolean;
    theme: Theme;
  }) => <FormControl {...props} />
)`
  ${({ hasLeadingIcon, hasError, fullWidth, theme }) => {
    const {
      palette,
      typography: { pxToRem },
    } = theme;
    return `
      display: flex;
      width: ${fullWidth ? '100%' : 'fit-content'};
      flex-direction: column;
      position: relative;
      margin-top: ${pxToRem(24)};

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
            color: ${hasError ? palette.error.main : palette.grey.main}
          }

          .MuiInputBase-inputAdornedStart {
            padding-left: ${pxToRem(48)};
          }
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
      }
    `;
  }}
`;

const FormInputError = styled((props) => <Typography {...props} color="error" />)`
  ${({
    theme: {
      typography: { pxToRem },
    },
  }) => `
    font-size: ${pxToRem(12)};
    font-style: italic;
    line-height: 1.67;
    letterSpacing: normal;
  `}
`;

export interface FormInputWrapperProps {
  id: string;
  label: string;
  error?: string;
  hasValue: boolean;
  hasLeadingIcon: boolean;
  fullWidth: boolean;
}

const FormInputWrapper: React.FC<FormInputWrapperProps> = ({
  id,
  error,
  label,
  hasValue,
  hasLeadingIcon,
  fullWidth,
  children,
}) => (
  <StyledFormControl hasError={!!error} hasLeadingIcon={hasLeadingIcon} fullWidth={fullWidth}>
    <InputLabel shrink={hasValue || !!error} htmlFor={id} data-shrink="true">
      {label}
    </InputLabel>
    {children}
    {error && <FormInputError>{error}</FormInputError>}
  </StyledFormControl>
);

export default FormInputWrapper;
