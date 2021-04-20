import React from 'react';
import { Checkbox as MUICheckbox, CheckboxProps as MUICheckboxProps } from '@material-ui/core';
import styled, { css } from 'styled-components';

const iconStyle = css`
  width: 20px;
  height: 20px;
  border-radius: 4px;
  border: 2px solid #aeaabf;
  background-color: ${({ theme }) => theme.palette.common.white};

  .Mui-focusVisible & {
    outline: 2px auto rgba(19, 124, 189, 0.6);
    outline-offset: 2;
  }
  input:hover ~ & {
    backgroundcolor: #ebf1f5;
  }
  input:disabled ~ & {
    box-shadow: none;
    background: rgba(206, 217, 224, 0.5);
  }
`;

const StyledCheckbox = styled(MUICheckbox)`
  padding: 0;
`;

const StyledIcon = styled.span`
  ${iconStyle}
`;

const StyledCheckedIcon = styled.span`
  ${iconStyle}
  background-color: ${({ theme }) => theme.palette.primary.main};
  border: none;
  &:before {
    display: block;
    width: 20px;
    height: 20px;
    background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E");
    background-size: 14px;
    background-repeat: no-repeat;
    background-position: center;
    content: '';
  }
`;

export interface CheckboxProps extends Omit<MUICheckboxProps, 'color' | 'size'> {}

const Checkbox = ({ ...props }: CheckboxProps) => (
  <StyledCheckbox {...props} checkedIcon={<StyledCheckedIcon />} icon={<StyledIcon />} />
);

export default Checkbox;
