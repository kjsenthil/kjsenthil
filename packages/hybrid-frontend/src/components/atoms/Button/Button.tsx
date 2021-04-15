import React from 'react';
import { Button as MUIButton, ButtonProps as MUIButtonProps, Theme } from '@material-ui/core';
import styled, { css } from 'styled-components';

export interface ButtonProps extends MUIButtonProps {}

const tertiaryStyle = css`
  ${({ color, variant, theme }: ButtonProps & { theme: Theme }) => {
    let style = ``;
    if (color === 'tertiary') {
      style = `
        color: ${theme.palette.tertiary.main};
      `;
      if (variant === 'outlined') {
        style += `
          border: 1px solid ${theme.palette.tertiary.main};
        `;
      } else if (variant === 'contained') {
        style = `
          background-color: ${theme.palette.tertiary.main};
          color: ${theme.palette.common.white};
        `;
      }
    }
    return style;
  }}
`;

const BaseButton = styled(({ isIcon, ...props }) => <MUIButton {...props} disableElevation />)`
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0.29px;
  font-weight: bold;
  height: ${({ size }) => (size === 'small' ? '28px' : '40px')};
  border-radius: 6px;
  min-width: 40px;
  width: ${({ isIcon }) => (isIcon ? '40px' : 'inherit')};
  padding: ${({ isIcon }) => (isIcon ? '8px' : '12px 16px')};
  padding: ${({ size }) => (size === 'small' ? '6px 24px' : '12px 16px')};
  text-transform: capitalize;
  ${tertiaryStyle}
`;

const Button: React.FC<ButtonProps> = ({ children, ...props }) => (
  <BaseButton variant="contained" isIcon={typeof children !== 'string'} {...props}>
    {children}
  </BaseButton>
);

export default Button;
