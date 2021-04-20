import React from 'react';
import { Radio as MUIRadio, RadioProps as MUIRadioProps, Theme } from '@material-ui/core';
import styled from 'styled-components';

const iconStyle = ({ palette, typography }: Theme) => `
  width: 20px;
  height: ${typography.pxToRem(20)};
  border-radius: 50%;
  border: 2px solid #aeaabf;
  background-color: ${palette.common.white};

  .Mui-focusVisible & {
    outline: 2px auto rgba(19, 124, 189, 0.6);
    outline-offset: 2;
  }
  input:hover ~ & {
    background-color: #ebf1f5;
  }
  input:disabled ~ & {
    box-shadow: none;
    background: rgba(206, 217, 224, 0.5);
  }
`;

const StyledRadio = styled(MUIRadio)``;

const StyledIcon = styled.span`
  ${({ theme }) => iconStyle(theme)}
`;

const StyledCheckedIcon = styled.span`
  ${({ theme }) => {
    const {
      typography: { pxToRem },
      palette: { primary },
    } = theme;

    return `
    ${iconStyle(theme)};
    border: 2px solid ${primary.main};
    &:before {
      display: block;
      width: ${pxToRem(10)};
      height: ${pxToRem(10)};
      position: absolute;
      top: ${pxToRem(14)};
      left: ${pxToRem(14)};
      background-color: ${primary.main};
      border-radius: 50%;
      content: '';
    }`;
  }}
`;

export interface RadioProps extends Omit<MUIRadioProps, 'color' | 'size'> {}

const Radio = ({ ...props }: RadioProps) => (
  <StyledRadio {...props} checkedIcon={<StyledCheckedIcon />} icon={<StyledIcon />} />
);

export default Radio;
