import React from 'react';
import { Select as MUISelect, SelectProps as MUISelectProps } from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import styled from 'styled-components';
import TextField from '../TextField';

const StyledSelect = styled(MUISelect)`
  ${({ theme, fullWidth }) => `
    background-color: ${theme.palette.common.white};
    min-width: ${theme.typography.pxToRem(182)};
    ${fullWidth ? 'width: 100%;' : ''}
    .MuiSelect-icon {
      margin-right: 11px;
    }

   `}
`;

export interface SelectProps extends Omit<MUISelectProps, 'color' | 'variant' | 'error'> {
  hasError?: boolean;
}

const Select = ({ hasError, ...props }: SelectProps) => (
  <StyledSelect
    native
    IconComponent={KeyboardArrowDownIcon}
    {...props}
    input={<TextField hasError={!!hasError} />}
  />
);

export default Select;
