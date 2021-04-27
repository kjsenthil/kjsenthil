import React from 'react';
import styled from 'styled-components';
import { InputLabel, FormControl, FormControlProps, Theme } from '@material-ui/core';
import { Typography } from '../../atoms';

const StyledFormControl = styled(
  ({
    hasError,
    hasLeadingIcon,
    ...props
  }: FormControlProps & {
    hasError: boolean;
    hasLeadingIcon: boolean;
    theme: Theme;
  }) => <FormControl {...props} />
)`
  ${({
    hasLeadingIcon,
    hasError,
    theme: {
      palette,
      typography: { pxToRem },
    },
  }) => `
    display: flex;
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
      font-size: ${pxToRem(16)};
      font-weight: bold;
      line-height: 1.25;
      letter-spacing: ${pxToRem(0.29)};
      color: transparent;

      &.MuiInputLabel-formControl {
        left: ${pxToRem(hasLeadingIcon ? 45 : 12)};
      }

      &.Mui-focused, &.MuiInputLabel-shrink {
        transform: translate(-${pxToRem(hasLeadingIcon ? 40 : 8)}, -${pxToRem(14)}) scale(0.75);
        color: ${hasError ? palette.error.main : palette.primary.main};
      }
    }
  `}
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
}

const FormInputWrapper: React.FC<FormInputWrapperProps> = ({
  id,
  error,
  label,
  hasValue,
  hasLeadingIcon,
  children,
}) => (
  <StyledFormControl hasError={!!error} hasLeadingIcon={hasLeadingIcon}>
    <InputLabel shrink={hasValue || !!error} htmlFor={id} data-shrink="true">
      {label}
    </InputLabel>
    {children}
    {error && <FormInputError>{error}</FormInputError>}
  </StyledFormControl>
);

export default FormInputWrapper;
